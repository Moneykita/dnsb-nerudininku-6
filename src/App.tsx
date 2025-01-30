import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import Announcements from "./pages/Announcements";
import Legal from "./pages/Legal";
import Renovation from "./pages/Renovation";
import Emergency from "./pages/Emergency";
import Contacts from "./pages/Contacts";
import News from "./pages/News";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/about" element={<About />} />
        <Route path="/announcements" element={<Announcements />} />
        <Route path="/legal" element={<Legal />} />
        <Route path="/renovation" element={<Renovation />} />
        <Route path="/emergency" element={<Emergency />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/news" element={<News />} />
      </Routes>
    </Router>
  )
}

export default App;
