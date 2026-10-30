
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Briefcase,
  Building2,
  MapPin,
  FileText,
  Sparkles,
  ArrowLeft,
  Send,
} from "lucide-react";

import RecruiterSidebar from "../../components/recruiter/RecruiterSidebar";

const PostJob = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    description: "",
  });

  // ================= HANDLE INPUT =================

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ================= POST JOB =================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.title ||
      !formData.company ||
      !formData.location ||
      !formData.description
    ) {
      alert("Please fill all the fields");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:5000/api/jobs/create",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to post job");
        return;
      }

      alert("Job posted successfully!");

      navigate("/recruiter/my-jobs");
    } catch (error) {
      console.log("POST JOB ERROR:", error);

      alert("Unable to connect to server");
    }
  };

  return (
    <div className="min-h-screen bg-[#020817] text-white overflow-hidden relative">

      {/* ================= BACKGROUND GLOW ================= */}

      <div className="absolute inset-0 pointer-events-none overflow-hidden">

        <div
          className="
            absolute -top-40 -left-40
            w-[500px] h-[500px]
            bg-blue-600/10
            rounded-full
            blur-[120px]
            animate-pulse
          "
        />

        <div
          className="
            absolute top-[35%] right-[-180px]
            w-[500px] h-[500px]
            bg-indigo-600/10
            rounded-full
            blur-[120px]
            animate-pulse
          "
        />

        <div
          className="
            absolute bottom-[-180px] left-[35%]
            w-[400px] h-[400px]
            bg-cyan-500/5
            rounded-full
            blur-[120px]
          "
        />

      </div>

      {/* ================= SIDEBAR ================= */}

      <RecruiterSidebar />

      {/* ================= MAIN ================= */}

      <main className="relative ml-64 min-h-screen px-8 py-6">

        {/* ================= HEADER ================= */}

        <div className="mb-6 animate-[fadeDown_0.7s_ease-out]">

          <button
            onClick={() => navigate("/recruiter/dashboard")}
            className="
              flex items-center gap-2
              text-sm text-gray-500
              hover:text-blue-400
              transition-all duration-300
              mb-4
            "
          >
            <ArrowLeft size={16} />
            Back to Dashboard
          </button>

          <div className="flex items-center gap-3">

            <div
              className="
                w-10 h-10
                rounded-xl
                bg-blue-500/10
                border border-blue-400/10
                flex items-center justify-center
                text-blue-400
                shadow-[0_0_25px_rgba(59,130,246,0.08)]
              "
            >
              <Sparkles size={20} />
            </div>

            <div>

              <h1 className="text-2xl font-bold tracking-tight">
                Create a New Opportunity
              </h1>

              <p className="text-gray-500 text-sm mt-1">
                Connect talented students with your team.
              </p>

            </div>

          </div>

        </div>

        {/* ================= CONTENT ================= */}

        <div className="grid grid-cols-[1.25fr_0.75fr] gap-5">

          {/* ================================================= */}
          {/* LEFT — FORM */}
          {/* ================================================= */}

          <div
            className="
              relative
              bg-white/[0.035]
              backdrop-blur-2xl
              border border-white/[0.08]
              rounded-3xl
              p-6
              shadow-[0_20px_70px_rgba(0,0,0,0.25)]
              animate-[slideLeft_0.8s_ease-out]
            "
          >

            {/* Top glow */}

            <div
              className="
                absolute top-0 left-10 right-10
                h-px
                bg-gradient-to-r
                from-transparent
                via-blue-400/40
                to-transparent
              "
            />

            {/* FORM HEADER */}

            <div className="mb-6">

              <p
                className="
                  text-xs
                  uppercase
                  tracking-[0.2em]
                  text-blue-400/70
                  mb-1.5
                "
              >
                Job Information
              </p>

              <h2 className="text-lg font-semibold">
                Tell students about the role
              </h2>

            </div>

            {/* ================= JOB TITLE ================= */}

            <div className="mb-4">

              <label className="text-sm text-gray-300 mb-1.5 block">
                Job Title
              </label>

              <div className="relative">

                <Briefcase
                  size={17}
                  className="
                    absolute left-4 top-1/2
                    -translate-y-1/2
                    text-gray-600
                  "
                />

                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. Software Developer"
                  className="
                    w-full
                    bg-[#071329]/80
                    border border-white/[0.07]
                    rounded-xl
                    py-3 pl-12 pr-4
                    text-sm
                    text-white
                    placeholder:text-gray-600
                    outline-none
                    focus:border-blue-400/50
                    focus:bg-[#091731]
                    focus:shadow-[0_0_25px_rgba(59,130,246,0.08)]
                    transition-all duration-300
                  "
                />

              </div>

            </div>

            {/* ================= COMPANY ================= */}

            <div className="mb-4">

              <label className="text-sm text-gray-300 mb-1.5 block">
                Company
              </label>

              <div className="relative">

                <Building2
                  size={17}
                  className="
                    absolute left-4 top-1/2
                    -translate-y-1/2
                    text-gray-600
                  "
                />

                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="e.g. Google"
                  className="
                    w-full
                    bg-[#071329]/80
                    border border-white/[0.07]
                    rounded-xl
                    py-3 pl-12 pr-4
                    text-sm
                    text-white
                    placeholder:text-gray-600
                    outline-none
                    focus:border-blue-400/50
                    focus:bg-[#091731]
                    focus:shadow-[0_0_25px_rgba(59,130,246,0.08)]
                    transition-all duration-300
                  "
                />

              </div>

            </div>

            {/* ================= LOCATION ================= */}

            <div className="mb-4">

              <label className="text-sm text-gray-300 mb-1.5 block">
                Location
              </label>

              <div className="relative">

                <MapPin
                  size={17}
                  className="
                    absolute left-4 top-1/2
                    -translate-y-1/2
                    text-gray-600
                  "
                />

                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="e.g. Hyderabad"
                  className="
                    w-full
                    bg-[#071329]/80
                    border border-white/[0.07]
                    rounded-xl
                    py-3 pl-12 pr-4
                    text-sm
                    text-white
                    placeholder:text-gray-600
                    outline-none
                    focus:border-blue-400/50
                    focus:bg-[#091731]
                    focus:shadow-[0_0_25px_rgba(59,130,246,0.08)]
                    transition-all duration-300
                  "
                />

              </div>

            </div>

            {/* ================= DESCRIPTION ================= */}

            <div className="mb-2">

              <label className="text-sm text-gray-300 mb-1.5 block">
                Job Description
              </label>

              <div className="relative">

                <FileText
                  size={17}
                  className="
                    absolute left-4 top-4
                    text-gray-600
                  "
                />

                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="5"
                  placeholder="Describe the role, responsibilities, expectations and what you are looking for..."
                  className="
                    w-full
                    bg-[#071329]/80
                    border border-white/[0.07]
                    rounded-xl
                    py-3 pl-12 pr-4
                    text-sm
                    text-white
                    placeholder:text-gray-600
                    outline-none
                    resize-none
                    focus:border-blue-400/50
                    focus:bg-[#091731]
                    focus:shadow-[0_0_25px_rgba(59,130,246,0.08)]
                    transition-all duration-300
                  "
                />

              </div>

            </div>

            {/* CHARACTER COUNT */}

            <div className="flex justify-end mt-1.5">

              <span className="text-xs text-gray-600">
                {formData.description.length} characters
              </span>

            </div>

            {/* ================= ACTIONS ================= */}

            <div
              className="
                flex items-center justify-between
                mt-5 pt-4
                border-t border-white/[0.06]
              "
            >

              {/* LEFT MESSAGE */}

              <p className="text-xs text-gray-600 max-w-[220px]">
                Make sure all job details are accurate before publishing.
              </p>

              {/* BUTTONS */}

              <div className="flex items-center gap-2.5">

                <button
                  onClick={() =>
                    navigate("/recruiter/dashboard")
                  }
                  className="
                    px-4 py-2.5
                    rounded-xl
                    text-sm
                    text-gray-400
                    border border-white/[0.07]
                    hover:text-white
                    hover:bg-white/[0.04]
                    transition-all duration-300
                  "
                >
                  Cancel
                </button>

                <button
                  onClick={handleSubmit}
                  className="
                    group
                    flex items-center gap-2
                    px-5 py-2.5
                    rounded-xl
                    bg-blue-600
                    hover:bg-blue-500
                    text-sm
                    font-medium
                    shadow-[0_0_30px_rgba(37,99,235,0.18)]
                    hover:shadow-[0_0_40px_rgba(37,99,235,0.35)]
                    hover:-translate-y-0.5
                    transition-all duration-300
                  "
                >

                  <Send
                    size={15}
                    className="
                      group-hover:translate-x-1
                      transition-transform duration-300
                    "
                  />

                  Publish Opportunity

                </button>

              </div>

            </div>

          </div>

          {/* ================================================= */}
          {/* RIGHT — LIVE PREVIEW */}
          {/* ================================================= */}

          <div
            className="
              animate-[slideRight_0.8s_ease-out]
            "
          >

            <div className="sticky top-6">

              {/* Preview label */}

              <div className="flex items-center gap-2 mb-3">

                <div
                  className="
                    w-2 h-2
                    rounded-full
                    bg-green-400
                    shadow-[0_0_10px_rgba(74,222,128,0.8)]
                    animate-pulse
                  "
                />

                <span
                  className="
                    text-xs
                    uppercase
                    tracking-[0.2em]
                    text-gray-500
                  "
                >
                  Live Preview
                </span>

              </div>

              {/* PREVIEW CARD */}

              <div
                className="
                  relative
                  overflow-hidden
                  bg-white/[0.035]
                  backdrop-blur-2xl
                  border border-white/[0.08]
                  rounded-3xl
                  p-6
                  min-h-[380px]
                  shadow-[0_20px_70px_rgba(0,0,0,0.25)]
                "
              >

                {/* Preview glow */}

                <div
                  className="
                    absolute
                    -top-24
                    -right-24
                    w-48
                    h-48
                    bg-blue-500/10
                    rounded-full
                    blur-3xl
                  "
                />

                {/* COMPANY ICON */}

                <div
                  className="
                    relative
                    w-12 h-12
                    rounded-2xl
                    bg-gradient-to-br
                    from-blue-500/20
                    to-indigo-500/10
                    border border-blue-400/10
                    flex items-center justify-center
                    text-blue-400
                    mb-4
                    shadow-[0_0_25px_rgba(59,130,246,0.08)]
                  "
                >

                  <Briefcase size={22} />

                </div>

                {/* TITLE */}

                <h2
                  className="
                    relative
                    text-xl
                    font-bold
                    leading-tight
                    break-words
                  "
                >
                  {formData.title || "Your Job Title"}
                </h2>

                {/* COMPANY */}

                <p className="text-blue-400 text-sm mt-1.5">
                  {formData.company || "Your Company"}
                </p>

                {/* LOCATION */}

                <div
                  className="
                    flex items-center gap-2
                    text-gray-500
                    text-sm
                    mt-3
                  "
                >

                  <MapPin size={14} />

                  <span>
                    {formData.location || "Job Location"}
                  </span>

                </div>

                {/* DIVIDER */}

                <div
                  className="
                    border-t
                    border-white/[0.06]
                    my-5
                  "
                />

                {/* DESCRIPTION */}

                <div>

                  <p
                    className="
                      text-xs
                      uppercase
                      tracking-[0.15em]
                      text-gray-600
                      mb-2
                    "
                  >
                    About the Role
                  </p>

                  <p
                    className="
                      text-sm
                      text-gray-400
                      leading-5
                      whitespace-pre-line
                    "
                  >
                    {formData.description ||
                      "Your job description will appear here as you type. Tell students about the role, responsibilities and expectations."}
                  </p>

                </div>

                {/* FOOTER */}

                <div
                  className="
                    absolute
                    bottom-5
                    left-6
                    right-6
                    pt-3
                    border-t
                    border-white/[0.06]
                    flex items-center
                    justify-between
                  "
                >

                  <span className="text-xs text-gray-600">
                    CampusConnect
                  </span>

                  <span
                    className="
                      text-xs
                      px-2.5 py-1
                      rounded-full
                      bg-blue-500/10
                      text-blue-400
                      border border-blue-400/10
                    "
                  >
                    Open Position
                  </span>

                </div>

              </div>

              {/* SMALL TIP */}

              <div
                className="
                  flex items-start gap-3
                  mt-3 px-2
                "
              >

                <Sparkles
                  size={14}
                  className="text-blue-400 mt-0.5"
                />

                <p
                  className="
                    text-xs
                    text-gray-600
                    leading-5
                  "
                >
                  This is how your job opportunity will appear
                  to students on CampusConnect.
                </p>

              </div>

            </div>

          </div>

        </div>

      </main>

      {/* ================= ANIMATIONS ================= */}

      <style>{`

        @keyframes fadeDown {

          from {
            opacity: 0;
            transform: translateY(-20px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }

        }

        @keyframes slideLeft {

          from {
            opacity: 0;
            transform: translateX(-35px);
          }

          to {
            opacity: 1;
            transform: translateX(0);
          }

        }

        @keyframes slideRight {

          from {
            opacity: 0;
            transform: translateX(35px);
          }

          to {
            opacity: 1;
            transform: translateX(0);
          }

        }

      `}</style>

    </div>
  );
};

export default PostJob;
