import React, { useEffect, useState } from 'react'
import { OTSession, OTPublisher, OTStreams, OTSubscriber } from 'opentok-react';
import style from './Screen.module.css'
// import { log } from '@opentok/client';
const OT = require('@opentok/client');
const Screen = ({sessionId,token,setVideoGot,videoGot}) => {
  const [popup,setPopup] = useState(true);
  // console.log(sessionId,token)
    const[id,setId] = useState("")
    const data ={
        id:"",
        name:"",
        email:"",
        subscription:"",
        password:""
    }
    useEffect(()=>{
        setId(data.id)
    },[])
    var apiKey = "47498471"; // Replace with your API key. See https://tokbox.com/account
    const session = OT.initSession(apiKey, sessionId);
    const reconnecting = session._.reconnecting()
    session.on("streamDestroyed", function (event) {
      console.log("Stream stopped. Reason: " + event.reason);
      // event.stream()
      // session.disconnect()
      // console.log(session)
      // session.connect()
      // setVideoGot(false);
      // console.log(session._.reconnecting(),"reconnecting")
      // console.log(session._.reconnecting(),"reconnecting")
      // console.log(setVideoGot,"setVideoGot")
      // console.log(videoGot,"videoGot")
      setPopup(false)
    });
    // console.log(session._.reconnecting(),"reconnecting")
    // console.log(typeof session._.reconnecting(),"reconnecting")

    //   console.log(setVideoGot,"setVideoGot")
    //   console.log(videoGot,"videoGot")
    // var sessionID = sessionId;
    // var sessionID = "1_MX40NzQ5ODQ3MX5-MTY3NzkxMzMxNTYwMH4vOGdWdE9KU2JhMnlXYis2NzF0dTVwV1l-fn4"; // Replace with your own session ID.
                        // See https://tokbox.com/developer/guides/create-session/.
    // var tokenId = token;
    // function getlog(e){
    //   console.log(e)
    // }
    return (
    <div className={style.container}>
        {/* {popup?
        <div className={style.popup}>
          <div className={style.Section}>
            <h1>Please wait while we get the video for you </h1>
          </div>
        </div>
        :""} */}
        {videoGot?
        
        <OTSession
        apiKey={apiKey} sessionId={sessionId} token={token} >
             
             <OTStreams >
               <OTSubscriber onSubscribe={(e)=>{
                 console.log(e);
                 setVideoGot(true)
                 console.log("gotted");
               }} onError={(error)=>{
                 console.log("Exited",error)
               }}/>
             </OTStreams>
           </OTSession>
        :
        
        
        <OTSession
        apiKey={apiKey} sessionId={sessionId} token={token} >
             
             <OTStreams >
               <OTSubscriber onSubscribe={(e)=>{
                 console.log(e);
                 setVideoGot(true)
                 console.log("gotted");
               }} onError={(error)=>{
                 console.log("Exited",error)
               }}/>
             </OTStreams>
           </OTSession>
        
        }
{/*        
          <OTSession
       apiKey={apiKey} sessionId={sessionId} token={token} >
            
            <OTStreams >
              <OTSubscriber onSubscribe={(e)=>{
                console.log(e);
                setVideoGot(true)
                console.log("gotted");
              }} onError={(error)=>{
                console.log("Exited",error)
              }}/>
            </OTStreams>
          </OTSession> */}
        
        
    </div>
  )
}

export default Screen
// connectionCreated={getlog}
// connectionDestroyed={getlog}
// sessionConnected={getlog}
// sessionDisconnected={getlog}
// // sessionReconnected={getlog}
// connectionCreated={ console.log("connection created")}
// connectionDestroyed={console.log("connection destroyed")}
// sessionConnected={console.log("Client connect to a session")}
// sessionDisconnected={console.log("Client disConnect to a session")}