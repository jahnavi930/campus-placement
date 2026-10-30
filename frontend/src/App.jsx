import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./paes/Home";
import StudentLogin from "./paes/StudentLogin";
import StudentRegister from "./paes/StudentRegister";
import RecruiterLogin from "./paes/RecruiterLogin";
import RecruiterRegister from "./paes/RecruiterRegister";
import Contact from "./paes/Contact";
import StudentDashboard from "./paes/student/StudentDashboard";
import RecruiterDashboard from "./paes/recruiter/RecruiterDashboard";
import PostJob from "./paes/recruiter/PostJob";
import MyJobs from "./paes/recruiter/MyJobs";
import RecruiterApplications from "./paes/recruiter/RecruiterApplications";
function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />

        <Route
          path="/student-login"
          element={<StudentLogin />}
        />

        <Route
          path="/student-register"
          element={<StudentRegister />}
        />

        <Route
          path="/recruiter-login"
          element={<RecruiterLogin />}
        />

        <Route
          path="/recruiter-register"
          element={<RecruiterRegister />}
        />

        <Route
          path="/contact"
          element={<Contact />}
        />
<Route path="/student-dashboard/*" element={<StudentDashboard />} />
      <Route
  path="/recruiter/dashboard"
  element={<RecruiterDashboard />}
/>
<Route
  path="/recruiter/post-job"
  element={<PostJob />}
/>
<Route
  path="/recruiter/jobs"
  element={<MyJobs />}
/>
<Route
  path="/recruiter/applications"
  element={<RecruiterApplications />}
/>
</Routes>
    </BrowserRouter>
  );
}

export default App;