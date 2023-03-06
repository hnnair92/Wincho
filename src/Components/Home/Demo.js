import React, { useEffect, useState } from 'react'
import { OTSession, OTPublisher, OTStreams, OTSubscriber } from 'opentok-react';
const OT = require('@opentok/client');
const Video = ({sessionId,token}) => {
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
    // var sessionID = sessionId;
    // var sessionID = "1_MX40NzQ5ODQ3MX5-MTY3NzkxMzMxNTYwMH4vOGdWdE9KU2JhMnlXYis2NzF0dTVwV1l-fn4"; // Replace with your own session ID.
                        // See https://tokbox.com/developer/guides/create-session/.
    // var tokenId = token;
  return (
    <div>
        
          <OTSession apiKey={apiKey} sessionId={sessionId} token={token}>
            
            <OTStreams>
              <OTSubscriber />
            </OTStreams>
          </OTSession>
    </div>
  )
}

export default Video