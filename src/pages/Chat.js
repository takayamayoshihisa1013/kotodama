import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import testImage from "./../images/test/mikakunintouhikousyoujo.jpg";
import Config from "../Config";

function Chat() {

    // チャットのデータ
    const [chat, setChat] = useState([]);
    // チャット相手が変わった場合の監視役
    const location = useLocation();
    // 送信データ
    const [newChatContent, setNewChatContent] = useState("");

    const friendParm = new URLSearchParams(window.location.search);
    const friendId = friendParm.get("id");

    // チャットデータの取得の部品
    const chatData = async () => {
        const data = {
            friendId: friendId
        }
        try {
            const response = await fetch(`${Config.azureBackUrl}/chat`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(data)
            })
            if (response.ok) {
                const resData = await response.json();
                return resData.chatData
            }
            else {
                alert("error");
                return []
            }
        } catch {

        }
    }

    // チャットの送信
    const HandleNewChatContent = async (e) => {
        e.preventDefault();
        const data = {
            friendId: friendId,
            newChatContent: newChatContent
        }
        try {
            const response = await fetch(`${Config.azureBackUrl}/newChatContent`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(data),
            });
            const resData = await response.json();
            if (response.ok) {
                // チャットの更新
                const updateChat = await chatData()
                setChat(updateChat);
                // 送信テキストの初期化
                setNewChatContent("");
            } else {
                alert("送信に失敗しました");
            }
        } catch {

        }
    }

    // チャットの相手が変わった場合やページに始めてきた場合のチャットの取得
    useEffect(() => {
        const loadChatData = async () => {
            const loadChat = await chatData();
            setChat(loadChat);
        }
        loadChatData();
    }, [location.search])

    return (
        <section className="chat">
            <h3 className="title">じゅんと</h3>
            <ul>
                {
                    chat.map((chat, index) => (
                        <li className={`message ${chat[4]}`}>
                            <div>
                                <p className="chatUserName">{chat[2]}</p>
                                <p className="talk">{chat[3]}</p>
                            </div>
                            <img src={testImage} className="chatUserIcon"></img>
                        </li>
                    ))
                }
            </ul>
            <form className="newContentForm" onSubmit={HandleNewChatContent}>
                <input type="text" onChange={(e) => setNewChatContent(e.target.value)} value={newChatContent}></input>
                <button type="submit"><i class="fa-solid fa-paper-plane"></i></button>
            </form>
        </section>
    )
}

export default Chat;