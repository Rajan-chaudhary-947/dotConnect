import { useEffect, useRef, useState } from "react";
import { Plus } from "lucide-react";
import SharePost from "./resource/SharePost";
import ShareJob from "./resource/ShareJob";
import ShareEvent from "./resource/ShareEvent";
import ShareResource from "./resource/ShareResource";


function Floator() {

  const [menuOpen, setMenuOpen] = useState(false);
  const [showPostModal, setShowPostModal] = useState(false);
  const [showJobModal, setShowJobModal] = useState(false);
  const [showEventModal, setShowEventModal] = useState(false);
  const [showResourceModal, setShowResourceModal] = useState(false);
  const floatorRef = useRef(null);

  useEffect(() => {
    if (!menuOpen) return;

    const handlePointerDown = (event) => {
      if (floatorRef.current?.contains(event.target)) return;
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

  const toggleMenu = () => {
    setMenuOpen((open) => !open);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handlePost = () => {
    setShowPostModal(true);
    closeMenu();
  };
  const handleJob = () => {
    setShowJobModal(true);
    closeMenu();
  };
  const handleEvent = () => {
    setShowEventModal(true);
    closeMenu();
  };
  const handleResource = () => {
    setShowResourceModal(true);
    closeMenu();
  };

  return (
    <>
      {/* Floating Action Button */}
      <div ref={floatorRef} className="addNew fixed bottom-8 right-5">
        <button
          onClick={toggleMenu}
          className="md:w-14 md:h-14 w-12 h-12 flex items-center justify-center rounded-full bg-primary text-primary-content hover:brightness-90 transition"
          aria-label="Open quick actions"
        >
          <Plus />
        </button>

        {/* Toggle Menu */}
        {menuOpen && (
          <div className="absolute bottom-16 right-0 bg-base-100 rounded-lg border border-base-300 bg-base-100 shadow-xl p-3 text-sm space-y-2">
            <button type="button" onClick={handleEvent} className="block w-full text-left hover:text-primary">Event</button>
            <button type="button" onClick={handleJob} className="block w-full text-left hover:text-primary">Job</button>
            <button type="button" onClick={handlePost} className="block w-full text-left hover:text-primary">Post</button>
            <button type="button" onClick={handleResource} className="block w-full text-left hover:text-primary">Resource</button>
          </div>
        )}
      </div>

      {showPostModal && <SharePost onClose={() => setShowPostModal(false)} />}
      {showJobModal && <ShareJob onClose={() => setShowJobModal(false)} />}
      {showEventModal && <ShareEvent onClose={() => setShowEventModal(false)} />}
      {showResourceModal && <ShareResource onClose={() => setShowResourceModal(false)} />}
    </>
  );
}

export default Floator;
