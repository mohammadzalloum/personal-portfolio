import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { getAiProject } from "../data/aiProjects.js";

const sections = [
  ["Problem", "Problem"],
  ["What it does", "Overview"],
  ["My contribution", "Contribution"],
  ["Implementation choices", "Choices"],
  ["Results and scope", "Result"],
];

export default function AiProjectDetail() {
  const { id } = useParams();
  const project = getAiProject(id);

  if (!project) return null;

  return (
    <main className="min-h-screen bg-[#030014] px-[5%] py-8 text-white md:px-[10%] md:py-14">
      <div className="mx-auto max-w-6xl">
        <Link to="/" className="mb-8 inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-purple-400">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back to projects
        </Link>

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-purple-300">AI Project</p>
            <h1 className="break-words bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 bg-clip-text text-3xl font-bold leading-tight text-transparent md:text-5xl">{project.Title}</h1>
            <p className="mt-3 text-lg text-purple-200">{project.Subtitle}</p>
            <p className="mt-5 leading-relaxed text-slate-300">{project.Description}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={project.Link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-lg border border-purple-400/30 bg-purple-500/20 px-4 py-2 text-sm font-medium text-white hover:bg-purple-500/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-purple-400">
                <Github className="h-4 w-4" aria-hidden="true" /> GitHub source
              </a>
              {project.Showcase && <a href={project.Showcase} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-4 py-2 text-sm text-slate-200 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-purple-400"><ExternalLink className="h-4 w-4" aria-hidden="true" /> Showcase material</a>}
            </div>
            <ul className="mt-6 flex flex-wrap gap-2" aria-label="Technologies used">
              {project.TechStack.map((tech) => <li key={tech} className="rounded-full border border-purple-400/20 bg-purple-400/10 px-3 py-1 text-xs text-purple-200">{tech}</li>)}
            </ul>
          </div>
          <figure className="self-start overflow-hidden rounded-2xl border border-white/10 bg-slate-900/50">
            <img src={project.Img} alt={project.ImageAlt} className="h-auto w-full object-contain" />
            <figcaption className="px-4 py-3 text-xs leading-relaxed text-slate-400">{project.ImageNote}</figcaption>
          </figure>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {sections.map(([heading, key]) => <section key={key} className="min-w-0 rounded-2xl border border-white/10 bg-white/[0.03] p-5 md:p-6">
            <h2 className="text-lg font-semibold text-purple-200">{heading}</h2>
            <p className="mt-3 break-words text-sm leading-7 text-slate-300 md:text-base">{project[key]}</p>
          </section>)}
        </div>

        {project.Gallery?.length > 0 && <section className="mt-10">
          <h2 className="mb-4 text-xl font-semibold text-white">Recorded experiment plot</h2>
          <div className="grid gap-5 md:grid-cols-2">
            {project.Gallery.map((item) => <figure key={item.src} className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-3">
              <img src={item.src} alt={item.alt} loading="lazy" className="h-auto w-full object-contain" />
              <figcaption className="px-2 pt-3 text-xs text-slate-400">{item.alt}</figcaption>
            </figure>)}
          </div>
        </section>}
      </div>
    </main>
  );
}
