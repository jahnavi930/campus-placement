
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Plus,
  Briefcase,
  MapPin,
  Edit3,
  ArrowUpRight,
  XCircle,
} from "lucide-react";

import RecruiterSidebar from "../../components/recruiter/RecruiterSidebar";

const MyJobs = () => {
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // ================= FETCH MY JOBS =================

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          "http://localhost:5000/api/jobs",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch jobs");
        }

        const data = await response.json();

        setJobs(data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="min-h-screen bg-[#030b1c] text-white overflow-hidden relative">

      {/* ================= BACKGROUND ================= */}

      <div className="absolute inset-0 overflow-hidden pointer-events-none">

        <div
          className="absolute w-[500px] h-[500px]
          bg-blue-600/10 rounded-full blur-3xl
          -top-40 -left-40 animate-pulse"
        />

        <div
          className="absolute w-[450px] h-[450px]
          bg-indigo-500/10 rounded-full blur-3xl
          top-1/2 right-[-200px] animate-pulse"
        />

        <div
          className="absolute w-[350px] h-[350px]
          bg-cyan-500/5 rounded-full blur-3xl
          bottom-[-150px] left-1/3"
        />

        <div
          className="absolute top-24 left-[35%]
          w-2 h-2 bg-blue-400 rounded-full animate-ping"
        />

        <div
          className="absolute top-[70%] left-[45%]
          w-1.5 h-1.5 bg-indigo-400
          rounded-full animate-ping"
        />

        <div
          className="absolute top-[35%] right-[20%]
          w-2 h-2 bg-cyan-400
          rounded-full animate-ping"
        />

      </div>

      {/* ================= SIDEBAR ================= */}

      <RecruiterSidebar />

      {/* ================= MAIN ================= */}

      <main className="relative ml-64 min-h-screen px-10 py-8">

        {/* ================= HEADER ================= */}

        <div
          className="flex justify-between items-center mb-8
          animate-[fadeIn_0.7s_ease-out]"
        >

          <div>

            <p className="text-blue-400 text-sm mb-2">
              Recruiter
            </p>

            <h1 className="text-3xl font-bold tracking-tight">
              My Jobs
            </h1>

            <p className="text-gray-500 text-sm mt-1">
              Manage your posted opportunities.
            </p>

          </div>

          {/* POST JOB */}

          <button
            onClick={() => navigate("/recruiter/post-job")}
            className="flex items-center gap-2
            px-4 py-2.5
            rounded-xl
            bg-blue-600
            hover:bg-blue-500
            text-sm
            font-medium
            shadow-[0_0_25px_rgba(37,99,235,0.2)]
            hover:shadow-[0_0_35px_rgba(37,99,235,0.35)]
            hover:-translate-y-0.5
            transition-all duration-300"
          >
            <Plus size={17} />
            Post a Job
          </button>

        </div>

        {/* ================= JOB COUNT ================= */}

        {!loading && (
          <div
            className="flex items-center gap-2 mb-5
            text-gray-500 text-sm"
          >
            <Briefcase
              size={15}
              className="text-blue-400"
            />

            <span>
              {jobs.length} posted opportunities
            </span>
          </div>
        )}

        {/* ================= LOADING ================= */}

        {loading && (
          <div className="flex justify-center py-20">

            <p className="text-gray-500 text-sm">
              Loading your jobs...
            </p>

          </div>
        )}

        {/* ================= NO JOBS ================= */}

        {!loading && jobs.length === 0 && (
          <div
            className="bg-white/[0.035]
            backdrop-blur-xl
            border border-white/[0.07]
            rounded-2xl
            p-12
            text-center"
          >

            <Briefcase
              size={35}
              className="text-gray-600
              mx-auto mb-4"
            />

            <h2 className="text-lg font-semibold">
              No jobs posted yet
            </h2>

            <p className="text-gray-500 text-sm mt-2">
              Start by posting your first job opportunity.
            </p>

            <button
              onClick={() => navigate("/recruiter/post-job")}
              className="mt-5
              px-4 py-2
              rounded-lg
              bg-blue-600
              hover:bg-blue-500
              text-sm
              transition-all"
            >
              Post a Job
            </button>

          </div>
        )}

        {/* ================= JOB LIST ================= */}

        {!loading && jobs.length > 0 && (

          <div className="space-y-4">

            {jobs.map((job, index) => (

              <div
                key={job._id}
                className="group
                bg-white/[0.035]
                backdrop-blur-xl
                border border-white/[0.07]
                rounded-2xl
                p-5
                hover:bg-white/[0.055]
                hover:border-blue-400/20
                hover:-translate-y-1
                transition-all duration-300
                animate-[slideUp_0.5s_ease-out]"
                style={{
                  animationDelay: `${index * 0.12}s`,
                }}
              >

                {/* ================= TOP ================= */}

                <div className="flex justify-between items-start">

                  <div>

                    <h2
                      className="text-lg font-semibold
                      group-hover:text-blue-300
                      transition-colors duration-300"
                    >
                      {job.title}
                    </h2>

                    <p className="text-gray-500 text-sm mt-1">
                      {job.company}
                    </p>

                  </div>

                  <span
                    className="px-2.5 py-1
                    rounded-full
                    bg-green-500/10
                    border border-green-500/10
                    text-green-400
                    text-xs"
                  >
                    ● Open
                  </span>

                </div>

                {/* ================= DETAILS ================= */}

                <div
                  className="flex flex-wrap items-center
                  gap-x-6 gap-y-2
                  mt-4
                  text-gray-500
                  text-xs"
                >

                  <div className="flex items-center gap-1.5">

                    <MapPin
                      size={14}
                      className="text-blue-400"
                    />

                    {job.location}

                  </div>

                  <div className="flex items-center gap-1.5">

                    <Briefcase
                      size={14}
                      className="text-indigo-400"
                    />

                    Job Opportunity

                  </div>

                </div>

                {/* ================= DESCRIPTION ================= */}

                <p
                  className="text-gray-500
                  text-sm
                  mt-4
                  line-clamp-2"
                >
                  {job.description}
                </p>

                {/* ================= BOTTOM ================= */}

                <div
                  className="flex justify-between
                  items-center
                  mt-5 pt-4
                  border-t border-white/[0.06]"
                >

                  <p className="text-gray-600 text-xs">

                    Posted{" "}

                    {job.createdAt
                      ? new Date(
                          job.createdAt
                        ).toLocaleDateString()
                      : "Recently"}

                  </p>

                  <div className="flex items-center gap-2">

                    {/* EDIT */}

                    <button
                      className="flex items-center gap-1.5
                      px-3 py-2
                      rounded-lg
                      text-xs
                      text-gray-400
                      hover:text-white
                      hover:bg-white/[0.06]
                      transition-all duration-300"
                    >

                      <Edit3 size={14} />

                      Edit

                    </button>

                    {/* CLOSE */}

                    <button
                      className="flex items-center gap-1.5
                      px-3 py-2
                      rounded-lg
                      text-xs
                      text-gray-400
                      hover:text-red-400
                      hover:bg-red-500/[0.05]
                      transition-all duration-300"
                    >

                      <XCircle size={14} />

                      Close

                    </button>

                    {/* VIEW APPLICATIONS */}

                    <button
                      onClick={() =>
                        navigate(
                          "/recruiter/applications"
                        )
                      }
                      className="flex items-center gap-1.5
                      px-3 py-2
                      rounded-lg
                      text-xs
                      text-blue-400
                      hover:text-blue-300
                      hover:bg-blue-500/[0.06]
                      transition-all duration-300"
                    >

                      View Applications

                      <ArrowUpRight size={14} />

                    </button>

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </main>

      {/* ================= ANIMATIONS ================= */}

      <style>{`

        @keyframes fadeIn {

          from {
            opacity: 0;
            transform: translateY(-15px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }

        }

        @keyframes slideUp {

          from {
            opacity: 0;
            transform: translateY(20px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }

        }

      `}</style>

    </div>
  );
};

export default MyJobs;
