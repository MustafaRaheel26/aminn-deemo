/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { DataProvider, useData } from "./hooks/useData";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Login from "./pages/Login";
import SuperAdminDashboard from "./pages/SuperAdminDashboard";
import RestaurantAdminDashboard from "./pages/RestaurantAdminDashboard";
import RestaurantsPage from "./pages/RestaurantsPage";
import RestaurantDetailPage from "./pages/RestaurantDetailPage";
import BranchManagementPage from "./pages/BranchManagementPage";
import DigitalScreensPage from "./pages/DigitalScreensPage";
import PromotionsPage from "./pages/PromotionsPage";
import DigitalMenuBoardPreview from "./pages/DigitalMenuBoardPreview";

function MainAppContent() {
  const { currentUser, loading } = useData();
  const [currentPath, setCurrentPath] = useState(
    window.location.hash || "#/login",
  );

  // URL Hash listener for seamless client state routing & history back triggers
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash || "#/login";
      setCurrentPath(hash);
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // Automatic session path-synchronizer to prevent login traps and ensure smooth redirects
  useEffect(() => {
    if (loading) return;

    if (currentUser) {
      if (
        currentPath === "#/login" ||
        currentPath === "" ||
        currentPath === "#/"
      ) {
        const target =
          currentUser.role === "super_admin"
            ? "#/super-dashboard"
            : "#/restaurant-dashboard";
        window.location.hash = target;
        setCurrentPath(target);
      }
    } else {
      if (currentPath !== "#/login" && !currentPath.startsWith("#/preview/")) {
        window.location.hash = "#/login";
        setCurrentPath("#/login");
      }
    }
  }, [currentUser, currentPath, loading]);

  // Show a standard elegant skeleton loader if first loading from LocalStorage
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white font-mono text-xs">
        <div className="flex flex-col items-center gap-3">
          <div className="border-2 border-brand-500 border-t-transparent h-6 w-6 rounded-full animate-spin" />
          <span>Synchronizing Amin Clusters...</span>
        </div>
      </div>
    );
  }

  // Handle Full-Screen Digital Counter Displays (No admin rails, raw physical aspect ratio)
  if (currentPath.startsWith("#/preview/")) {
    const screenParts = currentPath.split("/preview/");
    const screenId = screenParts[1] || undefined;
    return <DigitalMenuBoardPreview screenId={screenId} />;
  }

  // Handle Login Gate
  if (currentPath === "#/login" || !currentUser) {
    return <Login />;
  }

  // Route Renderer Helper
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleToggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  const handleCloseSidebar = () => setIsSidebarOpen(false);

  const renderActiveView = () => {
    switch (currentPath) {
      case "#/super-dashboard":
        return <SuperAdminDashboard />;

      case "#/restaurant-dashboard":
        return <RestaurantAdminDashboard />;

      case "#/restaurants":
        return <RestaurantsPage />;

      case "#/restaurant-detail":
        return <RestaurantDetailPage />;

      case "#/branches":
        return <BranchManagementPage />;

      case "#/screens":
        return <DigitalScreensPage />;

      case "#/promotions":
        return <PromotionsPage />;

      default:
        // Smart fallbacks based on user permissions
        return currentUser.role === "super_admin" ? (
          <SuperAdminDashboard />
        ) : (
          <RestaurantAdminDashboard />
        );
    }
  };

  return (
    <div
      className="flex bg-slate-50 min-h-screen text-slate-800"
      id="main-saas-layout"
    >
      {/* Desktop sidebar */}
      <Sidebar currentPath={currentPath} className="hidden lg:flex" />

      {/* Workspace content on right */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        {/* SaaS Top Header containing profile widgets & scope switchers */}
        <Header onToggleSidebar={handleToggleSidebar} />

        {/* Workspace Inner Viewport */}
        <main className="p-6 lg:p-8 flex-1 overflow-y-auto max-w-7xl w-full mx-auto">
          {renderActiveView()}
        </main>
      </div>

      {/* Mobile / Tablet sidebar drawer */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm"
            aria-label="Close sidebar"
            onClick={handleCloseSidebar}
          />
          <div className="relative h-full w-full max-w-xs bg-white shadow-2xl border-r border-slate-200">
            <Sidebar currentPath={currentPath} className="h-full w-full" />
          </div>
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <DataProvider>
      <MainAppContent />
    </DataProvider>
  );
}
