import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import Notification from "./Notification";
import {
  LogOut,
  MessageSquare,
  Settings,
  User,
  Menu,
  Calendar,
  Briefcase,
  FormInput,
  MessageCircle,
} from "lucide-react";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  return (
    <header className="bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 backdrop-blur-lg bg-base-100/80">
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">

          {/* LEFT — Brand */}
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition">
            <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-primary" />
            </div>
            <h1 className="text-lg font-bold">dotConnect</h1>
          </Link>

          {/* CENTER — Main Nav (md+) */}
          {authUser && (
            <div className="hidden sm:flex items-center gap-1">
              <div className="tooltip tooltip-bottom" data-tip="Chat">
                <Link to="/chat" className="btn btn-sm gap-2">
                  <MessageCircle className="size-4" />
                  <span className="hidden lg:inline">Chat</span>
                </Link>
              </div>

              <Notification />

              <div className="tooltip tooltip-bottom" data-tip="Event">
                <Link to="/event" className="btn btn-sm gap-2" >
                  <Calendar className="size-4" />
                  <span className="hidden md:inline">Event</span>
                </Link>
              </div>

              <div className="tooltip tooltip-bottom" data-tip="Job">
                <Link to="/job" className="btn btn-sm gap-2">
                  <Briefcase className="size-4" />
                  <span className="hidden md:inline">Job</span>
                </Link>
              </div>

              {/* Resources */}
              <div className="tooltip tooltip-bottom" data-tip="Resources">
                <div className="dropdown dropdown-end">
                  <label tabIndex={0} className="btn btn-sm gap-2">
                    <MessageSquare className="size-4" />
                    <span className="hidden md:inline">Resources</span>
                  </label>
                  <ul
                    tabIndex={0}
                    className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-46 mt-2 z-50"
                  >
                    <li><Link to="/resources/notes">Notes</Link></li>
                    <li><Link to="/resources/syllabus">Syllabus</Link></li>
                    <li><Link to="/resources/papers">Paper</Link></li>
                    <li><Link to="/resources/queBanknSoln">QueBank & Soln</Link></li>
                  </ul>
                </div>
              </div>

              <div className="tooltip tooltip-bottom" data-tip="Survey">
                <Link to="/survey" className="btn btn-sm gap-2">
                  <FormInput className="size-4" />
                  <span className="hidden md:inline">Survey</span>
                </Link>
              </div>
            </div>
          )}

          {/* RIGHT — Account Menu (ALL sizes) */}
          {authUser && (
            <div className="absolute right-4 -translate-x-1/2 sm:hidden flex items-center gap-1">
              <div className="tooltip tooltip-bottom" data-tip="Chat">
                <Link to="/chat" className="btn btn-sm">
                  <MessageCircle className="size-5" />
                </Link>
              </div>
              <Notification />
            </div>
          )}

          {authUser && (
            <div className="hidden sm:block dropdown dropdown-end">
              <div className="tooltip tooltip-bottom" data-tip="Account">
                <label tabIndex={0} className="btn btn-sm gap-2">
                  <User className="size-4" />
                  <span className="hidden lg:inline">Account</span>
                </label>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 p-2 shadow
                bg-base-100 rounded-box w-44 z-50"
              >
                <li><Link to="/profile">Profile</Link></li>
                <li><Link to="/settings">Settings</Link></li>
                <div className="divider my-1" />
                <li>
                  <button onClick={logout} className="text-error">
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}

          {/* MOBILE — Full Menu */}
          <div className="sm:hidden dropdown dropdown-end">
            <div className="tooltip tooltip-bottom" data-tip="Menu">
              <label tabIndex={0} className="btn btn-ghost btn-sm">
                <Menu className="size-5" />
              </label>
            </div>
            <ul className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-50 z-50">
              <li><Link to="/event">Event</Link></li>
              <li><Link to="/job">Job</Link></li>

              <li className="menu-title">Resources</li>
              <li className="ml-2"><Link to="/resources/notes">Notes</Link></li>
              <li className="ml-2"><Link to="/resources/syllabus">Syllabus</Link></li>
              <li className="ml-2"><Link to="/resources/papers">Paper</Link></li>
              <li className="ml-2"><Link to="/resources/queBanknSoln">QueBank & Soln</Link></li>

              <li><Link to="/survey">Survey</Link></li>
              <div className="divider my-1" />
              <li><Link to="/profile">Profile</Link></li>
              <li><Link to="/settings">Settings</Link></li>
              <li><button onClick={logout}>Logout</button></li>
            </ul>
          </div>

        </div>
      </div>
    </header>
  );
};

export default Navbar;
