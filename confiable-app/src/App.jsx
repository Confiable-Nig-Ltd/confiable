import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import Protected from "./components/auth/Protected";
import MainLayout from "./layouts/MainLayout";
import AppLayout from "./layouts/AppLayout";

//Pages
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import Payroll from "./pages/Payroll";
import Invoices from "./pages/Invoices";
import Banking from "./pages/Banking";
import Inventory from "./pages/Inventory";
import Settings from "./pages/Settings";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes with MainLayout */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        </Route>

        {/* Protected routes with AppLayout */}
        <Route element={<AppLayout />}>
          <Route
            path="/dashboard"
            element={
              <Protected>
                <Dashboard />
              </Protected>
            }
          />
          <Route
            path="/employees"
            element={
              <Protected>
                <Employees />
              </Protected>
            }
          />
          <Route
            path="/payroll"
            element={
              <Protected>
                <Payroll />
              </Protected>
            }
          />
          <Route
            path="/inventory"
            element={
              <Protected>
                <Inventory />
              </Protected>
            }
          />
          <Route
            path="/invoices"
            element={
              <Protected>
                <Invoices />
              </Protected>
            }
          />
          <Route
            path="/banking"
            element={
              <Protected>
                <Banking />
              </Protected>
            }
          />
          <Route
            path="/settings"
            element={
              <Protected>
                <Settings />
              </Protected>
            }
          />
        </Route>
      </Routes>
    </Router>
  );
}





// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Home from "./pages/Home";
// import SignUpPage from "./pages/SignUpPage";
// import LoginPage from "./pages/LoginPage";
// import Employees from "./pages/Employees";
// import Dashboard from "./pages/Dashboard";

// export default function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Home />}></Route>
//         <Route path="/signup" element={<SignUpPage />}></Route>
//         <Route path="/login" element={<LoginPage />}></Route>
//         <Route path="/employees" element={<Employees />}></Route>
//         <Route path="/dashboard" element={<Dashboard />}></Route>
//       </Routes>
//     </Router>
//   );
// }
