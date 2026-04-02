// src/Pages/Portofolio.jsx
import React, { useEffect, useState, useCallback } from "react";
import { supabase } from "../supabase";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CardProject from "../components/CardProject";
import TechStackIcon from "../components/TechStackIcon";
import AOS from "aos";
import "aos/dist/aos.css";
import Certificate from "../components/Certificate";
import {
  Code,
  Award,
  Boxes,
  Bot,
  BrainCircuit,
  Blocks,
} from "lucide-react";
import { asset } from "../utils/asset.js";

/* ========= Helpers ========= */
const ToggleButton = ({ onClick, isShowingMore }) => (
  <button
    onClick={onClick}
    className="px-3 py-1.5 text-slate-300 hover:text-white text-sm font-medium transition-all duration-300 ease-in-out flex items-center gap-2 bg-white/5 hover:bg-white/10 rounded-md border border-white/10 hover:border-white/20 backdrop-blur-sm group relative overflow-hidden"
  >
    <span className="relative z-10 flex items-center gap-2">
      {isShowingMore ? "See Less" : "See More"}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`transition-transform duration-300 ${
          isShowingMore
            ? "group-hover:-translate-y-0.5"
            : "group-hover:translate-y-0.5"
        }`}
      >
        <polyline
          points={isShowingMore ? "18 15 12 9 6 15" : "6 9 12 15 18 9"}
        />
      </svg>
    </span>
    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-500/50 transition-all duration-300 group-hover:w-full" />
  </button>
);

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: { xs: 1, sm: 3 } }}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const encodeLocal = (p) => (p ? encodeURI(p) : p);

const blockchainProjectPlaceholder = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="700" viewBox="0 0 1200 700">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0f172a" />
      <stop offset="50%" stop-color="#1e1b4b" />
      <stop offset="100%" stop-color="#1d4ed8" />
    </linearGradient>
    <linearGradient id="glow" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#8b5cf6" stop-opacity="0.9" />
      <stop offset="100%" stop-color="#3b82f6" stop-opacity="0.9" />
    </linearGradient>
  </defs>
  <rect width="1200" height="700" rx="36" fill="url(#bg)" />
  <circle cx="220" cy="120" r="170" fill="#8b5cf6" opacity="0.08" />
  <circle cx="1040" cy="580" r="220" fill="#3b82f6" opacity="0.10" />

  <rect x="90" y="120" width="1020" height="460" rx="32" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.14)" />
  <rect x="140" y="180" width="170" height="170" rx="24" fill="url(#glow)" opacity="0.95" />
  <text x="225" y="285" text-anchor="middle" font-family="Arial, sans-serif" font-size="62" font-weight="700" fill="white">BRIX</text>

  <text x="380" y="245" font-family="Arial, sans-serif" font-size="64" font-weight="700" fill="white">Blockchain Project</text>
  <text x="380" y="310" font-family="Arial, sans-serif" font-size="30" fill="#cbd5e1">Fractional real estate investment dApp</text>

  <rect x="380" y="360" width="180" height="44" rx="22" fill="rgba(139,92,246,0.18)" stroke="rgba(139,92,246,0.35)" />
  <text x="470" y="389" text-anchor="middle" font-family="Arial, sans-serif" font-size="22" fill="#e9d5ff">Solidity</text>

  <rect x="580" y="360" width="160" height="44" rx="22" fill="rgba(59,130,246,0.18)" stroke="rgba(59,130,246,0.35)" />
  <text x="660" y="389" text-anchor="middle" font-family="Arial, sans-serif" font-size="22" fill="#dbeafe">Truffle</text>

  <rect x="760" y="360" width="170" height="44" rx="22" fill="rgba(255,255,255,0.10)" stroke="rgba(255,255,255,0.16)" />
  <text x="845" y="389" text-anchor="middle" font-family="Arial, sans-serif" font-size="22" fill="#e2e8f0">Next.js</text>

  <rect x="380" y="430" width="240" height="44" rx="22" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.14)" />
  <text x="500" y="459" text-anchor="middle" font-family="Arial, sans-serif" font-size="22" fill="#e2e8f0">DAO Governance</text>

  <rect x="640" y="430" width="210" height="44" rx="22" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.14)" />
  <text x="745" y="459" text-anchor="middle" font-family="Arial, sans-serif" font-size="22" fill="#e2e8f0">Tokenized Shares</text>
