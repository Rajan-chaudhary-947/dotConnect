import { useEffect, useRef, useState } from "react";
import { FileText, List, Loader2, Upload, X } from "lucide-react";
import toast from "react-hot-toast";
import { useAuthStore } from "../../store/useAuthStore";
import { useNewStore } from "../../store/useNewStore";


function ShareResource({ onClose }) {

    const [formData, setFormData] = useState({
        resourceType: "",
        title: "",
        file: "",
    });
    const modalRef = useRef(null);
    const { authUser } = useAuthStore();
    const { createResource, isCreatingResource } = useNewStore();

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

        if (!formData.title.trim() || !formData.resourceType.trim() || !formData.file.trim()) {
            toast.error("All fields are required");
            return;
        }

        try {
            await createResource({
                author: authUser?.fullName || authUser?.email || "Guest",
                formData: { ...formData },
            });
            toast.success("Resource shared");
            onClose();
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to share resource");
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
                    <h2 className="text-lg font-semibold">Awww☺️, You're so kind</h2>
                    <button
                        type="button"
                        className="btn btn-ghost btn-sm btn-square"
                        onClick={onClose}
                        aria-label="Close event form"
                    >
                        <X className="size-5" />
                    </button>
                </div>

                <div className="space-y-4 px-5 py-5">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-medium">Resource Type</span>
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <List className="h-5 w-5 text-base-content/40" />
                            </div>
                            <select
                                className="select select-bordered w-full rounded border-base-300 pl-10 text-sm"
                                value={formData.resourceType}
                                onChange={(e) => setFormData({ ...formData, resourceType: e.target.value })}
                            >
                                <option value="" disabled>Select resource type</option>
                                <option value="Notes">Notes</option>
                                <option value="Syllabus">Syllabus</option>
                                <option value="PYQ">PYQ</option>
                                <option value="Que-Bank or Solution">Que-Bank or Solution</option>

                            </select>
                        </div>
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-medium">Resource Title</span>
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FileText className="h-5 w-5 text-base-content/40" />
                            </div>
                            <input
                                type="text"
                                className="input input-bordered w-full pl-10 text-sm"
                                placeholder="Resource title"
                                value={formData.title}
                                onChange={(event) => setFormData({ ...formData, title: event.target.value })}
                                autoFocus
                            />
                        </div>
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-medium">Upload File</span>
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Upload className="h-5 w-5 text-base-content/40" />
                            </div>
                            <input
                                type="file"
                                className="file-input file-input-bordered w-full pl-10 text-sm"
                                value={formData.file}
                                onChange={(event) => setFormData({ ...formData, file: event.target.value })}
                            />
                        </div>
                    </div>

                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="btn btn-primary min-w-24"
                            disabled={isCreatingResource || !formData.title.trim() || !formData.resourceType.trim() || !formData.file.trim()}
                        >
                            {isCreatingResource ? (
                                <>
                                    <Loader2 className="size-4 animate-spin" />
                                    Creating Resource...
                                </>
                            ) : (
                                "Create Resource"
                            )}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
export default ShareResource;
