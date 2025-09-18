import { useState, useEffect, useRef } from "react";
import "./Projects.css";

export default function FlowchartLeviathan() {
  const [visibleNodes, setVisibleNodes] = useState([]);
  const [logs, setLogs] = useState([]);
  const [typedText, setTypedText] = useState("");
  const [currentLine, setCurrentLine] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const charIndex = useRef(0);

  const sequence = [
    { text: "this is leviathan ...", node: "leviathan", delay: 2000 },
    { text: "ive built a c2c server ...", node: "c2c", delay: 2000 },
    { text: "malware connects with json token ...", node: "token", delay: 2000 },
    { text: "registers MAC for persistence ...", node: "mac", delay: 2000 },
    { text: "full access granted → camera, mic, files ...", node: "access", delay: 2500 },
    { text: "decoy loaded → memory game running in foreground ...", node: "decoy", delay: 2500 },
    { text: "logs streaming → network monitored ...", node: "network", delay: 2000 },
    { text: "payload delivered → system compromised ...", node: "payload", delay: 2500 },
  ];

  useEffect(() => {
    if (currentLine >= sequence.length) return;

    const { text, node, delay } = sequence[currentLine];
    charIndex.current = 0;

    const timer = setInterval(() => {
      if (!isDeleting) {
        if (charIndex.current <= text.length) {
          setTypedText(text.substring(0, charIndex.current));
          charIndex.current++;
        } else {
          // Finished typing
          setVisibleNodes((prev) => [...prev, node]);
          setLogs((prev) => [...prev, text]);
          setIsDeleting(true);
        }
      } else {
        if (charIndex.current >= 0) {
          setTypedText(text.substring(0, charIndex.current));
          charIndex.current--;
        } else {
          setIsDeleting(false);
          setCurrentLine((prev) => prev + 1);
        }
      }
    }, isDeleting ? 40 : 60);

    return () => clearInterval(timer);
  }, [currentLine, isDeleting]);

  return (
    <div className="flowchart-wrapper">
      {/* Typewriter console */}
      <div className="typewriter">{typedText}<span className="cursor">█</span></div>

      {/* Flowchart diagram */}
      <div className="flowchart">
        <div className={`node-wrapper ${visibleNodes.includes("leviathan") ? "show pulse" : ""}`}>
          <div className="node leviathan">Leviathan<br /><small>C Malware</small></div>
        </div>

        <div className={`line ${visibleNodes.includes("c2c") ? "active animate-line" : ""}`}></div>

        <div className={`node-wrapper ${visibleNodes.includes("c2c") ? "show pulse" : ""}`}>
          <div className="node c2c">C2C Server</div>
        </div>

        {visibleNodes.includes("token") && (
          <div className="node-wrapper show pulse">
            <div className="node token">JSON Token</div>
          </div>
        )}

        {visibleNodes.includes("mac") && (
          <div className="node-wrapper show pulse">
            <div className="node mac">MAC<br /><small>Persistence</small></div>
          </div>
        )}

        {visibleNodes.includes("access") && (
          <div className="node-wrapper show access-nodes">
            <div className="node camera pulse">📷 Camera</div>
            <div className="node mic pulse">🎤 Mic</div>
            <div className="node files pulse">📂 Filesystem</div>
          </div>
        )}

        {visibleNodes.includes("decoy") && (
          <div className="node-wrapper show pulse">
            <div className="node decoy">Decoy<br /><small>Memory Game</small></div>
          </div>
        )}

        {visibleNodes.includes("network") && (
          <div className="node-wrapper show pulse">
            <div className="node network">🌐 Network Monitor</div>
          </div>
        )}

        {visibleNodes.includes("payload") && (
          <div className="node-wrapper show pulse">
            <div className="node payload">💥 Payload Delivered</div>
          </div>
        )}
      </div>

      {/* Terminal log feed */}
      <div className="flow-log">
        {logs.map((line, idx) => (
          <pre key={idx} className="flow-desc">{line}</pre>
        ))}
      </div>
    </div>
  );
}

