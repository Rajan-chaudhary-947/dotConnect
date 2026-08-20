import Relationship from "../models/relationship.model.js";
import User from "../models/user.model.js";
import Notification from "../models/notification.model.js";
import { io } from "../lib/socket.js";
import { getReceiverSocketId } from "../lib/socket.js";

const getRelationshipUsers = (userA, userB) => {
    return [userA.toString(), userB.toString()].sort();
};

export const sendRequest = async (req, res) => {

    const currentUserId = req.user._id;
    const targetUserPublicId = req.params.userId;
    try {
        const targetUser = await User.findOne({ userId: targetUserPublicId });

        if (!targetUser) {
            return res.status(404).json({
                message: "Target user not found"
            });
        }
        const targetUserId = targetUser._id;

        if (targetUserId.toString() === currentUserId.toString()) {
            return res.status(400).json({
                message: "You cannot send a connection request to yourself"
            });
        }

        const [userOne, userTwo] = getRelationshipUsers(currentUserId, targetUserId);

        const existing = await Relationship.findOne({
            userOne,
            userTwo
        });

        if (existing) {
            return res.status(400).json({
                message: "Relationship already exists"
            });
        }

        const relationship = await Relationship.create({
            userOne,
            userTwo,
            requestedBy: currentUserId,
            status: "pending"
        });

        const notification = await Notification.create({
            recipient: targetUserId,
            sender: currentUserId,
            type: "connection_request",
            relationshipId: relationship._id,
        });
        const populatedNotification = await notification.populate(
            "sender",
            "fullName profilePic userId"
        );

        const receiverSocketId = getReceiverSocketId(targetUserId.toString());
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("new_notification", populatedNotification);
        }

        res.json({ relationship, notification: populatedNotification });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error: Creating relationship" });
    };
};

export const getRelationshipStatus = async (req, res) => {
    const currentUserId = req.user._id;
    const targetUserPublicId = req.params.userId;

    try {
        const targetUser = await User.findOne({ userId: targetUserPublicId });

        if (!targetUser) {
            return res.status(404).json({
                message: "Target user not found"
            });
        }

        const [userOne, userTwo] = getRelationshipUsers(currentUserId, targetUser._id);
        const relationship = await Relationship.findOne({ userOne, userTwo });

        if (!relationship) {
            return res.status(200).json({ relationship: null });
        }

        res.status(200).json({
            relationship: {
                _id: relationship._id,
                status: relationship.status,
                isRequester: relationship.requestedBy.toString() === currentUserId.toString(),
                isRecipient: relationship.requestedBy.toString() !== currentUserId.toString(),
            },
        });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error: Getting relationship status" });
    }
};

export const responseToRequest = async (req, res) => {
    const currentUserId = req.user._id;
    const targetUserPublicId = req.params.userId;
    const { status } = req.body;

    const allowedStatuses = ["accepted", "rejected", "blocked", "unblock"];

    if (!allowedStatuses.includes(status)) {
        return res.status(400).json({
            message: "Invalid relationship status"
        });
    }

    const targetUser = await User.findOne({ userId: targetUserPublicId });

    if (!targetUser) {
        return res.status(404).json({
            message: "Target user not found"
        });
    }

    const targetUserId = targetUser._id;
    const [userOne, userTwo] = getRelationshipUsers(currentUserId, targetUserId);

    const relationship = await Relationship.findOne({
        userOne,
        userTwo
    });

    if (!relationship) {
        return res.status(404).json({
            message: "Relationship not found"
        });
    }

    if (relationship.requestedBy.toString() === currentUserId.toString()) {
        return res.status(403).json({
            message: "You cannot respond to your own relationship request"
        });
    }

    if (status !== "unblock") {
        relationship.status = status;
        await relationship.save();
    }

    if (status === "accepted") {
        const notification = await Notification.create({
            recipient: relationship.requestedBy,
            sender: currentUserId,
            type: "connection_accepted",
            relationshipId: relationship._id,
        });
        const populatedNotification = await notification.populate(
            "sender",
            "fullName profilePic userId"
        );

        const receiverSocketId = getReceiverSocketId(relationship.requestedBy.toString());
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("new_notification", populatedNotification);
        }
    }

    if (status === "rejected") {
        setTimeout(async () => {
            await Relationship.findByIdAndDelete(relationship._id);
        }, 60 * 60 * 1000);
    }

    if (status === "unblock") {
        await Relationship.findByIdAndDelete(relationship._id);
        return res.json({ relationship: null });
    }

    res.json(relationship);
};
