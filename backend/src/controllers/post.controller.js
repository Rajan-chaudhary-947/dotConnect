import Post from "../models/post.model.js";



// Handling posts and comments
export const getPosts = async (req, res) => {
  const posts = await Post.find().sort({ createdAt: -1 });
  res.status(200).json(posts);
};

// Creating a new post.
export const createPost = async (req, res) => {
  const { author, content } = req.body;
  try {
    const post = await Post.create({ author, content });
    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Not in use currently
export const modifyPost = async (req, res) => {
  const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.status(200).json(post);
}

// Deleting a post. 
export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    if (post.author.toString() !== req.user.userId.toString()) {
      return res.status(403).json({ message: "You can only delete your own posts" });
    }
    await Post.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Post deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


//Adding a comment to a post.
export const addComment = async (req, res) => {
  try {
    const { commenterId, commenter, reply } = req.body;

    // Validate required fields
    if (!commenter || !reply) {
      return res.status(400).json({ message: "Commenter name and reply text are required" });
    }

    const post = await Post.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          comments: {
            commenterId,
            commenter,
            reply,
          }
        }
      },
      { new: true }
    );

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



export const getComments = async (req, res) => {
  const post = await Post.findById(req.params.id);
  res.json(post.comments);
};

export const modifyComment = async (req, res) => {
  const post = await Post.findById(req.params.id);
  const comment = post.comments.id(req.params.commentId);
  Object.assign(comment, req.body);
  await post.save();
  res.json(post);
};

export const deleteComment = async (req, res) => {
  const post = await Post.findByIdAndUpdate(
    req.params.id,
    { $pull: { comments: { _id: req.params.commentId } } },
    { new: true }
  );
  res.json(post);
};
