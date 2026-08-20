import { config } from "dotenv";
config();

import { connectDB } from "../lib/db.js";
import Post from "../models/post.model.js";

const seedPosts = [
  {
    author: "Rajan",
    content: "Nowdays, MongoDB is widely used in Industries.",
  },
  {
    author: "Rudra",
    content: "Question Bank for various subjects is available.",
  },
  {
    author: "Priyanshi",
    content: "Anyone interested in forming a study group for Data Structures?",
  },
  {
    author: "Ankita",
    content: "Looking for project collaborators in web development.",
    comments: [
      {
        commenter: "Rajan",
        reply: "I would love to join you on this project!",
      },
      {
        commenter: "Omi",
        reply: "Count me in as well. I have some experience in web dev, let's collaborate!",
      },
      {
        commenter: "Rajan",
        reply: "I would love to join you on this project!",
      },
      {
        commenter: "Rajan",
        reply: "I would love to join you on this project!",
      },
      {
        commenter: "Rajan",
        reply: "I would love to join you on this project!",
      },
    ],
  },
  {
    author: "Devansh",
    content: "Can someone help me with React hooks?",
  },
  {
    author: "Karan",
    content: "Sharing notes on Machine Learning basics.",
  },
  {
    author: "Omi",
    content: "Anyone up for a coding challenge this weekend?",
  },
];

const seedDatabase = async () => {
  try {
    await connectDB();

    await Post.deleteMany({});
    await Post.insertMany(seedPosts);

    console.log("Posts seeded successfully");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding posts:", error);
    process.exit(1);
  }
};

seedDatabase();
