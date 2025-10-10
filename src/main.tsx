import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App";
import Projects from "./pages/Projects";
import Knickknacks from "./pages/Knickknacks";
import Resume from "./pages/Resume";
import Contact from "./pages/Contact";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Root Pages */}
        <Route path="/" element={<App />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/knickknacks" element={<Knickknacks />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/contact" element={<Contact />} />

        {/* 404 */}
        <Route path="*" element={<p>There's nothing here: 404!</p>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
