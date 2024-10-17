import "mapbox-gl/dist/mapbox-gl.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import PrivateRoute from "./components/PrivateRoute";
import Dashboard from "./views/Dashboard/Dashboard";
import ProjectList from "./views/Dashboard/ProjectListPage/ProjectList";
import ProjectPage from "./views/Dashboard/ProjectPage/ProjectPage";
import ReportPage from "./views/Dashboard/ReportPage/ReportPage";
import SurveyProgram from "./views/Dashboard/SurveyProgramPage/SurveyProgram/SurveyProgram";
import SurveyProgramPage from "./views/Dashboard/SurveyProgramPage/SurveyProgramPage";
import Footer from "./views/Footer/Footer";
import Homepage from "./views/Homepage/Homepage";
import Login from "./views/Login/Login";
import Navbar from "./views/Navbar/Navbar";
import Register from "./views/Register/Register";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
        </Routes>
        <div className="mainContent">
          <Routes>
            <Route path="/login" element={<Login />} />

            <Route path="/register" element={<Register />} />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/dashboard/projects"
              element={
                <PrivateRoute>
                  <ProjectPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/dashboard/surveyPrograms"
              element={
                <PrivateRoute>
                  <SurveyProgram />
                </PrivateRoute>
              }
            />
            <Route
              path="/dashboard/surveyPrograms/:id"
              element={
                <PrivateRoute>
                  <SurveyProgramPage />
                </PrivateRoute>
              }
            />

            <Route
              path="/dashboard/surveyProgram/:id/reports"
              element={
                <PrivateRoute>
                  <ReportPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/projects"
              element={
                <PrivateRoute>
                  <ProjectList />
                </PrivateRoute>
              }
            />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
