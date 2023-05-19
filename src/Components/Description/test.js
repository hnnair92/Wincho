import React from 'react'
const OT = require('@opentok/client');

const Test = () => {

    // * global OT API_KEY TOKEN SESSION_ID SAMPLE_SERVER_BASE_URL */

let apiKey = "47498471";
let sessionId = "2_MX40NzQ5ODQ3MX5-MTY4NDM1NzQyMTQ1M35PUnNzVVM2eFZzMVRKUTBFL3BSRWxtNUF-fn4";
let token = "T1==cGFydG5lcl9pZD00NzQ5ODQ3MSZzaWc9ZWYzNjMwM2Q2YzNkZDAxMjk1NTI5OWUwNDZmZjlkNTdjYTU3YzU4ODpzZXNzaW9uX2lkPTJfTVg0ME56UTVPRFEzTVg1LU1UWTRORE0xTnpReU1UUTFNMzVQVW5OelZWTTJlRlp6TVZSS1VUQkZMM0JTUld4dE5VRi1mbjQmY3JlYXRlX3RpbWU9MTY4NDM1NzQyMSZub25jZT0wLjU0MjA2NTg0MDU1MTIwNjkmcm9sZT1wdWJsaXNoZXImZXhwaXJlX3RpbWU9MTY4NDQ0MzgyMTQ1NiZpbml0aWFsX2xheW91dF9jbGFzc19saXN0PQ==";

function handleError(error) {
  if (error) {
    console.error(error);
  }
}
const sessions = OT.initSession(apiKey, sessionId);
console.log(sessions);
// function InitializeSession() {
  const session = OT.initSession(apiKey, sessionId);

  // Subscribe to a newly created stream
  session.on('streamCreated', (event) => {
    console.log(event)
    const subscriberOptions = {
      insertMode: 'append',
      width: '100%',
      height: '100%'
    };
    session.subscribe(event.stream, 'subscriber', subscriberOptions, handleError);
  });

  session.on('sessionDisconnected', (event) => {
    console.log('You were disconnected from the session.', event.reason);
  });
// }

// See the config.js file.
// if (API_KEY && TOKEN && SESSION_ID) {
//   apiKey = API_KEY;
//   sessionId = SESSION_ID;
//   token = TOKEN;
//   initializeSession();
// } else if (SAMPLE_SERVER_BASE_URL) {
  // Make a GET request to get the OpenTok API key, session ID, and token from the server
//   fetch(SAMPLE_SERVER_BASE_URL + '/session')
//   .then((response) => response.json())
//   .then((json) => {
//     apiKey = json.apiKey;
//     sessionId = json.sessionId;
//     token = json.token;
//     initializeSession();
//   }).catch((error) => {
//     handleError(error);
//     alert('Failed to get opentok sessionId and token. Make sure you have updated the config.js file.');
//   });
// }

  return (
    <div>
         <div id="videos">
            <div id="subscriber"></div>
            <div id="publisher"></div>
        </div>
    </div>
  )
}

export default Test