// src/components/CardProject.jsx
import PropTypes from "prop-types";
import { ArrowRight, Github } from "lucide-react";
import { Link } from "react-router-dom";

const CardProject = ({ Img, Title, Subtitle, Description, Link: ProjectLink, badge, TechStack, ImageAlt, detailPath }) => {
  const handleDetails = (e) => {
    if (!ProjectLink) {
      e.preventDefault();
      alert("Project link is not available.");
    }
  };

  return (
    <div className="group relative w-full">
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-lg border border-white/10 shadow-2xl transition-all duration-300 hover:shadow-purple-500/20">
        {/* soft gradient wash */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-50 group-hover:opacity-70 transition-opacity duration-300" />

        <div className="relative p-5 z-10">
          {/* Image + (in-image) Badge */}
          <div className="relative overflow-hidden rounded-lg">
            {badge && (
              <span
                className="absolute top-3 left-3 z-20 px-2.5 py-1 rounded-md text-[11px] font-semibold tracking-wide
                           bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white/95 shadow-lg shadow-purple-500/20
                           border border-white/20"
                aria-label="Project status badge"
              >
                {badge}
              </span>
            )}

            <img
              src={Img}
              alt={ImageAlt || Title || "Project image"}
              className={`${detailPath ? "w-full aspect-video object-contain" : "w-full h-full object-cover"} transform group-hover:scale-105 transition-transform duration-500`}
              loading="lazy"
            />
          </div>

          {/* Info */}
          <div className="mt-4 space-y-3">
            <h3 className="text-xl font-semibold bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 bg-clip-text text-transparent">
              {Title || "Untitled Project"}
            </h3>

            {Subtitle && <p className="text-sm font-medium text-purple-300">{Subtitle}</p>}
            <p className="text-gray-300/80 text-sm leading-relaxed line-clamp-2">
              {Description || "No description provided."}
            </p>

            {TechStack?.length > 0 && (
              <ul className="flex flex-wrap gap-1.5" aria-label="Technologies used">
                {TechStack.map((tech) => <li key={tech} className="rounded-full border border-purple-400/20 bg-purple-400/10 px-2 py-1 text-xs text-purple-200">{tech}</li>)}
              </ul>
            )}
            <div className="pt-4 flex flex-wrap items-center justify-end gap-2">
              {detailPath && (
                <Link to={detailPath} className="inline-flex items-center gap-2 rounded-lg bg-purple-500/20 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-purple-500/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-purple-400">
                  Details <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              )}
              {ProjectLink ? (
                <a
                  href={ProjectLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleDetails}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/90
                             transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none
                             focus:ring-2 focus:ring-purple-500/50"
                >
                  <span className="text-sm font-medium">{detailPath ? "GitHub" : "Details"}</span>
                  {detailPath ? <Github className="w-4 h-4" aria-hidden="true" /> : <ArrowRight className="w-4 h-4" aria-hidden="true" />}
                </a>
              ) : (
                <span className="text-gray-500 text-sm">Details Not Available</span>
              )}
            </div>
          </div>

          {/* Hover border outline */}
          <div className="absolute inset-0 border border-white/0 group-hover:border-purple-500/50 rounded-xl transition-colors duration-300 -z-50" />
        </div>
      </div>
    </div>
  );
};

CardProject.propTypes = {
  Img: PropTypes.string,
  Title: PropTypes.string,
  Subtitle: PropTypes.string,
  Description: PropTypes.string,
  Link: PropTypes.string,
  badge: PropTypes.string,
  TechStack: PropTypes.arrayOf(PropTypes.string),
  ImageAlt: PropTypes.string,
  detailPath: PropTypes.string,
};

export default CardProject;
