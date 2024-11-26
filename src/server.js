const express = require('express');
const path = require('path');

// Expressアプリを作成
const app = express();

// Azure環境変数 PORT を使用。存在しない場合はデフォルトで 8080 を使用
const PORT = process.env.PORT || 8080;

// Reactのビルド済み静的ファイルを提供
app.use(express.static(path.join(__dirname, 'build')));

// すべてのルートで index.html を返す（ReactのSPA用）
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// サーバーを起動
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
