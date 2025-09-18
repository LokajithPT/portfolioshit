import React, { useState } from "react";
import "./Projects.css";
import Flowchart from "./Flowchart";
import FlowchartLeviathan from "./FlowchartLeviathan";

/* Typewriter Hook */
function useTypewriter(lines = [], speed = 50, delay = 800, mistakeChance = 0.08) {
  const [text, setText] = useState("");
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isMistaking, setIsMistaking] = useState(false);
  const [done, setDone] = useState(false);

  React.useEffect(() => {
    if (!lines.length) return;
    if (lineIndex >= lines.length) {
      setDone(true);
      return;
    }

    const currentLine = lines[lineIndex];
    let timeout;

    if (charIndex < currentLine.length) {
      timeout = setTimeout(() => {
        if (!isMistaking && Math.random() < mistakeChance) {
          setText((prev) => prev + getRandomChar());
          setIsMistaking(true);
        } else if (isMistaking) {
          setText((prev) => prev.slice(0, -1));
          setIsMistaking(false);
        } else {
          setText((prev) => prev + currentLine[charIndex]);
          setCharIndex(charIndex + 1);
        }
      }, isMistaking ? speed / 2 : speed);
    }

    if (charIndex === currentLine.length && !isMistaking) {
      timeout = setTimeout(() => {
        setText((prev) => prev + "\n");
        setLineIndex(lineIndex + 1);
        setCharIndex(0);
      }, delay);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, lineIndex, isMistaking, lines, speed, delay, mistakeChance]);

  return { text, done };
}

function getRandomChar() {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
  return chars[Math.floor(Math.random() * chars.length)];
}

/* Main Projects Component */
export default function Projects() {
  const [activeProject, setActiveProject] = useState(null);

  const projects = [
    { title: "GILMA", description: "GIt Like Management System ... A github clone built for me and only me " },
    { title: "LEVIATHAN", description: "Biggest and most flexible malware creation and c2c framework " },
    { title: "lowkey", description: "Simple coding language from basic python which uses simple syntax ... just a poc " },
    { title: "pisspoopnfart", description: "Encryption and decryption thing i made to encode and decode files " },
  ];

  // Gilma storyline
  const gilmaLines = [
    "so yah ill explain gilma to u...",
    "it's a github clone...",
    "built only for me...",
    "kinda hacker flex ngl ⚡",
  ];

  // Leviathan storyline
  const leviathanLines = [
    "this is leviathan...",
    "ive built a c2c server...",
    "malware connects with json token...",
    "registers MAC for persistence...",
    "full access → camera, mic, files...",
    "decoy loaded → memory game running...",
  ];

  const { text: typedGilma, done: gilmaDone } = useTypewriter(
    activeProject?.title === "GILMA" ? gilmaLines : [],
    60,
    1000,
    0.08
  );

  const { text: typedLeviathan, done: leviathanDone } = useTypewriter(
    activeProject?.title === "LEVIATHAN" ? leviathanLines : [],
    60,
    1000,
    0.08
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
          <button className="close-btn" onClick={() => setActiveProject(null)}>✕</button>

          <div className="overlay-content">
            <h2>{activeProject.title}</h2>

            {/* GILMA */}
            {activeProject.title === "GILMA" ? (
              !gilmaDone ? (
                <pre className="typewriter">{typedGilma}</pre>
              ) : (
                <div className="fade-in"><Flowchart /></div>
              )
            ) : null}

            {/* LEVIATHAN */}
            {activeProject.title === "LEVIATHAN" ? (
              !leviathanDone ? (
                <pre className="typewriter">{typedLeviathan}</pre>
              ) : (
                <div className="fade-in"><FlowchartLeviathan /></div>
              )
            ) : null}

            {/* Other projects */}
            {activeProject.title !== "GILMA" && activeProject.title !== "LEVIATHAN" && (
              <p>{activeProject.description}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

