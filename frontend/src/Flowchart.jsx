import { useState, useEffect } from "react";
import { FaLock } from "react-icons/fa";
import "./Projects.css";

export default function Flowchart() {
  const [visibleNodes, setVisibleNodes] = useState([]);
  const [currentText, setCurrentText] = useState("");
  const [stepIndex, setStepIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // new states
  const [hoveredNode, setHoveredNode] = useState(null); // node user is hovering
  const [showBlueBox, setShowBlueBox] = useState(false);
  const [insideBox, setInsideBox] = useState(false);
  const [protectText, setProtectText] = useState("");
  const [cloudInfo, setCloudInfo] = useState(null);

  const sequence = [
    {
      node: "gilma",
      text: "gilma vechuko → files are sent to the server",
      delay: 2000,
    },
    {
      node: "plumchick",
      text: "gilma vangiko → files are fetched from the server",
      delay: 2000,
    },
    { node: "line1", text: "connection established", delay: 1500 },
    { node: "delete", text: "gilma sethupo → folder deleted", delay: 2000 },
    {
      node: "offline",
      text: "connection lost → Plumchick offline",
      delay: 2000,
    },
    {
      node: "slimchick",
      text: "Slimchick stores files until Plumchick is back",
      delay: 2000,
    },
  ];

  useEffect(() => {
    if (stepIndex >= sequence.length) return;

    const { text, node } = sequence[stepIndex];
    let timer;

    if (!isDeleting && currentText.length < text.length) {
      timer = setTimeout(() => {
        setCurrentText(text.substring(0, currentText.length + 1));
      }, 50);
    } else if (!isDeleting && currentText.length === text.length) {
      setVisibleNodes((prev) => (prev.includes(node) ? prev : [...prev, node]));
      timer = setTimeout(() => setIsDeleting(true), sequence[stepIndex].delay);
    } else if (isDeleting && currentText.length > 0) {
      timer = setTimeout(() => {
        setCurrentText(text.substring(0, currentText.length - 1));
      }, 30);
    } else if (isDeleting && currentText.length === 0) {
      setIsDeleting(false);
      setStepIndex(stepIndex + 1);
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, stepIndex]);

  // typing effect for tailscale protection
  useEffect(() => {
    if (!insideBox) return;
    const msg = "This is protected by Tailscale, you can't even touch it...";
    if (protectText.length < msg.length) {
      const t = setTimeout(() => {
        setProtectText(msg.substring(0, protectText.length + 1));
      }, 40);
      return () => clearTimeout(t);
    } else {
      // after 1s → show cloud
      const t = setTimeout(() => {
        setShowBlueBox(false);
        setProtectText("");
        setInsideBox(false);
        setCloudInfo(hoveredNode);
      }, 1000);
      return () => clearTimeout(t);
    }
  }, [insideBox, protectText, hoveredNode]);

  return (
    <div className="flowchart-wrapper">
      <div className={`flowchart ${insideBox ? "blurred" : ""}`}>
        {/* Gilma */}
        <div
          className={`node-wrapper ${visibleNodes.includes("gilma") ? "show" : ""}`}
          onMouseEnter={() => {
            setHoveredNode("gilma");
            setShowBlueBox(true);
          }}
          onMouseLeave={() => {
            if (!insideBox) {
              setShowBlueBox(false);
              setHoveredNode(null);
            }
          }}
        >
          <div className="node gilma">
            My Device
            <br />
            <small>(GILMA)</small>
          </div>
        </div>

        {/* Line to Plumchick */}
        <div
          className={`line ${visibleNodes.includes("line1") ? "active" : ""}`}
        ></div>

        {/* Plumchick */}
        <div
          className={`node-wrapper ${visibleNodes.includes("plumchick") ? "show" : ""}`}
          onMouseEnter={() => {
            setHoveredNode("plumchick");
            setShowBlueBox(true);
          }}
          onMouseLeave={() => {
            if (!insideBox) {
              setShowBlueBox(false);
              setHoveredNode(null);
            }
          }}
        >
          <div className="node plumchick">
            Server
            <br />
            <small>(Plumchick)</small>
          </div>
        </div>

        {/* Slimchick */}
        {visibleNodes.includes("slimchick") && (
          <>
            <div className={`line buffer active`}></div>
            <div
              className="node-wrapper show"
              onMouseEnter={() => {
                setHoveredNode("slimchick");
                setShowBlueBox(true);
              }}
              onMouseLeave={() => {
                if (!insideBox) {
                  setShowBlueBox(false);
                  setHoveredNode(null);
                }
              }}
            >
              <div className="node slimchick">
                Buffer
                <br />
                <small>(Slimchick)</small>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Blue Box Overlay */}
      {showBlueBox && hoveredNode && (
        <div
          className="blue-box"
          onMouseEnter={() => setInsideBox(true)}
          onMouseLeave={() => {
            setInsideBox(false);
            setProtectText("");
          }}
        >
          {insideBox && <FaLock className="lock-icon" />}
          <p>{protectText}</p>
        </div>
      )}

      {/* Cloud Info */}
      {cloudInfo && (
        <div className="cloud-info">
          <div className="cloud">
            <h3>{cloudInfo.toUpperCase()}</h3>
            <p>Some details about {cloudInfo}</p>
          </div>
        </div>
      )}

      {/* Hacker typewriter feed */}
      <pre className="flow-desc">{currentText}</pre>
    </div>
  );
}
