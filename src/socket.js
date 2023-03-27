import io from "socket.io-client";
const serverUrl = "https://socket.wincha-online.com/";
export const socket = io(serverUrl);

// const num =socket.id();