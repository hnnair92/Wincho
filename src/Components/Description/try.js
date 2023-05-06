const Description = ({
    gameMusic,
    setGameMusic,
    gameSound,
    setGameSound,
    active,
  }) => {
    const audioRef = useRef(null);
    const audioRefHome = useRef(null);
    let audioStatus = localStorage.getItem("sound");
    const [musicStatus, setMusicStatus] = useState(
      localStorage.getItem("music")
        ? localStorage.getItem("music")
        : localStorage.setItem("music", JSON.stringify(false))
    );
    useEffect(() => {
      console.log(gameMusic === "true", "gameSound");
      console.log(typeof gameMusic, "gameMusic");
      if (gameMusic === "true" || gameMusic === true) {
        console.log(audioRefHome.current.volume);
        audioRefHome.current.volume = 1;
        console.log("true for gameMusic");
        console.log(audioRefHome.current.volume);
        playAudioBg();
      } else {
        audioRefHome.current.volume = 0;
        console.log(typeof gameMusic);
        console.log("not reached");
      }
      console.log(typeof gameMusic);
    }, [gameMusic]);
    useEffect(() => {
      console.log(gameSound === "true", "gameSound");
      console.log(typeof gameSound, "gameMusic");
      if (gameSound === "true" || gameSound === true) {
        console.log(audioRef.current.volume);
        audioRef.current.volume = 1;
        console.log("true for gameMusic");
        console.log(audioRef.current.volume);
      } else {
        audioRef.current.volume = 0;
        console.log(typeof gameMusic);
        console.log("not reached");
      }
      console.log(typeof setGameSound);
    }, [gameSound]);
    useEffect(() => {
      if (gameMusic === "true" || gameMusic === true) {
        console.log(audioRefHome.current.volume);
        audioRefHome.current.volume = 1;
        playAudioBg();
      } else {
        console.log(typeof gameMusic);
        console.log("not reached");
      }
      if (gameSound === "true" || gameSound === true) {
        console.log(audioRef.current.volume);
        audioRef.current.volume = 1;
        playAudioBg();
      } else {
        console.log(typeof gameMusic);
        console.log("not reached");
      }
      console.log(typeof gameMusic);
      // console.log()
    }, []);
    async function audioEnded(src) {
      if (musicStatus === "true") {
        audioRefHome.current.volume = 1;
        audioRefHome.current.src = src;
        audioRefHome.current.play();
      } else {
        audioRefHome.current.volume = 0;
        
      }
    }
    async function playAudio(src) {
      console.log(audioStatus, "audioStatus");
      // audioRef.current.volume = 1
      if (audioStatus === "true") {
        console.log("reached here");
        audioRef.current.volume = 1;
        audioRef.current.src = src;
        audioRef.current.play();
      } else {
        audioRef.current.volume = 0;
      }
    }
    async function playAudioBg() {
      console.log(musicStatus, "musicStatus");
      console.log(audioRefHome.current.play(), "from its function");
      audioRefHome.current.src = music.Game;
      audioRefHome.current.play();
      console.log(audioRefHome.current.volume, "from its function");
    }






    

  
