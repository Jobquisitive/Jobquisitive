import {
  Error,
  Landing,
  Register,
  RegisterRecruiter,
  ProtectedRoute,
} from "./pages";
import {
  AddJob,
  AllJobs,
  Stats,
  Profile,
  SharedLayout,
} from "./pages/dashboard";
import {
  RecruiterProfile,
}
from "./pages/recruiter-dashboard"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAppContext } from './Context/appContext.js';

function App() {
  const { user, recruiter } = useAppContext();
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <SharedLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Stats />} />
          <Route path="all-jobs" element={<AllJobs />} />
          <Route path="add-job" element={<AddJob />} />
          {user && <Route path="profile" element={<Profile />} />}
          {recruiter && <Route path="profile" element={<RecruiterProfile />} />}
        </Route>
        <Route path="/landing" element={<Landing />} />
        <Route path="/register-user" element={<Register />} />
        <Route path="/register-recruiter" element={<RegisterRecruiter />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
