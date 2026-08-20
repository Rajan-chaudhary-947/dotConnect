import { useEffect, useRef, useState } from "react";
import { Briefcase, Building2, FileText, Link, Loader2, MapPin, Tags, X } from "lucide-react";
import toast from "react-hot-toast";
import { useAuthStore } from "../../store/useAuthStore";
import { useNewStore } from "../../store/useNewStore";



function ShareJob({ onClose }) {
    const modalRef = useRef(null);
    const { authUser } = useAuthStore();
    const { createJob, isCreatingJob } = useNewStore();
    const [formData, setFormData] = useState({
        role: "",
        company: "",
        location: "",
        type: "",
        description: "",
        applyLink: "",
    });

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

        if (!formData.role.trim() || !formData.company.trim() || !formData.location.trim() || !formData.type.trim() || !formData.description.trim() || !formData.applyLink.trim()) {
            toast.error("All fields are required");
            return;
        }

        try {
            await createJob({
                role: formData.role,
                company: formData.company,
                location: formData.location,
                type: formData.type,
                description: formData.description,
                applyLink: formData.applyLink,
            });
            toast.success("Job shared");
            onClose();
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to share job");
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
                className="flex flex-col h-full w-full max-w-lg max-h-[90vh] overflow-hidden rounded-xl border border-base-300 bg-base-100 text-base-content shadow-2xl"
            >
                <div className="flex items-center justify-between border-b border-base-300 px-5 py-4">
                    <h2 className="text-lg font-semibold ml-2">You have a helping hand, Awww☺️</h2>
                    <button
                        type="button"
                        className="btn btn-ghost btn-sm btn-square"
                        onClick={onClose}
                        aria-label="Close job form"
                    >
                        <X className="size-5" />
                    </button>
                </div>

                <div className="flex-1 min-h-0 space-y-4 overflow-y-auto px-8 py-5 pr-6 [scrollbar-width:thin] [scrollbar-color:hsl(var(--bc)/0.25)_transparent] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-base-content/20 hover:[&::-webkit-scrollbar-thumb]:bg-base-content/35">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-medium">Job Role</span>
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Briefcase className="h-5 w-5 text-base-content/40" />
                            </div>
                            <input
                                type="text"
                                className="input input-bordered w-full pl-10 text-sm"
                                placeholder="Job title or position"
                                value={formData.role}
                                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                autoFocus
                            />
                        </div>
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-medium">Company</span>
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Building2 className="h-5 w-5 text-base-content/40" />
                            </div>
                            <input
                                type="text"
                                className="input input-bordered w-full pl-10 text-sm"
                                placeholder="Company name"
                                value={formData.company}
                                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                            />
                        </div>
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-medium">Location or Mode</span>
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <MapPin className="h-5 w-5 text-base-content/40" />
                            </div>
                            <input
                                type="text"
                                className="input input-bordered w-full pl-10 text-sm"
                                placeholder="Location or Mode"
                                value={formData.location}
                                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                            />
                        </div>
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-medium">Job Type</span>
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Tags className="h-5 w-5 text-base-content/40" />
                            </div>
                            <select
                                className="select select-bordered w-full pl-10 text-sm"
                                value={formData.type}
                                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                            >
                                <option disabled value="">Select job type</option>
                                <option value="Full-time">Full-time</option>
                                <option value="Part-time">Part-time</option>
                                <option value="Internship">Internship</option>
                                <option value="Contract">Contract</option>
                                <option value="Freelance">Freelance</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-medium">Job Description</span>
                        </label>
                        <div className="relative">
                            <div className="pointer-events-none absolute left-3 top-3">
                                <FileText className="h-5 w-5 text-base-content/40" />
                            </div>
                            <textarea
                                className="textarea textarea-bordered min-h-32 w-full resize-none pl-10 text-sm"
                                placeholder="Summary of the job opportunity..."
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            />
                        </div>
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-medium">Apply Link</span>
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Link className="h-5 w-5 text-base-content/40" />
                            </div>
                            <input
                                type="text"
                                className="input input-bordered w-full pl-10 text-sm"
                                placeholder="Link to apply or learn more"
                                value={formData.applyLink}
                                onChange={(e) => setFormData({ ...formData, applyLink: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="btn btn-primary min-w-24"
                            disabled={isCreatingJob || !formData.role.trim() || !formData.company.trim() || !formData.location.trim() || !formData.type.trim() || !formData.description.trim() || !formData.applyLink.trim()  }
                        >
                            {isCreatingJob ? (
                                <>
                                    <Loader2 className="size-4 animate-spin" />
                                    Creating job...
                                </>
                            ) : (
                                "Create Job"
                            )}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default ShareJob;
