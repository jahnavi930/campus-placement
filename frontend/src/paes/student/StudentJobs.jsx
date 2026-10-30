
import React, { useEffect, useState } from "react";
import {
  Briefcase,
  MapPin,
  Building2,
  Clock3,
  Send,
} from "lucide-react";

const StudentJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [applying, setApplying] = useState(null);

  // =========================================================
  // GET ALL JOBS
  // =========================================================

  useEffect(() => {
    const getJobs = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          "http://localhost:5000/api/jobs"
        );

        const data = await response.json();

        console.log("JOBS RESPONSE:", data);

        if (!response.ok) {
          setError(data.message || "Unable to load jobs");
          return;
        }

        if (Array.isArray(data)) {
          setJobs(data);
        } else {
          setJobs([]);
          setError("Invalid jobs response from server");
        }

      } catch (error) {
        console.log("GET JOBS ERROR:", error);

        setError(
          "Unable to connect to the server. Make sure your backend is running on port 5000."
        );
      } finally {
        setLoading(false);
      }
    };

    getJobs();
  }, []);

  // =========================================================
  // APPLY FOR JOB
  // =========================================================

  const handleApply = async (jobId) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login again");
        return;
      }

      setApplying(jobId);

      const response = await fetch(
        `http://localhost:5000/api/applications/apply/${jobId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      console.log("APPLY RESPONSE:", data);

      if (!response.ok) {
        alert(data.message || "Unable to apply");
        return;
      }

      alert("Application submitted successfully!");

    } catch (error) {
      console.log("APPLY ERROR:", error);
      alert("Unable to connect to server");
    } finally {
      setApplying(null);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#08091b] text-slate-200">

      {/* ===================================================== */}
      {/* BACKGROUND */}
      {/* ===================================================== */}

      <div className="absolute inset-0 overflow-hidden pointer-events-none">

        <div
          className="
            absolute
            -top-40
            -left-40
            w-[500px]
            h-[500px]
            rounded-full
            bg-purple-600/15
            blur-[120px]
          "
        />

        <div
          className="
            absolute
            top-[35%]
            -right-48
            w-[500px]
            h-[500px]
            rounded-full
            bg-blue-600/15
            blur-[130px]
          "
        />

        <div
          className="
            absolute
            -bottom-40
            left-[35%]
            w-[450px]
            h-[450px]
            rounded-full
            bg-purple-700/10
            blur-[120px]
          "
        />

      </div>

      {/* ===================================================== */}
      {/* MAIN */}
      {/* ===================================================== */}

      <main className="relative z-10 p-5 md:p-8">

        <div className="max-w-6xl mx-auto">

          {/* ================================================= */}
          {/* HEADER */}
          {/* ================================================= */}

          <div className="mb-7">

            <div
              className="
                inline-flex
                items-center
                px-3
                py-1
                rounded-full
                bg-purple-500/10
                border
                border-purple-500/20
                text-purple-300
                text-xs
                mb-3
              "
            >
              CampusConnect
            </div>

            <h1
              className="
                text-2xl
                md:text-3xl
                font-extrabold
                text-transparent
                bg-clip-text
                bg-gradient-to-r
                from-blue-400
                via-purple-400
                to-pink-400
              "
            >
              Explore Jobs
            </h1>

            <p className="text-slate-500 text-sm mt-1">
              Find opportunities posted by recruiters.
            </p>

          </div>

          {/* ================================================= */}
          {/* LOADING */}
          {/* ================================================= */}

          {loading && (
            <div className="text-center py-16 text-slate-400 text-sm">
              Loading jobs...
            </div>
          )}

          {/* ================================================= */}
          {/* ERROR */}
          {/* ================================================= */}

          {!loading && error && (
            <div
              className="
                rounded-2xl
                border
                border-red-500/20
                bg-red-500/5
                p-6
                text-center
              "
            >
              <p className="text-red-400 text-sm">
                {error}
              </p>

              <p className="text-slate-600 text-xs mt-2">
                Check your backend terminal for errors.
              </p>
            </div>
          )}

          {/* ================================================= */}
          {/* NO JOBS */}
          {/* ================================================= */}

          ```jsx
{!loading &&
  !error &&
  jobs.length > 0 && (

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

      {jobs.map((job) => (

        <div
          key={job._id}
          className="
            group
            relative
            bg-[#11132b]/80
            border
            border-white/10
            rounded-xl
            px-4
            py-3.5
            backdrop-blur-2xl
            transition-all
            duration-300
            hover:border-purple-500/30
            hover:-translate-y-1
          "
        >

          {/* HEADER */}

          <div className="flex justify-between items-start">

            <div className="min-w-0">

              <h2
                className="
                  text-base
                  font-semibold
                  text-white
                  truncate
                  group-hover:text-purple-300
                  transition-colors
                "
              >
                {job.title}
              </h2>

              <div
                className="
                  flex
                  items-center
                  gap-1.5
                  mt-1
                  text-xs
                  text-slate-500
                "
              >
                <Building2 size={13} />

                {job.company}
              </div>

            </div>

            <div
              className="
                shrink-0
                w-8
                h-8
                rounded-lg
                bg-purple-500/10
                border
                border-purple-500/20
                flex
                items-center
                justify-center
                text-purple-400
              "
            >
              <Briefcase size={15} />
            </div>

          </div>

          {/* DETAILS */}

          <div
            className="
              flex
              flex-wrap
              items-center
              gap-x-5
              gap-y-1
              mt-2.5
              text-xs
              text-slate-500
            "
          >

            <div className="flex items-center gap-1.5">

              <MapPin
                size={12}
                className="text-blue-400"
              />

              {job.location}

            </div>

            <div className="flex items-center gap-1.5">

              <Clock3
                size={12}
                className="text-purple-400"
              />

              Full Time

            </div>

          </div>

          {/* DESCRIPTION */}

          <p
            className="
              text-slate-400
              text-xs
              leading-5
              mt-2
              line-clamp-1
            "
          >
            {job.description}
          </p>

          {/* BOTTOM */}

          <div
            className="
              flex
              justify-between
              items-center
              mt-3
              pt-2.5
              border-t
              border-white/10
            "
          >

            <div>

              <p className="text-[10px] text-slate-600">
                Posted
              </p>

              <p className="text-xs text-slate-400 mt-0.5">
                {job.createdAt
                  ? new Date(
                      job.createdAt
                    ).toLocaleDateString()
                  : "Recently"}
              </p>

            </div>

            <button
              onClick={() =>
                handleApply(job._id)
              }
              disabled={
                applying === job._id
              }
              className="
                flex
                items-center
                gap-1.5
                px-3
                py-1.5
                rounded-lg
                bg-gradient-to-r
                from-blue-500
                to-purple-600
                text-white
                text-xs
                font-semibold
                transition-all
                duration-300
                hover:-translate-y-0.5
                active:scale-95
                disabled:opacity-50
                disabled:cursor-not-allowed
              "
            >

              <Send size={12} />

              {applying === job._id
                ? "Applying..."
                : "Apply Now"}

            </button>

          </div>

        </div>

      ))}

    </div>
  )}


          {/* ================================================= */}
          {/* JOB LIST */}
          {/* ================================================= */}

          {!loading &&
            !error &&
            jobs.length > 0 && (

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

                {jobs.map((job, index) => (

                  <div
                    key={job._id}
                    className="
                      group
                      relative
                      bg-[#11132b]/80
                      border
                      border-white/10
                      rounded-xl
                      px-4
                      py-3.5
                      backdrop-blur-2xl
                      transition-all
                      duration-300
                      hover:border-purple-500/30
                      hover:-translate-y-1
                    "
                    style={{
                      animation: "cardEnter .5s ease-out",
                      animationDelay: `${index * 0.08}s`,
                      animationFillMode: "both",
                    }}
                  >

                    {/* ================================================= */}
                    {/* JOB HEADER */}
                    {/* ================================================= */}

                    <div className="relative flex justify-between items-start">

                      <div className="min-w-0">

                        <h2
                          className="
                            text-base
                            font-semibold
                            text-white
                            truncate
                            group-hover:text-purple-300
                            transition-colors
                          "
                        >
                          {job.title}
                        </h2>

                        <div
                          className="
                            flex
                            items-center
                            gap-1.5
                            mt-1
                            text-xs
                            text-slate-500
                          "
                        >
                          <Building2 size={13} />

                          {job.company}

                        </div>

                      </div>

                      <div
                        className="
                          shrink-0
                          w-8
                          h-8
                          rounded-lg
                          bg-purple-500/10
                          border
                          border-purple-500/20
                          flex
                          items-center
                          justify-center
                          text-purple-400
                        "
                      >
                        <Briefcase size={15} />
                      </div>

                    </div>

                    {/* ================================================= */}
                    {/* DETAILS */}
                    {/* ================================================= */}

                    <div
                      className="
                        flex
                        flex-wrap
                        items-center
                        gap-x-5
                        gap-y-1
                        mt-2.5
                        text-xs
                        text-slate-500
                      "
                    >

                      <div className="flex items-center gap-1.5">

                        <MapPin
                          size={12}
                          className="text-blue-400"
                        />

                        {job.location}

                      </div>

                      <div className="flex items-center gap-1.5">

                        <Clock3
                          size={12}
                          className="text-purple-400"
                        />

                        Full Time

                      </div>

                    </div>

                    {/* ================================================= */}
                    {/* DESCRIPTION */}
                    {/* ================================================= */}

                    <p
                      className="
                        text-slate-400
                        text-xs
                        leading-5
                        mt-2
                        line-clamp-1
                      "
                    >
                      {job.description}
                    </p>

                    {/* ================================================= */}
                    {/* BOTTOM */}
                    {/* ================================================= */}

                    <div
                      className="
                        flex
                        justify-between
                        items-center
                        mt-3
                        pt-2.5
                        border-t
                        border-white/10
                      "
                    >

                      <div>

                        <p className="text-[10px] text-slate-600">
                          Posted
                        </p>

                        <p className="text-xs text-slate-400 mt-0.5">
                          {job.createdAt
                            ? new Date(
                                job.createdAt
                              ).toLocaleDateString()
                            : "Recently"}
                        </p>

                      </div>

                      <button
                        onClick={() =>
                          handleApply(job._id)
                        }
                        disabled={
                          applying === job._id
                        }
                        className="
                          flex
                          items-center
                          gap-1.5
                          px-3
                          py-1.5
                          rounded-lg
                          bg-gradient-to-r
                          from-blue-500
                          to-purple-600
                          text-white
                          text-xs
                          font-semibold
                          transition-all
                          duration-300
                          hover:-translate-y-0.5
                          hover:shadow-lg
                          hover:shadow-purple-500/20
                          active:scale-95
                          disabled:opacity-50
                          disabled:cursor-not-allowed
                        "
                      >

                        <Send size={12} />

                        {applying === job._id
                          ? "Applying..."
                          : "Apply Now"}

                      </button>

                    </div>

                  </div>

                ))}

              </div>
            )}

        </div>

      </main>

      {/* ===================================================== */}
      {/* ANIMATION */}
      {/* ===================================================== */}

      <style>{`

        @keyframes cardEnter {

          from {
            opacity: 0;
            transform: translateY(20px) scale(.98);
          }

          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }

        }

      `}</style>

    </div>
  );
};

export default StudentJobs;
