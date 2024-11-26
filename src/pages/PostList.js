import React, { useEffect, useState } from "react";
import "./../css/PostList.css";
import testImage from "./../images/test/mikakunintouhikousyoujo.jpg";
import Search from "./Search.js";
import NewPost from "./NewPost.js";
import Config from "../Config.js";


function PostList() {
    // alert(azureUrl);
    const [postList, setPostList] = useState([])
    useEffect(() => {
        const postData = async () => {
            try {
                const response = await fetch(`${Config.azureBackUrl}/postData`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                });
                if (response.ok) {
                    // Flaskから受け取ったjsonデータを受け取る
                    const resPostList = await response.json()
                    setPostList(resPostList.postData);
                    console.log(postList);
                } else {
                    alert("no")
                }
            } catch {

            }
        }
        postData();
    }, [])


    // いいね
    const heartHandle = async (postId) => {
        // alert(postId);
        const data = {
            postId: postId
        }
        try {
            const response = await fetch(`${Config.azureBackUrl}/heart`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(data)
            })
            if (response.ok) {
                // いいね数の更新
                setPostList((prevHeartData) =>
                    // prevHeartDataはpostListのコピー
                    // ポストをすべて確認して押されたIDのポストのいいね数のみ更新する
                    prevHeartData.map((post) => {
                        // 該当するpostIdの投稿のみ更新
                        if (post[4] === postId) {
                            // alert(post);
                            return [
                                ...post.slice(0, 5), // postの先頭5つの値をそのままコピー
                                post[6] === 1 ? 0 : 1, // いいね状態をトグル
                                post[6] === 1 ? post[5] - 1 : post[5] + 1 
                            ];
                        }
                        return post; // 他の投稿はそのまま
                    })
                );
            }
        } catch {

        }
    }

    return (
        <article className="postListPage">
            <section className="postSection">
                <ul className="postList">
                    <Search />
                    {
                        postList.map((post, index) => (
                            <li className="post">
                                <img src={testImage} className="postUserIcon"></img>
                                <div className="postDetail">
                                    <p className="postHeader"><a href={`profile?id=${post[0]}`}><span className="postUserName">{post[1]}</span><span className="postUserId">@{post[0]}</span></a></p>
                                    <p className="postBody">
                                        {post[2]}
                                    </p>
                                    <div className="postFooter">

                                        <p onClick={() => heartHandle(post[4])}>
                                            {
                                                post[6] === 1 || post[6] === 0 ? (
                                                    // いいね状態
                                                    post[6] == 1 ? (
                                                        <span className="icon"><i class="fa-solid fa-heart"></i></span>
                                                    ) : (
                                                        <span className="icon"><i class="fa-regular fa-heart"></i></span>
                                                    )
                                                ) : (
                                                    <span className="icon"><a href="http://localhost:3000/login"><i class="fa-regular fa-heart"></i></a></span>
                                                )
                                            }
                                            <span className="num">{post[5]}</span></p>
                                        <p><a href={`http://localhost:3000/post?postId=${post[4]}`}><span className="icon"><i class="fa-solid fa-comment"></i></span><span className="num"></span></a></p>
                                        <p><span className="icon"><i class="fa-solid fa-share-nodes"></i></span><span className="num"></span></p>
                                        <p><span className="icon"><i class="fa-solid fa-chart-simple"></i></span><span className="num"></span></p>
                                    </div>
                                </div>
                            </li>
                        ))
                    }
                </ul>
                <NewPost />
            </section>
        </article>
    )
}

export default PostList;