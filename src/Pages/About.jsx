import React, { useEffect, memo, useMemo } from "react";
import { FileText, Code, Award, Globe, ArrowUpRight, Sparkles } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";
import { asset } from "../utils/asset.js";

/* ========= Smooth scroll that works with HashRouter & GitHub Pages ========= */
const smoothScrollToId = (id) => (e) => {
  e?.preventDefault?.();
  if (typeof document === "undefined") return;
  const el = document.getElementById(id);
  if (el) {
    // هام: لو عندك Navbar ثابت فوق، عدّل offset إن لزم
    const offset = 0;
    const y = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top: y, behavior: "smooth" });
  } else {
    // fallback: بدّل الـ hash ليشتغل حتى لو ما كان العنصر موجود لحظة الضغط
    if (location.hash !== `#${id}`) location.hash = id;
  }
};

/* ================= Header ================= */
const Header = memo(() => (
  <div className="text-center lg:mb-8 mb-2 px-[5%]">
    <div className="inline-block relative group">
      <h2
        className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]"
        data-aos="zoom-in-up"
        data-aos-duration="600"
      >
        About Me
      </h2>
    </div>
    <p
      className="mt-2 text-gray-400 max-w-2xl mx-auto text-base sm:text-lg flex items-center justify-center gap-2"
      data-aos="zoom-in-up"
      data-aos-duration="800"
    >
      <Sparkles className="w-5 h-5 text-purple-400" />
      Transforming ideas into digital experiences
      <Sparkles className="w-5 h-5 text-purple-400" />
    </p>
  </div>
));

/* ================= Profile Image ================= */
const ProfileImage = memo(() => (
  <div className="flex justify-end items-center sm:p-12 sm:py-0 sm:pb-0 p-0 py-2 pb-2">
    <div className="relative group" data-aos="fade-up" data-aos-duration="1000">
      <div className="absolute -inset-6 opacity-[25%] z-0 hidden sm:block">
        <div className="absolute inset-0 bg-gradient-to-r from-violet-600 via-indigo-500 to-purple-600 rounded-full blur-2xl animate-spin-slower" />
        <div className="absolute inset-0 bg-gradient-to-l from-fuchsia-500 via-rose-500 to-pink-600 rounded-full blur-2xl animate-pulse-slow opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-t from-blue-600 via-cyan-500 to-teal-400 rounded-full blur-2xl animate-float opacity-50" />
      </div>

      <div className="relative">
        <div className="w-72 h-72 sm:w-80 sm:h-80 rounded-full overflow-hidden shadow-[0_0_40px_rgba(120,119,198,0.3)] transform transition-all duration-700 group-hover:scale-105">
          <div className="absolute inset-0 border-4 border-white/20 rounded-full z-20 transition-all duration-700 group-hover:border-white/40 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40 z-10 transition-opacity duration-700 group-hover:opacity-0 hidden sm:block" />
          <div className="absolute inset-0 bg-gradient-to-t from-purple-500/20 via-transparent to-blue-500/20 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 hidden sm:block" />
          <img
            src={asset("my-photo.jpg")}
            alt="Profile"
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-2"
            loading="lazy"
            decoding="async"
            fetchPriority="low"
            sizes="(max-width: 640px) 18rem, 20rem"
          />
        </div>
      </div>
    </div>
  </div>
));

