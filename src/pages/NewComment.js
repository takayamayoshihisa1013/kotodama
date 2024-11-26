import React, { useState } from "react";
import "./../css/NewComment.css";
import Config from "../Config";

function NewComment() {
    // コメントフォームを開いてるか閉じてるか
    const [commentForm, setCommentForm] = useState(false);
    // コメント内容
    const [commentContent, setCommentContent] = useState("");
    // ポストID
    const param = new URLSearchParams(window.location.search);
    const postId = param.get("postId");



    const toggleForm = () => {
        setCommentForm(!commentForm);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            postId: postId,
            commentContent: commentContent
        }
        try {
            const response = await fetch(`${Config.azureBackUrl}/newComment`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(data)
            })
            if (response.ok) {
                // setCommentForm(!commentForm);
                window.location.reload();
            } else {
                const resData = await response.json();
                alert(resData.error)
            }
        } catch {

        }
    }

    return (
        <>
            <button className="newCommentButton" onClick={toggleForm}>＋</button>
            {
                commentForm && (
                    <section className="newCommentSection">
                        <form className="newCommentForm" onSubmit={handleSubmit}>
                            <p>コメントをしよう！</p>
                            <textarea placeholder="何を書きますか？" onChange={(e) => setCommentContent(e.target.value)}></textarea>
                            <div className="formButton">
                                <input id="formImageButton" type="file" className="formImageButton"></input>
                                <label for={"formImageButton"} className="formImageLabel">画像</label>
                                <button type="submit" className="commentButton">ポストする</button>
                            </div>
                        </form>
                    </section>
                )
            }

        </>
    )
}

export default NewComment;