import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import AdminLayout from './components/layout/AdminLayout';
import Home from './pages/Home';
import ExamDetail from './pages/ExamDetail';
import CategoryPage from './pages/CategoryPage';
import SearchResults from './pages/SearchResults';
import ExamCalendar from './pages/ExamCalendar';
import StudyResources from './pages/StudyResources';
import ResultsPage, { AdmitCardsPage } from './pages/ResultsPage';
import AnswerKeysPage from './pages/AnswerKeysPage';
import AdminLogin from './pages/admin/AdminLogin';
import Dashboard from './pages/admin/Dashboard';
import ManageExams from './pages/admin/ManageExams';
import ManageCategories from './pages/admin/ManageCategories';
import ManageHomepage from './pages/admin/ManageHomepage';
import ManageResults from './pages/admin/ManageResults';
import ManageAdmitCards from './pages/admin/ManageAdmitCards';
import ManageAnswerKeys from './pages/admin/ManageAnswerKeys';
import ManageStudyResources from './pages/admin/ManageStudyResources';

const UserLayout = () => (
  <div className="flex flex-col min-h-screen">
    <Navbar />
    <main className="flex-1">
      <Outlet />
    </main>
    <Footer />
  </div>
);

const App = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <ScrollToTop />
          <Routes>
            {/* Public Routes */}
            <Route element={<UserLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/exam/:id" element={<ExamDetail />} />
              <Route path="/category/:slug" element={<CategoryPage />} />
              <Route path="/search" element={<SearchResults />} />
              <Route path="/calendar" element={<ExamCalendar />} />
              <Route path="/study-resources" element={<StudyResources />} />
              <Route path="/results" element={<ResultsPage />} />
              <Route path="/admit-cards" element={<AdmitCardsPage />} />
              <Route path="/answer-keys" element={<AnswerKeysPage />} />
            </Route>

            {/* Admin Routes */}
            <Route path="/admin" element={<AdminLogin />} />
            <Route element={<AdminLayout />}>
              <Route path="/admin/dashboard" element={<Dashboard />} />
              <Route path="/admin/exams" element={<ManageExams />} />
              <Route path="/admin/categories" element={<ManageCategories />} />
              <Route path="/admin/homepage" element={<ManageHomepage />} />
              <Route path="/admin/results" element={<ManageResults />} />
              <Route path="/admin/admit-cards" element={<ManageAdmitCards />} />
              <Route path="/admin/answer-keys" element={<ManageAnswerKeys />} />
              <Route path="/admin/study-resources" element={<ManageStudyResources />} />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
