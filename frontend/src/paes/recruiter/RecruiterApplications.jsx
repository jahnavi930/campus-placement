
import React, { useEffect, useState } from "react";
import { ArrowLeft, User, Briefcase, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import RecruiterSidebar from "../../components/recruiter/RecruiterSidebar";

const RecruiterApplications = () => {
  const navigate = useNavigate();

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  // ================= FETCH APPLICATIONS =================

  const fetchApplications = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:5000/api/applications/recruiter",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch applications");
      }

      const data = await response.json();

      setApplications(data);
    } catch (error) {
      console.error("Error fetching applications:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  // ================= UPDATE STATUS =================

  const updateStatus = async (applicationId, status) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:5000/api/applications/status/${applicationId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            status,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update status");
      }

      // Update UI immediately
      setApplications((prev) =>
        prev.map((application) =>
          application._id === applicationId
            ? {
                ...application,
                status: status,
              }
            : application
        )
      );

    } catch (error) {
      console.error("Error updating status:", error);
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#030b1c] text-white relative overflow-hidden">

      {/* ================= BACKGROUND ================= */}

      <div className="absolute inset-0 pointer-events-none overflow-hidden">

        <div
          className="absolute w-[500px] h-[500px]
          bg-blue-600/10 rounded-full blur-3xl
          -top-40 -left-40"
        />

        <div
          className="absolute w-[450px] h-[450px]
          bg-indigo-500/10 rounded-full blur-3xl
          top-1/2 right-[-200px]"
        />

      </div>

      {/* ================= SIDEBAR ================= */}

      <RecruiterSidebar />

      {/* ================= MAIN ================= */}

      <main className="relative ml-64 min-h-screen px-10 py-8">

        {/* ================= HEADER ================= */}

        <div className="flex items-center gap-4 mb-8">

          <button
            onClick={() => navigate("/recruiter/jobs")}
            className="p-2 rounded-lg
            bg-white/[0.04]
            border border-white/[0.07]
            hover:bg-white/[0.08]
            transition"
          >
            <ArrowLeft size={18} />
          </button>

          <div>

            <p className="text-blue-400 text-sm">
              Recruiter
            </p>

            <h1 className="text-3xl font-bold">
              Applications
            </h1>

            <p className="text-gray-500 text-sm mt-1">
              Review students who applied to your jobs.
            </p>

          </div>

        </div>

        {/* ================= LOADING ================= */}

        {loading && (
          <div className="text-center py-20 text-gray-500">
            Loading applications...
          </div>
        )}

        {/* ================= EMPTY ================= */}

        {!loading && applications.length === 0 && (
          <div
            className="bg-white/[0.035]
            border border-white/[0.07]
            rounded-2xl
            p-12
            text-center"
          >

            <User
              size={35}
              className="mx-auto text-gray-600 mb-4"
            />

            <h2 className="text-lg font-semibold">
              No applications yet
            </h2>

            <p className="text-gray-500 text-sm mt-2">
              Applications from students will appear here.
            </p>

          </div>
        )}

        {/* ================= APPLICATIONS ================= */}

        {!loading && applications.length > 0 && (

          <div className="space-y-4">

            {applications.map((application) => (

              <div
                key={application._id}
                className="bg-white/[0.035]
                backdrop-blur-xl
                border border-white/[0.07]
                rounded-2xl
                p-6
                hover:bg-white/[0.05]
                hover:border-blue-400/20
                transition-all duration-300"
              >

                {/* TOP */}

                <div className="flex justify-between items-start">

                  <div>

                    <h2 className="text-lg font-semibold">
                      {application.student?.name || "Student"}
                    </h2>

                    <div className="flex items-center gap-2
                    text-gray-500 text-sm mt-2">

                      <Mail size={14} />

                      {application.student?.email || "No email"}

                    </div>

                  </div>

                  {/* STATUS */}

                  <span
                    className={`px-3 py-1 rounded-full text-xs
                    ${
                      application.status === "pending"
                        ? "bg-yellow-500/10 text-yellow-400"
                        : application.status === "shortlisted"
                        ? "bg-blue-500/10 text-blue-400"
                        : application.status === "selected"
                        ? "bg-green-500/10 text-green-400"
                        : "bg-red-500/10 text-red-400"
                    }`}
                  >
                    {application.status}
                  </span>

                </div>

                {/* JOB */}

                <div
                  className="flex items-center gap-2
                  text-gray-400 text-sm mt-5"
                >

                  <Briefcase
                    size={15}
                    className="text-blue-400"
                  />

                  {application.job?.title}

                </div>

                {/* ACTIONS */}

                <div
                  className="flex items-center gap-2
                  mt-5 pt-4
                  border-t border-white/[0.06]"
                >

                  <span className="text-gray-600 text-xs mr-2">
                    Update status:
                  </span>

                  {/* PENDING */}

                  <button
                    onClick={() =>
                      updateStatus(
                        application._id,
                        "pending"
                      )
                    }
                    className="px-3 py-1.5
                    rounded-lg
                    text-xs
                    bg-yellow-500/10
                    text-yellow-400
                    hover:bg-yellow-500/20
                    transition"
                  >
                    Pending
                  </button>

                  {/* SHORTLISTED */}

                  <button
                    onClick={() =>
                      updateStatus(
                        application._id,
                        "shortlisted"
                      )
                    }
                    className="px-3 py-1.5
                    rounded-lg
                    text-xs
                    bg-blue-500/10
                    text-blue-400
                    hover:bg-blue-500/20
                    transition"
                  >
                    Shortlist
                  </button>

                  {/* SELECTED */}

                  <button
                    onClick={() =>
                      updateStatus(
                        application._id,
                        "selected"
                      )
                    }
                    className="px-3 py-1.5
                    rounded-lg
                    text-xs
                    bg-green-500/10
                    text-green-400
                    hover:bg-green-500/20
                    transition"
                  >
                    Select
                  </button>

                  {/* REJECTED */}

                  <button
                    onClick={() =>
                      updateStatus(
                        application._id,
                        "rejected"
                      )
                    }
                    className="px-3 py-1.5
                    rounded-lg
                    text-xs
                    bg-red-500/10
                    text-red-400
                    hover:bg-red-500/20
                    transition"
                  >
                    Reject
                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

      </main>

    </div>
  );
};

export default RecruiterApplications;
