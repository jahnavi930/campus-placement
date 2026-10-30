
import React, { useEffect, useState } from "react";
import {
  User,
  Briefcase,
  FileText,
  BarChart3,
  FileSearch,
  Mic,
  MapPin,
  Building2,
  Clock3,
  CheckCircle,
  XCircle,
  Send,
  Plus,
  Trash2,
} from "lucide-react";

const StudentDashboard = () => {
  const [activeTab, setActiveTab] = useState("profile");

  // ================= PROFILE =================

  const [name, setName] = useState("jaanvi");
  const [isEditingName, setIsEditingName] = useState(false);
  const [profileImage, setProfileImage] = useState(null);

  // ================= ACADEMIC =================

  const [ssc, setSsc] = useState("");
  const [inter, setInter] = useState("");
  const [btech, setBtech] = useState("");
  const [branch, setBranch] = useState("");
  const [year, setYear] = useState("");

  // ================= SKILLS =================

  const [skillInput, setSkillInput] = useState("");

  const [skills, setSkills] = useState([
    "React.js",
    "Node.js",
    "Tailwind CSS",
  ]);

  // ================= PROJECTS =================

  const [projectUrl, setProjectUrl] = useState("");
  const [projectDesc, setProjectDesc] = useState("");
  const [projects, setProjects] = useState([]);

  // ================= JOBS =================

  const [jobs, setJobs] = useState([]);
  const [loadingJobs, setLoadingJobs] = useState(false);

  // ================= APPLICATIONS =================

  const [applications, setApplications] = useState([]);

  // =========================================================
  // GET STUDENT DETAILS
  // =========================================================

  useEffect(() => {
    const getStudentDetails = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          console.log("No token found");
          return;
        }

        const response = await fetch(
          "http://localhost:5000/api/users/profile",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          console.log(data.message);
          return;
        }

        const user = data.user;

        setName(user.name || "");
        setBranch(user.branch || "");
        setYear(user.year || "");
        setSsc(user.ssc || "");
        setInter(user.inter || "");
        setBtech(user.btech || "");
        setSkills(user.skills || []);
        setProjects(user.projects || []);
        setProfileImage(user.profileImage || null);

        localStorage.setItem("user", JSON.stringify(user));
      } catch (error) {
        console.log("GET PROFILE ERROR:", error);
      }
    };

    getStudentDetails();
  }, []);

  // =========================================================
  // GET ALL JOBS
  // =========================================================

  const getJobs = async () => {
    try {
      setLoadingJobs(true);

      const response = await fetch(
        "http://localhost:5000/api/jobs"
      );

      const data = await response.json();

      console.log("JOBS RESPONSE:", data);

      if (!response.ok) {
        console.log(data.message);
        return;
      }

      setJobs(data);
    } catch (error) {
      console.log("GET JOBS ERROR:", error);
    } finally {
      setLoadingJobs(false);
    }
  };

  // =========================================================
  // GET MY APPLICATIONS
  // =========================================================

  const getMyApplications = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) return;

      const response = await fetch(
        "http://localhost:5000/api/applications/my",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      console.log("APPLICATIONS:", data);

      if (!response.ok) {
        console.log(data.message);
        return;
      }

      setApplications(data);
    } catch (error) {
      console.log("GET APPLICATIONS ERROR:", error);
    }
  };

  // =========================================================
  // LOAD DATA WHEN TAB CHANGES
  // =========================================================

  useEffect(() => {
    if (activeTab === "jobs") {
      getJobs();
    }

    if (activeTab === "applications") {
      getMyApplications();
    }
  }, [activeTab]);

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

      getMyApplications();
    } catch (error) {
      console.log("APPLY ERROR:", error);
      alert("Unable to connect to server");
    }
  };

  // =========================================================
  // CHECK WHETHER ALREADY APPLIED
  // =========================================================

  const hasApplied = (jobId) => {
    return applications.some(
      (application) =>
        application.job?._id === jobId
    );
  };

  // =========================================================
  // PROFILE COMPLETION
  // =========================================================

  const calculateCompletion = () => {
    const fields = [
      Boolean(name.trim()),
      Boolean(profileImage),
      Boolean(ssc.trim()),
      Boolean(inter.trim()),
      Boolean(btech.trim()),
      Boolean(branch.trim()),
      Boolean(year.trim()),
      skills.length > 0,
      projects.length > 0,
    ];

    const completedCount = fields.filter(Boolean).length;

    return Math.round(
      (completedCount / fields.length) * 100
    );
  };

  const completionPercentage = calculateCompletion();

  // =========================================================
  // IMAGE
  // =========================================================

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  // =========================================================
  // SKILLS
  // =========================================================

  const handleAddSkill = (e) => {
    e.preventDefault();

    const newSkill = skillInput.trim();

    if (
      newSkill &&
      !skills.includes(newSkill)
    ) {
      setSkills([...skills, newSkill]);
      setSkillInput("");
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setSkills(
      skills.filter(
        (skill) => skill !== skillToRemove
      )
    );
  };

  // =========================================================
  // PROJECT
  // =========================================================

  const handleAddProject = (e) => {
    e.preventDefault();

    if (
      projectUrl.trim() ||
      projectDesc.trim()
    ) {
      setProjects([
        ...projects,
        {
          url: projectUrl.trim(),
          desc: projectDesc.trim(),
        },
      ]);

      setProjectUrl("");
      setProjectDesc("");
    }
  };

  const handleRemoveProject = (indexToRemove) => {
    setProjects(
      projects.filter(
        (_, index) =>
          index !== indexToRemove
      )
    );
  };

  // =========================================================
  // SAVE PROFILE
  // =========================================================

  const handleSaveChanges = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login again");
        return;
      }

      if (!name.trim()) {
        alert("Name cannot be empty");
        return;
      }

      const response = await fetch(
        "http://localhost:5000/api/users/profile",
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            name: name.trim(),
            branch: branch.trim(),
            year: year.trim(),
            ssc: ssc.trim(),
            inter: inter.trim(),
            btech: btech.trim(),
            skills: [...skills],
            projects: [...projects],
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(
          data.message ||
          "Profile update failed"
        );
        return;
      }

      if (data.user) {
        setName(data.user.name || "");
        setBranch(data.user.branch || "");
        setYear(data.user.year || "");
        setSsc(data.user.ssc || "");
        setInter(data.user.inter || "");
        setBtech(data.user.btech || "");
        setSkills(data.user.skills || []);
        setProjects(data.user.projects || []);

        localStorage.setItem(
          "user",
          JSON.stringify(data.user)
        );
      }

      alert("Profile saved successfully!");
    } catch (error) {
      console.log("SAVE ERROR:", error);
      alert("Unable to connect to server");
    }
  };

  // =========================================================
  // LOGOUT
  // =========================================================

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "/";
  };

  // =========================================================
  // MENU
  // =========================================================

  const menuItems = [
    {
      id: "profile",
      label: "Profile",
      icon: User,
    },
    {
      id: "jobs",
      label: "Jobs",
      icon: Briefcase,
    },
    {
      id: "applications",
      label: "Application Status",
      icon: FileText,
    },
    {
      id: "placement-history",
      label: "Placement History",
      icon: BarChart3,
    },
    {
      id: "resume-scoring",
      label: "Resume Scoring",
      icon: FileSearch,
    },
    {
      id: "mock-interview",
      label: "Mock Interview",
      icon: Mic,
    },
  ];

  return (
    <div className="relative flex min-h-screen overflow-hidden bg-[#08091b] text-slate-200 font-sans">

      {/* ===================================================== */}
      {/* ANIMATIONS */}
      {/* ===================================================== */}

      <style>{`

        @keyframes floatOne {
          0%,100% {
            transform: translate(0,0);
          }
          50% {
            transform: translate(40px,30px);
          }
        }

        @keyframes floatTwo {
          0%,100% {
            transform: translate(0,0);
          }
          50% {
            transform: translate(-35px,25px);
          }
        }

        @keyframes floatThree {
          0%,100% {
            transform: translate(0,0);
          }
          50% {
            transform: translate(25px,-30px);
          }
        }

        @keyframes pageEnter {
          from {
            opacity:0;
            transform:translateY(25px);
          }
          to {
            opacity:1;
            transform:translateY(0);
          }
        }

        @keyframes cardEnter {
          from {
            opacity:0;
            transform:translateY(30px) scale(.97);
          }
          to {
            opacity:1;
            transform:translateY(0) scale(1);
          }
        }

        @keyframes avatarEnter {
          from {
            opacity:0;
            transform:scale(.7);
          }
          to {
            opacity:1;
            transform:scale(1);
          }
        }

        @keyframes progressGlow {
          0%,100% {
            box-shadow:0 0 10px rgba(99,102,241,.3);
          }
          50% {
            box-shadow:0 0 25px rgba(168,85,247,.6);
          }
        }

        @keyframes sidebarEnter {
          from {
            opacity:0;
            transform:translateX(-40px);
          }
          to {
            opacity:1;
            transform:translateX(0);
          }
        }

        .sidebar-animation {
          animation:sidebarEnter .7s ease-out;
        }

        .page-animation {
          animation:pageEnter .7s ease-out;
        }

        .card-animation {
          animation:cardEnter .7s cubic-bezier(.16,1,.3,1);
        }

        .avatar-animation {
          animation:avatarEnter .6s cubic-bezier(.34,1.56,.64,1);
        }

        .progress-animation {
          animation:progressGlow 2.5s ease-in-out infinite;
        }

        .float-one {
          animation:floatOne 8s ease-in-out infinite;
        }

        .float-two {
          animation:floatTwo 10s ease-in-out infinite;
        }

        .float-three {
          animation:floatThree 9s ease-in-out infinite;
        }

      `}</style>

      {/* ===================================================== */}
      {/* BACKGROUND */}
      {/* ===================================================== */}

      <div className="absolute inset-0 overflow-hidden pointer-events-none">

        <div
          className="
            float-one absolute
            -top-48 -left-40
            w-[500px] h-[500px]
            rounded-full
            bg-purple-600/20
            blur-[120px]
          "
        />

        <div
          className="
            float-two absolute
            top-[30%] -right-48
            w-[550px] h-[550px]
            rounded-full
            bg-blue-600/15
            blur-[130px]
          "
        />

        <div
          className="
            float-three absolute
            -bottom-48 left-[35%]
            w-[500px] h-[500px]
            rounded-full
            bg-purple-700/15
            blur-[120px]
          "
        />

      </div>

      {/* ===================================================== */}
      {/* SIDEBAR */}
      {/* ===================================================== */}

      <aside
        className="
          sidebar-animation
          relative z-20
          hidden md:flex
          w-64 shrink-0
          flex-col justify-between
          border-r border-white/10
          bg-[#0b0d22]/80
          backdrop-blur-2xl
          shadow-2xl
        "
      >

        <div className="p-5">

          {/* LOGO */}

          <div className="flex items-center gap-3 mb-10">

            <div
              className="
                w-10 h-10 rounded-xl
                flex items-center justify-center
                bg-gradient-to-br
                from-blue-500
                to-purple-600
                shadow-lg
                shadow-purple-600/30
              "
            >
              <span className="text-lg">
                🎓
              </span>
            </div>

            <h2 className="text-xl font-bold text-white">
              Campus
              <span className="text-purple-400">
                Connect
              </span>
            </h2>

          </div>

          {/* NAVIGATION */}

          <nav className="space-y-2">

            {menuItems.map((item) => {

              const Icon = item.icon;

              return (
                <button
                  key={item.id}
                  onClick={() =>
                    setActiveTab(item.id)
                  }
                  className={`
                    group relative w-full
                    flex items-center gap-3
                    px-4 py-3 rounded-xl
                    text-sm font-medium
                    transition-all duration-300
                    overflow-hidden

                    ${
                      activeTab === item.id
                        ? `
                          bg-gradient-to-r
                          from-blue-500/15
                          via-purple-500/15
                          to-purple-500/5
                          text-white
                          border
                          border-purple-500/30
                          shadow-lg
                          shadow-purple-900/20
                          translate-x-1
                        `
                        : `
                          text-slate-400
                          hover:text-white
                          hover:bg-white/5
                          hover:translate-x-1
                        `
                    }
                  `}
                >

                  {activeTab === item.id && (
                    <span
                      className="
                        absolute left-0 top-1/2
                        -translate-y-1/2
                        w-1 h-7
                        rounded-r-full
                        bg-gradient-to-b
                        from-blue-400
                        to-purple-500
                      "
                    />
                  )}

                  <Icon
                    size={18}
                    className="
                      transition-transform
                      duration-300
                      group-hover:scale-110
                    "
                  />

                  <span>
                    {item.label}
                  </span>

                  {activeTab === item.id && (
                    <span
                      className="
                        ml-auto w-1.5 h-1.5
                        rounded-full
                        bg-purple-400
                        animate-pulse
                      "
                    />
                  )}

                </button>
              );
            })}

          </nav>

        </div>

        {/* LOGOUT */}

        <div className="p-5">

          <button
            onClick={handleLogout}
            className="
              w-full py-2.5
              rounded-xl
              border border-red-500/20
              bg-red-500/5
              text-red-400
              hover:bg-red-500/10
              hover:border-red-500/40
              transition-all duration-300
            "
          >
            Logout
          </button>

        </div>

      </aside>

      {/* ===================================================== */}
      {/* MAIN */}
      {/* ===================================================== */}

      <main
        className="
          relative z-10
          flex-1 overflow-y-auto
          p-5 md:p-8
        "
      >

        <div className="max-w-6xl mx-auto">

          {/* ================================================= */}
          {/* PROFILE */}
          {/* ================================================= */}

          {activeTab === "profile" && (

            <div
              key="profile"
              className="page-animation space-y-6"
            >

              <div>

                <div
                  className="
                    inline-flex items-center gap-2
                    px-3 py-1 rounded-full
                    bg-purple-500/10
                    border border-purple-500/20
                    text-purple-300
                    text-xs mb-3
                  "
                >
                  Student Portal
                </div>

                <h1
                  className="
                    text-xl md:text-2xl
                    font-extrabold
                    text-transparent
                    bg-clip-text
                    bg-gradient-to-r
                    from-blue-400
                    via-purple-400
                    to-pink-400
                  "
                >
                  Student Dashboard
                </h1>

                <p className="text-slate-500 text-sm mt-2">
                  Complete your profile and prepare for your placement journey.
                </p>

              </div>

              {/* PROFILE CARD */}

              <div
                className="
                  card-animation
                  relative overflow-hidden
                  rounded-3xl
                  border border-white/10
                  bg-[#11132b]/80
                  backdrop-blur-2xl
                  p-5 md:p-7
                  shadow-2xl
                "
              >

                <div className="relative flex flex-col lg:flex-row gap-8">

                  {/* LEFT */}

                  <div
                    className="
                      flex flex-col items-center
                      w-full lg:w-1/3
                      lg:border-r border-white/10
                      lg:pr-8
                    "
                  >

                    {/* AVATAR */}

                    <div
                      className="
                        avatar-animation
                        relative group
                        w-32 h-32 mb-4
                      "
                    >

                      <label
                        htmlFor="image-upload"
                        className="cursor-pointer block w-full h-full"
                      >

                        {profileImage ? (

                          <img
                            src={profileImage}
                            alt="Profile"
                            className="
                              w-32 h-32
                              rounded-full
                              object-cover
                              border-2
                              border-purple-500
                            "
                          />

                        ) : (

                          <div
                            className="
                              w-32 h-32
                              rounded-full
                              flex items-center
                              justify-center
                              text-4xl font-bold
                              bg-gradient-to-br
                              from-[#1b2040]
                              to-[#0b0d22]
                              border-2
                              border-purple-500/40
                            "
                          >
                            {name
                              .charAt(0)
                              .toUpperCase()}
                          </div>

                        )}

                        <div
                          className="
                            absolute inset-0
                            rounded-full
                            flex items-center
                            justify-center
                            bg-black/60
                            opacity-0
                            group-hover:opacity-100
                            transition-all
                          "
                        >
                          <span className="text-xs font-semibold">
                            Change Photo
                          </span>
                        </div>

                      </label>

                      <input
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />

                    </div>

                    {/* NAME */}

                    <div className="flex items-center gap-2 mb-5">

                      {isEditingName ? (

                        <input
                          type="text"
                          value={name}
                          onChange={(e) =>
                            setName(e.target.value)
                          }
                          onBlur={() =>
                            setIsEditingName(false)
                          }
                          onKeyDown={(e) =>
                            e.key === "Enter" &&
                            setIsEditingName(false)
                          }
                          autoFocus
                          className="
                            bg-[#0b0d22]
                            border border-purple-500
                            text-white text-lg
                            rounded-lg px-3 py-1.5
                            text-center outline-none
                          "
                        />

                      ) : (

                        <>
                          <h3 className="text-xl font-semibold text-white">
                            {name}
                          </h3>

                          <button
                            onClick={() =>
                              setIsEditingName(true)
                            }
                            className="
                              text-slate-500
                              hover:text-purple-400
                            "
                          >
                            ✏️
                          </button>
                        </>

                      )}

                    </div>

                    {/* COMPLETION */}

                    <div className="w-full">

                      <div className="flex justify-between text-xs mb-2">

                        <span className="text-slate-500">
                          Profile Completion
                        </span>

                        <span className="text-purple-400 font-bold">
                          {completionPercentage}%
                        </span>

                      </div>

                      <div
                        className="
                          w-full h-3
                          rounded-full
                          bg-[#08091b]
                          overflow-hidden
                        "
                      >

                        <div
                          className="
                            progress-animation
                            h-full rounded-full
                            bg-gradient-to-r
                            from-blue-500
                            via-purple-500
                            to-pink-500
                            transition-all
                          "
                          style={{
                            width:
                              `${completionPercentage}%`,
                          }}
                        />

                      </div>

                    </div>

                    <div
                      className="
                        mt-5 px-4 py-2
                        rounded-full
                        bg-green-500/5
                        border border-green-500/20
                        text-green-400
                        text-xs
                      "
                    >
                      Profile Active
                    </div>

                  </div>

                  {/* RIGHT */}

                  <div className="w-full lg:w-2/3 space-y-5">

                    {/* ACADEMIC */}

                    <div>

                      <label className="text-xs text-slate-500 mb-2 block">
                        Academic Performance
                      </label>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">

                        {[
                          {
                            placeholder: "SSC CGPA",
                            value: ssc,
                            setter: setSsc,
                          },
                          {
                            placeholder: "Inter CGPA",
                            value: inter,
                            setter: setInter,
                          },
                          {
                            placeholder: "B.Tech CGPA",
                            value: btech,
                            setter: setBtech,
                          },
                        ].map((field, index) => (

                          <input
                            key={index}
                            type="text"
                            placeholder={field.placeholder}
                            value={field.value}
                            onChange={(e) =>
                              field.setter(
                                e.target.value
                              )
                            }
                            className="
                              w-full
                              bg-[#0b0d22]
                              border border-white/10
                              text-white
                              placeholder-slate-600
                              rounded-xl
                              px-4 py-3
                              text-sm
                              outline-none
                              focus:border-purple-500/60
                            "
                          />

                        ))}

                      </div>

                    </div>

                    {/* BRANCH YEAR */}

                    <div>

                      <label className="text-xs text-slate-500 mb-2 block">
                        Academic Details
                      </label>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

                        <input
                          type="text"
                          placeholder="Branch"
                          value={branch}
                          onChange={(e) =>
                            setBranch(e.target.value)
                          }
                          className="
                            w-full bg-[#0b0d22]
                            border border-white/10
                            text-white
                            placeholder-slate-600
                            rounded-xl px-4 py-3
                            text-sm outline-none
                            focus:border-purple-500/60
                          "
                        />

                        <input
                          type="text"
                          placeholder="Year"
                          value={year}
                          onChange={(e) =>
                            setYear(e.target.value)
                          }
                          className="
                            w-full bg-[#0b0d22]
                            border border-white/10
                            text-white
                            placeholder-slate-600
                            rounded-xl px-4 py-3
                            text-sm outline-none
                            focus:border-purple-500/60
                          "
                        />

                      </div>

                    </div>

                    {/* SKILLS */}

                    <div>

                      <label className="text-xs text-slate-500 mb-2 block">
                        Technical Skills
                      </label>

                      <div className="flex gap-2">

                        <input
                          type="text"
                          placeholder="Enter Skill"
                          value={skillInput}
                          onChange={(e) =>
                            setSkillInput(
                              e.target.value
                            )
                          }
                          onKeyDown={(e) =>
                            e.key === "Enter" &&
                            handleAddSkill(e)
                          }
                          className="
                            flex-1 bg-[#0b0d22]
                            border border-white/10
                            text-white
                            placeholder-slate-600
                            rounded-xl px-4 py-3
                            text-sm outline-none
                          "
                        />

                        <button
                          onClick={handleAddSkill}
                          className="
                            px-5 rounded-xl
                            bg-gradient-to-r
                            from-blue-500
                            to-purple-600
                            text-white text-sm
                            font-semibold
                          "
                        >
                          Add
                        </button>

                      </div>

                      <div className="flex flex-wrap gap-2 mt-3">

                        {skills.map((skill) => (

                          <span
                            key={skill}
                            className="
                              inline-flex items-center gap-2
                              px-3 py-1.5
                              rounded-lg
                              bg-purple-500/10
                              border border-purple-500/25
                              text-purple-300
                              text-xs
                            "
                          >

                            {skill}

                            <button
                              onClick={() =>
                                handleRemoveSkill(
                                  skill
                                )
                              }
                              className="hover:text-red-400"
                            >
                              ×
                            </button>

                          </span>

                        ))}

                      </div>

                    </div>

                    {/* PROJECTS */}

                    <div className="pt-5 border-t border-white/10">

                      <label className="text-xs text-slate-500 mb-2 block">
                        Projects
                      </label>

                      <div className="space-y-3">

                        <input
                          type="text"
                          placeholder="Project URL"
                          value={projectUrl}
                          onChange={(e) =>
                            setProjectUrl(
                              e.target.value
                            )
                          }
                          className="
                            w-full bg-[#0b0d22]
                            border border-white/10
                            text-white
                            placeholder-slate-600
                            rounded-xl px-4 py-3
                            text-sm outline-none
                          "
                        />

                        <textarea
                          rows="2"
                          placeholder="Project Description"
                          value={projectDesc}
                          onChange={(e) =>
                            setProjectDesc(
                              e.target.value
                            )
                          }
                          className="
                            w-full bg-[#0b0d22]
                            border border-white/10
                            text-white
                            placeholder-slate-600
                            rounded-xl px-4 py-3
                            text-sm outline-none
                            resize-none
                          "
                        />

                      </div>

                      {projects.length > 0 && (

                        <div className="space-y-2 mt-4">

                          {projects.map(
                            (project, index) => (

                              <div
                                key={index}
                                className="
                                  flex justify-between
                                  gap-4 p-4 rounded-xl
                                  bg-[#0b0d22]
                                  border border-white/10
                                "
                              >

                                <div>

                                  <a
                                    href={project.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="
                                      text-purple-400
                                      text-sm
                                      hover:underline
                                    "
                                  >
                                    {project.url ||
                                      "No URL Provided"}
                                  </a>

                                  <p className="text-slate-500 text-xs mt-1">
                                    {project.desc}
                                  </p>

                                </div>

                                <button
                                  onClick={() =>
                                    handleRemoveProject(
                                      index
                                    )
                                  }
                                  className="
                                    text-slate-600
                                    hover:text-red-400
                                  "
                                >
                                  <Trash2 size={16} />
                                </button>

                              </div>

                            )
                          )}

                        </div>

                      )}

                    </div>

                    {/* BUTTONS */}

                    <div className="flex gap-3 pt-2">

                      <button
                        onClick={handleAddProject}
                        className="
                          px-5 py-2.5 rounded-xl
                          border border-white/10
                          bg-white/5
                          text-slate-300 text-sm
                        "
                      >
                        + Add Project
                      </button>

                      <button
                        onClick={handleSaveChanges}
                        className="
                          px-6 py-2.5 rounded-xl
                          bg-gradient-to-r
                          from-blue-500
                          via-purple-600
                          to-purple-600
                          text-white text-sm
                          font-semibold
                        "
                      >
                        Save Changes →
                      </button>

                    </div>

                  </div>

                </div>

              </div>

            </div>

          )}

          {/* ================================================= */}
          {/* JOBS */}
          {/* ================================================= */}

          {activeTab === "jobs" && (

            <div
              key="jobs"
              className="page-animation"
            >

              <div className="mb-7">

                <div
                  className="
                    inline-flex
                    px-3 py-1
                    rounded-full
                    bg-purple-500/10
                    border border-purple-500/20
                    text-purple-300
                    text-xs mb-3
                  "
                >
                  Opportunities
                </div>

                <h1
                  className="
                    text-3xl font-extrabold
                    text-transparent
                    bg-clip-text
                    bg-gradient-to-r
                    from-blue-400
                    to-purple-400
                  "
                >
                  Available Jobs
                </h1>

                <p className="text-slate-500 text-sm mt-2">
                  Explore job opportunities posted by recruiters.
                </p>

              </div>

              {/* LOADING */}

              {loadingJobs && (

                <div
                  className="
                    rounded-2xl
                    border border-white/10
                    bg-[#11132b]/80
                    p-10
                    text-center
                    text-slate-500
                  "
                >
                  Loading jobs...
                </div>

              )}

              {/* NO JOBS */}

              {!loadingJobs &&
                jobs.length === 0 && (

                  <div
                    className="
                      rounded-2xl
                      border border-white/10
                      bg-[#11132b]/80
                      p-12
                      text-center
                    "
                  >

                    <Briefcase
                      size={40}
                      className="
                        mx-auto mb-4
                        text-purple-400
                      "
                    />

                    <h2 className="text-lg font-semibold text-white">
                      No jobs available
                    </h2>

                    <p className="text-slate-500 text-sm mt-2">
                      Recruiters have not posted any jobs yet.
                    </p>

                  </div>

                )}

              {/* JOB LIST */}

              {!loadingJobs &&
                jobs.length > 0 && (

                  <div className="space-y-5">

                    {jobs.map((job, index) => (

                      <div
                        key={job._id}
                        className="
                          card-animation
                          relative overflow-hidden
                          rounded-2xl
                          border border-white/10
                          bg-[#11132b]/80
                          backdrop-blur-xl
                          p-6
                          hover:border-purple-500/30
                          hover:-translate-y-1
                          transition-all duration-300
                        "
                        style={{
                          animationDelay:
                            `${index * 0.1}s`,
                        }}
                      >

                        {/* TOP */}

                        <div className="flex justify-between items-start gap-4">

                          <div>

                            <h2
                              className="
                                text-xl
                                font-semibold
                                text-white
                              "
                            >
                              {job.title}
                            </h2>

                            <div
                              className="
                                flex items-center
                                gap-2 mt-2
                                text-purple-300
                                text-sm
                              "
                            >
                              <Building2 size={15} />
                              {job.company}
                            </div>

                          </div>

                          <span
                            className="
                              px-3 py-1
                              rounded-full
                              bg-green-500/10
                              border border-green-500/20
                              text-green-400
                              text-xs
                            "
                          >
                            Open
                          </span>

                        </div>

                        {/* DETAILS */}

                        <div
                          className="
                            flex flex-wrap
                            gap-5 mt-5
                            text-slate-400
                            text-sm
                          "
                        >

                          <div className="flex items-center gap-2">

                            <MapPin
                              size={15}
                              className="text-blue-400"
                            />

                            {job.location}

                          </div>

                          <div className="flex items-center gap-2">

                            <Clock3
                              size={15}
                              className="text-purple-400"
                            />

                            Posted{" "}
                            {new Date(
                              job.createdAt
                            ).toLocaleDateString()}

                          </div>

                        </div>

                        {/* DESCRIPTION */}

                        <div className="mt-5">

                          <p className="text-xs text-slate-500 mb-2">
                            Job Description
                          </p>

                          <p className="text-slate-400 text-sm leading-6">
                            {job.description}
                          </p>

                        </div>

                        {/* RECRUITER */}

                        {job.postedBy && (

                          <div className="mt-5 text-xs text-slate-500">

                            Posted by{" "}

                            <span className="text-slate-300">
                              {job.postedBy.name}
                            </span>

                          </div>

                        )}

                        {/* APPLY */}

                        <div
                          className="
                            flex justify-end
                            mt-5 pt-4
                            border-t
                            border-white/10
                          "
                        >

                          {hasApplied(job._id) ? (

                            <button
                              disabled
                              className="
                                flex items-center gap-2
                                px-5 py-2.5
                                rounded-xl
                                bg-green-500/10
                                border border-green-500/20
                                text-green-400
                                text-sm
                              "
                            >
                              <CheckCircle size={16} />
                              Applied
                            </button>

                          ) : (

                            <button
                              onClick={() =>
                                handleApply(job._id)
                              }
                              className="
                                flex items-center gap-2
                                px-5 py-2.5
                                rounded-xl
                                bg-gradient-to-r
                                from-blue-500
                                to-purple-600
                                text-white
                                text-sm
                                font-semibold
                                shadow-lg
                                shadow-purple-900/20
                                hover:-translate-y-0.5
                                transition-all
                              "
                            >
                              <Send size={16} />
                              Apply Now
                            </button>

                          )}

                        </div>

                      </div>

                    ))}

                  </div>

                )}

            </div>

          )}

          {/* ================================================= */}
          {/* APPLICATION STATUS */}
          {/* ================================================= */}

          {activeTab === "applications" && (

            <div
              key="applications"
              className="page-animation"
            >

              <div className="mb-7">

                <div
                  className="
                    inline-flex
                    px-3 py-1
                    rounded-full
                    bg-purple-500/10
                    border border-purple-500/20
                    text-purple-300
                    text-xs mb-3
                  "
                >
                  Applications
                </div>

                <h1
                  className="
                    text-3xl font-extrabold
                    text-transparent
                    bg-clip-text
                    bg-gradient-to-r
                    from-blue-400
                    to-purple-400
                  "
                >
                  Application Status
                </h1>

                <p className="text-slate-500 text-sm mt-2">
                  Track the status of your job applications.
                </p>

              </div>

              {applications.length === 0 ? (

                <div
                  className="
                    rounded-2xl
                    border border-white/10
                    bg-[#11132b]/80
                    p-12
                    text-center
                  "
                >

                  <FileText
                    size={40}
                    className="
                      mx-auto mb-4
                      text-purple-400
                    "
                  />

                  <h2 className="text-lg font-semibold text-white">
                    No applications yet
                  </h2>

                  <p className="text-slate-500 text-sm mt-2">
                    Apply for a job to see your application status here.
                  </p>

                </div>

              ) : (

                <div className="space-y-4">

                  {applications.map(
                    (application) => (

                      <div
                        key={application._id}
                        className="
                          rounded-2xl
                          border border-white/10
                          bg-[#11132b]/80
                          p-5
                          flex justify-between
                          items-center
                          gap-4
                        "
                      >

                        <div>

                          <h2 className="text-lg font-semibold text-white">
                            {application.job?.title}
                          </h2>

                          <p className="text-slate-500 text-sm mt-1">
                            {application.job?.company}
                          </p>

                        </div>

                        {application.status ===
                          "applied" && (

                          <span
                            className="
                              px-3 py-1
                              rounded-full
                              bg-yellow-500/10
                              border border-yellow-500/20
                              text-yellow-400
                              text-xs
                            "
                          >
                            Applied
                          </span>

                        )}

                        {application.status ===
                          "shortlisted" && (

                          <span
                            className="
                              flex items-center gap-1.5
                              px-3 py-1
                              rounded-full
                              bg-blue-500/10
                              border border-blue-500/20
                              text-blue-400
                              text-xs
                            "
                          >
                            <CheckCircle size={13} />
                            Shortlisted
                          </span>

                        )}

                        {application.status ===
                          "rejected" && (

                          <span
                            className="
                              flex items-center gap-1.5
                              px-3 py-1
                              rounded-full
                              bg-red-500/10
                              border border-red-500/20
                              text-red-400
                              text-xs
                            "
                          >
                            <XCircle size={13} />
                            Rejected
                          </span>

                        )}

                      </div>

                    )
                  )}

                </div>

              )}

            </div>

          )}

          {/* ================================================= */}
          {/* OTHER SECTIONS */}
          {/* ================================================= */}

          {[
            "placement-history",
            "resume-scoring",
            "mock-interview",
          ].includes(activeTab) && (

            <div
              key={activeTab}
              className="page-animation"
            >

              <div
                className="
                  inline-flex
                  px-3 py-1
                  rounded-full
                  bg-purple-500/10
                  border border-purple-500/20
                  text-purple-300
                  text-xs mb-3
                "
              >
                CampusConnect
              </div>

              <h1
                className="
                  text-3xl font-extrabold
                  capitalize
                  text-transparent
                  bg-clip-text
                  bg-gradient-to-r
                  from-blue-400
                  to-purple-400
                  mb-6
                "
              >
                {activeTab.replace("-", " ")}
              </h1>

              <div
                className="
                  card-animation
                  bg-[#11132b]/80
                  border border-white/10
                  rounded-3xl
                  p-8
                  backdrop-blur-2xl
                "
              >

                <h2 className="text-xl font-semibold text-white">
                  {activeTab ===
                    "placement-history" &&
                    "Your Placement History"}

                  {activeTab ===
                    "resume-scoring" &&
                    "AI Resume Scoring"}

                  {activeTab ===
                    "mock-interview" &&
                    "Mock Interview"}
                </h2>

                <p className="text-slate-500 text-sm mt-2">
                  This section will be connected to your CampusConnect backend next.
                </p>

              </div>

            </div>

          )}

        </div>

      </main>

    </div>
  );
};

export default StudentDashboard;
