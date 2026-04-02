import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./index.css";

import Home from "./Pages/Home.jsx";
import About from "./Pages/About.jsx";
import AnimatedBackground from "./components/Background.jsx";
import Navbar from "./components/Navbar.jsx";
import Portofolio from "./Pages/Portofolio.jsx";
import ContactPage from "./Pages/Contact.jsx";
import ProjectDetails from "./components/ProjectDetail.jsx";
import WelcomeScreen from "./Pages/WelcomeScreen.jsx";
import NotFoundPage from "./Pages/404.jsx";

import { AnimatePresence } from "framer-motion";

const LandingPage = ({ showWelcome, setShowWelcome }) => (
  <>
    <AnimatePresence mode="wait">
      {showWelcome && (
        <WelcomeScreen onLoadingComplete={() => setShowWelcome(false)} />
      )}
    </AnimatePresence>

    {!showWelcome && (
      <>
        <Navbar />
        <AnimatedBackground />
        <Home />
        <About />
        <Portofolio />
        <ContactPage />
        <footer>
          <center>
            <hr className="my-3 border-gray-400 opacity-15 sm:mx-auto lg:my-6 text-center" />
            <span className="block text-sm pb-4 text-gray-500 text-center dark:text-gray-400">
              © 2025{" "}
              <a
                href="https://www.linkedin.com/in/mohammad-zalloum-36158323b/"
                className="hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Mohammad Zalloum™
              </a>
              . All Rights Reserved.
            </span>
          </center>
        </footer>
      </>
    )}
  </>
);

const ProjectPageLayout = () => (
  <>
    <ProjectDetails />
    <footer>
      <center>
        <hr className="my-3 border-gray-400 opacity-15 sm:mx-auto lg:my-6 text-center" />
        <span className="block text-sm pb-4 text-gray-500 text-center dark:text-gray-400">
          © 2025{" "}
          <a
            href="https://www.linkedin.com/in/mohammad-zalloum-36158323b/"
            className="hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Mohammad Zalloum™
          </a>
          . All Rights Reserved.
        </span>
      </center>
    </footer>
  </>
);

export default function App() {
  const [showWelcome, setShowWelcome] = useState(true);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <LandingPage
            showWelcome={showWelcome}
            setShowWelcome={setShowWelcome}
          />
        }
      />
      <Route path="/project/:id" element={<ProjectPageLayout />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
