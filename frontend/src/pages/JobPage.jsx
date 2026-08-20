import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Floator from "../components/Floator.jsx";
import Footer from "../components/Footer.jsx";
import toast from "react-hot-toast";
import { Trash2 } from "lucide-react";
import { useNewStore } from "../store/useNewStore.js";
import { useAuthStore } from "../store/useAuthStore.js";

function JobPage() {
  const { jobs, isLoading, fetchJob, deleteJob, isDeletingJob } = useNewStore();
  const { authUser } = useAuthStore();
  const [roleFilter, setRoleFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");

  useEffect(() => {
    fetchJob();
  }, []);

  const handleDeleteJob = async (jobId) => {
    if (!jobId) return;

    try {
      await deleteJob(jobId);
      toast.success("Job deleted");
    } catch (error) {
      toast.error(error.message || "Failed to delete job");
    }
  };

  const jobsList = Array.isArray(jobs) ? jobs : [];
  const roles = [...new Set(jobsList.map((job) => job.role))].filter(Boolean);
  const locations = [...new Set(jobsList.map((job) => job.location))].filter(Boolean);
  const types = ["Full-time", "Part-time", "Internship", "Contract", "Freelance"];

  const filteredJobs = jobsList.filter((job) => {
    return (
      (roleFilter ? job.role === roleFilter : true) &&
      (locationFilter ? job.location === locationFilter : true) &&
      (typeFilter ? job.type === typeFilter : true)
    );
  });

  return (
    <>
      <section className="min-h-screen bg-base-100 text-base-content pt-24 pb-10 transition-all">
        <div className="container mx-auto px-4 max-w-5xl">
          {/* Page Header */}
          <h1 className="text-3xl mb-6 text-center">Latest Job Postings</h1>

          {/* Filters */}
          <div className="flex flex-wrap gap-4 justify-center mb-8">
            <select
              className="select select-bordered"
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
            >
              <option value="">All Roles</option>
              {roles.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>

            <select
              className="select select-bordered"
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
            >
              <option value="">All Locations</option>
              {locations.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>

            <select
              className="select select-bordered"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option value="">All Types</option>
              {types.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>

            <button
              onClick={() => {
                setRoleFilter("");
                setLocationFilter("");
                setTypeFilter("");
              }}
              className="btn btn-outline btn-sm"
            >
              Clear Filters
            </button>
          </div>

          {/* Jobs Grid */}
          {isLoading ? (
            <p className="text-center opacity-70">Loading jobs...</p>
          ) : filteredJobs.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2">
              {filteredJobs.map((job) => (
                <div
                  key={job._id}
                  className="card group bg-base-200 border border-base-300"
                >
                  <div className="card-body">
                    <div className="flex items-center justify-between">
                      <h2 className="card-title">{job.role}</h2>
                      {authUser.userId === job.postedBy && (
                        <div className="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                          <button
                            type="button"
                            className="btn btn-ghost btn-xs text-error"
                            onClick={() => handleDeleteJob(job._id)}
                            disabled={isDeletingJob}
                            aria-label="Delete job"
                          >
                            <Trash2 className="size-4" />
                          </button>
                        </div>
                      )}
                    </div>
                    <p className="text-sm opacity-70">
                      Company: <span>{job.company}</span>
                    </p>
                    <p className="text-sm">📍 {job.location}</p>
                    <p className="text-sm">💼 Type: {job.type}</p>
                    <p className="mt-2">{job.description}</p>
                  </div>

                  <div className="card-footer m-3 mt-0 flex items-center justify-between border-t border-base-300 pt-3">
                    <Link 
                      to={`/profile/${job.postedBy}`}
                      className="text-sm italic opacity-70 hover:opacity-100 transition-opacity"
                    >
                      Posted by <span className="font-semibold cursor-pointer">{job.postedBy}</span>
                    </Link>
                    <div className="flex gap-2">
                      <a
                        href={job.applyLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-sm btn-primary"
                      >
                        Apply Now
                      </a>
                      <button 
                        onClick={() => toast("This feature is coming soon!")} 
                        className="btn btn-sm btn-outline"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center opacity-70">
              No jobs match your filters.
            </p>
          )}
        </div>
      </section>
      <Floator/>
      <Footer/>
    </>
  );
}

export default JobPage;
