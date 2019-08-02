import React, { useState, useEffect } from "react";
import io from "socket.io-client";

function Message({ userId, recId }) {

    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const socket = io('localhost:4000');


    useEffect(() => {
        const link = `http://localhost:4000/messages/${userId}/${recId}`;
        fetch(link, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include"
        })
            .then(response => response.json())
            .then(responseJson => {
                if (responseJson.success) {
                    debugger
                    console.log("responsejson data", responseJson.data);
                    setMessages(messages.concat(responseJson.data));
                }
            })
            .catch(err => console.log(err));
    }, []);


    function sendMessage(e) {
        e.preventDefault();
        socket.emit('SEND_MESSAGE', {
            from: userId,
            to: recId,
            content: message
        });
        setMessage("");
    }

    socket.on('RECEIVE_MESSAGE', function (data) {
        setMessages(messages => messages.concat(data));
    });





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
                <div className="col-12">
                    <div className="card" style={{
                        'background': "linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)"

                    }}>
                        <div className="card-body">
                            <div className="card-title">
                                Global Chat
                                    me: {userId.slice(-4)} | recId: {recId.slice(-4)}
                            </div>
                            <hr />
                            <div className="messages">
                                {messages.map(message => {
                                    return (
                                        <div> {userId.slice(-4)} to {recId.slice(-4)} : {message.content} </div>
                                    );
                                })}
                            </div>
                            <div className="footer">
                                <input type="text" placeholder="Message" className="form-control" value={message} onChange={e => setMessage(e.target.value)} />
                                <br />
                                <input type="submit" className="btn btn-primary form-control" value='Send' onClick={e => sendMessage(e, userId, recId)} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Message;