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
import NotFoundPage from "./Pages/404.jsx";          // ✅ فعّل صفحة 404
import ThankYouPage from "./Pages/ThankYouPage.jsx";  // ✅ صفحة الشكر

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

  // ملاحظة: أنت لافف التطبيق بـ HashRouter داخل main.jsx — ممتاز، خليه زي ما هو.
  return (
    <Routes>
      {/* الصفحة الأساسية */}
      <Route
        path="/"
        element={
          <LandingPage
            showWelcome={showWelcome}
            setShowWelcome={setShowWelcome}
          />
        }
      />

      {/* تفاصيل مشروع */}
      <Route path="/project/:id" element={<ProjectPageLayout />} />

      {/* صفحة الشكر بعد الإرسال */}
      <Route path="/thank-you" element={<ThankYouPage />} />

      {/* 404 */}
      <Route path="*" element={<NotFoundPage />} />
      {/* لو أحببت الرجوع للهوم بدل عرض 404:
          <Route path="*" element={<Navigate to="/" replace />} /> */}
    </Routes>
  );
}
