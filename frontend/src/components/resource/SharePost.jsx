import { useEffect, useRef, useState } from "react";
import { FileText, Loader2, X } from "lucide-react";
import toast from "react-hot-toast";
import { useAuthStore } from "../../store/useAuthStore";
import { useNewStore } from "../../store/useNewStore";

function SharePost({ onClose }) {
  const [content, setContent] = useState("");
  const modalRef = useRef(null);
  const { authUser } = useAuthStore();
  const { createPost, isCreatingPost } = useNewStore();

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const handleBackdropClick = (event) => {
    if (modalRef.current?.contains(event.target)) return;
    onClose();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!content.trim()) {
      toast.error("Post details are required");
      return;
    }

    try {
      await createPost({
        author: authUser?.userId,
        content: content.trim(),
      });
      toast.success("Post shared");
      onClose();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to share post");
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
      onPointerDown={handleBackdropClick}
    >
      <form
        ref={modalRef}
        onSubmit={handleSubmit}
        className="w-full max-w-lg rounded-xl border border-base-300 bg-base-100 text-base-content shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-base-300 px-5 py-4">
          <h2 className="text-lg font-semibold">Have a new thought, Great!</h2>
          <button
            type="button"
            className="btn btn-ghost btn-sm btn-square"
            onClick={onClose}
            aria-label="Close post form"
          >
            <X className="size-5" />
          </button>
        </div>

        <div className="space-y-4 px-5 py-5">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Post Details</span>
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute left-3 top-3">
                <FileText className="h-5 w-5 text-base-content/40" />
              </div>
              <textarea
                className="textarea textarea-bordered min-h-36 w-full resize-none pl-10 text-sm"
                placeholder="Describe your thought..."
                value={content}
                onChange={(event) => setContent(event.target.value)}
                autoFocus
              />
            </div>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="btn btn-primary min-w-24"
              disabled={isCreatingPost || !content.trim()}
            >
              {isCreatingPost ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Posting...
                </>
              ) : (
                "Post"
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SharePost;
