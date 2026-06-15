import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import { ExplorePage } from './components/ExplorePage';
import { MyEventsPage } from './components/MyEventsPage';
import { SocialPage } from './components/SocialPage';
import { ProfilePage } from './components/ProfilePage';
import { EventsProvider } from './contexts/EventsContext';
import { SocialProvider } from './contexts/SocialContext';
import { UserPreferencesProvider } from './contexts/UserPreferencesContext';
import '../styles/calendar.css';

export default function App() {
  return (
    <EventsProvider>
      <UserPreferencesProvider>
        <SocialProvider>
          <BrowserRouter basename={import.meta.env.BASE_URL}>
            <div className="size-full bg-[#e5e7eb] flex items-center justify-center">
              <div className="w-[390px] h-[844px] bg-[#f9f9f9] overflow-hidden relative shadow-[0_0_40px_rgba(0,0,0,0.2)] rounded-[32px]">
                <Routes>
                  <Route path="/" element={<Navigate to="/explore" replace />} />
                  <Route path="/explore" element={<ExplorePage />} />
                  <Route path="/create" element={<MyEventsPage />} />
                  <Route path="/create/category" element={<Navigate to="/create" replace />} />
                  <Route path="/create/time" element={<Navigate to="/create" replace />} />
                  <Route path="/create/location" element={<Navigate to="/create" replace />} />
                  <Route path="/social" element={<SocialPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                </Routes>
              </div>
            </div>
          </BrowserRouter>
        </SocialProvider>
      </UserPreferencesProvider>
    </EventsProvider>
  );
}
