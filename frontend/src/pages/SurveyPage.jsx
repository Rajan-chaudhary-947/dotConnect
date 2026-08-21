import React, { useState } from "react";
import { Plus, Edit, Trash, CheckCircle } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore"; // role: 'admin' or 'user'
import Floator from "../components/Floator.jsx";
import Footer from "../components/Footer.jsx";

const SurveyPage = () => {
    const { authUser } = useAuthStore();
    const [feedbackInput, setFeedbackInput] = useState("");
    const [surveys, setSurveys] = useState([
        {
            id: 1,
            question: "Which technology do you prefer for backend?",
            options: ["Node.js", "Django", "Spring Boot", "Laravel"],
            responses: { "Node.js": 5, "Django": 3, "Spring Boot": 2, "Laravel": 1 },
            active: true,
        },
    ]);
    const [feedbacks, setFeedbacks] = useState([]);
    const [newSurvey, setNewSurvey] = useState({ question: "", options: "" });

    // --- User voting ---
    const handleVote = (id, option) => {
        setSurveys((prev) =>
            prev.map((s) =>
                s.id === id
                    ? {
                        ...s,
                        responses: { ...s.responses, [option]: (s.responses[option] || 0) + 1 },
                    }
                    : s
            )
        );
    };

    const [greet, setGreet] = useState(false);
    // --- Feedback ---
    const handleFeedback = (msg) => {  
        if (!msg.trim()) return;
        setGreet(true);
        setFeedbacks([...feedbacks, { user: authUser.username, msg }]);
    };

    // --- Admin CRUD ---
    const handleCreateSurvey = () => {
        if (!newSurvey.question || !newSurvey.options) return;
        const options = newSurvey.options.split(",").map((o) => o.trim());
        setSurveys([
            ...surveys,
            { id: Date.now(), question: newSurvey.question, options, responses: {}, active: true },
        ]);
        setNewSurvey({ question: "", options: "" });
    };

    const handleDeleteSurvey = (id) => {
        setSurveys(surveys.filter((s) => s.id !== id));
    };

    return (
        <>
            <section className="h-screen bg-base-100 text-base-content pt-24 pb-10">
                <h1 className="text-2xl text-center font-bold mb-4">Survey & Feedback</h1>

                {/* Use a centered narrower container */}
                <div className="max-w-xl mx-auto px-4 space-y-6">
                    {/* Normal User Surveys */}
                    {surveys.map((survey) => (
                        <div key={survey.id} className="card bg-base-200 p-4 shadow-md w-full">
                            <h2 className="font-semibold">{survey.question}</h2>

                            {/* Options */}
                            <div className="mt-2 grid gap-2">
                                {survey.options.map((opt, i) => (
                                    <button
                                        key={i}
                                        onClick={() => handleVote(survey.id, opt)}
                                        className="btn btn-sm btn-outline justify-between"
                                    >
                                        {opt}
                                        <span className="badge">{survey.responses[opt] || 0}</span>
                                    </button>
                                ))}
                            </div>

                            {/* Admin Controls */}
                            {authUser.role === "admin" && (
                                <div className="flex gap-2 mt-3">
                                    <button
                                        onClick={() => handleDeleteSurvey(survey.id)}
                                        className="btn btn-xs btn-error"
                                    >
                                        <Trash className="w-4 h-4" /> Delete
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}

                    {/* Feedback Section */}
                    <div className="bg-base-200 p-4 rounded-md w-full">
                        <h2 className="font-semibold">Share your feedback</h2>
                        <textarea
                            placeholder="Write your feedback..."
                            className="textarea textarea-bordered w-full mt-2"
                            rows="3"
                            value={feedbackInput}
                            onChange={(e) => setFeedbackInput(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleFeedback(e.target.value)}
                        ></textarea>
                        <button
                            className="btn btn-primary btn-sm mt-2"
                            onClick={() => {
                                handleFeedback(feedbackInput);
                                setFeedbackInput("");
                            }}
                        >
                            Submit Feedback
                        </button>

                        {/* Feedback List */}
                        {greet==true &&(<div className="mt-4 space-y-2">

                                <div className="p-2 bg-base-300 rounded-md">
                                    <span className="font-medium">Thanks!, We'll look after it.</span>
                                </div>

                        </div>)}
                    </div>

                    {/* Admin Create Survey */}
                    {authUser.role === "admin" && (
                        <div className="mt-4 border-t border-base-300 pt-4">
                            <h2 className="font-semibold mb-2">Admin Controls</h2>
                            <input
                                type="text"
                                placeholder="Survey Question"
                                className="input input-bordered w-full mb-2"
                                value={newSurvey.question}
                                onChange={(e) => setNewSurvey({ ...newSurvey, question: e.target.value })}
                            />
                            <input
                                type="text"
                                placeholder="Options (comma separated)"
                                className="input input-bordered w-full mb-2"
                                value={newSurvey.options}
                                onChange={(e) => setNewSurvey({ ...newSurvey, options: e.target.value })}
                            />
                            <button onClick={handleCreateSurvey} className="btn btn-primary btn-sm">
                                <Plus className="w-4 h-4" /> Create Survey
                            </button>
                        </div>
                    )}
                </div>
            </section>
            <Floator />
            <Footer/>
        </>
    );
};

export default SurveyPage;
