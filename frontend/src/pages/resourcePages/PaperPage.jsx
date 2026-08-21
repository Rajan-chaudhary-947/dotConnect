import { useEffect } from "react";
import { AtSign, Download } from "lucide-react";
import { Link } from "react-router-dom";
import { useNewStore } from "../../store/useNewStore.js";
import Floator from "../../components/Floator.jsx";
import Footer from "../../components/Footer.jsx";
import { getResourceDownloadUrl } from "../../lib/axios.js";

function PaperPage() {
  const { resources: papers, fetchResource, isLoading } = useNewStore();

    useEffect(() => {
      fetchResource("pyq");
    }, [fetchResource]);

    return (
      <>
        <section className="min-h-screen pt-16 flex flex-col items-center bg-base-100 text-base-content transition-all z-0">
          <div className="w-full max-w-5xl p-4 bg-base-100 border border-base-300">
            <div className="mt-6 w-full">
              <h2 className="font-semibold">Previous Year Papers</h2>

              <div className="mt-2 grid grid-cols-2 md:grid-cols-3 gap-4 auto-rows-min">
                {isLoading ? (
                  <p>Loading papers...</p>
                ) : papers.length === 0 ? (
                  <p className="text-sm text-base-content/70">No papers found.</p>
                ) : (
                  papers.map((paper) => (
                    <div
                      key={paper._id}
                      className="card bg-base-200 border border-base-300 p-3 w-full"
                    >
                      <Link
                        to={`/profile/${paper.sharedBy}`}
                        className="text-sm font-medium link link-hover text-primary"
                      >
                        <p className="font-medium flex items-center">
                          <AtSign size={12} />
                          {paper.sharedBy}
                        </p>
                      </Link>

                      <p className="text-sm mt-1">{paper.title}</p>

                      <div className="flex justify-end gap-2 mt-2">
                        <a
                          href={getResourceDownloadUrl(paper._id)}
                          className="w-6 h-6 border border-base-300 rounded-sm"
                          aria-label="Download paper"
                        >
                          <Download size={20} />
                        </a>
                        <a
                          href={paper.fileUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-xs text-primary"
                        >
                          View
                        </a>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </section>
        <Footer />
        <Floator />
      </>
    );
}

export default PaperPage;
