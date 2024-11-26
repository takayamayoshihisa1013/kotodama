import React, { useState, useEffect } from "react";
import "./../css/Follow.css";
import testImage from "./../images/test/mikakunintouhikousyoujo.jpg";
import Config from "../Config";

function FollowAndFollower() {

    // 切り替え
    const [followSwitch, setFollowSwitch] = useState(true)

    // フォローリスト
    const [followList, setFollowList] = useState([]);
    // フォロワーリスト
    const [followerList, setFollowerList] = useState([]);

    const toggleButton = () => {
        setFollowSwitch(!followSwitch)
    }

    useEffect(() => {
        const userIdParam = new URLSearchParams(window.location.search);
        const userId = userIdParam.get("id");
        const data = {
            "followId": userId
        }
        const listGet = async () => {
            try {
                const response = await fetch(`${Config.azureBackUrl}/followList`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                    body: JSON.stringify(data)
                })
                const resData = await response.json();
                if (resData) {
                    setFollowList(resData.followList);
                    setFollowerList(resData.followerList);
                } else {
                    alert("エラーが発生しました");
                }
            } catch {
                alert("エラーが発生しました");
            }
        }
        listGet()
    }, [])

    return (
        <article>
            <div className="FollowAndFollowerContent">
                <section className="selectButton">
                    <p onClick={toggleButton}>Follow</p>
                    <p onClick={toggleButton}>Follower</p>
                </section>
                {
                    followSwitch ? (
                        <section className="followList">
                            <ul>
                                {
                                    followList.map((followUser, index) => (
                                        <li>
                                            <img src={testImage}></img>
                                            <div className="followDetail">
                                                <p className="followProfileName"><span className="postUserName">{followUser[1]}</span><span className="postUserId">@{followUser[0]}</span></p>
                                                <p className="followProfileText">{followUser[2]}</p>
                                            </div>
                                        </li>
                                    ))
                                }
                            </ul>
                        </section>
                    ) : (
                        <section className="followerList">
                            <ul>
                                {
                                    followerList.map((followerUser, index) => (
                                        <li>
                                            <img src={testImage}></img>
                                            <div className="followDetail">
                                                <p className="followProfileName"><span className="postUserName">{followerUser[1]}</span><span className="postUserId">@{followerUser[0]}</span></p>
                                                <p className="followProfileText">{followerUser[2]}</p>
                                            </div>
                                        </li>
                                    ))
                                }
                            </ul>
                        </section>
                    )
                }



            </div>

        </article>
    )
}

export default FollowAndFollower;