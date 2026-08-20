import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
    {
        sharedBy: {
            type: String,
            required: true,
            ref: "User",
        },
        title: {
            type: String,
            required: true,
        },
        bannerLink: {
            type: String,
            required: true,
        },
        organizer: {
            type: String,
            required: true,
        },
        dateAndTime: {
            type: Date,
            required: true,
        },
        location: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        registrationLink: {
            type: String,
            required: true,
        },
    }
);

const Event = mongoose.model("Event", eventSchema);

export default Event;
