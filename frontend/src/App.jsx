import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";

import { useAuthStore } from "./store/useAuthStore";
import { useThemeStore } from "./store/useThemeStore";

import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";
import EventPage from "./pages/EventPage";
import JobPage from "./pages/JobPage";
import SurveyPage from "./pages/SurveyPage";
import ChatPage from "./pages/ChatPage";
import NotesPage from "./pages/resourcePages/NotesPage";
import SyllabusPage from "./pages/resourcePages/SyllabusPage";
import QueBanknSoln from "./pages/resourcePages/QueBanknSoln";
import PaperPage from "./pages/resourcePages/PaperPage";
import VerifyEmail from "./components/VerifyEmail";

const App = () => {
  const { authUser, checkAuth, isCheckingAuth, pendingVerificationEmail } = useAuthStore();
  const { theme } = useThemeStore();


  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );

  return (
    <div data-theme={theme}>
      <Navbar />
      <Routes>
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/verify-email" element={pendingVerificationEmail ? <VerifyEmail /> : <Navigate to="/login" />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
        <Route path="/profile/:userId" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
        <Route path="/home" element={authUser ? <HomePage/> : <Navigate to="/login"/>} />
        <Route path="/event" element={authUser ? <EventPage/> : <Navigate to="/login"/>} />
        <Route path="/job" element={authUser ? <JobPage/> : <Navigate to="/login"/>} />
        <Route path="/survey" element={authUser ? <SurveyPage/> : <Navigate to="/login"/>} />
        <Route path="/chat" element={authUser ? <ChatPage/> : <Navigate to="/login"/>} />
        <Route path="/resources/notes" element={authUser ? <NotesPage/> : <Navigate to="/login"/>} />
        <Route path="/resources/syllabus" element={authUser ? <SyllabusPage/> : <Navigate to="/login"/>}/>
        <Route path="/resources/queBanknSoln" element= {authUser ? <QueBanknSoln/> : <Navigate to="/login"/>}/>
        <Route path="/resources/papers" element= {authUser ? <PaperPage/> : <Navigate to="/login"/>}/>
      </Routes>
      <Toaster />
    </div>
  );
};
export default App;
