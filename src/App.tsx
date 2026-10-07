import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { BottomNav } from './components/BottomNav';

// All 13 Screens
import { Screen01Language } from './pages/Screen01Language';
import { Screen02Splash } from './pages/Screen02Splash';
import { Screen03Onboarding } from './pages/Screen03Onboarding';
import { Screen04Location } from './pages/Screen04Location';
import { Screen05FarmInfo } from './pages/Screen05FarmInfo';
import { Screen06Priorities } from './pages/Screen06Priorities';
import { Screen07NASAInsights } from './pages/Screen07NASAInsights';
import { Screen08Dashboard } from './pages/Screen08Dashboard';
import { Screen09RotationScore } from './pages/Screen09RotationScore';
import { Screen10RotationExplorer } from './pages/Screen10RotationExplorer';
import { Screen11RotationDetails } from './pages/Screen11RotationDetails';
import { Screen12CompareStrategies } from './pages/Screen12CompareStrategies';
import { Screen13FinalSummary } from './pages/Screen13FinalSummary';
import { ProfileSettings } from './pages/ProfileSettings';

const MainRouter: React.FC = () => {
  const { currentScreen } = useApp();

  // Full-screen onboarding screens (without navbar/bottom nav)
  if (currentScreen === 'language') return <Screen01Language />;
  if (currentScreen === 'splash') return <Screen02Splash />;
  if (currentScreen === 'onboarding') return <Screen03Onboarding />;

  return (
    <div className="min-h-screen bg-[#F4F7F4] flex flex-col justify-between font-sans">
      <Navbar />

      <main className="flex-1 w-full">
        {currentScreen === 'location' && <Screen04Location />}
        {currentScreen === 'farm_info' && <Screen05FarmInfo />}
        {currentScreen === 'priorities' && <Screen06Priorities />}
        {currentScreen === 'nasa_insights' && <Screen07NASAInsights />}
        {currentScreen === 'dashboard' && <Screen08Dashboard />}
        {currentScreen === 'rotation_score' && <Screen09RotationScore />}
        {currentScreen === 'rotation_explorer' && <Screen10RotationExplorer />}
        {currentScreen === 'rotation_details' && <Screen11RotationDetails />}
        {currentScreen === 'strategy_compare' && <Screen12CompareStrategies />}
        {currentScreen === 'final_summary' && <Screen13FinalSummary />}
        {currentScreen === 'profile_settings' && <ProfileSettings />}
      </main>

      <BottomNav />
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <MainRouter />
    </AppProvider>
  );
}

export default App;

