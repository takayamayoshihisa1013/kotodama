import React, { useEffect, useState } from "react";
import "./../css/Post.css";
import testImage from "./../images/test/mikakunintouhikousyoujo.jpg";
import NewComment from "./NewComment";
import Config from "../Config";

function Post() {

    // 対象のポスト
    const [subjectPost, setSubjectPost] = useState([])
    // コメント
    const [commentList, setCommentList] = useState([]);

    const param = new URLSearchParams(window.location.search);
    const postId = param.get("postId");

    useEffect(() => {
        const commentListGet = async () => {
            const data = {
                postId: postId
            }
            try {
                const response = await fetch(`${Config.azureBackUrl}/comment`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                    body: JSON.stringify(data)
                })
                if (response.ok) {
                    const resData = await response.json();
                    setCommentList(resData.commentData);
                    setSubjectPost(resData.subjectPost);
                } else {
                    const resData = await response.json();
                    alert(resData["error"]);
                }
            } catch {

            }
        }
        commentListGet();
    }, [])

    return (
        <article>
            <div className="content">
                <section className="subjectPost">
                    <div className="post">
                        <img src={testImage} className="postUserIcon"></img>
                        <div className="postDetail">
                            <p className="postHeader"><a href=""><span className="postUserName">{subjectPost[1]}</span><span className="postUserId">@{subjectPost[0]}</span></a></p>
                            <p className="postBody">
                            {subjectPost[2]}
                            </p>
                        </div>
                    </div>
                </section>
                <section className="commentList">
                    <ul>
                        {
                            commentList.map((comment, index) => (
                                <li className="comment">
                                    <img src={testImage} className="commentUserIcon"></img>
                                    <div className="commentDetail">
                                        <p className="commentHeader"><a href=""><span className="commentUserName">{comment[1]}</span><span className="commentUserId">@{comment[0]}</span></a></p>
                                        <p className="commentBody">
                                        {comment[3]}
                                        </p>
                                    </div>
                                </li>
                            ))
                        }
                    </ul>
                    <NewComment />
                </section>
            </div>
        </article>
    )
}

export default Post;