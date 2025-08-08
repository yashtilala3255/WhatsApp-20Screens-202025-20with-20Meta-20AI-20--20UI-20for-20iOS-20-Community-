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
