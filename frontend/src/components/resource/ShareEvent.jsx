import { useEffect, useRef, useState } from "react";
import { Loader2, X } from "lucide-react";
import toast from "react-hot-toast";
import { useAuthStore } from "../../store/useAuthStore";
import { useNewStore } from "../../store/useNewStore";
import { Pen, Link, Building2, Calendar, MapPin } from "lucide-react";


function ShareEvent({ onClose }) {

    const [formData, setFormData] = useState({
        title: "",
        bannerLink: "",
        organizer: "",
        dateAndTime: "",
        location: "",
        description: "",
        registrationLink: "",
    });
    const modalRef = useRef(null);
    const { authUser } = useAuthStore();
    const { createEvent, isCreatingEvent } = useNewStore();

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

        if (!formData.title.trim() || !formData.bannerLink.trim() || !formData.organizer.trim() || !formData.dateAndTime.trim() || !formData.location.trim() || !formData.description.trim() || !formData.registrationLink.trim()) {
            toast.error("All fields are required");
            return;
        }

        try {
            await createEvent({
                title: formData.title,
                bannerLink: formData.bannerLink,
                organizer: formData.organizer,
                dateAndTime: formData.dateAndTime,
                location: formData.location,
                description: formData.description,
                registrationLink: formData.registrationLink,
            });
            toast.success("Event shared");
            onClose();
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to share event post");
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
                className="w-full max-w-lg max-h-[90vh] overflow-hidden rounded-xl border border-base-300 bg-base-100 text-base-content shadow-2xl"
            >
                <div className="flex items-center justify-between border-b border-base-300 px-5 py-4">
                    <h2 className="text-lg font-semibold">Okey, let's share your event!</h2>
                    <button
                        type="button"
                        className="btn btn-ghost btn-sm btn-square"
                        onClick={onClose}
                        aria-label="Close event form"
                    >
                        <X className="size-5" />
                    </button>
                </div>

                <div className="max-h-[calc(90vh-5rem)] space-y-4 overflow-y-auto px-8 py-5 pr-6 [scrollbar-width:thin] [scrollbar-color:hsl(var(--bc)/0.25)_transparent] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-base-content/20 hover:[&::-webkit-scrollbar-thumb]:bg-base-content/35">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-medium">Title</span>
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Pen className="h-5 w-5 text-base-content/40" />
                            </div>
                            <input
                                type="text"
                                className={`input input-bordered w-full pl-10`}
                                placeholder="Event title"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            />
                        </div>
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-medium">Banner Link</span>
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Link className="h-5 w-5 text-base-content/40" />
                            </div>
                            <input
                                type="text"
                                className={`input input-bordered w-full pl-10`}
                                placeholder="Image URL for event banner"
                                value={formData.bannerLink}
                                onChange={(e) => setFormData({ ...formData, bannerLink: e.target.value })}
                            />
                        </div>
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-medium">Organizer</span>
                        </label>
                         <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Building2 className="h-5 w-5 text-base-content/40" />
                            </div>
                            <input
                                type="text"
                                className={`input input-bordered w-full pl-10`}
                                placeholder="Organizer name"
                                value={formData.organizer}
                                onChange={(e) => setFormData({ ...formData, organizer: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-medium">Event Date and Time</span>
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Calendar className="h-5 w-5 text-base-content/40" />
                            </div>
                            <input
                                type="datetime-local"
                                className="input input-bordered w-full pl-10 text-sm"
                                placeholder="Event date and time"
                                value={formData.dateAndTime}
                                onChange={(event) => setFormData({ ...formData, dateAndTime: event.target.value })}
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
                                placeholder="Location or Mode (e.g., Online)"
                                value={formData.location}
                                onChange={(event) => setFormData({ ...formData, location: event.target.value })}
                            />
                        </div>
                    </div>
                    <textarea
                        className="textarea textarea-bordered min-h-36 w-full resize-none text-sm"
                        placeholder="Describe your thought..."
                        value={formData.description}
                        onChange={(event) => setFormData({ ...formData, description: event.target.value })}
                        autoFocus
                    />
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-medium">Registration Link</span>
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Link className="h-5 w-5 text-base-content/40" />
                            </div>
                        <input
                            type="text"
                            className={`input input-bordered w-full pl-10 text-sm`}
                            placeholder="URL for event registration"
                            value={formData.registrationLink}
                            onChange={(e) => setFormData({ ...formData, registrationLink: e.target.value })}
                        />
                        </div>
                    </div>

                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="btn btn-primary min-w-24"
                            disabled={isCreatingEvent || !formData.description.trim() || !formData.title.trim() || !formData.bannerLink.trim() || !formData.organizer.trim() || !formData.dateAndTime.trim() || !formData.location.trim() || !formData.registrationLink.trim()}
                        >
                            {isCreatingEvent ? (
                                <>
                                    <Loader2 className="size-4 animate-spin" />
                                    Creating Event...
                                </>
                            ) : (
                                "Create Event"
                            )}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
export default ShareEvent;
