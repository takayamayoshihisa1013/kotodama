import React, { useState, useEffect } from "react";
import "./../css/NewPost.css";
import Config from "../Config";

function NewPost() {

    const [postContent, setPostContent] = useState("");
    // 画像
    const [imageList, setImageList] = useState([]);
    // フォームは最初から表示しない
    const [newPostForm, setNewPostForm] = useState(false);

    // フォーム表示非表示
    const toggleForm = () => {
        setNewPostForm(!newPostForm);
    }

    // 画像をリストにする処理
    const handleImage = (e) => {
        // 排列に変換
        const file = Array.from(e.target.files);
        setImageList(file);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // alert(imageList);
        const formData = new FormData();
        formData.append("imageList",imageList);
        formData.append("postContent",postContent);
        // const data = {
        //     postContent: postContent
        // }
        try {
            const response = await fetch(`${Config.azureBackUrl}/newPost`, {
                method:"POST",
                credentials: "include",
                body: formData
            });
            if (response.ok) {
                // alert("ok")
                window.location.reload();
            } else {
                alert("failed")
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <button className="newPostButton" onClick={toggleForm}>＋</button>
            {
                // trueの場合フォームを表示する
                newPostForm && (
                    <section className="newPostSection">
                        <form className="newPostForm" onSubmit={handleSubmit}>
                            <p>何気ない事でもポストをしよう！</p>
                            <textarea placeholder="何を書きますか？" onChange={(e) => setPostContent(e.target.value)}></textarea>
                            <div className="formButton">
                                <input id="formImageButton" type="file" className="formImageButton" onChange={handleImage} multiple></input>
                                <label htmlFor={"formImageButton"} className="formImageLabel">画像</label>
                                <button type="submit" className="postButton">ポストする</button>
                            </div>

                        </form>
                    </section>
                )
            }

        </>
    )
}

export default NewPost;