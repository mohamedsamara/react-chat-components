import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Chats from "pages/Chats";
import Chat from "pages/Chat";
import ChatSettings from "pages/ChatSettings";
import NoMatch from "pages/NoMatch";
import { ChatLayout } from "./pages/Chats/components";
import Modals from "./components/Modals";

const App = () => {
  return (
    <>
      <Modals />
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/chats" />} />
          <Route path="chats" element={<ChatLayout />}>
            <Route index element={<Chats />} />
            <Route path=":chatId" element={<Chat />} />
            <Route path=":chatId/settings" element={<ChatSettings />} />
          </Route>
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
