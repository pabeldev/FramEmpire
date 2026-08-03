import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/public/HeroSection';
import FeaturedGameSection from './components/public/FeaturedGameSection';
import ServicesSection from './components/public/ServicesSection';
import PortfolioSection from './components/public/PortfolioSection';
import AboutSection from './components/public/AboutSection';
import TeamCaptainSection from './components/public/TeamCaptainSection';
import ClientEstimator from './components/public/ClientEstimator';
import Footer from './components/public/Footer';
import WhatsAppWidget from './components/public/WhatsAppWidget';

import TicTacToeGamePage from './components/public/TicTacToeGamePage';
import EmployeeLoginModal from './components/auth/EmployeeLoginModal';
import AdminDashboard from './components/admin/AdminDashboard';
import { PORTFOLIO_PROJECTS } from './data/creativeData';

export default function App() {
  const [viewMode, setViewMode] = useState('public'); // 'public' | 'admin' | 'tictactoe'
  const [userRole, setUserRole] = useState('Admin / Executive');
  const [estimatorOpen, setEstimatorOpen] = useState(false);
  const [estimatorService, setEstimatorService] = useState('motion-graphics');
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  // Dynamic Portfolio Projects State (Supports YouTube, Vimeo, Behance embeds added via Admin Panel)
  const [projectsList, setProjectsList] = useState(PORTFOLIO_PROJECTS);

  // URL Path & Hash Listener for /admin and /tictactoe routes
  useEffect(() => {
    const checkRoute = () => {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      
      if (path === '/admin' || path.startsWith('/admin') || hash === '#admin') {
        setViewMode('admin');
        setLoginModalOpen(true);
      } else if (path === '/tictactoe' || path === '/tic-tac-toe' || path.startsWith('/tictactoe') || hash === '#tictactoe') {
        setViewMode('tictactoe');
      } else {
        setViewMode('public');
      }
    };

    checkRoute();
    window.addEventListener('popstate', checkRoute);
    return () => window.removeEventListener('popstate', checkRoute);
  }, []);

  // Update URL Bar when switching viewMode
  useEffect(() => {
    if (viewMode === 'admin') {
      if (window.location.pathname !== '/admin') {
        window.history.pushState(null, '', '/admin');
      }
    } else if (viewMode === 'tictactoe') {
      if (window.location.pathname !== '/tictactoe') {
        window.history.pushState(null, '', '/tictactoe');
      }
    } else {
      if (window.location.pathname === '/admin' || window.location.pathname === '/tictactoe' || window.location.pathname === '/tic-tac-toe') {
        window.history.pushState(null, '', '/');
      }
    }
  }, [viewMode]);

  const handleOpenEstimatorWithService = (serviceId) => {
    setEstimatorService(serviceId);
    setEstimatorOpen(true);
  };

  const handleAddProject = (newProject) => {
    setProjectsList((prev) => [newProject, ...prev]);
  };

  const handleDeleteProject = (id) => {
    setProjectsList((prev) => prev.filter((p) => p.id !== id));
  };

  const handleSignOutAdmin = () => {
    setViewMode('public');
    window.history.pushState(null, '', '/');
  };

  return (
    <div className="min-h-screen bg-[#070913] text-slate-100 font-sans selection:bg-cyan-500 selection:text-black relative">
      
      {/* Sticky Glassmorphism Header Navbar */}
      <Navbar 
        viewMode={viewMode}
        onToggleViewMode={() => {
          if (viewMode === 'public') {
            setViewMode('admin');
            setLoginModalOpen(true);
          } else {
            setViewMode('public');
            window.history.pushState(null, '', '/');
          }
        }}
        userRole={userRole}
        setUserRole={setUserRole}
        onOpenEstimator={() => setEstimatorOpen(true)}
        onSignOut={handleSignOutAdmin}
      />

      {/* Main Views Router */}
      {viewMode === 'public' ? (
        <main className="space-y-0">
          <HeroSection 
            onExplorePortfolio={() => {
              const el = document.getElementById('portfolio');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            onOpenEstimator={() => setEstimatorOpen(true)}
          />

          <FeaturedGameSection 
            onOpenGameDetails={() => {
              setViewMode('tictactoe');
              window.history.pushState(null, '', '/tictactoe');
            }}
          />

          <ServicesSection 
            onSelectService={handleOpenEstimatorWithService}
            onOpenEstimator={() => setEstimatorOpen(true)}
          />

          <PortfolioSection projects={projectsList} />

          <AboutSection onOpenEstimator={() => setEstimatorOpen(true)} />

          <TeamCaptainSection />

          <Footer onOpenEstimator={() => setEstimatorOpen(true)} />
        </main>
      ) : viewMode === 'tictactoe' ? (
        <TicTacToeGamePage 
          onBackToHome={() => {
            setViewMode('public');
            window.history.pushState(null, '', '/');
          }}
          onOpenEstimator={() => setEstimatorOpen(true)}
        />
      ) : (
        <AdminDashboard 
          userRole={userRole}
          projects={projectsList}
          onAddProject={handleAddProject}
          onDeleteProject={handleDeleteProject}
          onSwitchToPublic={() => {
            setViewMode('public');
            window.history.pushState(null, '', '/');
          }}
        />
      )}

      {/* Interactive Project Cost Estimator Modal */}
      <ClientEstimator 
        isOpen={estimatorOpen}
        onClose={() => setEstimatorOpen(false)}
        initialServiceId={estimatorService}
      />

      {/* Employee & Admin Login Modal */}
      <EmployeeLoginModal 
        isOpen={loginModalOpen}
        onClose={() => {
          setLoginModalOpen(false);
          if (viewMode === 'admin') {
            setViewMode('public');
            window.history.pushState(null, '', '/');
          }
        }}
        onSuccess={(role) => {
          setUserRole(role);
          setViewMode('admin');
          setLoginModalOpen(false);
        }}
      />

      {/* Always-On-Display WhatsApp Live Chat Widget */}
      <WhatsAppWidget />

    </div>
  );
}
