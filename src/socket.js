import io from "socket.io-client";
const serverUrl = "http://3.239.80.132:4000/";
export const socket = io(serverUrl);

// const num =socket.id();