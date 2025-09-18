import { useState, useEffect } from "react";
import "./Projects.css";

export default function Flowchart() {
  const [visibleNodes, setVisibleNodes] = useState([]);
  const [currentText, setCurrentText] = useState("");
  const [stepIndex, setStepIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const sequence = [
    { node: "gilma", text: "gilma vechuko → files are sent to the server", delay: 2000 },
    { node: "plumchick", text: "gilma vangiko → files are fetched from the server", delay: 2000 },
    { node: "line1", text: "connection established", delay: 1500 },
    { node: "delete", text: "gilma sethupo → folder deleted", delay: 2000 },
    { node: "offline", text: "connection lost → Plumchick offline", delay: 2000 },
    { node: "slimchick", text: "Slimchick stores files until Plumchick is back", delay: 2000 },
  ];

  useEffect(() => {
    if (stepIndex >= sequence.length) return;

    const { text, node } = sequence[stepIndex];
    let timer;

    if (!isDeleting && currentText.length < text.length) {
      // typing
      timer = setTimeout(() => {
        setCurrentText(text.substring(0, currentText.length + 1));
      }, 50);
    } else if (!isDeleting && currentText.length === text.length) {
      // when finished typing → animate node + wait → start deleting
      setVisibleNodes((prev) =>
        prev.includes(node) ? prev : [...prev, node]
      );
      timer = setTimeout(() => setIsDeleting(true), sequence[stepIndex].delay);
    } else if (isDeleting && currentText.length > 0) {
      // deleting
      timer = setTimeout(() => {
        setCurrentText(text.substring(0, currentText.length - 1));
      }, 30);
    } else if (isDeleting && currentText.length === 0) {
      // done deleting → move to next step
      setIsDeleting(false);
      setStepIndex(stepIndex + 1);
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, stepIndex]);

  return (
    <div className="flowchart-wrapper">
      <div className="flowchart">
        {/* Gilma */}
        <div className={`node-wrapper ${visibleNodes.includes("gilma") ? "show" : ""}`}>
          <div className="node gilma">My Device<br /><small>(GILMA)</small></div>
        </div>

        {/* Line to Plumchick */}
        <div className={`line ${visibleNodes.includes("line1") ? "active" : ""}`}></div>

        {/* Plumchick */}
        <div className={`node-wrapper ${visibleNodes.includes("plumchick") ? "show" : ""}`}>
          <div className="node plumchick">Server<br /><small>(Plumchick)</small></div>
        </div>

        {/* Slimchick if offline */}
        {visibleNodes.includes("slimchick") && (
          <>
            <div className={`line buffer active`}></div>
            <div className="node-wrapper show">
              <div className="node slimchick">Buffer<br /><small>(Slimchick)</small></div>
            </div>
          </>
        )}
      </div>

      {/* Hacker typewriter feed */}
      <pre className="flow-desc">{currentText}</pre>
    </div>
  );
}

