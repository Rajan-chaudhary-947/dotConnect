import React, { useEffect } from "react";
import { useNewStore } from "../store/useNewStore.js";
import { useAuthStore } from "../store/useAuthStore.js";
import toast from "react-hot-toast";
import Floator from "../components/Floator.jsx";
import Footer from "../components/Footer.jsx";
import { Calendar, MapPin, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

function EventPage() {
  const { events, isLoading, fetchEvents, deleteEvent, isDeletingEvent } = useNewStore();
  const { authUser } = useAuthStore();

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const handleDeleteEvent = async (eventId) => {
    if (!eventId) return;

    try {
      await deleteEvent(eventId);
      toast.success("Event deleted");
    } catch (error) {
      toast.error(error.message || "Failed to delete event");
    }
  };

  return (
    <>
      <section className="min-h-screen bg-base-100 text-base-content pt-24 pb-10 transition-all">
        <div className="container mx-auto px-4 max-w-5xl">
          {/* Page Header */}
          <h1 className="text-3xl mb-6 text-center">Upcoming Events</h1>

          {/* Events Grid */}
          <div className="grid gap-8 md:grid-cols-2">
            {Array.isArray(events) && events.map((event) => (
              <div
                key={event._id}
                className="card relative group bg-base-200 border border-base-300 overflow-hidden"
              >
                {/* Banner */}
                <figure>
                  <img
                    src={event.bannerLink}
                    alt={event.title}
                    className="w-full h-48 object-cover"
                  />
                </figure>
                {/* Delete Button for Event Owner */}
                {authUser?.userId === event.sharedBy && (
                  <div className="absolute right-3 top-3 opacity-0 transition-opacity group-hover:opacity-100">
                    <button
                      type="button"
                      className="btn btn-ghost btn-xs text-error"
                      onClick={() => handleDeleteEvent(event._id)}
                      disabled={isDeletingEvent}
                      aria-label="Delete event"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                )}

                {/* Details */}
                <div className="card-body">
                  <h2 className="card-title">{event.title}</h2>
                  <p className="text-sm opacity-70">
                    Organized by{" "}
                    <span className="font-semibold">{event.organizer}</span>
                  </p>
                  <p className="text-sm mt-1">
                    <Calendar size={18} className="inline-block mr-2" />
                    {new Date(event.dateAndTime).toLocaleString()} <br />
                    <MapPin size={18} className="inline-block mr-2" />
                    {event.location}
                  </p>
                  <p className="mt-2">{event.description}</p>

                  <div className="card-footer m-3 mt-0 flex items-center justify-between gap-3 border-t border-base-300 pt-3">
                    <Link
                      to={`/profile/${event.sharedBy}`}
                      className="text-sm italic opacity-70 hover:opacity-100 transition-opacity"
                    >
                      Posted by <span className="font-semibold cursor-pointer">{event.sharedBy}</span>
                    </Link>
                    <div className="flex gap-2">
                      <a
                        href={event.registrationLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-sm btn-primary"
                      >
                        Register
                      </a>
                      <button
                        onClick={() => toast("This feature is coming soon!")}
                        className="btn btn-sm btn-outline"
                      >
                        Share
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Floator />
      <Footer />
    </>
  );
}

export default EventPage;
