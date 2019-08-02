import React, { useState, useEffect } from "react";
import io from "socket.io-client";

function Message(props) {
    const [message, setMessage] = useState(""); 
    const [messages, setMessages] = useState([]);
    const [from, setFrom] = useState(""); 
    const [to, setTo] = useState(""); 
    const socket = io('localhost:4000');
    
    function sendMessage(e) {
        e.preventDefault(); 
        socket.emit('SEND_MESSAGE', {
            from: 'Alex', 
            to: 'Zack', 
            content: message
        }); 
        setMessage(""); 
    }

    socket.on('RECEIVE_MESSAGE', function(data){
        setMessages(messages.concat(data));
    })
    

    // function newMessage(e, id) {
    //     e.preventDefault(); 
    //     const link = "http://localhost:4000/" + id + '/newMessage'; 
    //     fetch(link, {
    //         method: "POST",
    //         headers: {
    //           "Content-Type": "application/json"
    //         },
    //         credentials: "include",
    //         redirect: "follow",
    //         body: JSON.stringify({
    //           content: message
    //         })
    //       })
    //         .then(response => {
    //           console.log(response); 
    //           return (response.json)})
    //         .then(responseJson => {
    //           console.log(responseJson);
    //           if (responseJson.success) {
    //             alert("Message sent!");
    //           }
    //         })
    //         .catch(err => console.log(err));
    //     };
 
        return (
            <div className="container">
                <div className="row">
                    <div className="col-4">
                        <div className="card">
                            <div className="card-body">
                                <div className="card-title">Global Chat</div>
                                <hr/>
                                <div className="messages">
                                    {messages.map(message => {
                                        return (
                                            <div> {message.from} : {message.to} : {message.content} </div>
                                        );
                                    })}
                                </div>
                                <div className="footer">
                                    <input type="text" placeholder="Message" className="form-control" value={message} onChange={e => setMessage(e.target.value)}/>
                                    <br/>
                                    <input type = "submit" className="btn btn-primary form-control" value = 'Send' onClick={e => sendMessage(e)}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
}

export default Message;