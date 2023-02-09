import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import * as React from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";

import StudentDashboard from "./pages/StudentDashboard";
import StudentFeed from "./pages/StudentFeed";

import TeacherLayout from "./components/teacher/TeacherLayout";
import TeacherDashboard from "./pages/TeacherDashboard";
import TeacherFeed from "./pages/TeacherFeed";

import StudentLayout from "./components/student/StudentLayout";
import VideoApp from "./components/test/VideoApp";
import Quiz from "./pages/Quiz";

import BasicTable from "./components/test/BasicTable";
import CreateClassroom from "./pages/CreateClassroom";

import AdminLayout from "./components/admin/AdminLayout";
import AdminTable from "./components/admin/AdminTable";
import ClassroomTable from "./components/classroom/ClassroomTable";
import {
  default as JoinClass,
  default as ManageAccount,
} from "./components/JoinClass";
import StudentActivity from "./components/student/StudentActivity";
import StudentTable from "./components/student/StudentTable";
import TeacherTable from "./components/teacher/TeacherTable";
import Admin from "./pages/admin/Admin";
import AdminLogin from "./pages/admin/AdminLogin";
import CreateAdmin from "./pages/admin/CreateAdmin";
import CreateQuiz from "./pages/CreateQuiz";
import EditPassword from "./pages/EditPassword";
import EditProfile from "./pages/EditProfile";
import HandlingActivity from "./pages/HandlingActivity";
import InstructorEditPassword from "./pages/InstructorEditPassword";
import InstructorEditProfile from "./pages/InstructorEditProfile";
import Layout from "./components/test/layouts/Layout";
import TodoManager from "./components/test/To Do App/TodoManager";
import { IconButton } from "@material-ui/core";
import { AddCircle, ViewModule } from "@material-ui/icons";
import Dashboard from "./components/test/Dashboard";
import { useState } from "react";
import Cookies from "js-cookie";
import { useEffect } from "react";
import axios from "axios";
import PDFPreview from "./components/test/PDFPreview";

const theme = createTheme({
  typography: {
    fontFamily: "Quicksand",
  },
  palette: {
    primary: {
      main: "#111",
    },
    secondary: {
      main: "#162276",
    },
  },
});

