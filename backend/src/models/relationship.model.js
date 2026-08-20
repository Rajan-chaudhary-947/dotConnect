import mongoose from "mongoose";

const relationshipSchema = new mongoose.Schema(
    {
        userOne: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        userTwo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        requestedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        status: {
            type: String,
            enum: [
                "pending",
                "accepted",
                "rejected",
                "blocked"
            ],
            default: "pending"
        }
    },
    {
        timestamps: true
    }
);

// Prevent duplicate relationships
relationshipSchema.index(
    {
        userOne: 1,
        userTwo: 1
    },
    {
        unique: true
    }
);

const Relationship = mongoose.model("Relationship", relationshipSchema);

export default Relationship;