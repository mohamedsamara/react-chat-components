import { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

const Profile = lazy(() => import("pages/Profile"));
import Chats from "pages/Chats";
const Chat = lazy(() => import("pages/Chat"));
const ChatSettings = lazy(() => import("pages/ChatSettings"));
import NoMatch from "pages/NoMatch";
import { ChatLayout } from "pages/Chats/components";
import Modals from "components/Modals";
import SpinnerOverlay from "components/SpinnerOverlay";

const App = () => {
  return (
    <>
      <Modals />
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/chats" />} />
          <Route path="chats" element={<ChatLayout />}>
            <Route index element={<Chats />} />
            <Route
              path=":chatId"
              element={
                <Suspense fallback={<SpinnerOverlay />}>
                  <Chat />
                </Suspense>
              }
            />
            <Route
              path=":chatId/settings"
              element={
                <Suspense fallback={<SpinnerOverlay />}>
                  <ChatSettings />
                </Suspense>
              }
            />
          </Route>
          <Route path="profile" element={<Profile />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
