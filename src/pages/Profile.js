import React, { useState, useEffect } from "react";
import "./../css/Profile.css";
// import RightNav from "./RightNav";
import egg from "./../images/hatch/egg.png";
import clackEgg from "./../images/hatch/clackEgg.png";
import hatch from "./../images/hatch/hatch.png";
import testImage from "./../images/test/mikakunintouhikousyoujo.jpg";
// import ProfileSetting from "./ProfileSetting";
import "./../css/ProfileSetting.css";
import Search from "./Search";
import { useLocation } from "react-router-dom";
import Config from "../Config";

function ProfileCheck({ toggleForm }) {

    const [changeUsername, setChangeUsername] = useState("");
    const [changeProfileText, setProfileText] = useState("");

    const SubmitForm = async (e) => {
        e.preventDefault();
        const data = {
            changeUsername: changeUsername,
            changeProfileText: changeProfileText
        }
        const response = await fetch(`${Config.azureBackUrl}/changeProfile`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(data),
        });
        // const resChangeProfile = await response.json();
        if (response.ok) {
            // toggleForm()
            window.location.reload();
        } else {
            alert("変更中にエラーが発生しました")
        }
    }

    return (
        <section className="profileSetting">
            <form onSubmit={SubmitForm}>
                <button className="formDelete" type="button" onClick={toggleForm}><i class="fa-solid fa-xmark"></i></button>
                <input type="file" id="changeProfileBackImage" className="changeProfileBackImageInput"></input>
                <label for="changeProfileBackImage">
                    <img src={testImage} className="changeProfileBackImage"></img>
                </label>
                <input type="file" id="changeProfileIcon" className="changeProfileIconInput"></input>
                <label for="changeProfileIcon">
                    <img src={testImage} className="changeProfileIcon"></img>
                </label>
                <p>ユーザーネーム</p>
                <input type="text" placeholder="ユーザーネームを入力してください" onChange={(e) => setChangeUsername(e.target.value)}></input>
                <p>プロフィール</p>
                <textarea placeholder="プロフィールを入力しよう" onChange={(e) => setProfileText(e.target.value)}></textarea>
                <button>変更する</button>
            </form>
        </section>
    )
}


