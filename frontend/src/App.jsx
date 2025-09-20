import { useState, useRef, useEffect } from "react";
import "./App.css";
import glitchVideo from "./assets/dayum.mp4";
import song1 from "./assets/song1.mp3";
import song2 from "./assets/song2.mp3";
import song3 from "./assets/song3.mp3";
import song4 from "./assets/song4.mp3";
import AudioVisualizer from "./AudioVisualizer";
import Skills from "./Skills";
import Projects from "./Projects";
import About from "./About";

function useTypewriter(words, speed = 150, deleteSpeed = 100, pause = 1500) {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0); // which word
  const [subIndex, setSubIndex] = useState(0); // letter index
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    if (index >= words.length) return;

    if (subIndex === words[index].length + 1 && !deleting) {
      setTimeout(() => setDeleting(true), pause);
      return;
    }

    if (subIndex === 0 && deleting) {
      setDeleting(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const timeout = setTimeout(
      () => {
        setSubIndex((prev) => prev + (deleting ? -1 : 1));
        setText(words[index].substring(0, subIndex));
      },
      deleting ? deleteSpeed : speed,
    );

    return () => clearTimeout(timeout);
  }, [subIndex, index, deleting]);

  return text;
}

export default function App() {
  const [startGlitch, setStartGlitch] = useState(false);
  const [flash, setFlash] = useState(false);
  const [reveal, setReveal] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [musicMode, setMusicMode] = useState(false);

  const videoRef = useRef(null);
  const audioRef = useRef(null);
  const currentIndex = useRef(0);
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const skillsRef = useRef(null);
  const projectsRef = useRef(null);
  const aboutRef = useRef(null);

  const typedText = useTypewriter(["LOKI", "Lokajith..."], 150, 80, 1000);

  const playlist = [song1, song2, song3, song4];

  const handleClick = () => {
    setStartGlitch(true);
    setTimeout(() => {
      const video = videoRef.current;
      video.style.display = "block";
      video.muted = false;
      video.volume = 0.5;
      video.play();
    }, 2000);
  };

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.audioCtx && audio.audioCtx.state === "suspended") {
      audio.audioCtx.resume();
    }

    if (!musicMode) {
      currentIndex.current = Math.floor(Math.random() * playlist.length);
      audio.src = playlist[currentIndex.current];
      audio.volume = 0.3;
      audio.play().catch((err) => console.log("play error:", err));
      setMusicMode(true);

      audio.onended = () => {
        currentIndex.current = Math.floor(Math.random() * playlist.length);
        audio.src = playlist[currentIndex.current];
        audio.play().catch((err) => console.log("play error:", err));
      };
    } else {
      audio.pause();
      setMusicMode(false);
    }
  };

  const handleVideoEnd = () => {
    setFlash(true);
    setStartGlitch(false);
    setTimeout(() => {
      setFlash(false);
      const video = videoRef.current;
      video.style.display = "none";
      video.currentTime = 0;
      setReveal(true);
    }, 500);
  };

  const scrollToSection = (ref) => {
    console.log("Scrolling to section"); // debug
    ref.current?.scrollIntoView({ behavior: "smooth", inline: "center" });
    setMenuOpen(false);
  };

  return (
    <div className={`app ${startGlitch ? "glitching" : ""}`}>
      {flash && <div className="white-flash"></div>}

      <nav className={`navbar ${reveal ? "reveal" : ""}`}>
        <div className="logo glitch" data-text="LOKI">
          LOKI
        </div>
        <div
          className={`hamburger ${menuOpen ? "active" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
          <li
            className="glitch-hover"
            data-text="Home"
            onClick={() => scrollToSection(heroRef)}
          >
            Home
          </li>
          <li
            className="glitch-hover"
            data-text="Skills"
            onClick={() => scrollToSection(skillsRef)}
          >
            Skills
          </li>
          <li
            className="glitch-hover"
            data-text="Projects"
            onClick={() => scrollToSection(projectsRef)}
          >
            Projects
          </li>
          <li
            className="glitch-hover"
            data-text="About"
            onClick={() => scrollToSection(aboutRef)}
          >
            About
          </li>
          <li
            className="glitch-hover"
            data-text="Contact"
            onClick={() => scrollToSection(heroRef)}
          >
            Contact
          </li>
        </ul>

        <div className="music-controls">
          <AudioVisualizer audioRef={audioRef} />
          <button
            className={`music-toggle ${musicMode ? "on" : ""}`}
            onClick={toggleMusic}
            data-label={musicMode ? "HEHE MODE: ON 🖤" : "HEHE MODE: OFF"}
          >
            HEHE
          </button>
        </div>
      </nav>

      <div className="sections-container" ref={containerRef}>
        <section ref={heroRef} className={`hero ${reveal ? "reveal" : ""}`}>
          <h1 className="hero-title">
            Hi, I’m <span className="hacker-green">{typedText}</span>
          </h1>
          <p className="hero-subtitle">
            I’m a <span className="hacker-green">web developer</span> & ethical
            hacker in training.
          </p>
          <p className="hero-quote">
            "
            <span className="hacker-green">
              Control can sometimes be an illusion.
            </span>{" "}
            But sometimes you need illusion to gain control."
          </p>
          <button className="hero-btn" data-hover="AHHH" onClick={handleClick}>
            BRUH
          </button>
        </section>

        <section
          ref={skillsRef}
          className={`skills-section ${reveal ? "reveal" : ""}`}
        >
          <Skills />
        </section>

        <section
          ref={projectsRef}
          className={`projects-section ${reveal ? "reveal" : ""}`}
        >
          <Projects />
        </section>

        <section
          ref={aboutRef}
          className={`about-section ${reveal ? "reveal" : ""}`}
        >
          <About />
        </section>
      </div>

      <video
        ref={videoRef}
        className="fullscreen-video"
        muted
        onEnded={handleVideoEnd}
      >
        <source src={glitchVideo} type="video/mp4" />
      </video>

      <audio ref={audioRef} />
    </div>
  );
}