</svg>
`)}`;

const projectCategories = [
  { key: "robotics", label: "Robotics", icon: Bot },
  { key: "ai", label: "AI Projects", icon: BrainCircuit },
  { key: "blockchain", label: "Blockchain", icon: Blocks },
];

const projectCategoryContent = {
  robotics: {
    description:
      "Robotics, embedded systems, automation, and smart-device projects.",
    emptyTitle: "No robotics projects yet",
    emptyText: "This section is ready for robotics and embedded systems work.",
    icon: Bot,
  },
  ai: {
    description:
      "Artificial intelligence, machine learning, and intelligent systems projects.",
    emptyTitle: "AI projects coming soon",
    emptyText:
      'This section is ready. Add any future AI project with category: "ai" and it will appear here automatically.',
    icon: BrainCircuit,
  },
  blockchain: {
    description:
      "Blockchain, smart contracts, dApps, and decentralized product experiments.",
    emptyTitle: "No blockchain projects yet",
    emptyText:
      'This section is ready for Web3 work. Add any future blockchain project with category: "blockchain" and it will appear here automatically.',
    icon: Blocks,
  },
};

const detectProjectCategory = (project) => {
  const rawCategory = String(project?.Category || project?.category || "")
    .trim()
    .toLowerCase();

  if (
    [
      "ai",
      "artificial intelligence",
      "machine learning",
      "ml",
      "deep learning",
    ].includes(rawCategory)
  ) {
    return "ai";
  }

  if (
    [
      "blockchain",
      "web3",
      "smart contracts",
      "smart contract",
      "solidity",
      "ethereum",
      "dapp",
      "dao",
      "defi",
    ].includes(rawCategory)
  ) {
    return "blockchain";
  }

  const searchableText = `${
    project?.Title || project?.title || ""
  } ${project?.Description || project?.description || ""}`.toLowerCase();

  if (
    /(^|\W)ai($|\W)|artificial intelligence|machine learning|deep learning|nlp|computer vision/.test(
      searchableText
    )
  ) {
    return "ai";
  }

  if (
    /blockchain|web3|solidity|smart contract|ethereum|dao|defi|dapp|on-chain|tokenized|tokenised|fractional real estate|real estate investment/.test(
      searchableText
    )
  ) {
    return "blockchain";
  }

  return "robotics";
};

const normalizeImagePath = (value) => {
  if (!value) return value;
  if (
    typeof value === "string" &&
    (value.startsWith("http://") ||
      value.startsWith("https://") ||
      value.startsWith("data:image"))
  ) {
    return value;
  }
  return encodeLocal(value);
};

/* ========= Static Data ========= */
// Tech stack
const techStacks = [
  { icon: asset("Python.png"), language: "Python" },
  { icon: asset("c++.png"), language: "C++" },
  { icon: asset("c.png"), language: "C" },
  { icon: asset("html.svg"), language: "HTML" },
  { icon: asset("css.svg"), language: "CSS" },
  { icon: asset("ros2.png"), language: "ROS2" },
  { icon: asset("linux.png"), language: "Linux" },
  { icon: asset("pych.png"), language: "PyCharm" },
  { icon: asset("arduino.png"), language: "Arduino" },
  { icon: asset("solidwork.png"), language: "SolidWork" },
  { icon: asset("cr.png"), language: "CirkitDesigner" },
  { icon: asset("tablue.png"), language: "Tableau" },
];

