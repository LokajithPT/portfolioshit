import { useState, useRef } from 'react';
import './App.css';
import glitchVideo from './assets/dayum.mp4';

// Import songs directly (so Vite bundles them)
import song1 from "./assets/song1.mp3";
import song2 from "./assets/song2.mp3";
import song3 from "./assets/song3.mp3";
import song4 from "./assets/song4.mp3";
import AudioVisualizer from "./AudioVisualizer";

export default function App() {
  const [startGlitch, setStartGlitch] = useState(false);
  const [flash, setFlash] = useState(false);
  const [reveal, setReveal] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [musicMode, setMusicMode] = useState(false);

  const videoRef = useRef(null);
  const audioRef = useRef(null);
  const currentIndex = useRef(0);

  // ✅ Use the imported songs here
  const playlist = [song1, song2, song3, song4];

  const handleClick = () => {
    setStartGlitch(true);

    setTimeout(() => {
      const video = videoRef.current;
      video.style.display = 'block';
      video.muted = false; 
      video.volume = 0.5;
      video.play();
    }, 2000); // glitch duration
  };

  const toggleMusic = () => {
    if (!musicMode) {
      audioRef.current.src = playlist[currentIndex.current];
      audioRef.current.play();
      setMusicMode(true);

      audioRef.current.onended = () => {
        currentIndex.current = (currentIndex.current + 1) % playlist.length;
        audioRef.current.src = playlist[currentIndex.current];
        audioRef.current.play();
      };
    } else {
      audioRef.current.pause();
      setMusicMode(false);
    }
  };

  const handleVideoEnd = () => {
    setFlash(true);
    setStartGlitch(false);

    setTimeout(() => {
      setFlash(false);
      const video = videoRef.current;
      video.style.display = 'none';
      video.currentTime = 0;
      setReveal(true); 
    }, 500); 
  };

  return (
    <div className={`app ${startGlitch ? 'glitching' : ''}`}>
      {/* Flash overlay */}
      {flash && <div className="white-flash"></div>}

      {/* Navbar */}
      <nav className={`navbar ${reveal ? 'reveal' : ''}`}>
        <div className="logo glitch" data-text="LOKI">LOKI</div>

        {/* Hamburger */}
        <div 
          className={`hamburger ${menuOpen ? 'active' : ''}`} 
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>

	   
    <AudioVisualizer audioRef={audioRef} />

          <button 
            className={`music-toggle ${musicMode ? 'on' : ''}`} 
            onClick={toggleMusic}
          >
            {musicMode ? "HEHE MODE: ON 🖤" : "HEHE MODE: OFF"}
          </button>

          <li className="glitch-hover" data-text="Home">Home</li>
          <li className="glitch-hover" data-text="Projects">Projects</li>
          <li className="glitch-hover" data-text="Skills">Skills</li>
          <li className="glitch-hover" data-text="About">About</li>
          <li className="glitch-hover" data-text="Contact">Contact</li>
        </ul>
      </nav>
      {/* Hero Section */}
      <section className={`hero ${reveal ? 'reveal' : ''}`}>
        <h1 className="hero-title">Hi, I’m <span className="hacker-green">Loki</span></h1>
        <p className="hero-subtitle">I’m a <span className="hacker-green">web developer</span> & ethical hacker in training.</p>
        <p className="hero-quote">
          "<span className="hacker-green">Control can sometimes be an illusion.</span> 
          But sometimes you need illusion to gain control."
        </p>
        <button className="hero-btn" data-hover="AHHH" onClick={handleClick}>BRUH</button>
      </section>

      {/* Fullscreen Video */}
      <video
        ref={videoRef}
        className="fullscreen-video"
        muted
        onEnded={handleVideoEnd}
      >
        <source src={glitchVideo} type="video/mp4" />
      </video>

      {/* Hidden audio element */}
      <audio ref={audioRef} />
    </div>
  );
}

