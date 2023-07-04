import React, { useEffect, useRef } from 'react'
import { music } from '../../assests/Musics/allMusic';

function PlaySound({setPlayAudio,src,reportIssueCategories,gameMusic, setGameMusic, gameSound, setGameSound }) {
    const audioRef = useRef(null)
    console.log(src)
    let audioStatus = localStorage.getItem("sound");
    useEffect(() => {
        if (reportIssueCategories === true && audioStatus === "1"||reportIssueCategories === true && audioStatus === 1) {
        playAudio(music.Chime);
        }
        }, [reportIssueCategories]);
        
        useEffect(() => {
          if (gameSound === 1||gameSound==="1") {
            audioRef.current.volume = 1;
          } else {
            audioRef.current.volume = 0;
          }
        }, [gameSound]);
        
        
        async function playAudio(src) {
          if (audioStatus===1||audioStatus==="1") {
            audioRef.current.volume = 1;
            // audioRef.current.src = src;
            audioRef.current.play();
          
          } else {
            audioRef.current.volume = 0;
          }
        }
        useEffect(()=>{
            console.log(src)
            console.log(audioStatus)
            console.log(audioRef.current.volume)
            console.log(audioRef)
            playAudio(src)
        },[src])
  return (
    <div>
    {src?
      <audio ref={audioRef} onEnded={()=>{
        console.log("finished")
        setPlayAudio("")
      }}>
        <source src={src} type="audio/mp3"/>
        <source src={src} type="audio/ogg"/>
        <source src={src} type="audio/mpeg"/>
        <p>Your browser does not support the HTML audio element.</p>
      </audio>
    
    :""}
      {/* <audio controls>
        <source src={src}/>
      </audio> */}

    </div>
  )
}

export default PlaySound