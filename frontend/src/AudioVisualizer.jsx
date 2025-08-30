import { useEffect, useRef } from "react";

export default function AudioVisualizer({ audio }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!audio) return;

    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const analyser = audioCtx.createAnalyser();
    const source = audioCtx.createMediaElementSource(audio);

    source.connect(analyser);
    analyser.connect(audioCtx.destination);

    analyser.fftSize = 64; // fewer bars = cleaner
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const draw = () => {
      requestAnimationFrame(draw);
      analyser.getByteFrequencyData(dataArray);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const barWidth = (canvas.width / bufferLength);
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const barHeight = dataArray[i] / 4;
        ctx.fillStyle = "#00ffcc";
        ctx.fillRect(x, canvas.height - barHeight, barWidth - 1, barHeight);
        x += barWidth;
      }
    };

    draw();

    return () => {
      audioCtx.close();
    };
  }, [audio]);

  return (
    <canvas 
      ref={canvasRef} 
      width={80} 
      height={30} 
      style={{ display: "block" }}
    />
  );
}

