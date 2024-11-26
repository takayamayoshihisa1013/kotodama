import React, { useState, useEffect, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import testImage from "./../images/test/mikakunintouhikousyoujo.jpg";
import "./../css/RightNav.css";
import Config from "../Config";

function RightNav() {

    const [loginUsername, setLoginUsername] = useState("");
    const [loginUserId, setLoginUserId] = useState("");
    const [follow, setFollow] = useState("");
    const [follower, setFollower] = useState("");
    const [loginCheck, setLoginCheck] = useState(false);

    useEffect(() => {
        const rightUserProfile = async () => {
            try {
                const response = await fetch(`${Config.azureBackUrl}/rightProfile`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                });
                const resRightUserProfile = await response.json();
                if (response.ok) {
                    if (resRightUserProfile.login) {
                        setLoginUserId(resRightUserProfile.profileData[0]);
                        setLoginUsername(resRightUserProfile.profileData[1]);
                        setLoginCheck(true);
                    } else {
                        setLoginUserId(resRightUserProfile.profileData[0]);
                        setLoginUsername(resRightUserProfile.profileData[1]);
                        setLoginCheck(false);
                    }
                    console.log(loginUsername);
                } else {
                    alert("Errorが発生しました。");
                    setLoginCheck(false);
                    window.location.replace("/")
                }
            } catch {
                console.log("Error fetching profile data");
            }
        }
        rightUserProfile();
    }, []);

    return (
        <div className="rightNav">
            <div className="rightNavProfile">
                <img src={testImage}></img>
                <p className="rightNavUserName">{loginUsername}</p>
                <div className="followAndFollower">
                    <p><span className="bold">follow:</span><span className="normal">100</span></p>
                    <p><span className="bold">follower:</span><span className="normal">1000</span></p>
                </div>
            </div>
            <nav className="rightNavNav">
                <ul>
                    <li>
                        <Link to={"/"}>
                            <i class="fa-solid fa-egg"></i>ポスト
                        </Link>
                    </li>
                    {
                        // ログインされていたら表示
                        loginCheck && (
                            <>
                                <li>
                                    <Link to={`/profile?id=${loginUserId}`}>
                                        <i class="fa-solid fa-user"></i>プロフィール
                                    </Link>
                                </li>
                                <li>
                                    <Link to={`/follow?id=${loginUserId}`}>
                                        <i class="fa-solid fa-users"></i>フォロー・フォロワー
                                    </Link>
                                </li>
                                <li>
                                    <Link to={"/"}>
                                        たまごの殻
                                    </Link>
                                </li>
                                <li>
                                    <Link to={"/chat"}>
                                        <i class="fa-solid fa-comments"></i>チャット
                                    </Link>
                                </li>
                            </>
                        )
                    }

                </ul>
            </nav>
        </div>
    )
}







export default RightNav;