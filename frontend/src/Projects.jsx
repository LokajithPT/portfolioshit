import { useState } from "react";
import "./Projects.css";
import useTypewriter from "./useTypewriter";

export default function Projects() {
  const [activeProject, setActiveProject] = useState(null);

  const projects = [
    { title: "GILMA", description: "GIt Like Management System ... A github clone built for me and only me " },
    { title: "LEVIATHAN", description: "biggest and most flexible malware creation and c2c framework " },
    { title: "lowkey", description: "simple coding language from basic python which uses simple syntax ... just a poc " },
    { title: "pisspoopnfart", description: "encryption and decryption thing i made to encode and decode files " },
  ];

  const gilmaLines = [
    "so yah ill explain gilma to u...",
    "it’s a github clone...",
    "built only for me...",
    "kinda hacker flex ngl ⚡"
  ];

  // always call the hook, but only feed lines if it's GILMA
  const typedGilma = useTypewriter(
    activeProject?.title === "GILMA" ? gilmaLines : [],
	  50,800,0.15
  );

  return (
    <div className="projects-container">
      {projects.map((project, index) => (
        <div
          key={index}
          className="project-card"
          data-text={project.title}
          onClick={() => setActiveProject(project)}
        >
          <h3>{project.title}</h3>
          <p>{project.description}</p>
        </div>
      ))}

      {activeProject && (
        <div className="project-overlay">
          <button
            className="close-btn"
            onClick={() => setActiveProject(null)}
          >
            ✕
          </button>

          <div className="overlay-content">
            <h2>{activeProject.title}</h2>

            {activeProject.title === "GILMA" ? (
              <pre className="typewriter">{typedGilma}</pre>
            ) : (
              <p>{activeProject.description}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

