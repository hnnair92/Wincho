import React, { useEffect, useState } from 'react'
// import { OTSession, OTPublisher, OTStreams, OTSubscriber } from 'opentok-react';
const Demo = () => {
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
    var sessionID = "2_MX40NzQ5ODQ3MX5-MTY3NzY0MzU3MTUxMX5OQkNMYWxtc3ZKVXN2d3hlbmE0cG1IMER-fn4"; // Replace with your own session ID.
                        // See https://tokbox.com/developer/guides/create-session/.
    var token = "T1==cGFydG5lcl9pZD00NzQ5ODQ3MSZzaWc9YTU3NDVmOWVkOTBjZjc4Mzg5ZDJmN2FkYjhkYThjZDdhOWRlODhlMjpzZXNzaW9uX2lkPTJfTVg0ME56UTVPRFEzTVg1LU1UWTNOelkwTXpVM01UVXhNWDVPUWtOTVlXeHRjM1pLVlhOMmQzaGxibUUwY0cxSU1FUi1mbjQmY3JlYXRlX3RpbWU9MTY3NzY0MzU3MiZub25jZT0wLjM1OTcxMTU0NzI3NzIyOTImcm9sZT1wdWJsaXNoZXImZXhwaXJlX3RpbWU9MTY3NzcyOTk3MTUxMyZpbml0aWFsX2xheW91dF9jbGFzc19saXN0PQ=="; // Replace with a generated token.
  return (
    <div>
        {/* <input type="text" value={id} /> */}
          {/* <OTStreams>
            <OTSubscriber 
               key={stream.id}
              session={this.sessionHelper.session}
              stream={stream}
            />
          </OTStreams> */}
          {/* <OTSession apiKey={apiKey} sessionId={sessionID} token={token}>
            <OTPublisher />
            <OTStreams>
              <OTSubscriber />
            </OTStreams>
          </OTSession> */}
    </div>
  )
}

export default Demo