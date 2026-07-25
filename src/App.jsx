import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/public/HeroSection';
import ServicesSection from './components/public/ServicesSection';
import PortfolioSection from './components/public/PortfolioSection';
import AboutSection from './components/public/AboutSection';
import ClientEstimator from './components/public/ClientEstimator';
import Footer from './components/public/Footer';

import EmployeeLoginModal from './components/auth/EmployeeLoginModal';
import AdminDashboard from './components/admin/AdminDashboard';
import { PORTFOLIO_PROJECTS } from './data/creativeData';

export default function App() {
  const [viewMode, setViewMode] = useState('public'); // 'public' | 'admin'
  const [userRole, setUserRole] = useState('Admin / Executive');
  const [estimatorOpen, setEstimatorOpen] = useState(false);
  const [estimatorService, setEstimatorService] = useState('motion-graphics');
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  // Dynamic Portfolio Projects State (Supports YouTube, Vimeo, Behance embeds added via Admin Panel)
  const [projectsList, setProjectsList] = useState(PORTFOLIO_PROJECTS);

  const handleAddProject = (newProject) => {
    setProjectsList([newProject, ...projectsList]);
  };

  const handleDeleteProject = (projectId) => {
    setProjectsList(projectsList.filter(p => p.id !== projectId));
  };

  const handleOpenEstimator = (serviceId = 'motion-graphics') => {
    setEstimatorService(serviceId);
    setEstimatorOpen(true);
  };

  const handleLoginSuccess = (role) => {
    setUserRole(role);
    setViewMode('admin');
  };

  const handleSignOut = () => {
    setViewMode('public');
  };

  const scrollToPortfolio = () => {
    const el = document.getElementById('portfolio');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#070913] text-slate-100 flex flex-col font-['Plus_Jakarta_Sans']">
      
      {/* Global Navbar */}
      <Navbar
        viewMode={viewMode}
        onSignOut={handleSignOut}
        userRole={userRole}
        setUserRole={setUserRole}
        onOpenEstimator={() => handleOpenEstimator()}
        onOpenLoginModal={() => setLoginModalOpen(true)}
      />

      {/* Main View Router */}
      {viewMode === 'public' ? (
        <main className="flex-1">
          <HeroSection
            onExplorePortfolio={scrollToPortfolio}
            onOpenEstimator={() => handleOpenEstimator()}
            onSwitchToAdmin={() => setLoginModalOpen(true)}
          />
          <ServicesSection
            onOpenEstimator={(serviceId) => handleOpenEstimator(serviceId)}
          />
          <PortfolioSection projects={projectsList} />
          <AboutSection
            onOpenEstimator={() => handleOpenEstimator()}
          />
          <Footer
            onOpenEstimator={() => handleOpenEstimator()}
            onOpenLoginModal={() => setLoginModalOpen(true)}
          />
        </main>
      ) : (
        <main className="flex-1">
          <AdminDashboard
            userRole={userRole}
            projects={projectsList}
            onAddProject={handleAddProject}
            onDeleteProject={handleDeleteProject}
          />
        </main>
      )}

      {/* Interactive Project Estimator Modal for Clients */}
      <ClientEstimator
        isOpen={estimatorOpen}
        onClose={() => setEstimatorOpen(false)}
        initialService={estimatorService}
      />

      {/* Staff & Employee Authentication Modal */}
      <EmployeeLoginModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

    </div>
  );
}
