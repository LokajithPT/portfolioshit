import { useState, useRef, useEffect } from 'react';
import './App.css';
import glitchVideo from './assets/dayum.mp4';

export default function App() {
  const [startGlitch, setStartGlitch] = useState(false);
  const [flash, setFlash] = useState(false);
  const [reveal, setReveal] = useState(false);
  const videoRef = useRef(null);

  const handleClick = () => {
    setStartGlitch(true);

    setTimeout(() => {
      videoRef.current.style.display = 'block';
	    videoRef.current.muted = false;
	    videoRef.current.volume = 0.5;
	
      videoRef.current.play();
    }, 2000);
  };

  const handleVideoEnd = () => {
    setFlash(true);
    setStartGlitch(false);

    // Flash duration + fade
    setTimeout(() => {
      setFlash(false);
      videoRef.current.style.display = 'none';
      videoRef.current.currentTime = 0;
      setReveal(true); // start showing elements
    }, 500); // half-second flash
  };

  return (
    <div className={`app ${startGlitch ? 'glitching' : ''}`}>
      {flash && <div className="white-flash"></div>}

      {/* Navbar */}
      <nav className={`navbar ${reveal ? 'reveal' : ''}`}>
        <div className="logo glitch" data-text="LOKI">LOKI</div>
        <ul className="nav-links">
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
        <p className="hero-quote">"<span className="hacker-green">Control can sometimes be an illusion.</span> But sometimes you need illusion to gain control."</p>
        <button className="hero-btn" data-hover="AHHH"onClick={handleClick}>BRUH</button>
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
    </div>
  );
}

