import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Knickknacks from "./pages/Knickknacks";
import Resume from "./pages/Resume";
import Contact from "./pages/Contact";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Root Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/knickknacks" element={<Knickknacks />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/contact" element={<Contact />} />

        {/* 404 */}
        <Route path="*" element={<p>There's nothing here: 404!</p>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
