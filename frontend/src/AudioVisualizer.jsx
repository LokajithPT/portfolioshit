import { useEffect, useRef } from "react";

export default function AudioVisualizer({ audioRef }) {
  const canvasRef = useRef(null);
  const audioCtxRef = useRef(null);
  const analyserRef = useRef(null);
  const sourceRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // create AudioContext once
    if (!audioCtxRef.current) {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      audioCtxRef.current = audioCtx;

      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 128; // smaller FFT for more bars
      analyserRef.current = analyser;

      try {
        const source = audioCtx.createMediaElementSource(audio);
        source.connect(analyser);
        analyser.connect(audioCtx.destination);
        sourceRef.current = source;
      } catch (e) {
        console.log("MediaElementSource already connected");
      }

      audio.audioCtx = audioCtx; // store for resume
    }

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = 150;
    canvas.height = 50;

    const bufferLength = analyserRef.current.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    const bars = new Array(bufferLength).fill(0); // for smooth trailing

    function draw() {
      requestAnimationFrame(draw);
      analyserRef.current.getByteFrequencyData(dataArray);

      // fade the canvas slightly instead of clearing it
      ctx.fillStyle = "rgba(0,0,0,0.15)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const barWidth = (canvas.width / bufferLength) * 2;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        // Smooth trailing effect
        bars[i] = bars[i] * 0.7 + dataArray[i] * 0.3;

        // increase reactivity
        const barHeight = bars[i] / 2;

        ctx.fillStyle = `hsl(${barHeight + 100}, 100%, 50%)`;
        ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
        x += barWidth + 1;
      }
    }

    draw();
  }, [audioRef]);

  return <canvas ref={canvasRef} style={{ display: "block" }} />;
}

