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
        if (gameMusic === 1 || gameMusic === "1") {
          audioRefHome.current.muted = false;
          playAudioBg();
        } else {
          audioRefHome.current.muted = true;
        }
      }, [gameMusic]);
      useEffect(() => {
        if (gameMusic === 1 || gameMusic === "1") {
          audioRefHome.current.muted = false;
          playAudioBg();
        } 
      }, []);
      async function audioEnded(src) {
        if (musicStatus === "true") {
          audioRefHome.current.muted = false;
          audioRefHome.current.src = src;
          audioRefHome.current.play();
        } else {
          audioRefHome.current.muted = true;
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