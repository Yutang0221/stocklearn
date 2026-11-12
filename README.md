# StockLearn｜股票投資學習筆記

第九週作業：建立專案開發規則 `AGENTS.md`，並讓 AI 依照規則建立及延伸網頁。

## 專案簡介
StockLearn 為繁體中文、適合投資新手的靜態教學網站。包含首頁、股票與技術指標文章、投資名詞搜尋及關於網站。以原生 HTML / CSS / JavaScript + JSON 建立，不需安裝套件、不需資料庫。教學用途，不構成投資建議。

## 功能
- 首頁與導覽
- 八篇入門與技術指標文章（可透過 JSON 擴充）
- 文章關鍵字搜尋、分類篩選與詳細閱讀頁
- 投資名詞字典與即時搜尋
- 手機響應式版面、鍵盤操作
- `AGENTS.md`：完整規範視覺、架構、內容、擴充與驗收
- `docs/EXTENSION_DEMO.md`：展示 AI 如何依規則延伸新內容

## 專案結構
```
StockLearn/
├── index.html
├── AGENTS.md
├── README.md
├── assets/
│   ├── app.js
│   └── style.css
├── data/
│   └── articles.json
└── docs/
    └── EXTENSION_DEMO.md
```

## 本機執行
由於瀏覽器對 `file://` 的 JSON 載入有限制，請在專案根目錄啟動伺服器：
```bash
python -m http.server 8000
```
瀏覽 `http://localhost:8000/`。Windows 如 `python` 指令不可用，可改用 `py -m http.server 8000`。亦可使用 VS Code Live Server。

## 發布 GitHub Pages（不需 Node.js）
1. 登入 GitHub，新增 **Public** repository，例如 `stocklearn`（不要勾選預先加入 README）。
2. 下載 ZIP 後解壓縮，進入 `StockLearn` 資料夾，將**裡面的** `index.html`、`AGENTS.md`、`assets`、`data`、`docs` 等全部上傳到 GitHub 儲存庫根目錄。可使用網頁的 `Add file` → `Upload files` → `Commit changes`。也可以使用下方 Git 指令。
3. 前往儲存庫 `Settings` → `Pages` → `Build and deployment`，`Source` 選 `Deploy from a branch`，`Branch` 選 `main` 和 `/(root)` → `Save`。
4. 待 GitHub 顯示部署完成後，開啟 `https://你的帳號.github.io/stocklearn/`，並測試文章與搜尋。發佈通常需要一點處理時間，實際網址以 GitHub Pages 設定畫面為準。

如果使用 Git 指令（請將 URL 換成你自己的儲存庫網址）：
```bash
git init
git add .
git commit -m "Create StockLearn project with AGENTS rules"
git branch -M main
git remote add origin https://github.com/你的帳號/stocklearn.git
git push -u origin main
```

## 新增內容
閱讀 [`AGENTS.md`](AGENTS.md) 的新增文章規則，在 [`data/articles.json`](data/articles.json) 加入新物件，即能自動顯示於列表，無須修改 HTML。規則延伸示範請見 [`docs/EXTENSION_DEMO.md`](docs/EXTENSION_DEMO.md)。

## 驗證
- `python -m json.tool data/articles.json`：確認 JSON 正確。
- 搜尋「RSI」、切換分類、開啟文章與返回列表。
- 測試桌面和手機瀏覽寬度。
- GitHub Pages 發布後確認 CSS/JS/JSON 正常載入。

## 著作與聲明
課堂作業示範內容。文字為教學性質，不構成證券投資建議，金融資訊與規範請自行核對最新官方來源。
