import io from "socket.io-client";
// const serverUrl = "https://socket.wincha-online.com/";
const serverUrl = "https://ops.wincha-online.com/";
export const socket = io(serverUrl);
console.log(socket)
// const num =socket.id();