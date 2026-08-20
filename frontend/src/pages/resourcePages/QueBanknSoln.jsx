import { QueBanknSolns } from "../../constants/index.js";
import Footer from "../../components/Footer.jsx";
import Floator from "../../components/Floator.jsx";
import { AtSign, Download } from "lucide-react";

function QueBanknSoln() {
    return (
        <>
            <section className="min-h-screen pt-16 flex flex-col items-center bg-base-100 text-base-content transition-all z-0">
                {/* Container */}
                <div className="w-full max-w-5xl p-4 bg-base-100 border border-base-300">

                    {/* Posts Section */}
                    <div className="mt-6 w-full">
                        <h2 className="font-semibold">Question Banks & Solutions</h2>

                        {/* responsive grid: 1 col on mobile, 2 cols on md and up, items wrap */}
                        <div
                            className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-min">
                            {QueBanknSolns.map((QueBanknSoln) => (
                                <div
                                    key={QueBanknSoln.id}
                                    className="card bg-base-200 border border-base-300 p-3 w-full"
                                >
                                    <p className="font-small flex items-center"><AtSign size={12} />{QueBanknSoln.sharedBy}</p>
                                    <p className="text-sm mt-1">{QueBanknSoln.subject}</p>
                                    <div className="flex justify-between mt-2">
                                        <div className="flex gap-2">
                                            <p className="text-sm mt-1">Question Bank</p>
                                            <button className="text-xs text-primary">View</button>
                                            <button className="w-6 h-6 border border-base-300 rounded-sm"><Download size={18} /></button>
                                        </div>
                                        <div className="flex gap-2">
                                            <p className="text-sm mt-1">Solution</p>
                                            <button className="text-xs text-primary">View</button>
                                            <button className="w-6 h-6 border border-base-300 rounded-sm" ><Download size={20} /></button>
                                            
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

export default QueBanknSoln;