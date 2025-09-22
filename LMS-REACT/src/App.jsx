import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import Navbar from './components/common/Navbar';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Profile from './components/common/Profile'; // Added import
import AdminDashboard from './components/admin/AdminDashboard';
import UserManagement from './components/admin/UserManagement';
import CourseManagement from './components/admin/CourseManagement';
import InstructorDashboard from './components/instructor/InstructorDashboard';
import CourseForm from './components/instructor/CourseForm';
import AssignmentForm from './components/instructor/AssignmentForm';
import SubmissionList from './components/instructor/SubmissionList';
import ForumManagement from './components/instructor/ForumManagement';
import StudentDashboard from './components/student/StudentDashboard';
import CourseList from './components/student/CourseList';
import AssignmentSubmission from './components/student/AssignmentSubmission';
import ProgressTracker from './components/student/ProgressTracker';
import Forum from './components/student/Forum';
import CertificateDownload from './components/student/CertificateDownload';

const ProtectedRoute = ({ children, roles }) => {
  const { user } = useContext(AuthContext);
  if (!user) return <Navigate to="/login" />;
  if (roles && !roles.includes(user.roles[0].name.toLowerCase())) return <Navigate to="/" />;
  return children;
};

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        
        {/* Admin Routes */}
        <Route path="/admin/dashboard" element={<ProtectedRoute roles={['admin']}><AdminDashboard /></ProtectedRoute>} />
        <Route path="/admin/users" element={<ProtectedRoute roles={['admin']}><UserManagement /></ProtectedRoute>} />
        <Route path="/admin/courses" element={<ProtectedRoute roles={['admin']}><CourseManagement /></ProtectedRoute>} />
        
        {/* Instructor Routes */}
        <Route path="/instructor/dashboard" element={<ProtectedRoute roles={['instructor']}><InstructorDashboard /></ProtectedRoute>} />
        <Route path="/instructor/courses" element={<ProtectedRoute roles={['instructor']}><CourseForm /></ProtectedRoute>} />
        <Route path="/instructor/assignments" element={<ProtectedRoute roles={['instructor']}><AssignmentForm /></ProtectedRoute>} />
        <Route path="/instructor/submissions/:courseId" element={<ProtectedRoute roles={['instructor']}><SubmissionList /></ProtectedRoute>} />
        <Route path="/instructor/forum/:courseId" element={<ProtectedRoute roles={['instructor']}><ForumManagement /></ProtectedRoute>} />
        
        {/* Student Routes */}
        <Route path="/student/dashboard" element={<ProtectedRoute roles={['student']}><StudentDashboard /></ProtectedRoute>} />
        <Route path="/student/courses" element={<ProtectedRoute roles={['student']}><CourseList /></ProtectedRoute>} />
        <Route path="/student/assignments/:courseId" element={<ProtectedRoute roles={['student']}><AssignmentSubmission /></ProtectedRoute>} />
        <Route path="/student/progress" element={<ProtectedRoute roles={['student']}><ProgressTracker /></ProtectedRoute>} />
        <Route path="/student/forum/:courseId" element={<ProtectedRoute roles={['student']}><Forum /></ProtectedRoute>} />
        <Route path="/student/certificates" element={<ProtectedRoute roles={['student']}><CertificateDownload /></ProtectedRoute>} />
        
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;