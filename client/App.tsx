import { BrowserRouter, Routes, Route } from "react-router-dom";
import Updates from "./pages/Updates";
import StatusDetail from "./pages/StatusDetail";
import StatusReaction from "./pages/StatusReaction";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <div className="App min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="mobile-container">
          <Routes>
            <Route path="/" element={<Updates />} />
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
