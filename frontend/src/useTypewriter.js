import { useState, useEffect } from "react";

export default function useTypewriter(lines = [], speed = 50, delay = 1000, mistakeChance = 0.1) {
  const [text, setText] = useState("");
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isMistaking, setIsMistaking] = useState(false);

  useEffect(() => {
    if (!lines.length) return;
    if (lineIndex >= lines.length) return;

    const currentLine = lines[lineIndex];
    let timeout;

    if (charIndex < currentLine.length) {
      timeout = setTimeout(() => {
        if (!isMistaking && Math.random() < mistakeChance) {
          // show a wrong char temporarily
          setText(prev => prev + getRandomChar());
          setIsMistaking(true);
        } else if (isMistaking) {
          // backspace the wrong char
          setText(prev => prev.slice(0, -1));
          setIsMistaking(false);
        } else {
          // type the correct char
          setText(prev => prev + currentLine[charIndex]);
          setCharIndex(charIndex + 1);
        }
      }, isMistaking ? speed / 2 : speed); // delete faster than type
    }

    // line finished
    if (charIndex === currentLine.length && !isMistaking) {
      timeout = setTimeout(() => {
        setText(prev => prev + "\n");
        setLineIndex(lineIndex + 1);
        setCharIndex(0);
      }, delay);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, lineIndex, isMistaking, lines, speed, delay, mistakeChance]);

  return text;
}

// helper: random wrong char
function getRandomChar() {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
  return chars[Math.floor(Math.random() * chars.length)];
}

