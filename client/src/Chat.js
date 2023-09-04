import React from "react";
import { useState } from "react";
import { useEffect,useMemo } from "react";
import ScrollToBottom from "react-scroll-to-bottom"; 
function Chat({socket,username,room}){
    const [message,setmessage]=useState("");
    const[messagelist,setmessagelist]=useState([]);
    const sendmessage=async()=>{
        if(message!==" "){
          const messagedata={
            room:room,
            author:username,
            message:message,
            time:new Date(Date.now()).getHours()+":"+new Date(Date.now()).getMinutes()
          };
          await socket.emit("send_message",messagedata);
          setmessagelist((list)=>[...list,messagedata]);
        }
    };
    useMemo(()=>{
        socket.on("receive_message",(data)=>{
          setmessagelist((list)=>[...list,data]); 
          console.log(1);
          console.log(data);
        });
    },[socket]);
    return(
        <div className="chat-window">
         <div className="chat-header">
            <p>REAL TIME CHAT</p>
         </div>
         <div className="chat-body">
          <ScrollToBottom className="message-container">
          {messagelist.map((messagecontent)=>{
            return (
              <div className="message" id={username===messagecontent.author?"you":"other"}>
                <div> 
                  <div className="message-content">
                    <p>{messagecontent.message}</p>
                  </div>
                  <div className="message-meta">
                    <p id="time">{messagecontent.time}</p>
                    <p id="author">{messagecontent.author}</p>
                  </div>
                  </div>
                </div>
            )
          })}
          </ScrollToBottom>
         </div>
         <div className="chat-footer">
            <input type="text" placeholder="Type text" onChange={(event)=>{setmessage(event.target.value)}} 
            onKeyPress={(event)=>{event.key==="Enter" && sendmessage();}}></input>
         </div>
         <button onClick={sendmessage}>&#9658;</button>
         </div>
    )
};

export default Chat;