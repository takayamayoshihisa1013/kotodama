import React from "react";
import "./../css/Search.css";

function Search() {
    return(
        <form id="search">
            <input name="searchBox" placeholder="キーワードを入力してください"></input>
            <button className="searchButton">検索</button>
        </form>
    )
}

export default Search;