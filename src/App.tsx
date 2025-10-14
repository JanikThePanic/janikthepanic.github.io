import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./global.css";

import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Knickknacks from "./pages/Knickknacks";
import Resume from "./pages/Resume";
import Contact from "./pages/Contact";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="projects" element={<Projects />} />
        <Route path="knickknacks" element={<Knickknacks />} />
        <Route path="resume" element={<Resume />} />
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<p>There's nothing here: 404!</p>} />
      </Routes>
    </BrowserRouter>
  );
}
