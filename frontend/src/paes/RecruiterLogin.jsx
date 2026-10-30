import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  GraduationCap,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Building2,
} from "lucide-react";

export default function RecruiterLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:5000/api/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      // Check recruiter role
      if (data.user.role !== "recruiter") {
        alert("This account is not a recruiter account");
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      alert("Login successful!");

      navigate("/recruiter/dashboard");

    } catch (error) {
      console.log(error);
      alert("Unable to connect to server");
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#08091b]">

      {/* BACKGROUND */}

      <div className="absolute inset-0 overflow-hidden">

        <div
          className="
            absolute -top-32 -left-32
            w-96 h-96
            bg-purple-600/30
            rounded-full
            blur-3xl
            animate-pulse
          "
        />

        <div
          className="
            absolute top-1/3 -right-40
            w-[450px] h-[450px]
            bg-blue-600/25
            rounded-full
            blur-3xl
            animate-pulse
          "
        />

        <div
          className="
            absolute -bottom-40 left-1/3
            w-[500px] h-[500px]
            bg-purple-700/20
            rounded-full
            blur-3xl
            animate-pulse
          "
        />

        <div
          className="
            absolute top-32 left-[20%]
            w-3 h-3
            rounded-full
            bg-purple-400
            shadow-[0_0_25px_8px_rgba(168,85,247,0.35)]
            animate-bounce
          "
        />

        <div
          className="
            absolute bottom-32 right-[20%]
            w-2 h-2
            rounded-full
            bg-blue-400
            shadow-[0_0_25px_8px_rgba(59,130,246,0.35)]
            animate-pulse
          "
        />

      </div>

      {/* NAVBAR */}

      <nav
        className="
          relative z-20
          flex items-center justify-between
          px-6 md:px-12
          py-4
          border-b border-white/5
          bg-[#0b0c1e]/70
          backdrop-blur-xl
        "
      >

        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => navigate("/")}
        >

          <div
            className="
              w-10 h-10
              rounded-xl
              flex items-center justify-center
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

        <button
          onClick={() => navigate("/")}
          className="
            hidden sm:flex
            items-center gap-2
            text-gray-400
            hover:text-white
            transition
          "
        >
          Back to Home
          <ArrowRight className="w-4 h-4" />
        </button>

      </nav>

      {/* LOGIN SECTION */}

      <div
        className="
          relative z-10
          min-h-[calc(100vh-73px)]
          flex items-center justify-center
          px-5 py-6
        "
      >

        {/* RINGS */}

        <div
          className="
            absolute
            w-[430px] h-[430px]
            rounded-full
            border border-purple-500/10
            animate-[spin_20s_linear_infinite]
          "
        />

        <div
          className="
            absolute
            w-[520px] h-[520px]
            rounded-full
            border border-blue-500/5
            animate-[spin_30s_linear_infinite_reverse]
          "
        />

        {/* CARD */}

        <div
          className="
            relative
            w-full max-w-md
            rounded-3xl
            border border-white/10
            bg-[#11132b]/80
            backdrop-blur-2xl
            px-7 py-7
            shadow-2xl
            shadow-purple-950/50
            overflow-hidden
          "
        >

          {/* GLOW */}

          <div
            className="
              absolute
              -top-24 left-1/2
              -translate-x-1/2
              w-60 h-40
              bg-purple-600/20
              blur-3xl
            "
          />

          {/* ICON */}

          <div className="relative flex justify-center mb-4">

            <div
              className="
                w-14 h-14
                rounded-2xl
                flex items-center justify-center
                bg-gradient-to-br
                from-blue-500
                to-purple-600
                shadow-lg
                shadow-purple-600/30
              "
            >
              <Building2 className="w-7 h-7 text-white" />
            </div>

          </div>

          {/* HEADING */}

          <div className="relative text-center mb-6">

            <div
              className="
                inline-flex
                items-center gap-2
                px-3 py-1
                rounded-full
                bg-purple-500/10
                border border-purple-500/20
                text-purple-300
                text-xs
                mb-3
              "
            >

              <Sparkles className="w-3 h-3" />

              Recruiter Portal

            </div>

            <h1 className="text-2xl font-bold text-white">
              Welcome Back
            </h1>

            <p className="text-gray-400 text-xs mt-2">
              Login to manage your recruitment activities
            </p>

          </div>

          {/* FORM */}

          <form
            onSubmit={handleLogin}
            className="relative space-y-4"
          >

            {/* EMAIL */}

            <div>

              <label className="block text-xs text-gray-300 mb-1.5">
                Email
              </label>

              <div className="relative">

                <Mail
                  className="
                    absolute left-4 top-1/2
                    -translate-y-1/2
                    w-4 h-4
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
                    border border-white/10
                    bg-[#0b0d22]
                    py-3
                    pl-11 pr-4
                    text-sm text-white
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

            {/* PASSWORD */}

            <div>

              <label className="block text-xs text-gray-300 mb-1.5">
                Password
              </label>

              <div className="relative">

                <Lock
                  className="
                    absolute left-4 top-1/2
                    -translate-y-1/2
                    w-4 h-4
                    text-purple-400
                  "
                />

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="
                    w-full
                    rounded-xl
                    border border-white/10
                    bg-[#0b0d22]
                    py-3
                    pl-11 pr-10
                    text-sm text-white
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
                    absolute right-3 top-1/2
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

            {/* LOGIN BUTTON */}

            <button
              type="submit"
              className="
                group
                w-full
                flex items-center justify-center gap-2
                py-3
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

              Login as Recruiter

              <ArrowRight
                className="
                  w-4 h-4
                  transition-transform
                  group-hover:translate-x-1
                "
              />

            </button>

          </form>

          {/* REGISTER */}

          <p className="text-center text-xs text-gray-400 mt-5">

            Don't have a recruiter account?

            <button
              type="button"
              onClick={() => navigate("/recruiter-register")}
              className="
                ml-1
                text-purple-400
                font-semibold
                hover:text-purple-300
                transition
              "
            >
              Register
            </button>

          </p>

          {/* SECURITY */}

          <div
            className="
              flex items-center justify-center gap-2
              mt-4
              text-[10px]
              text-gray-600
            "
          >

            <ShieldCheck className="w-3 h-3" />

            Secure recruiter login

          </div>

        </div>

      </div>

    </div>
  );
}