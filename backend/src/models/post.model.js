import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    commenterId: {
      type: String,
      ref: "User",
    },
    commenter: { 
        type: String,
        required: true
    },
    reply: { 
        type: String, 
        required: true 
    },
  },
  { timestamps: true }
);

const postSchema = new mongoose.Schema(
  {
    author: { 
        type: String, 
        required: true 
    },
    content: { 
        type: String, 
        required: true 
    },
    comments: [commentSchema],
  },
  { timestamps: true }
);

export default mongoose.model("Post", postSchema);
