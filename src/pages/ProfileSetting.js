import React from "react";
import "./../css/ProfileSetting.css";
import testImage from "./../images/test/mikakunintouhikousyoujo.jpg";

function ProfileCheck() {

    

    return (
        <section className="profileSetting">
            <form>
                <button className="formDelete" type="button"><i class="fa-solid fa-xmark"></i></button>
                <input type="file" id="changeProfileBackImage" className="changeProfileBackImageInput"></input>
                <label for="changeProfileBackImage">
                    <img src={testImage} className="changeProfileBackImage"></img>
                </label>
                <input type="file" id="changeProfileIcon" className="changeProfileIconInput"></input>
                <label for="changeProfileIcon">
                    <img src={testImage} className="changeProfileIcon"></img>
                </label>
                <p>ユーザーネーム</p>
                <input type="text" placeholder="ユーザーネームを入力してください" defaultValue={"るらりゆ"}></input>
                <p>プロフィール</p>
                <textarea placeholder="プロフィールを入力しよう"></textarea>
                <button>変更する</button>
            </form>
        </section>
    )
}

export default ProfileCheck;