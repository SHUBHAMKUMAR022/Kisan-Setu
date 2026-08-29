/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { AppHeader } from './components/AppHeader';
import { Sidebar } from './components/Sidebar';
import { BottomNavigation } from './components/BottomNavigation';
import { OfflineBanner } from './components/OfflineBanner';
import { VoiceAssistantModal } from './components/VoiceAssistantModal';
import { BiometricModal } from './components/BiometricModal';
import { AuthModal } from './components/AuthModal';

import { LandingHero } from './components/LandingHero';
import { DashboardView } from './components/DashboardView';
import { CenterFinder } from './components/CenterFinder';
import { SlotBooking } from './components/SlotBooking';
import { LiveQueue } from './components/LiveQueue';
import { ProcurementTracker } from './components/ProcurementTracker';
import { PaymentTracker } from './components/PaymentTracker';
import { YieldDashboard } from './components/YieldDashboard';
import { NotificationsView } from './components/NotificationsView';
import { HistoryView } from './components/HistoryView';
import { ProfileView } from './components/ProfileView';
import { HelpSupportView } from './components/HelpSupportView';
import { WeatherAdvisoryView } from './components/WeatherAdvisoryView';

const MainContent: React.FC = () => {
  const { activeTab, isAuthenticated } = useApp();

  if (!isAuthenticated) {
    return <LandingHero />;
  }

  switch (activeTab) {
    case 'dashboard':
      return <DashboardView />;
    case 'weather':
      return <WeatherAdvisoryView />;
    case 'centers':
      return <CenterFinder />;
    case 'booking':
      return <SlotBooking />;
    case 'queue':
      return <LiveQueue />;
    case 'procurement':
      return <ProcurementTracker />;
    case 'payment':
      return <PaymentTracker />;
    case 'yield':
      return <YieldDashboard />;
    case 'notifications':
      return <NotificationsView />;
    case 'history':
      return <HistoryView />;
    case 'profile':
      return <ProfileView />;
    case 'help':
      return <HelpSupportView />;
    default:
      return <DashboardView />;
  }
};

const AppShell: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans antialiased selection:bg-emerald-500 selection:text-white">
      <AppHeader />
      <OfflineBanner />

      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        {/* Desktop Sidebar */}
        <Sidebar />

        {/* Main Content Area */}
        <main className="flex-1 p-3 sm:p-6 md:p-8 max-w-5xl mx-auto w-full overflow-y-auto">
          <MainContent />
        </main>
      </div>

      {/* Mobile Navigation */}
      <BottomNavigation />

      {/* Global Modals */}
      <VoiceAssistantModal />
      <BiometricModal />
      <AuthModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppShell />
    </AppProvider>
  );
}
