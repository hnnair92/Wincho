import React, { useEffect, useRef } from 'react'

function AudioTry() {
    const audioTryRef = useRef(null)
    useEffect(()=>{
        if(audioTryRef){
            audioTryRef.current.play()

        }
    },[audioTryRef])
  return (
    <div>
        <button onClick={()=>{
            audioTryRef.current.muted=true
        }}>mute</button>
        <button onClick={()=>{
            audioTryRef.current.muted=true
        }}>unmute</button>
        <audio muted={true} autoplay controls ref={audioTryRef} id="myAudio" src="https://www.w3schools.com/html/horse.ogg"></audio>
    </div>
  )
}

export default AudioTry