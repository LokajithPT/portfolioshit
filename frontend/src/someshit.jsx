const [musicMode, setMusicMode] = useState(false);
const strudelRef = useRef(null); // placeholder for your script object

const toggleMusic = () => {
  setMusicMode(!musicMode);
  if (!musicMode) {
    // start Strudel
    strudelRef.current = startStrudel(); // assume startStrudel() initializes it
  } else {
    // stop Strudel
    strudelRef.current.stop(); // or whatever API stop method is
  }
};