/* ================= Stat Card ================= */
const StatCard = memo(({ icon: Icon, color, value, label, description, animation, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="text-left outline-none focus-visible:ring-2 focus-visible:ring-[#8b5cf6]/50 rounded-2xl"
    aria-label={`${label}, go to projects section`}
  >
    <div data-aos={animation} data-aos-duration={1300} className="relative group">
      <div className="relative z-10 bg-gray-900/50 backdrop-blur-lg rounded-2xl p-6 border border-white/10 overflow-hidden transition-all duration-300 group-hover:scale-105 hover:shadow-2xl h-full flex flex-col justify-between">
        <div className={`absolute -z-10 inset-0 bg-gradient-to-br ${color} opacity-10 group-hover:opacity-20 transition-opacity duration-300`} />

        <div className="flex items-center justify-between mb-4">
          <div className="w-16 h-16 rounded-full flex items-center justify-center bg-white/10 transition-transform group-hover:rotate-6">
            <Icon className="w-8 h-8 text-white" />
          </div>
          <span
            className="text-4xl font-bold text-white"
            data-aos="fade-up-left"
            data-aos-duration="1500"
          >
            {value}
          </span>
        </div>

        <div>
          <p className="text-sm uppercase tracking-wider text-gray-300 mb-2">{label}</p>
          <div className="flex items-center justify-between">
            <p className="text-xs text-gray-400">{description}</p>
            <ArrowUpRight className="w-4 h-4 text-white/50 group-hover:text-white transition-colors" />
          </div>
        </div>
      </div>
    </div>
  </button>
));

/* ================= About Page ================= */
const AboutPage = () => {
  const { totalProjects, totalCertificates, YearExperience } = useMemo(
    () => ({
      totalProjects: 7,
      totalCertificates: 6,
      YearExperience: 0,
    }),
    []
  );

  useEffect(() => {
    // احترم إعدادات المستخدم (تقليل الحركة)
    const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    AOS.init({
      once: false,
      duration: prefersReduced ? 0 : 600,
      easing: "ease-out",
      offset: 24,
      disable: prefersReduced,
    });

    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => AOS.refreshHard(), 250);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimer);
    };
  }, []);

  const statsData = useMemo(
    () => [
      {
        icon: Code,
        color: "from-[#6366f1] to-[#a855f7]",
        value: totalProjects,
        label: "Total Projects",
        description: "Innovative web solutions crafted",
        animation: "fade-right",
      },
      {
        icon: Award,
        color: "from-[#a855f7] to-[#6366f1]",
        value: totalCertificates,
        label: "Certificates",
        description: "Professional skills validated",
        animation: "fade-up",
      },
      {
        icon: Globe,
        color: "from-[#6366f1] to-[#a855f7]",
        value: YearExperience,
        label: "Years of Experience",
        description: "Continuous learning journey",
        animation: "fade-left",
      },
    ],
    [totalProjects, totalCertificates, YearExperience]
  );

  return (
    <div
      className="h-auto pb-[10%] text-white overflow-hidden px-[5%] sm:px-[5%] lg:px-[10%] mt-10 sm:mt-0"
      id="About"
    >
      <Header />

      <div className="w-full mx-auto pt-8 sm:pt-12 relative">
        <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="space-y-6 text-center lg:text-left">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold" data-aos="fade-right">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]">
                Hello, I'm
              </span>
              <span className="block mt-2 text-gray-200">mohammad zalloum</span>
            </h2>

            <p
              className="text-base sm:text-lg lg:text-xl text-gray-400 leading-relaxed text-justify pb-4 sm:pb-0"
              data-aos="fade-right"
              data-aos-duration="1500"
            >
              I’m passionate about exploring new technologies, solving real-world problems, and
              creating meaningful impact. My interests span robotics, automation, and smart-home
              systems, and I’m continually learning and collaborating to grow and deliver reliable,
              human-centered solutions.
            </p>

            <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-4">
              <a href="https://github.com/mohammadzalloum" target="_blank" rel="noreferrer">
                <button
                  className="sm:px-6 py-2 sm:py-3 rounded-lg bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white font-medium transition-all duration-300 hover:scale-105 flex items-center gap-2 shadow-lg"
                  aria-label="Open GitHub profile"
                >
                  <FileText className="w-5 h-5" /> View GitHub
                </button>
              </a>

              {/* زر ينفذ تمرير سلس بدل href لمنع 404 مع HashRouter/GitHub Pages */}
              <button
                onClick={smoothScrollToId("Portofolio")}
                className="sm:px-6 py-2 sm:py-3 rounded-lg border border-[#a855f7]/50 text-[#a855f7] font-medium transition-all duration-300 hover:scale-105 flex items-center gap-2 hover:bg-[#a855f7]/10"
                aria-label="Scroll to Projects section"
              >
                <Code className="w-5 h-5" /> View Projects
              </button>
            </div>
          </div>

          <ProfileImage />
        </div>

        {/* بطاقات الإحصائيات: كل بطاقة زر مستقل قابل للوحة المفاتيح */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          {statsData.map((stat) => (
            <StatCard
              key={stat.label}
              {...stat}
              onClick={smoothScrollToId("Portofolio")}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default memo(AboutPage);
