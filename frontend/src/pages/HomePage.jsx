import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useAuthStore } from "../store/useAuthStore";
import { AtSign, Save, Forward, MessageCircleMore, Heart, Trash2, Pencil } from "lucide-react";
import Floator from "../components/Floator.jsx";
import Footer from "../components/Footer.jsx";
import { useNewStore } from "../store/useNewStore.js";
import { toTitleCase } from "../lib/utils.js";

function HomePage() {
  const { authUser } = useAuthStore();
  const {
    posts,
    fetchPosts,
    deletePost,
    togglePostLike,
    addComment,
    updateComment,
    deleteComment,
    isAddingComment,
    isUpdatingComment,
    isDeletingComment,
    isUpdatingPost,
    isDeletingPost,
    isTogglingLike,
  } = useNewStore();
  const [replyText, setReplyText] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingReplyText, setEditingReplyText] = useState("");

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);
  const [selectedPost, setSelectedPost] = useState(null);
  
  const handleOpenModal = (post) => {
    setSelectedPost(post);
    setReplyText("");
    setEditingCommentId(null);
    setEditingReplyText("");
  };
  const handleCloseModal = () => {
    setSelectedPost(null);
    setReplyText("");
    setEditingCommentId(null);
    setEditingReplyText("");
  };

  const activePost = selectedPost
    ? posts.find((post) => post._id === selectedPost._id) || selectedPost
    : null;

  const handleReplySubmit = async () => {
    if (!activePost?._id || !replyText.trim()) return;

    const updatedPost = await addComment(activePost._id, replyText);

    if (updatedPost) {
      setSelectedPost(updatedPost);
      setReplyText("");
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (!activePost?._id || !commentId) return;

    const updatedPost = await deleteComment(activePost._id, commentId);

    if (updatedPost) {
      setSelectedPost(updatedPost);
      if (editingCommentId === commentId) {
        setEditingCommentId(null);
        setEditingReplyText("");
      }
    }
  };

  const handleStartEdit = (comment) => {
    setEditingCommentId(comment._id);
    setEditingReplyText(comment.reply);
  };

  const handleCancelEdit = () => {
    setEditingCommentId(null);
    setEditingReplyText("");
  };

  const handleUpdateComment = async () => {
    if (!activePost?._id || !editingCommentId || !editingReplyText.trim()) return;

    const updatedPost = await updateComment(activePost._id, editingCommentId, editingReplyText);

    if (updatedPost) {
      setSelectedPost(updatedPost);
      setEditingCommentId(null);
      setEditingReplyText("");
    }
  };

  const handleDeletePost = async (postId) => {
    if (!postId) return;

    try {
      await deletePost(postId);
      toast.success("Post deleted");
    } catch (error) {
      toast.error(error.message || "Failed to delete post");
    }
  };

  const handleToggleLike = async (postId) => {
    if (!authUser) {
      toast.error("Please login to like posts");
      return;
    }
    if (!postId) return;

    try {
      await togglePostLike(postId);
    } catch (error) {
      toast.error(error.message || "Failed to update like");
    }
  };

  return (

    <>
      <section className="min-h-screen pt-16 flex flex-col items-center bg-base-100 text-base-content transition-all z-0">
        {/* Container */}
        <div className="w-full max-w-5xl p-4 bg-base-100 border border-base-300">
          {/* Welcome */}
          <p className="text-sm flex items-center">Welcome&nbsp;<AtSign size={12} />{authUser?.username || authUser?.fullName || "Guest"}</p>

          {/* Posts Section */}
          <div className="mt-6 w-full">
            <h2 className="font-semibold">Posts</h2>

            {/* responsive grid: 1 col on mobile, 2 cols on md and up, items wrap */}
            <div
              className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4 auto-rows-min">
              {posts.map((post) => (
                <div
                  key={post._id || post.id}
                  className="card group bg-base-200 border border-base-300 p-3 w-full"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      {post.author
                        ? <Link
                          to={`/profile/${post.author}`}
                          className="text-sm font-medium link link-hover text-primary"
                        >
                          <p className="font-medium flex items-center"><AtSign size={12} />{post.author}</p>
                        </Link>
                        : <p className="font-medium flex items-center"><AtSign size={12} />{post.author}</p>

                      }
                    </div>
                    {authUser?.userId === post.author && (
                      <div className="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                        <button
                          type="button"
                          className="btn btn-ghost btn-xs text-error"
                          onClick={() => handleDeletePost(post._id)}
                          disabled={isUpdatingPost || isDeletingPost}
                          aria-label="Delete post"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </div>
                    )}
                  </div>
                  <p className="text-sm mt-1">{post.content}</p>
                  <div className="flex justify-between items-center mt-2">
                    <div className="flex gap-2">
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          className={`w-6 h-6 border border-base-300 rounded-sm flex items-center justify-center ${
                            post.likes?.includes(authUser?.userId) ? "text-error" : ""
                          }`}
                          onClick={() => handleToggleLike(post._id)}
                          disabled={isTogglingLike}
                          aria-label={post.likes?.includes(authUser?.userId) ? "Unlike post" : "Like post"}
                        >
                          <Heart
                            size={18}
                            className={post.likes?.includes(authUser?.userId) ? "fill-current" : ""}
                          />
                        </button>
                        {post.likes?.length > 0 && (
                          <span className="text-xs text-base-content/70 min-w-3">{post.likes?.length}</span>
                        )}
                      </div>
                      <button
                        className="w-6 h-6 border border-base-300 rounded-sm"
                        onClick={() => toast("This feature is coming soon!")}
                      ><Forward size={22} /></button>
                      <button
                        className="w-6 h-6 border border-base-300 rounded-sm"
                        onClick={() => toast("This feature is coming soon!")}
                      ><Save size={20} />
                      </button>
                    </div>
                    <div className="flex gap-2">
                      <button className="w-6 h-6 border border-base-300 rounded-sm" onClick={() => handleOpenModal(post)}><MessageCircleMore size={20} /></button>
                      <button className="text-xs text-primary" onClick={() => handleOpenModal(post)}>Reply</button>
                    </div>
                  </div>
                </div>
              ))}



              {activePost && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
                  <div className="relative bg-base-100 text-base-content rounded-xl shadow-xl 
                  w-full max-w-3xl max-h-[85vh] overflow-hidden">

                    {/* Header */}
                    <div className="flex items-center justify-between px-6 py-4 border-b border-base-300">
                      <h3 className="text-lg font-semibold flex items-center gap-1">
                        <AtSign size={14} />
                        {activePost.author ?
                          <Link
                            to={`/profile/${activePost.author}`}
                            className="text-sm font-medium link link-hover text-primary"
                            onClick={handleCloseModal}
                          >
                            {activePost.author}
                          </Link>
                          : (
                            <span>{activePost.author}</span>
                          )}
                      </h3>

                      <button
                        onClick={handleCloseModal}
                        className="btn btn-ghost btn-sm text-xl"
                        aria-label="Close"
                      >
                        &times;
                      </button>
                    </div>

                    {/* Body (Scrollable) */}
                    <div className="overflow-y-auto px-6 py-5 space-y-6">

                      {/* Post Content */}
                      <p className="text-sm lg:text-base text-base-content/80 leading-relaxed">
                        {activePost.content}
                      </p>



                      {/* Reply Box */}
                      <div className="pt-4 border-t border-base-300">
                        <textarea
                          className="textarea textarea-bordered w-full text-sm"
                          rows={3}
                          placeholder="Write a reply..."
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                        ></textarea>

                        <div className="flex justify-end mt-3">
                          <button
                            className="btn btn-sm btn-primary"
                            onClick={handleReplySubmit}
                            disabled={!authUser || isAddingComment || !replyText.trim()}
                          >
                            {isAddingComment ? "Posting..." : "Reply"}
                          </button>
                        </div>
                      </div>

                      {/* Comments Section */}
                      <div className="space-y-4">
                        <h4 className="font-semibold text-base">Replies</h4>
                        <div className="max-h-60 overflow-y-auto space-y-4 pr-2 [scrollbar-width:thin] [scrollbar-color:hsl(var(--bc)/0.25)_transparent] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-base-content/20 hover:[&::-webkit-scrollbar-thumb]:bg-base-content/35">
                          {activePost.comments?.length > 0 ? (
                            activePost.comments.map((comment, index) => (
                              <div
                                key={comment._id || index}
                                className="group p-4 rounded-lg bg-base-200"
                              >
                                <div className="mb-1 flex items-center justify-between gap-3">
                                  <div>
                                    {comment.commenterId ? (
                                      <Link
                                        to={`/profile/${comment.commenterId}`}
                                        className="text-sm font-medium link link-hover text-primary"
                                        onClick={handleCloseModal}
                                      >
                                        {toTitleCase(comment.commenter)}
                                      </Link>
                                    ) : (
                                      <span className="text-sm font-medium">{comment.commenter}</span>
                                    )}
                                  </div>

                                  {comment._id && authUser?.userId === comment.commenterId && (
                                    <div className="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                                      <button
                                        type="button"
                                        className="btn btn-ghost btn-xs"
                                        onClick={() => handleStartEdit(comment)}
                                        disabled={isUpdatingComment || isDeletingComment}
                                        aria-label="Edit comment"
                                      >
                                        <Pencil className="size-4" />
                                      </button>
                                      <button
                                        type="button"
                                        className="btn btn-ghost btn-xs text-error"
                                        onClick={() => handleDeleteComment(comment._id)}
                                        disabled={isUpdatingComment || isDeletingComment}
                                        aria-label="Delete comment"
                                      >
                                        <Trash2 className="size-4" />
                                      </button>
                                    </div>
                                  )}
                                </div>

                                {editingCommentId === comment._id ? (
                                  <div className="space-y-3">
                                    <textarea
                                      className="textarea textarea-bordered w-full text-sm"
                                      rows={3}
                                      value={editingReplyText}
                                      onChange={(e) => setEditingReplyText(e.target.value)}
                                    ></textarea>
                                    <div className="flex justify-end gap-2">
                                      <button
                                        type="button"
                                        className="btn btn-ghost btn-sm"
                                        onClick={handleCancelEdit}
                                        disabled={isUpdatingComment}
                                      >
                                        Cancel
                                      </button>
                                      <button
                                        type="button"
                                        className="btn btn-primary btn-sm"
                                        onClick={handleUpdateComment}
                                        disabled={isUpdatingComment || !editingReplyText.trim()}
                                      >
                                        {isUpdatingComment ? "Saving..." : "Save"}
                                      </button>
                                    </div>
                                  </div>
                                ) : (
                                  <p className="text-sm text-base-content/80">{comment.reply}</p>
                                )}
                              </div>
                            ))
                          ) : (
                            <p className="text-sm text-base-content/50">
                              No reply yet.
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      <Floator />
      <Footer />
    </>
  );
}

export default HomePage;