function Profile() {
    // プロフィールデータ
    const [profileData, setProfileData] = useState([]);
    // ポストデータ
    const [postList, setPostList] = useState([]);
    // プロフィール変更データ
    const [profileSettingForm, setProfileSettingForm] = useState(false);
    // 自分かどうか
    const [myself, setMyself] = useState(false);
    // フォローされているか
    const [followState, setFollowState] = useState(false);
    // フォロー数、フォロワー数
    const [followData, setFollowData] = useState([]);
    // ページの更新をuseEffectで見るためのもの。パラメータが変わった場合にページをuseEffectで更新する役割
    const location = useLocation();

    // フォローのタンの色処理
    const followHandle = (newFollowState) => {
        setFollowState(newFollowState);

        setFollowData((prevFollowData) => {
            const updatedFollowData = [...prevFollowData];
            if (newFollowState) {
                updatedFollowData[1]++; // フォロー数を増加
            } else {
                updatedFollowData[1]--; // フォロー数を減少
            }
            return updatedFollowData;
        });
    };

    // 表示非表示
    const toggleForm = () => {
        setProfileSettingForm(!profileSettingForm);
        // alert(profileSettingForm)
    }

    // URLからidパラメータを取得する
    const idParams = new URLSearchParams(window.location.search);
    const profileUserId = idParams.get("id");

    // プロフィールの人のポストを取ってくる
    useEffect(() => {
        const data = {
            // アクセスされたアカウントのIDをFlaskに送る
            profileUserId: profileUserId
        }
        const PostData = async () => {
            try {
                const response = await fetch(`${Config.azureBackUrl}/profile`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                    body: JSON.stringify(data),
                });
                const resData = await response.json();
                if (response.ok) {
                    setProfileData(resData.profileData);
                    setPostList(resData.postData);
                    setMyself(resData.myself);
                    setFollowData(resData.followData)
                    // フォロー状態
                    if (resData.myself) {
                        // 自分だったら出さない
                        setFollowState("my");
                    } else {
                        // 自分ではなかったら出す
                        setFollowState(resData.followState);
                    }
                } else {
                    alert("ポストを読み込ませんでした。")
                }
            } catch {
                alert("エラーが発生しました。")
            }
        };
        if (profileUserId) {
            PostData()
        }
        // クエリパラメータが変わった場合更新。（.searchはクエリパラメータの部分）
    }, [location.search])

    const submitFollow = async (e) => {
        e.preventDefault();
        // 先に変換後のフォロー状態にする
        const newFollowState = !followState
        const data = {
            followId: profileUserId
        };
        try {
            const response = await fetch(`${Config.azureBackUrl}/follow`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(data),
            });
            if (response.ok) {
                followHandle(newFollowState);
            } else {
                alert("フォロー処理中にエラーが発生しました")
            }
        } catch {
            alert("エラーが発生しました")
        }
    }

    // チャットの追加
    const makeNewChat = async () => {
        const data = {
            friendId: profileUserId
        }
        try {
            const response = await fetch(`${Config.azureBackUrl}/makeNewChat`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(data),
            })
            const resData = response.json()
            if (response.ok) {
                window.location.href = `http://localhost:3000/chat?id=${profileUserId}`;
            }
        } catch {
            alert("error")
        }
    }

    return (
        <article>
            <div className="content">
                {
                    profileSettingForm && (
                        <ProfileCheck toggleForm={toggleForm} />
                    )
                }
                <section className="profile">
                    <img src={testImage} className="profileBackground"></img>
                    <div className="iconAndButton">
                        <img src={testImage} className="profileIcon"></img>
                        <p><a href={`follow?id=${profileData[0]}`}><span className="bold">follow:</span><span className="normal">{followData[0]}</span></a></p>
                        <p><a href={`follow?id=${profileData[0]}`}><span className="bold">follower:</span><span className="normal">{followData[1]}</span></a></p>
                        {
                            // 自分かどうか
                            !myself ? (
                                // ふぉろーしているかどうか
                                followState === true ? (
                                    <>
                                        <button className="followButton followState" onClick={submitFollow}>フォロー中</button>
                                        <button className="profileChat"><i className="fa-solid fa-comments" onClick={makeNewChat}></i></button>
                                    </>
                                ) : (
                                    followState === "notLogin" ? (
                                        <>
                                            <button className="followButton" onClick={() => window.location = "http://localhost:3000/login"}>フォローする</button>
                                            <button className="profileChat"><i className="fa-solid fa-comments" onClick={() => window.location = "http://localhost:3000/login"}></i></button>
                                        </>
                                    ) : (
                                        <>
                                            <button className="followButton" onClick={submitFollow}>フォローする</button>
                                            <button className="profileChat"><i className="fa-solid fa-comments" onClick={makeNewChat}></i></button>
                                        </>
                                    )

                                )
                            ) : (

                                <button className="settingButton" onClick={toggleForm}><i class="fa-solid fa-user-gear"></i></button>

                            )
                        }
                    </div>
                    <p className="profileName">{profileData[1]}</p>
                    <p className="profileText">{profileData[4]}</p>
                </section>
                <section className="profilePostSection">
                    <ul className="postList">
                        {
                            postList.map((post, index) => (
                                <li className="post">
                                    <img src={testImage} className="postUserIcon"></img>
                                    <div className="postDetail">
                                        <p className="postHeader"><span className="postUsername">{post[1]}</span><span className="postUserId">@{post[0]}</span></p>
                                        <p className="postBody">
                                            {post[2]}
                                        </p>
                                        <div className="hatchTime">
                                            <img src={hatch}></img>
                                            <img src={clackEgg}></img>
                                            <img src={egg}></img>
                                        </div>
                                    </div>
                                </li>
                            ))
                        }
                    </ul>
                </section>
            </div>

        </article>
    )
}

export default Profile;