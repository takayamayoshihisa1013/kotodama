import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import "./../css/ChatList.css";
import testImage from "./../images/test/mikakunintouhikousyoujo.jpg";
import Chat from "./Chat.js";
import Config from "../Config.js";

function ChatList() {

    const [chatList, setChatList] = useState([]);

    useEffect(() => {
        const chatListData = async () => {
            try {
                const response = await fetch(`${Config.azureBackUrl}/chatListData`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                });
                const resData = await response.json();
                if (response.ok) {
                    setChatList(resData.chatListData);
                }
            } catch {

            }
        }
        chatListData();
    }, [])

    return (
        <article>

            <div className="chatContent">
                <section className="chatList">
                    <h3 className="title">トーク</h3>
                    <ul>
                        <a href={`chat?id=a`}>
                            <li>
                                <img className="chatListUserIcon" src={testImage}></img>
                                <div className="chatUser">
                                    <p className="chatListUserName"><span className="chatName">じゅんと</span><span className="lastChatTime">11:11</span></p>
                                    <p className="lastChat">おやおや、おやおやおやおやおや</p>
                                </div>
                            </li>
                        </a>
                        <a href={`chat?id=b`}>
                            <li>
                                <img className="chatListUserIcon" src={testImage}></img>
                                <div className="chatUser">
                                    <p className="chatListUserName"><span className="chatName">さし</span><span className="lastChatTime">11:11</span></p>
                                    <p className="lastChat">おやおや、おやおやおやおやおや</p>
                                </div>
                            </li>
                        </a>
                        <a href={`chat?id=c`}>
                            <li>
                                <img className="chatListUserIcon" src={testImage}></img>
                                <div className="chatUser">
                                    <p className="chatListUserName"><span className="chatName">かわべ</span><span className="lastChatTime">11:11</span></p>
                                    <p className="lastChat">おやおや、おやおやおやおやおや</p>
                                </div>
                            </li>
                        </a>
                        <a href={`chat?id=d`}>
                            <li>
                                <img className="chatListUserIcon" src={testImage}></img>
                                <div className="chatUser">
                                    <p className="chatListUserName"><span className="chatName">さくま</span><span className="lastChatTime">11:11</span></p>
                                    <p className="lastChat">おやおや、おやおやおやおやおや</p>
                                </div>
                            </li>
                        </a>
                        <a href={`chat?id=e`}>
                            <li>
                                <img className="chatListUserIcon" src={testImage}></img>
                                <div className="chatUser">
                                    <p className="chatListUserName"><span className="chatName">ふっくい</span><span className="lastChatTime">11:11</span></p>
                                    <p className="lastChat">おやおや、おやおやおやおやおや</p>
                                </div>
                            </li>
                        </a>
                        {
                            chatList.map((chat, index) => (
                                <a href={`chat?id=${chat[0]}`}>
                                    <li>
                                        <img className="chatListUserIcon" src={testImage}></img>
                                        <div className="chatUser">
                                            <p className="chatListUserName"><span className="chatName">{chat[1]}</span><span className="lastChatTime">11:11</span></p>
                                            <p className="lastChat">おやおや、おやおやおやおやおや</p>
                                        </div>
                                    </li>
                                </a>
                            ))
                        }
                    </ul>
                </section>
                <Chat />
            </div>
        </article>
    )
}

export default ChatList;