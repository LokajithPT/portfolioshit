import React, { useState } from "react";
import "./Skills.css";

const skills = [
  { 
    title: "Python Wizardry", 
    description: "Not just scripts — I bend Python into hacking tools, automations, and pure chaos." 
  },
  { 
    title: "Linux Mastery", 
    description: "From Debian to Arch — I’m basically one step away from forging my own OS in the fires of /dev/null." 
  },
  { 
    title: "Networks", 
    description: "Packets, protocols, and pure peak knowledge. I don’t just browse the web, I dissect it." 
  },
  { 
    title: "Exploit Writing", 
    description: "If there’s a hole in the system, I’ll find it — and write something nasty enough to prove it." 
  },
  { 
    title: "Malware Development", 
    description: "Not the lame script-kiddie stuff — I’m talking precision-crafted chaos for research & learning." 
  },
  { 
    title: "Pentesting", 
    description: "Breaking in just to prove I can, then walking out leaving systems stronger than before." 
  },
  { 
    title: "Adaptability", 
    description: "Hand me a new framework or language — I’ll master it faster than most people finish a tutorial." 
  },
  { 
    title: "Languages Galore", 
    description: "Python, Rust, Kotlin, Java, C, C++ (aka C on steroids), Go — you name it, I’ve probably hacked it." 
  },
  { 
    title: "6 Years of Chaos", 
    description: "Half a decade of coding, hacking, building, and tearing things apart just to see how they tick." 
  },
  { 
    title: "Reverse Engineering", 
    description: "I tear binaries apart like puzzles — code spills its secrets whether it likes it or not." 
  },
  { 
    title: "OSINT Sleuthing", 
    description: "Give me breadcrumbs on the internet, I’ll turn it into a full-blown dossier before you blink." 
  },
  { 
    title: "Tool Forging", 
    description: "Why use someone else’s tool when I can build sharper, meaner, and more chaotic ones myself?" 
  },
];

export default function Skills() {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleClick = (index) => {
    // if the same card is clicked again, close it
    if (activeIndex === index) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  };

  return (
    <div className="skills-container">
      {skills.map((skill, index) => (
        <div
          key={index}
          className={`skill-card ${activeIndex === index ? "active" : ""}`}
          onClick={() => handleClick(index)}
        >
          <h3>{skill.title}</h3>
          {activeIndex === index && <p>{skill.description}</p>}
        </div>
      ))}
    </div>
  );
}

