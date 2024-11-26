import React, { useState } from "react";
import "./../css/SignUp.css";

function SignUp() {
    // 初期値
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // ユーザー登録
    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            username: username,
            email:email,
            password:password
        }
        try{
            const response = await fetch("http://localhost:5000/newUser", {
                method:"POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(data),
            })
            if (response.ok) {
                console.log(response);
                window.location = "/";
                // alert()
            } else {
                console.log(response.success);
                alert("登録が失敗しました。")
            }
        } catch(error) {
            console.error("error:",error)
        }
    }

    return (
        <form className="signUpForm" onSubmit={handleSubmit}>
            <h2>HatchPost</h2>
            <p>ユーザーネーム</p>
            <input 
            type="text" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}></input>
            <p>メールアドレス</p>
            <input 
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}></input>
            <p>パスワード</p>
            <input 
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}></input>
            <button type="submit">ログイン</button>

        </form>
    )
}

export default SignUp;