function App() {
  // const [userRole, setUserRole] = useState("Guest");
  // const [Cookie, setCookie] = useState(null);

  // const checkRoles = () => {
  //   console.log("load");
  //   if (Cookies.get("idLoggedIn")) {
  //     setUserRole("Student");
  //     setCookie(Cookies.get("idLoggedIn"));
  //     showStudentsInfo(Cookie);
  //   } else if (Cookies.get("instructorID")) {
  //     setUserRole("Instructor");
  //     setCookie(Cookies.get("instructorID"));
  //     showInstructorsInfo(Cookie);
  //   } else if (Cookies.get("adminID")) {
  //     setUserRole("Admin");
  //     setCookie(Cookies.get("adminID"));
  //   } else {
  //     setUserRole("Guest");
  //     setCookie(null);
  //   }
  // };

  // // PASS THE USER INFO to the User Preferences
  // const instructorsEndpointID =
  //   "https://ursacapi.000webhostapp.com/api/getInstructors.php";
  // const studentsEndpointID =
  //   "https://ursacapi.000webhostapp.com/api/getStudents.php";
  // const [userName, setUserName] = useState("");
  // const showStudentsInfo = async (data) => {
  //   if (data) {
  //     try {
  //       const response = await axios.post(
  //         studentsEndpointID,
  //         JSON.stringify(data)
  //       );
  //       setUserName(
  //         response.data[0].firstName + " " + response.data[0].lastName
  //       );
  //     } catch (error) {
  //       console.log("Error: " + error);
  //     }
  //   }
  // };

  // const showInstructorsInfo = async (data) => {
  //   if (data) {
  //     try {
  //       const response = await axios.post(
  //         instructorsEndpointID,
  //         JSON.stringify(data)
  //       );
  //       setUserName(
  //         response.data[0].firstName + " " + response.data[0].lastName
  //       );
  //     } catch (error) {
  //       console.log("Error: " + error);
  //     }
  //   }
  // };

  // const logout = () => {
  //   Cookies.remove("idLoggedIn");
  //   Cookies.remove("instructorID");
  //   Cookies.remove("userInfo");
  //   setUserName("");
  //   setUserRole("Guest");
  // };

  // const userIconLinks = [
  //   <IconButton size="medium">
  //     <ViewModule style={{ color: "white" }} />
  //   </IconButton>,
  //   <IconButton size="medium">
  //     <AddCircle style={{ color: "white" }} />
  //   </IconButton>,
  // ];

  // useEffect(() => {
  //   checkRoles();
  // }, [Cookie, userName]);

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          {/* AUTHENTICATIONS */}
          <Route path="/" element={<Login />} />

          <Route path="/register" element={<Register />} />

          {/* STUDENT */}
          <Route
            path="/studentDashboard"
            element={
              <StudentLayout>
                <StudentDashboard />
              </StudentLayout>
            }
          />

          <Route
            path="/studentFeed/:id"
            element={
              <StudentLayout>
                <StudentFeed />
              </StudentLayout>
            }
          />

          <Route
            path="/editPassword"
            element={
              <StudentLayout>
                <EditPassword />
              </StudentLayout>
            }
          />

          <Route
            path="/editProfile"
            element={
              <StudentLayout>
                <EditProfile />
              </StudentLayout>
            }
          />

          {/* TEACHER */}
          <Route
            path="/teacherDashboard"
            element={
              <TeacherLayout>
                <TeacherDashboard />
              </TeacherLayout>
            }
          />

          <Route
            path="/teacherFeed/:id"
            element={
              <TeacherLayout>
                <TeacherFeed />
              </TeacherLayout>
            }
          />

          <Route
            path="/instructorEditPassword"
            element={
              <TeacherLayout>
                <InstructorEditPassword />
              </TeacherLayout>
            }
          />

          <Route
            path="/instructorEditProfile"
            element={
              <TeacherLayout>
                <InstructorEditProfile />
              </TeacherLayout>
            }
          />

          <Route
            path="/handleActivity/:id"
            element={
              <TeacherLayout>
                <HandlingActivity />
              </TeacherLayout>
            }
          />

          {/* ADMIN */}

          <Route path="/adminLogin" element={<AdminLogin />} />

          <Route
            path="/admin"
            element={
              <AdminLayout>
                <Admin />
              </AdminLayout>
            }
          />

          <Route
            path="/studentList"
            element={
              <AdminLayout>
                <StudentTable />
              </AdminLayout>
            }
          />

          <Route
            path="/instructorList"
            element={
              <AdminLayout>
                <TeacherTable />
              </AdminLayout>
            }
          />

          <Route
            path="/adminList"
            element={
              <AdminLayout>
                <AdminTable />
              </AdminLayout>
            }
          />

          <Route
            path="/classroomList"
            element={
              <AdminLayout>
                <ClassroomTable />
              </AdminLayout>
            }
          />

          <Route
            path="/createAdmin"
            element={
              <AdminLayout>
                <CreateAdmin />
              </AdminLayout>
            }
          />

          {/* OTHER COMPONENTS */}
          <Route
            path="/createTeacherClassroom"
            element={
              <TeacherLayout>
                <CreateClassroom />
              </TeacherLayout>
            }
          />
          <Route
            path="/createStudentClassroom"
            element={
              <StudentLayout>
                <CreateClassroom />
              </StudentLayout>
            }
          />

          <Route
            path="/joinClassroom"
            element={
              <StudentLayout>
                <JoinClass />
              </StudentLayout>
            }
          />

          <Route
            path="/studentActivity/:id"
            element={
              <StudentLayout>
                <StudentActivity />
              </StudentLayout>
            }
          />

          <Route path="/manageAccount" element={<ManageAccount />} />

          <Route path="/quiz" element={<Quiz />} />
          <Route
            path="/createQuiz"
            element={
              <StudentLayout>
                <CreateQuiz />
              </StudentLayout>
            }
          />

          <Route path="/videoApp" element={<VideoApp />} />

          <Route path="/basicTable" element={<BasicTable />} />

          {/* NEW LAYOUT */}
          <Route
            path="/pdf"
            element={
             <PDFPreview />
            }
          />

          {/* <Route
            path="/studentsFeed/:id"
            element={
              <Layout
                linksFromApp={userIconLinks}
                userNameFromApp={userName}
                roleFromApp={userRole}
                logout={logout}
              >
                <StudentFeed />
              </Layout>
            }
          />

          <Route
            path="/instructorsDashboard"
            element={
              <Layout
                linksFromApp={userIconLinks}
                userNameFromApp={userName}
                roleFromApp={userRole}
                logout={logout}
              >
                <TeacherDashboard />
              </Layout>
            }
          /> */}

          <Route path="/practice" element={<TodoManager />} />

        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