// Local fallback projects
const localProjects = [
  {
    id: 1,
    Img: asset("projects/fire.png"),
    Title: "Fire Fighting Robot",
    Description:
      "This is a fire-fighting robot designed to detect and respond to both fire and gas leaks. It integrates a 6 DOF robotic arm and various sensors, and can be fully controlled via a mobile application using the ESP32 microcontroller.",
    Link: "https://github.com/mohammadzalloum/Fier-Fihting-Robot",
    category: "robotics",
  },
  {
    id: 2,
    Img: asset("projects/farm.png"),
    Title: "f-tobot",
    Description:
      "This is an autonomous agricultural scout robot designed to navigate farmlands, perform planting and watering tasks, and monitor environmental conditions. It integrates environmental sensors, a high-resolution camera, front-facing LED lights, and can be fully controlled via a mobile application through Bluetooth.",
    Link: "https://github.com/mohammadzalloum/F-Robot",
    category: "robotics",
  },
  {
    id: 3,
    Img: asset("projects/sumorobot.png"),
    Title: "Sumo Robot",
    Description:
      "Competitive Sumo robot featuring 5 tactical modes—optimized for charge attacks, evasive turns, ring awareness, and rapid repositioning",
    Link: "https://github.com/mohammadzalloum/Sumo-Robot",
    category: "robotics",
  },
  {
    id: 4,
    Img: asset("projects/line.jpg"),
    Title: "Line Following Robot",
    Description:
      "A Line-Following Robot designed to detect and follow black lines on a white surface using a reflectance sensor array and controlled via an ESP32 microcontroller.",
    Link: "https://github.com/mohammadzalloum/Line-Following-Robot",
    category: "robotics",
  },
  {
    id: 5,
    Img: asset("projects/smartbasin.png"),
    Title: "Smart Basin",
    Description:
      "Touchless, sensor-driven basin with microcontroller control and fail-safe logic for hygiene and water efficiency.",
    Link: "https://github.com/mohammadzalloum/Smart-Basin",
    category: "robotics",
  },
  {
    id: 6,
    Img: asset("projects/smart-helmet.png"),
    Title: "Smart Helmet",
    Description:
      "Safety helmet with sensors and microcontroller logic for live monitoring and alerts.",
    Link: "https://github.com/mohammadzalloum/Safeguard-Fall-ADL-TCN",
    badge: "In Progress",
    category: "robotics",
  },
  {
    id: 7,
    Img: asset("projects/smarthome.png"),
    Title: "Smart home model",
    Description:
      "A C++-powered, modular home-automation prototype for real-time monitoring and control of lighting, climate, and security.",
    Link: "https://github.com/mohammadzalloum/Smart-home-model",
    category: "robotics",
  },
  {
    id: 8,
    Img: blockchainProjectPlaceholder,
    Title: "BRIX Fractional Real Estate",
    Description:
      "A blockchain-based fractional real-estate investment dApp built with Solidity smart contracts, Truffle, Ganache, and a Next.js frontend. It focuses on tokenized property shares, on-chain ownership and distribution flows, and DAO-style governance for property decisions and expenses.",
    Link: "https://github.com/mohammadzalloum/brix-fractional-real-estate",
    category: "blockchain",
    badge: "Web3",
  },
  {
  id: 9,
  Img: asset("projects/smart-helmet.png"),
  Title: "Safeguard Fall & ADL Detection",
  Description:
    "An AI-based fall and ADL detection system built with a hierarchical Temporal Convolutional Network (TCN) using chest-mounted IMU signals from the UMAFall dataset. It performs both coarse classification (ADL vs FALL) and fine-grained activity recognition across 11 motion classes for the Safeguard Helmet project.",
  Link: "https://github.com/mohammadzalloum/Safeguard-Fall-ADL-TCN",
  badge: "AI",
  category: "ai",
}
];

