import { useEffect, useRef, useState } from "react";
import { Bell } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";
import { toTitleCase } from "../lib/utils.js";
import toast from "react-hot-toast";

function Notification() {
  const { authUser, notifications, unreadNotifications, markNotificationsAsRead } = useAuthStore();
  const [menuOpen, setMenuOpen] = useState(false);
  const notificationRef = useRef(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (!menuOpen) return;

    const handlePointerDown = (event) => {
      if (notificationRef.current?.contains(event.target)) return;
      setMenuOpen(false);
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  if (!authUser) return null;

  const toggleMenu = () => {
    const nextOpen = !menuOpen;
    setMenuOpen(nextOpen);
  };

  const getNotificationText = (notification) => {
    const notifierName = toTitleCase(notification.sender?.fullName || "someone");

    if (notification.type === "connection_request") {
      
      return `${notifierName} sent you a connection request`;
    }

    if (notification.type === "connection_accepted") {
      return `${notifierName} accepted your connection request`;
    }

    if (notification.type === "message") {
      return `${notifierName} sent you a message`;
    }

    return "You have a new notification";
  };

  const handleNotificationClick = async (notification) => {
    const notifierUserId = notification.sender?.userId;
    setMenuOpen(false);
    if (!notifierUserId) {
      toast.error("Can't Fetch Notifier");
      return;
    }
    navigate(`/profile/${notifierUserId}`);
    await markNotificationsAsRead();
  };

  return (
    <>
      <div ref={notificationRef} className="relative">
        {menuOpen && (
          <div className="absolute right-0 top-full mt-3 w-80 max-w-[calc(100vw-2rem)] overflow-hidden rounded-lg border border-base-300 bg-base-100 shadow-xl z-50">
            <div className="border-b border-base-300 px-4 py-3">
              <h2 className="font-semibold">Notifications</h2>
            </div>

            <div className="max-h-80 overflow-y-auto">
              {notifications.length > 0 ? (
                notifications.map((notification) => (
                  <div onClick={() => handleNotificationClick(notification)} key={notification._id} className="border-b border-base-200 px-4 py-3 last:border-b-0 cursor-pointer hover:bg-base-200 transition">
                    <p className="text-sm font-medium">{getNotificationText(notification)}</p>
                    <p className="mt-1 text-xs text-zinc-500">
                      {notification.createdAt
                        ? new Date(notification.createdAt).toLocaleString()
                        : "Just now"}
                    </p>
                  </div>
                ))
              ) : (
                <p className="px-4 py-6 text-center text-sm text-zinc-500">
                  No notifications yet
                </p>
              )}
            </div>
          </div>
        )}

        <div className="tooltip tooltip-bottom" data-tip="Notifications">
          <button
            onClick={toggleMenu}
            className="btn btn-sm gap-2 relative"
            aria-label="Open notifications"
          >
            <Bell className="size-4" />
            <span className="hidden lg:inline">Notifications</span>
            {unreadNotifications > 0 && (
              <span className="absolute -top-2 -right-2 flex min-w-5 h-5 items-center justify-center rounded-full bg-error px-1 text-xs font-bold text-error-content z-50">
                {unreadNotifications > 9 ? "9+" : unreadNotifications}
              </span>
            )}
          </button>
        </div>
      </div>
    </>
  );
}

export default Notification;
