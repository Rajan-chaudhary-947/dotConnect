import {Link} from "react-router-dom";
import React, { useEffect, useState } from "react";
import { AtSign, Download } from "lucide-react";
import { useNewStore } from "../../store/useNewStore.js";
import Floator from "../../components/Floator.jsx";
import Footer from "../../components/Footer.jsx";
import { getResourceDownloadUrl } from "../../lib/axios.js";

function NotesPage() {
    const [selectedNote, setSelectedNote] = useState(null);
    const { resources, fetchResource, isLoading } = useNewStore();

    useEffect(() => {
        fetchResource("notes");
    }, [fetchResource]);
    const handleDownload = (note) => {
        setSelectedNote(note);
    };

    const handle = () => {
        setSelectedNote(null);
    };
    return (
        <>
            <section className="min-h-screen pt-16 flex flex-col items-center bg-base-100 text-base-content transition-all z-0">
                {/* Container */}
                <div className="w-full max-w-5xl p-4 bg-base-100 border border-base-300">

                    {/* Posts Section */}
                    <div className="mt-6 w-full">
                        <h2 className="font-semibold">Notes</h2>

                        {/* responsive grid: 1 col on mobile, 2 cols on md and up, items wrap */}
                        <div
                            className="mt-2 grid grid-cols-2 md:grid-cols-3 gap-4 auto-rows-min">
                            {isLoading ? <p>Loading notes...</p> : resources.map((note) => (
                                <div
                                    key={note._id}
                                    className="card bg-base-200 border border-base-300 p-3 w-full"
                                >
                                    <div>
                                        <Link
                                            to={`/profile/${note.sharedBy}`}
                                            className="text-sm font-medium link link-hover text-primary"
                                        >
                                            <p className="font-medium flex items-center"><AtSign size={12} />{note.sharedBy}</p>
                                        </Link>

                                    </div>
                                    <p className="text-sm mt-1">{note.title}</p>
                                    <div className="flex justify-end mt-2">

                                        <div className="flex gap-2">
                                            <a href={getResourceDownloadUrl(note._id)} className="w-6 h-6 border border-base-300 rounded-sm" aria-label="Download note"><Download size={20} /></a>
                                            <a href={note.fileUrl} target="_blank" rel="noreferrer" className="text-xs text-primary">View</a>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
            <Floator />
        </>
    );
}
export default NotesPage;