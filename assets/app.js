/* StockLearn — static content rendered from data/articles.json. Keep text insertion safe. */
"use strict";
const terms = [
  ["股票", "代表公司部分所有權的有價證券。"],
  ["股利", "公司依決議分配給股東的收益，可能以現金或股票形式發放。"],
  ["K 線", "由開高低收四個價位呈現一段期間價格變化的圖形。"],
  ["成交量", "某期間內實際成交的股數或交易數量。"],
  ["多頭", "市場參與者普遍偏向看漲的狀態。"],
  ["空頭", "市場參與者普遍偏向看跌的狀態。"],
  ["MA", "移動平均線，用多期價格平均觀察趨勢。"],
  ["RSI", "相對強弱指標，描述價格變化的相對動能。"],
  ["MACD", "利用指數移動平均差值觀察趨勢與動能。"],
  ["布林通道", "以均線和標準差描述價格波動區間。"],
  ["停損", "事前規劃在特定條件下出場，以控制損失。"],
  ["最大回撤", "資產淨值自先前高點至隨後低點的最大跌幅。"],
];
let articles = [];
let filter = "全部";
const $ = (id) => document.getElementById(id);
function el(tag, cls, text) {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (text !== undefined) n.textContent = text;
  return n;
}
function renderCards() {
  const q = $("searchInput").value.trim().toLocaleLowerCase();
  const hits = articles.filter(
    (a) =>
      (filter === "全部" || a.category === filter) &&
      [
        a.title,
        a.summary,
        a.category,
        ...a.sections.flatMap((s) => [s.heading, s.body]),
      ]
        .join(" ")
        .toLocaleLowerCase()
        .includes(q),
  );
  const host = $("cards");
  host.replaceChildren();
  for (const a of hits) {
    const link = el("a", "article-card");
    link.href = "#article/" + encodeURIComponent(a.id);
    link.append(
      el("span", "tag", a.category),
      el("h3", "", a.title),
      el("p", "", a.summary),
      el("span", "read-more", "閱讀文章 →"),
    );
    host.append(link);
  }
  $("empty").hidden = hits.length > 0;
  $("articleCount").textContent =
    `顯示 ${hits.length} / ${articles.length} 篇文章`;
}
function renderTerms() {
  const q = $("glossarySearch").value.trim().toLocaleLowerCase();
  const host = $("glossaryList");
  host.replaceChildren();
  for (const [name, desc] of terms.filter(([n, d]) =>
    (n + " " + d).toLocaleLowerCase().includes(q),
  )) {
    const item = el("div", "glossary-item");
    item.append(el("h3", "", name), el("p", "", desc));
    host.append(item);
  }
  if (!host.children.length) host.append(el("p", "", "找不到相符名詞。"));
}
function showArticle(id) {
  const a = articles.find((v) => v.id === id);
  if (!a) {
    location.hash = "#learn";
    return;
  }
  const root = $("articleContent");
  root.replaceChildren();
  root.append(
    el("span", "tag", a.category),
    el("h1", "", a.title),
    el("p", "lead", a.summary),
  );
  for (const part of a.sections) {
    const section = el("section");
    section.append(el("h2", "", part.heading), el("p", "", part.body));
    root.append(section);
  }
  root.append(el("p", "lead", "學習提醒：本文為教育用途，不構成投資建議。"));
  document.title = `${a.title}｜StockLearn`;
}
function route() {
  const hash = decodeURIComponent(location.hash.slice(1) || "home");
  const isArticle = hash.startsWith("article/");
  const page = isArticle
    ? "article"
    : ["home", "learn", "glossary", "about"].includes(hash)
      ? hash
      : "home";
  document
    .querySelectorAll(".route")
    .forEach(
      (n) =>
        (n.hidden = n.id !== page && !(n.id === "features" && page === "home")),
    );
  document.querySelectorAll("[data-nav]").forEach((n) => {
    n.classList.toggle(
      "active",
      n.dataset.nav === (isArticle ? "learn" : page),
    );
    if (n.dataset.nav === (isArticle ? "learn" : page))
      n.setAttribute("aria-current", "page");
    else n.removeAttribute("aria-current");
  });
  if (isArticle) showArticle(hash.slice(8));
  else document.title = "StockLearn｜股票投資學習筆記";
  window.scrollTo({ top: 0, behavior: "instant" });
}
async function init() {
  try {
    const res = await fetch("data/articles.json");
    if (!res.ok) throw new Error("HTTP " + res.status);
    const payload = await res.json();
    if (!Array.isArray(payload)) throw new Error("文章格式不正確");
    articles = payload;
    renderCards();
  } catch (e) {
    $("cards").replaceChildren(
      el(
        "p",
        "empty",
        "文章讀取失敗，請使用本機伺服器或 GitHub Pages 開啟網站。",
      ),
    );
    $("articleCount").textContent = "無法讀取文章";
    console.error("StockLearn:", e);
  }
  renderTerms();
  document.querySelectorAll("[data-filter]").forEach((b) =>
    b.addEventListener("click", () => {
      filter = b.dataset.filter;
      document.querySelectorAll("[data-filter]").forEach((n) => {
        n.classList.toggle("active", n === b);
        n.setAttribute("aria-pressed", String(n === b));
      });
      renderCards();
    }),
  );
  $("searchInput").addEventListener("input", renderCards);
  $("glossarySearch").addEventListener("input", renderTerms);
  window.addEventListener("hashchange", route);
  route();
}
document.addEventListener("DOMContentLoaded", init);
