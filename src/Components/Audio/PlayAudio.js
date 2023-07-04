import React, { useEffect, useRef, useState } from 'react'
import { music } from '../../assests/Musics/allMusic';

function PlayAudio({gameMusic, setGameMusic, gameSound, setGameSound }) {
    const [musicStatus, setMusicStatus] = useState(
        localStorage.getItem("music")
          ? localStorage.getItem("music")
          : localStorage.setItem("music", JSON.stringify(false))
      );
      const audioRefHome = useRef(null);
      useEffect(() => {
        if (gameMusic === 1 || gameMusic === 1) {
          audioRefHome.current.volume = 1;
          playAudioBg();
        } else {
          audioRefHome.current.volume = 0;
        }
      }, [gameMusic]);
      useEffect(() => {
        if (gameMusic === 1 || gameMusic === 1) {
          audioRefHome.current.volume = 1;
          playAudioBg();
        } 
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
      async function playAudioBg() {
        audioRefHome.current.src = music.Menu;
        audioRefHome.current.play();
      }
  return (
    <div>
         <audio ref={audioRefHome} onEnded={audioEnded} loop></audio>
    </div>
  )
}

export default PlayAudio