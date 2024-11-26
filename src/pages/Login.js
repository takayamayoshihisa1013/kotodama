import React, { useState } from "react";
import "./../css/Login.css";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            email: email,
            password: password
        }
        try {
            const response = await fetch("http://localhost:5000/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(data),
            })
            // flaskから受け取ったjsonを受け取る

            if (response.ok) {
                const resMessage = await response.json()
                if (resMessage.state == "success") {
                    window.location = "/";
                } else {
                    alert("ユーザーが見つかりませんでした。")
                }
            } else {
                alert("問題が発生しました。");
            }
        } catch {

        }
    }

    return (
        <form className="loginForm" onSubmit={handleSubmit}>
            <h2>HatchPost</h2>
            <p>メールアドレス</p>
            <input type="email" onChange={(e) => setEmail(e.target.value)}></input>
            <p>パスワード</p>
            <input type="password" onChange={(e) => setPassword(e.target.value)}></input>
            <button type="submit">ログイン</button>
            <a href="/signup">アカウントをお持ちでない方はこちら</a>
        </form>
    )
}

export default Login;