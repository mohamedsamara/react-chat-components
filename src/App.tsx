import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";

// import Chats from "pages/Chats";
import Chat from "pages/Chat";
import ChatSettings from "pages/ChatSettings";
import NoMatch from "pages/NoMatch";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/chats" />} />
        <Route
          path="chats"
          element={
            <div>
              <Outlet />
            </div>
          }
        >
          <Route path=":chatUid" element={<Chat />} />
          <Route path=":chatUid/settings" element={<ChatSettings />} />
        </Route>
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </Router>
  );
};

export default App;
