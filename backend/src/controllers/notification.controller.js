import Notification from "../models/notification.model.js";

export const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ recipient: req.user._id })
      .sort({ createdAt: -1 })
      .populate("sender", "fullName profilePic userId");

    res.status(200).json(notifications);
  } catch {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const markNotificationsAsRead = async (req, res) => {
  try {
    await Notification.updateMany(
      { recipient: req.user._id, read: false },
      { $set: { read: true } }
    );
    res.status(200).json({ message: "Notifications marked as read" });
    

  } catch {
    res.status(500).json({ message: "Internal server error" });
  }
};
