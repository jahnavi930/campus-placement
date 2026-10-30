
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  GraduationCap,
  Mail,
  User,
  MessageSquare,
  Send,
  ArrowRight,
  Sparkles,
  MapPin,
  Phone,
} from "lucide-react";

function Contact() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !message.trim()) {
      alert("Please fill all the fields.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          message: message.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to send message.");
        return;
      }

      alert("Message sent successfully!");

      setName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      console.error("CONTACT ERROR:", error);
      alert(
        "Unable to connect to server. Make sure your backend is running on port 5000."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#08091b]">

      {/* ================= BACKGROUND ================= */}

      <div className="absolute inset-0 overflow-hidden pointer-events-none">

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
            absolute top-32 left-[18%]
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

      {/* ================= NAVBAR ================= */}

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

        {/* Logo */}

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

        {/* Back Home */}

        <button
          onClick={() => navigate("/")}
          className="
            flex items-center gap-2
            text-gray-400
            hover:text-white
            transition
          "
        >
          Back to Home

          <ArrowRight className="w-4 h-4" />
        </button>

      </nav>

      {/* ================= MAIN ================= */}

      <main
        className="
          relative z-10
          min-h-[calc(100vh-73px)]
          px-5
          py-8 md:py-10
        "
      >

        {/* Animated Rings */}

        <div
          className="
            absolute
            top-16 left-1/2
            -translate-x-1/2
            w-[420px] h-[420px]
            rounded-full
            border border-purple-500/10
            animate-[spin_25s_linear_infinite]
            pointer-events-none
          "
        />

        <div
          className="
            absolute
            top-5 left-1/2
            -translate-x-1/2
            w-[520px] h-[520px]
            rounded-full
            border border-blue-500/5
            animate-[spin_35s_linear_infinite_reverse]
            pointer-events-none
          "
        />

        {/* ================= HEADING ================= */}

        <div className="relative text-center mb-8">

          <div
            className="
              inline-flex items-center gap-2
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

            Get In Touch
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-white">

            Contact
            <span className="text-purple-400">
              {" "}Us
            </span>

          </h1>

          <p className="text-gray-400 text-sm mt-2 max-w-xl mx-auto">
            Have a question or need help?
            We'd love to hear from you.
          </p>

        </div>

        {/* ================= CONTENT ================= */}

        <div
          className="
            relative
            max-w-5xl
            mx-auto
            grid
            grid-cols-1
            lg:grid-cols-5
            gap-6
          "
        >

          {/* ================= CONTACT INFO ================= */}

          <div
            className="
              lg:col-span-2
              rounded-3xl
              border border-white/10
              bg-[#11132b]/80
              backdrop-blur-2xl
              p-6
              shadow-2xl
              shadow-purple-950/40
            "
          >

            <h2 className="text-xl font-bold text-white">
              Let's connect
            </h2>

            <p className="text-gray-400 text-sm mt-2 leading-6">
              Whether you are a student looking for
              opportunities or a recruiter looking for
              talented students, we're here to help.
            </p>

            {/* Email */}

            <div className="flex items-center gap-4 mt-7">

              <div
                className="
                  w-11 h-11
                  rounded-xl
                  flex items-center justify-center
                  bg-purple-500/10
                  border border-purple-500/20
                "
              >
                <Mail className="w-5 h-5 text-purple-400" />
              </div>

              <div>
                <p className="text-xs text-gray-500">
                  Email
                </p>

                <p className="text-sm text-gray-200">
                  jahnavipanchala@gmail.com
                </p>
              </div>

            </div>

            {/* Phone */}

            <div className="flex items-center gap-4 mt-5">

              <div
                className="
                  w-11 h-11
                  rounded-xl
                  flex items-center justify-center
                  bg-blue-500/10
                  border border-blue-500/20
                "
              >
                <Phone className="w-5 h-5 text-blue-400" />
              </div>

              <div>
                <p className="text-xs text-gray-500">
                  Phone
                </p>

                <p className="text-sm text-gray-200">
                  +91 98765 43210
                </p>
              </div>

            </div>

            {/* Location */}

            <div className="flex items-center gap-4 mt-5">

              <div
                className="
                  w-11 h-11
                  rounded-xl
                  flex items-center justify-center
                  bg-purple-500/10
                  border border-purple-500/20
                "
              >
                <MapPin className="w-5 h-5 text-purple-400" />
              </div>

              <div>
                <p className="text-xs text-gray-500">
                  Location
                </p>

                <p className="text-sm text-gray-200">
                  Andhra Pradesh, India
                </p>
              </div>

            </div>

          </div>

          {/* ================= CONTACT FORM ================= */}

          <div
            className="
              lg:col-span-3
              rounded-3xl
              border border-white/10
              bg-[#11132b]/80
              backdrop-blur-2xl
              p-6
              shadow-2xl
              shadow-purple-950/40
            "
          >

            <h2 className="text-xl font-bold text-white">
              Send us a message
            </h2>

            <p className="text-gray-400 text-xs mt-1 mb-5">
              Fill in the details below and we'll get back to you.
            </p>

            <form
              onSubmit={handleSubmit}
              className="space-y-4"
            >

              {/* Name */}

              <div>

                <label className="block text-xs text-gray-300 mb-1.5">
                  Your Name
                </label>

                <div className="relative">

                  <User
                    className="
                      absolute left-4 top-1/2
                      -translate-y-1/2
                      w-4 h-4
                      text-purple-400
                    "
                  />

                  <input
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="
                      w-full
                      rounded-xl
                      border border-white/10
                      bg-[#0b0d22]
                      py-2.5
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

              {/* Email */}

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
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="
                      w-full
                      rounded-xl
                      border border-white/10
                      bg-[#0b0d22]
                      py-2.5
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

              {/* Message */}

              <div>

                <label className="block text-xs text-gray-300 mb-1.5">
                  Message
                </label>

                <div className="relative">

                  <MessageSquare
                    className="
                      absolute left-4 top-4
                      w-4 h-4
                      text-purple-400
                    "
                  />

                  <textarea
                    rows="4"
                    placeholder="Write your message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    className="
                      w-full
                      rounded-xl
                      border border-white/10
                      bg-[#0b0d22]
                      py-2.5
                      pl-11 pr-4
                      text-sm text-white
                      placeholder:text-gray-600
                      outline-none
                      transition
                      resize-none
                      focus:border-purple-500/60
                      focus:ring-2
                      focus:ring-purple-500/10
                    "
                  />

                </div>

              </div>

              {/* Button */}

              <button
                type="submit"
                disabled={loading}
                className="
                  group
                  w-full
                  flex items-center justify-center gap-2
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
                  disabled:opacity-60
                  disabled:cursor-not-allowed
                "
              >

                {loading ? "Sending..." : "Send Message"}

                {!loading && (
                  <Send
                    className="
                      w-4 h-4
                      transition-transform
                      group-hover:translate-x-1
                    "
                  />
                )}

              </button>

            </form>

          </div>

        </div>

      </main>

    </div>
  );
}

export default Contact;