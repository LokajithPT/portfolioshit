import { useEffect, useRef, useState } from "react";
import "./About.css";

const roles = [
  "Hacker",
  "Programmer",
  "Security Pentester",
  "Bug Hunter",
  "Code Wizard",
];

export default function About() {
  const containerRef = useRef(null);
  const roleRef = useRef(null);
  const [typedText, setTypedText] = useState("");
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [boxes, setBoxes] = useState([]);
  const [webOrigin, setWebOrigin] = useState({
    x: window.innerWidth / 2,
    y: 200,
  });
  const [activeBox, setActiveBox] = useState(null);

  useEffect(() => {
    const initialBoxes = roles.map((role, i) => ({
      role,
      x: Math.random() * (window.innerWidth - 200),
      y: Math.random() * (window.innerHeight - 300) + 150,
      id: i,
      collected: false,
    }));
    setBoxes(initialBoxes);
  }, []);

  useEffect(() => {
    const updateOrigin = () => {
      if (roleRef.current) {
        const rect = roleRef.current.getBoundingClientRect();
        setWebOrigin({ x: rect.left + rect.width / 2, y: rect.bottom });
      }
    };
    updateOrigin();
    window.addEventListener("resize", updateOrigin);
    return () => window.removeEventListener("resize", updateOrigin);
  }, [typedText]);

  useEffect(() => {
    if (currentRoleIndex >= roles.length) return;

    const role = roles[currentRoleIndex];
    let subIndex = 0;

    const typeInterval = setInterval(() => {
      setTypedText(role.substring(0, subIndex));
      subIndex++;
      if (subIndex > role.length) {
        clearInterval(typeInterval);

        const box = boxes.find((b) => b.role === role);
        if (box) setActiveBox(box.id);

        setTimeout(() => {
          setBoxes((prev) =>
            prev.map((b) => (b.id === box.id ? { ...b, collected: true } : b)),
          );
          setActiveBox(null);
          setCurrentRoleIndex((prev) => prev + 1);
          setTypedText("");
        }, 2000);
      }
    }, 120);

    return () => clearInterval(typeInterval);
  }, [currentRoleIndex, boxes]);

  return (
    <div className="about-container" ref={containerRef}>
      <h2 className="center-text">
        I am a (
        <span className="role-text" ref={roleRef}>
          {typedText}
        </span>
        )
      </h2>

      <svg className="web-layer" width="100%" height="100%">
        {activeBox !== null && boxes[activeBox] && (
          <line
            x1={webOrigin.x}
            y1={webOrigin.y}
            x2={boxes[activeBox].x + 60}
            y2={boxes[activeBox].y + 25}
            stroke="#0ff"
            strokeWidth="2"
            strokeDasharray="8"
            className="web-line"
          />
        )}
      </svg>

      <div className="floating-container">
        {boxes.map((b) =>
          b.collected ? null : (
            <div
              key={b.id}
              className={`floating-card ${activeBox === b.id ? "active" : ""}`}
              style={{
                left: activeBox === b.id ? webOrigin.x - 60 : b.x,
                top: activeBox === b.id ? webOrigin.y - 25 : b.y,
                transition: activeBox === b.id ? "all 2s ease-in-out" : "none",
              }}
            >
              {b.role}
            </div>
          ),
        )}
      </div>
    </div>
  );
}
