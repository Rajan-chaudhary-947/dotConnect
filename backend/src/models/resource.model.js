import mongoose from "mongoose";

const resourceSchema = new mongoose.Schema(
    {
        resourceType: {
            type: String,
            enum: ["notes", "syllabus", "pyq", "queBankOrSoln"],
            required: true,
            index: true
        },
        title: {
            type: String,
            required: true
        },
        fileUrl: {
            type: String,
            required: true
        },
        fileName: {
            type: String,
            required: true
        },
        mimeType: {
            type: String,
            required: true
        },
        cloudinaryPublicId: {
            type: String
        },
        cloudinaryResourceType: {
            type: String,
            enum: ["image", "raw", "video"]
        },
        sharedBy: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
)
const Resource = mongoose.model("Resource", resourceSchema);

export default Resource;