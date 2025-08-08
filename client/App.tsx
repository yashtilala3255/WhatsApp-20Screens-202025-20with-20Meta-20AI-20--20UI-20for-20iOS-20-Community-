import { BrowserRouter, Routes, Route } from "react-router-dom";
import Updates from "./pages/Updates";
import Calls from "./pages/Calls";
import Communities from "./pages/Communities";
import Chat from "./pages/Chat";
import MetaAI from "./pages/MetaAI";
import ContactInfo from "./pages/ContactInfo";
import Settings from "./pages/Settings";
import StatusDetail from "./pages/StatusDetail";
import StatusReaction from "./pages/StatusReaction";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Chats from "./pages/Chats";
import NewChat from "./pages/NewChat";
import Profile from "./pages/Profile";
import Contacts from "./pages/Contacts";
import Search from "./pages/Search";
import NewGroup from "./pages/NewGroup";
import GroupInfo from "./pages/GroupInfo";
import Archive from "./pages/Archive";
import StarredMessages from "./pages/StarredMessages";
import MediaGallery from "./pages/MediaGallery";
import Camera from "./pages/Camera";
import StatusCamera from "./pages/StatusCamera";
import ForwardMessage from "./pages/ForwardMessage";
import PrivacySettings from "./pages/PrivacySettings";
import NotificationSettings from "./pages/NotificationSettings";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <div className="App min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="mobile-container">
          <Routes>
            <Route path="/" element={<Updates />} />
            <Route path="/calls" element={<Calls />} />
            <Route path="/communities" element={<Communities />} />
            <Route path="/chat/:id" element={<Chat />} />
            <Route path="/meta-ai" element={<MetaAI />} />
            <Route path="/contact/:id" element={<ContactInfo />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/chats" element={<Chats />} />
            <Route path="/new-chat" element={<NewChat />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/search" element={<Search />} />
            <Route path="/new-group" element={<NewGroup />} />
            <Route path="/group-info/:id" element={<GroupInfo />} />
            <Route path="/archive" element={<Archive />} />
            <Route path="/starred-messages" element={<StarredMessages />} />
            <Route path="/media-gallery/:id" element={<MediaGallery />} />
            <Route path="/camera" element={<Camera />} />
            <Route path="/status-camera" element={<StatusCamera />} />
            <Route path="/forward-message/:messageId" element={<ForwardMessage />} />
            <Route path="/privacy-settings" element={<PrivacySettings />} />
            <Route path="/notification-settings" element={<NotificationSettings />} />
            <Route path="/status/:id" element={<StatusDetail />} />
            <Route path="/status/:id/react" element={<StatusReaction />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
