
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Briefcase,
  Users,
  Clock3,
  UserCheck,
  UserX,
  ArrowUpRight,
  Plus,
} from "lucide-react";

import RecruiterSidebar from "../../components/recruiter/RecruiterSidebar";

const RecruiterDashboard = () => {

  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);

  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    shortlisted: 0,
    rejected: 0,
  });

  // =====================================================
  // FETCH RECRUITER JOBS
  // =====================================================

  useEffect(() => {

    const fetchJobs = async () => {

      try {

        const token =
          localStorage.getItem("token");

        const response = await fetch(
          "http://localhost:5000/api/jobs",
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(
            "Failed to fetch jobs"
          );
        }

        const data =
          await response.json();

        setJobs(data);

      } catch (error) {

        console.error(
          "Error fetching jobs:",
          error
        );

      }

    };

    fetchJobs();

  }, []);


  // =====================================================
  // FETCH APPLICATION STATISTICS
  // =====================================================

  useEffect(() => {

    const fetchStats = async () => {

      try {

        const token =
          localStorage.getItem("token");

        if (!token) {
          return;
        }

        const response = await fetch(
          "http://localhost:5000/api/applications/recruiter/stats",
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

        const data =
          await response.json();

        if (!response.ok) {

          console.error(
            data.message
          );

          return;
        }

        setStats(data);

      } catch (error) {

        console.error(
          "Error fetching application stats:",
          error
        );

      }

    };

    fetchStats();

  }, []);


  // =====================================================
  // RECENT JOBS
  // =====================================================

  const recentJobs =
    jobs.slice(0, 2);


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
          className="flex justify-between items-center mb-10
          animate-[fadeIn_0.8s_ease-out]"
        >

          <div>

            <p className="text-blue-400 text-sm mb-2">
              Recruiter Dashboard
            </p>

            <h1 className="text-4xl font-bold tracking-tight">
              Welcome back 👋
            </h1>

            <p className="text-gray-400 mt-2">
              Manage your jobs and discover talented students.
            </p>

          </div>


          <button
            onClick={() =>
              navigate("/recruiter/post-job")
            }
            className="flex items-center gap-2
            px-5 py-3 rounded-xl
            bg-blue-600 hover:bg-blue-500
            shadow-[0_0_25px_rgba(37,99,235,0.25)]
            hover:shadow-[0_0_35px_rgba(37,99,235,0.4)]
            transition-all duration-300
            hover:-translate-y-1"
          >

            <Plus size={19} />

            Post a Job

          </button>

        </div>


        {/* ================= STAT CARDS ================= */}

        <div className="grid grid-cols-6 gap-4 mb-10">


          {/* TOTAL JOBS */}

          <div className="group bg-white/[0.035] backdrop-blur-xl border border-white/[0.07] rounded-xl p-4 hover:bg-white/[0.06] hover:border-blue-400/20 hover:-translate-y-1 transition-all duration-300">

            <div className="flex justify-between items-start">

              <div>

                <p className="text-gray-400 text-xs">
                  Total Jobs
                </p>

                <h2 className="text-2xl font-bold mt-2">
                  {jobs.length}
                </h2>

                <p className="text-[11px] text-gray-500 mt-1">
                  Posted
                </p>

              </div>

              <Briefcase
                size={18}
                className="text-blue-400"
              />

            </div>

          </div>


          {/* APPLICATIONS */}

          <div className="group bg-white/[0.035] backdrop-blur-xl border border-white/[0.07] rounded-xl p-4 hover:bg-white/[0.06] hover:border-indigo-400/20 hover:-translate-y-1 transition-all duration-300">

            <div className="flex justify-between items-start">

              <div>

                <p className="text-gray-400 text-xs">
                  Applications
                </p>

                <h2 className="text-2xl font-bold mt-2">
                  {stats.total}
                </h2>

                <p className="text-[11px] text-gray-500 mt-1">
                  Received
                </p>

              </div>

              <Users
                size={18}
                className="text-indigo-400"
              />

            </div>

          </div>


          {/* PENDING */}

          <div className="group bg-white/[0.035] backdrop-blur-xl border border-white/[0.07] rounded-xl p-4 hover:bg-white/[0.06] hover:border-yellow-400/20 hover:-translate-y-1 transition-all duration-300">

            <div className="flex justify-between items-start">

              <div>

                <p className="text-gray-400 text-xs">
                  Pending
                </p>

                <h2 className="text-2xl font-bold mt-2">
                  {stats.pending}
                </h2>

                <p className="text-[11px] text-gray-500 mt-1">
                  To review
                </p>

              </div>

              <Clock3
                size={18}
                className="text-yellow-400"
              />

            </div>

          </div>


          {/* SHORTLISTED */}

          <div className="group bg-white/[0.035] backdrop-blur-xl border border-white/[0.07] rounded-xl p-4 hover:bg-white/[0.06] hover:border-blue-400/20 hover:-translate-y-1 transition-all duration-300">

            <div className="flex justify-between items-start">

              <div>

                <p className="text-gray-400 text-xs">
                  Shortlisted
                </p>

                <h2 className="text-2xl font-bold mt-2">
                  {stats.shortlisted}
                </h2>

                <p className="text-[11px] text-gray-500 mt-1">
                  Candidates
                </p>

              </div>

              <UserCheck
                size={18}
                className="text-blue-400"
              />

            </div>

          </div>


          {/* SELECTED */}

          <div className="group bg-white/[0.035] backdrop-blur-xl border border-white/[0.07] rounded-xl p-4 hover:bg-white/[0.06] hover:border-green-400/20 hover:-translate-y-1 transition-all duration-300">

            <div className="flex justify-between items-start">

              <div>

                <p className="text-gray-400 text-xs">
                  Selected
                </p>

                <h2 className="text-2xl font-bold mt-2">
                  0
                </h2>

                <p className="text-[11px] text-gray-500 mt-1">
                  Candidates
                </p>

              </div>

              <UserCheck
                size={18}
                className="text-green-400"
              />

            </div>

          </div>


          {/* REJECTED */}

          <div className="group bg-white/[0.035] backdrop-blur-xl border border-white/[0.07] rounded-xl p-4 hover:bg-white/[0.06] hover:border-red-400/20 hover:-translate-y-1 transition-all duration-300">

            <div className="flex justify-between items-start">

              <div>

                <p className="text-gray-400 text-xs">
                  Rejected
                </p>

                <h2 className="text-2xl font-bold mt-2">
                  {stats.rejected}
                </h2>

                <p className="text-[11px] text-gray-500 mt-1">
                  Candidates
                </p>

              </div>

              <UserX
                size={18}
                className="text-red-400"
              />

            </div>

          </div>

        </div>


        {/* ================= RECENT JOBS ================= */}

        <div
          className="bg-white/[0.035]
          backdrop-blur-xl
          border border-white/[0.07]
          rounded-2xl p-7
          animate-[slideUp_1.2s_ease-out]"
        >

          <div className="flex justify-between items-center mb-7">

            <div>

              <h2 className="text-xl font-semibold">
                Recent Jobs
              </h2>

              <p className="text-gray-500 text-sm mt-1">
                Manage your recently posted opportunities
              </p>

            </div>

            <button
              onClick={() =>
                navigate("/recruiter/jobs")
              }
              className="flex items-center gap-1
              text-sm text-blue-400
              hover:text-blue-300
              transition-all duration-300
              hover:translate-x-1"
            >

              View all

              <ArrowUpRight size={16} />

            </button>

          </div>


          {/* ================= JOB LIST ================= */}

          {recentJobs.length === 0 ? (

            <div className="py-12 text-center">

              <Briefcase
                size={32}
                className="text-gray-600 mx-auto mb-3"
              />

              <p className="text-gray-500 text-sm">
                No jobs posted yet.
              </p>

              <button
                onClick={() =>
                  navigate("/recruiter/post-job")
                }
                className="mt-4 px-4 py-2
                bg-blue-600 hover:bg-blue-500
                rounded-lg text-sm transition"
              >
                Post your first job
              </button>

            </div>

          ) : (

            <div className="space-y-4">

              {recentJobs.map((job) => (

                <div
                  key={job._id}
                  className="group
                  border border-white/[0.07]
                  bg-white/[0.02]
                  rounded-xl p-5
                  hover:bg-white/[0.05]
                  hover:border-blue-400/20
                  transition-all duration-300
                  hover:-translate-y-1"
                >

                  <div className="flex justify-between items-center">

                    <div>

                      <h3
                        className="text-lg font-semibold
                        group-hover:text-blue-300
                        transition-colors duration-300"
                      >
                        {job.title}
                      </h3>

                      <p className="text-gray-500 text-sm mt-1">
                        {job.company} • {job.location}
                      </p>

                    </div>

                    <span
                      className="px-3 py-1 rounded-full
                      bg-green-500/10
                      text-green-400
                      text-xs border border-green-500/10"
                    >
                      Open
                    </span>

                  </div>


                  <p className="text-gray-500 text-sm mt-4 line-clamp-2">
                    {job.description}
                  </p>


                  <div
                    className="flex justify-between items-center
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

                    <button
                      onClick={() =>
                        navigate(
                          `/recruiter/jobs/${job._id}/applications`
                        )
                      }
                      className="text-sm text-blue-400
                      hover:text-blue-300
                      transition-colors duration-300"
                    >
                      View Applications →
                    </button>

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>

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
            transform: translateY(25px);
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

export default RecruiterDashboard;

