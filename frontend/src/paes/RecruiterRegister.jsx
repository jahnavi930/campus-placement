import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  GraduationCap,
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Building2,
} from "lucide-react";

export default function RecruiterRegister() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/users/register",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            name,
            email,
            password,
            role: "recruiter",
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      alert("Recruiter registration successful!");

      navigate("/recruiter-login");

    } catch (error) {
      console.log(error);
      alert("Unable to connect to server");
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#08091b]">

      {/* ================= BACKGROUND ================= */}

      <div className="absolute inset-0 overflow-hidden">

        <div
          className="
            absolute
            -top-32
            -left-32
            w-96
            h-96
            bg-purple-600/30
            rounded-full
            blur-3xl
            animate-pulse
          "
        />

        <div
          className="
            absolute
            top-1/3
            -right-40
            w-[450px]
            h-[450px]
            bg-blue-600/25
            rounded-full
            blur-3xl
            animate-pulse
          "
        />

        <div
          className="
            absolute
            -bottom-40
            left-1/3
            w-[500px]
            h-[500px]
            bg-purple-700/20
            rounded-full
            blur-3xl
            animate-pulse
          "
        />

        <div
          className="
            absolute
            top-32
            left-[20%]
            w-3
            h-3
            rounded-full
            bg-purple-400
            shadow-[0_0_25px_8px_rgba(168,85,247,0.35)]
            animate-bounce
          "
        />

        <div
          className="
            absolute
            bottom-32
            right-[20%]
            w-2
            h-2
            rounded-full
            bg-blue-400
            shadow-[0_0_25px_8px_rgba(59,130,246,0.35)]
            animate-pulse
          "
        />

      </div>

      {/* ================= NAVBAR ================= */}

      <nav
        className="
          relative
          z-20
          flex
          items-center
          justify-between
          px-6
          md:px-12
          py-4
          border-b
          border-white/5
          bg-[#0b0c1e]/70
          backdrop-blur-xl
        "
      >

        {/* Logo */}

        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => navigate("/")}
        >

          <div
            className="
              w-10
              h-10
              rounded-xl
              flex
              items-center
              justify-center
              bg-gradient-to-br
              from-blue-500
              to-purple-600
              shadow-lg
              shadow-purple-600/30
            "
          >
            <GraduationCap className="w-5 h-5 text-white" />
          </div>

          <h1 className="text-xl md:text-2xl font-bold text-white">
            Campus
            <span className="text-purple-400">
              Connect
            </span>
          </h1>

        </div>

        {/* Back Home */}

        <button
          onClick={() => navigate("/")}
          className="
            hidden
            sm:flex
            items-center
            gap-2
            text-gray-400
            hover:text-white
            transition
          "
        >
          Back to Home

          <ArrowRight className="w-4 h-4" />
        </button>

      </nav>

      {/* ================= REGISTER SECTION ================= */}

      <div
        className="
          relative
          z-10
          min-h-[calc(100vh-73px)]
          flex
          items-center
          justify-center
          px-5
          py-6
        "
      >

        {/* Animated Rings */}

        <div
          className="
            absolute
            w-[430px]
            h-[430px]
            rounded-full
            border
            border-purple-500/10
            animate-[spin_20s_linear_infinite]
          "
        />

        <div
          className="
            absolute
            w-[520px]
            h-[520px]
            rounded-full
            border
            border-blue-500/5
            animate-[spin_30s_linear_infinite_reverse]
          "
        />

        {/* ================= CARD ================= */}

        <div
          className="
            relative
            w-full
            max-w-lg
            rounded-3xl
            border
            border-white/10
            bg-[#11132b]/80
            backdrop-blur-2xl
            px-6
            py-5
            shadow-2xl
            shadow-purple-950/50
            overflow-hidden
          "
        >

          {/* Glow */}

          <div
            className="
              absolute
              -top-24
              left-1/2
              -translate-x-1/2
              w-60
              h-40
              bg-purple-600/20
              blur-3xl
            "
          />

          {/* Icon */}

          <div className="relative flex justify-center mb-3">

            <div
              className="
                w-12
                h-12
                rounded-xl
                flex
                items-center
                justify-center
                bg-gradient-to-br
                from-blue-500
                to-purple-600
                shadow-lg
                shadow-purple-600/30
              "
            >
              <Building2 className="w-6 h-6 text-white" />
            </div>

          </div>

          {/* Heading */}

          <div className="relative text-center mb-4">

            <div
              className="
                inline-flex
                items-center
                gap-2
                px-3
                py-1
                rounded-full
                bg-purple-500/10
                border
                border-purple-500/20
                text-purple-300
                text-xs
                mb-2
              "
            >

              <Sparkles className="w-3 h-3" />

              Recruiter Portal

            </div>

            <h1 className="text-2xl font-bold text-white">
              Create Recruiter Account
            </h1>

            <p className="text-gray-400 text-xs mt-1">
              Register your company account on CampusConnect
            </p>

          </div>

          {/* ================= FORM ================= */}

          <form
            onSubmit={handleRegister}
            className="relative space-y-3"
          >

            {/* Name */}

            <div>

              <label className="block text-xs text-gray-300 mb-1.5">
                Recruiter Name
              </label>

              <div className="relative">

                <User
                  className="
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    w-4
                    h-4
                    text-purple-400
                  "
                />

                <input
                  type="text"
                  placeholder="Enter recruiter name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="
                    w-full
                    rounded-xl
                    border
                    border-white/10
                    bg-[#0b0d22]
                    py-2.5
                    pl-11
                    pr-4
                    text-sm
                    text-white
                    placeholder:text-gray-600
                    outline-none
                    transition
                    focus:border-purple-500/60
                    focus:ring-2
                    focus:ring-purple-500/10
                  "
                />

              </div>

            </div>

            {/* Email */}

            <div>

              <label className="block text-xs text-gray-300 mb-1.5">
                Email
              </label>

              <div className="relative">

                <Mail
                  className="
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    w-4
                    h-4
                    text-purple-400
                  "
                />

                <input
                  type="email"
                  placeholder="Enter recruiter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="
                    w-full
                    rounded-xl
                    border
                    border-white/10
                    bg-[#0b0d22]
                    py-2.5
                    pl-11
                    pr-4
                    text-sm
                    text-white
                    placeholder:text-gray-600
                    outline-none
                    transition
                    focus:border-purple-500/60
                    focus:ring-2
                    focus:ring-purple-500/10
                  "
                />

              </div>

            </div>

            {/* Password */}

            <div>

              <label className="block text-xs text-gray-300 mb-1.5">
                Password
              </label>

              <div className="relative">

                <Lock
                  className="
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    w-4
                    h-4
                    text-purple-400
                  "
                />

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="
                    w-full
                    rounded-xl
                    border
                    border-white/10
                    bg-[#0b0d22]
                    py-2.5
                    pl-11
                    pr-10
                    text-sm
                    text-white
                    placeholder:text-gray-600
                    outline-none
                    transition
                    focus:border-purple-500/60
                    focus:ring-2
                    focus:ring-purple-500/10
                  "
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="
                    absolute
                    right-3
                    top-1/2
                    -translate-y-1/2
                    text-gray-500
                    hover:text-purple-400
                  "
                >

                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}

                </button>

              </div>

            </div>

            {/* Confirm Password */}

            <div>

              <label className="block text-xs text-gray-300 mb-1.5">
                Confirm Password
              </label>

              <div className="relative">

                <Lock
                  className="
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    w-4
                    h-4
                    text-purple-400
                  "
                />

                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) =>
                    setConfirmPassword(e.target.value)
                  }
                  required
                  className="
                    w-full
                    rounded-xl
                    border
                    border-white/10
                    bg-[#0b0d22]
                    py-2.5
                    pl-11
                    pr-10
                    text-sm
                    text-white
                    placeholder:text-gray-600
                    outline-none
                    transition
                    focus:border-purple-500/60
                    focus:ring-2
                    focus:ring-purple-500/10
                  "
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(
                      !showConfirmPassword
                    )
                  }
                  className="
                    absolute
                    right-3
                    top-1/2
                    -translate-y-1/2
                    text-gray-500
                    hover:text-purple-400
                  "
                >

                  {showConfirmPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}

                </button>

              </div>

            </div>

            {/* Register Button */}

            <button
              type="submit"
              className="
                group
                w-full
                flex
                items-center
                justify-center
                gap-2
                py-2.5
                rounded-xl
                bg-gradient-to-r
                from-blue-500
                to-purple-600
                text-white
                text-sm
                font-semibold
                shadow-lg
                shadow-purple-900/30
                transition-all
                duration-300
                hover:-translate-y-1
                hover:shadow-purple-600/30
              "
            >

              Create Recruiter Account

              <ArrowRight
                className="
                  w-4
                  h-4
                  transition-transform
                  group-hover:translate-x-1
                "
              />

            </button>

          </form>

          {/* Login Link */}

          <p className="text-center text-xs text-gray-400 mt-4">

            Already have a recruiter account?

            <button
              type="button"
              onClick={() => navigate("/recruiter-login")}
              className="
                ml-1
                text-purple-400
                font-semibold
                hover:text-purple-300
                transition
              "
            >
              Login
            </button>

          </p>

          {/* Security */}

          <div
            className="
              flex
              items-center
              justify-center
              gap-2
              mt-3
              text-[10px]
              text-gray-600
            "
          >

            <ShieldCheck className="w-3 h-3" />

            Secure recruiter registration

          </div>

        </div>

      </div>

    </div>
  );
}