// Local fallback certificates
const localFallbackCertificates = [
  { Img: asset("certificates/corrleationone.jpg"), Title: "Certificate 1" },
  { Img: asset("certificates/htux.jpg"), Title: "Certificate 2" },
  { Img: asset("certificates/poust.jpg"), Title: "Certificate 3" },
  { Img: asset("certificates/CCGcertificate.jpg"), Title: "Certificate 4" },
  { Img: asset("certificates/gdg.jpg"), Title: "Certificate 5" },
  { Img: asset("certificates/ieee.jpg"), Title: "Certificate 6" },
];

/* ========= Component ========= */
export default function FullWidthTabs() {
  const theme = useTheme();
  const [value, setValue] = useState(0);

  const [projects, setProjects] = useState([]);
  const [certificates, setCertificates] = useState([]);

  const [showAllCertificates, setShowAllCertificates] = useState(false);
  const [activeProjectCategory, setActiveProjectCategory] =
    useState("robotics");

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => {
      if (typeof window !== "undefined") setIsMobile(window.innerWidth < 768);
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const initialCertItems = isMobile ? 4 : 6;

  useEffect(() => {
    AOS.init({ once: false });
  }, []);

  const fetchData = useCallback(async () => {
    try {
      const [projectsResponse, certificatesResponse] = await Promise.all([
        supabase.from("projects").select("*").order("id", { ascending: true }),
        supabase
          .from("certificates")
          .select("*")
          .order("id", { ascending: true }),
      ]);

      if (projectsResponse.error) throw projectsResponse.error;
      if (certificatesResponse.error) throw certificatesResponse.error;

      const projectData = projectsResponse.data || [];
      const certificateData = certificatesResponse.data || [];

      setProjects(projectData);
      setCertificates(certificateData);

      localStorage.setItem("projects", JSON.stringify(projectData));
      localStorage.setItem("certificates", JSON.stringify(certificateData));
    } catch (error) {
      console.error("Error fetching data from Supabase:", error.message);
    }
  }, []);

  useEffect(() => {
    const cp = localStorage.getItem("projects");
    const cc = localStorage.getItem("certificates");

    if (cp && cc) {
      setProjects(JSON.parse(cp));
      setCertificates(JSON.parse(cc));
    }

    fetchData();
  }, [fetchData]);

  /* ====== Normalize & Merge ====== */
  const mergedProjects = projects?.length ? projects : [];

  const rawProjects = [
    ...mergedProjects,
    ...localProjects.filter(
      (lp) =>
        !mergedProjects.some(
          (rp) =>
            String(rp.id ?? rp.Title ?? "").toLowerCase() ===
            String(lp.id ?? lp.Title ?? "").toLowerCase()
        )
    ),
  ];

  const normalizedProjects = rawProjects.map((p, i) => ({
    id: p.id ?? i,
    Img: normalizeImagePath(
      p.Img || p.image || p.thumbnail || p.cover || p.url || p.path
    ),
    Title: p.Title || p.title || `Project ${i + 1}`,
    Description: p.Description || p.description || "",
    Link: p.Link || p.link || p.demo || p.demoUrl || "#",
    badge: p.badge || p.Badge || undefined,
    Category: detectProjectCategory(p),
  }));

  const projectCounts = normalizedProjects.reduce(
    (acc, project) => {
      acc[project.Category] = (acc[project.Category] || 0) + 1;
      return acc;
    },
    { robotics: 0, ai: 0, blockchain: 0 }
  );

  const displayedProjectsFixed = normalizedProjects.filter(
    (project) => project.Category === activeProjectCategory
  );

  const rawCertificates =
    certificates?.length ? certificates : localFallbackCertificates;

  const normalizedCertificates = rawCertificates.map((c, i) => ({
    id: c.id ?? i,
    Img: encodeLocal(c.Img || c.ImgSertif || c.image || c.url || c.path),
    Title: c.Title || c.title || `Certificate ${i + 1}`,
  }));

  const displayedCertificatesFixed = showAllCertificates
    ? normalizedCertificates
    : normalizedCertificates.slice(0, initialCertItems);

  const activeCategoryMeta =
    projectCategoryContent[activeProjectCategory] ||
    projectCategoryContent.robotics;

  const EmptyIcon = activeCategoryMeta.icon;

  const handleChange = (e, newValue) => setValue(newValue);

  return (
    <div
      className="md:px-[10%] px-[5%] w-full sm:mt-0 mt-[3rem] bg-[#030014] overflow-hidden"
      id="Portofolio"
    >
      {/* Heading */}
      <div
        className="text-center pb-10"
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        <h2 className="inline-block text-3xl md:text-5xl font-bold text-center mx-auto text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]">
          <span
            style={{
              color: "#6366f1",
              backgroundImage:
                "linear-gradient(45deg, #6366f1 10%, #a855f7 93%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Portfolio Showcase
          </span>
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base mt-2">
          Discover my journey as a developer through projects, certifications,
          and the technologies I've mastered.
        </p>
      </div>

      <Box sx={{ width: "100%" }}>
        {/* Main Tabs */}
        <AppBar
          position="static"
          elevation={0}
          sx={{
            bgcolor: "transparent",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "20px",
            position: "relative",
            overflow: "hidden",
            "&::before": {
              content: '""',
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(180deg, rgba(139,92,246,.03) 0%, rgba(59,130,246,.03) 100%)",
              backdropFilter: "blur(10px)",
              zIndex: 0,
            },
          }}
          className="md:px-4"
        >
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="secondary"
            indicatorColor="secondary"
            variant="fullWidth"
            sx={{
              minHeight: "70px",
              "& .MuiTab-root": {
                fontSize: { xs: "0.9rem", md: "1rem" },
                fontWeight: "600",
                color: "#94a3b8",
                textTransform: "none",
                transition: "all .4s cubic-bezier(.4,0,.2,1)",
                padding: "20px 0",
                zIndex: 1,
                margin: "8px",
                borderRadius: "12px",
                "&:hover": {
                  color: "#fff",
                  backgroundColor: "rgba(139,92,246,.1)",
                  transform: "translateY(-2px)",
                  "& .lucide": { transform: "scale(1.1) rotate(5deg)" },
                },
                "&.Mui-selected": {
                  color: "#fff",
                  background:
                    "linear-gradient(135deg, rgba(139,92,246,.2), rgba(59,130,246,.2))",
                  boxShadow: "0 4px 15px -3px rgba(139,92,246,.2)",
                  "& .lucide": { color: "#a78bfa" },
                },
              },
              "& .MuiTabs-indicator": { height: 0 },
              "& .MuiTabs-flexContainer": { gap: "8px" },
            }}
          >
            <Tab
              icon={<Code className="mb-2 w-5 h-5 transition-all duration-300" />}
              label="Projects"
              {...a11yProps(0)}
            />
            <Tab
              icon={<Award className="mb-2 w-5 h-5 transition-all duration-300" />}
              label="Certificates"
              {...a11yProps(1)}
            />
            <Tab
              icon={<Boxes className="mb-2 w-5 h-5 transition-all duration-300" />}
              label="Tech Stack"
              {...a11yProps(2)}
            />
          </Tabs>
        </AppBar>

        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={setValue}
        >
          {/* Projects */}
          <TabPanel value={value} index={0} dir={theme.direction}>
            <div className="container mx-auto overflow-hidden">
              <div className="mb-8 flex flex-col items-center justify-center gap-4 text-center">
                <div className="flex flex-wrap items-center justify-center gap-3">
                  {projectCategories.map((category) => {
                    const Icon = category.icon;
                    const isActive = activeProjectCategory === category.key;

                    return (
                      <button
                        key={category.key}
                        onClick={() => setActiveProjectCategory(category.key)}
                        className={`group relative inline-flex items-center gap-2 rounded-full border px-5 py-3 text-sm md:text-base font-semibold transition-all duration-300 backdrop-blur-md ${
                          isActive
                            ? "border-violet-400/40 bg-gradient-to-r from-violet-500/20 to-blue-500/20 text-white shadow-[0_0_30px_rgba(139,92,246,0.18)]"
                            : "border-white/10 bg-white/5 text-slate-300 hover:border-violet-400/30 hover:bg-white/10 hover:text-white"
                        }`}
                      >
                        <Icon
                          className={`h-4 w-4 md:h-5 md:w-5 transition-all duration-300 ${
                            isActive
                              ? "text-violet-300 scale-105"
                              : "group-hover:scale-110"
                          }`}
                        />
                        <span>{category.label}</span>
                        <span
                          className={`rounded-full px-2 py-0.5 text-xs ${
                            isActive
                              ? "bg-white/10 text-white"
                              : "bg-white/5 text-slate-400 group-hover:text-slate-200"
                          }`}
                        >
                          {projectCounts[category.key] || 0}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <p className="max-w-2xl text-sm md:text-base text-slate-400">
                  {activeCategoryMeta.description}
                </p>
              </div>

              {displayedProjectsFixed.length > 0 ? (
                <div className="flex justify-center items-center">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-screen-2xl w-full">
                    {displayedProjectsFixed.map((project, idx) => (
                      <div
                        key={project.id ?? idx}
                        data-aos={idx % 2 === 0 ? "fade-up-right" : "fade-up-left"}
                        data-aos-duration={idx % 2 === 0 ? "1000" : "1200"}
                      >
                        <CardProject
                          Img={project.Img}
                          Title={project.Title}
                          Description={project.Description}
                          Link={project.Link}
                          badge={project.badge}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="mx-auto mt-6 max-w-2xl rounded-3xl border border-white/10 bg-white/5 px-6 py-10 text-center backdrop-blur-md">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500/20 to-blue-500/20 text-violet-300">
                    <EmptyIcon className="h-7 w-7" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">
                    {activeCategoryMeta.emptyTitle}
                  </h3>
                  <p className="mt-2 text-slate-400">
                    {activeCategoryMeta.emptyText}
                  </p>
                </div>
              )}
            </div>
          </TabPanel>

          {/* Certificates */}
          <TabPanel value={value} index={1} dir={theme.direction}>
            <div className="container mx-auto flex justify-center items-center overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-3 md:gap-5 gap-4">
                {displayedCertificatesFixed.map((certificate, index) => (
                  <div
                    key={certificate.id ?? index}
                    data-aos={
                      index % 3 === 0
                        ? "fade-up-right"
                        : index % 3 === 1
                        ? "fade-up"
                        : "fade-up-left"
                    }
                    data-aos-duration={
                      index % 3 === 0 ? "1000" : index % 3 === 1 ? "1200" : "1000"
                    }
                  >
                    <Certificate ImgSertif={certificate.Img} />
                  </div>
                ))}
              </div>
            </div>

            {normalizedCertificates.length > initialCertItems && (
              <div className="mt-6 w-full flex justify-start">
                <ToggleButton
                  onClick={() => setShowAllCertificates((v) => !v)}
                  isShowingMore={showAllCertificates}
                />
              </div>
            )}
          </TabPanel>

          {/* Tech Stack */}
          <TabPanel value={value} index={2} dir={theme.direction}>
            <div className="container mx-auto flex justify-center items-center overflow-hidden pb-[5%]">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 lg:gap-8 gap-5">
                {techStacks.map((stack, index) => (
                  <div
                    key={index}
                    data-aos={
                      index % 3 === 0
                        ? "fade-up-right"
                        : index % 3 === 1
                        ? "fade-up"
                        : "fade-up-left"
                    }
                    data-aos-duration={index % 3 === 0 ? "1000" : "1200"}
                  >
                    <TechStackIcon
                      TechStackIcon={stack.icon}
                      Language={stack.language}
                    />
                  </div>
                ))}
              </div>
            </div>
          </TabPanel>
        </SwipeableViews>
      </Box>
    </div>
  );
}