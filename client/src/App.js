import './App.css';
import {useState} from "react";
import io from "socket.io-client"
import Chat from "./Chat.js"
const socket=io.connect("http://localhost:3001");
//import {useState} from "react";
function App() {
  const [username,setusername]=useState([]);
  const [room,setroom]=useState([]);
  const [showchat,setshowchat]=useState(false);
  const joinroom=()=>{
    if(username!=" " && room!=" "){
       socket.emit("join_room",room);  
       setshowchat(true); 
    }
    
  };
  return (
    <div className="App">
      {!showchat ? (
      <div className="joinChatContainer">
      <h4>Join Chat</h4>
      <input type="text" placeholder="John.." onChange={(event)=>{setusername(event.target.value)}}></input>
      <input type="text" placeholder='id' onChange={(event)=>{setroom(event.target.value)}}></input> 
      <button onClick={joinroom}>Join room</button>
      </div>
      ):(
      <Chat socket={socket} username={username} room={room}/>
      )}
    </div>
  );
}

export default App;
