const song = document.getElementById("birthdaySong");
const lyrics = document.getElementById("lyrics");
const mainBtn = document.getElementById("mainBtn");
const letter = document.getElementById("letter");

let currentLine = 0;
let heartsStarted = false;

/* 🎯 ONE BUTTON ONLY */
mainBtn.addEventListener("click", () => {

    // 🔄 Restart if song ended
    if (song.ended) {
        restartSong();
        return;
    }

    // ▶️ Play
    if (song.paused) {
        song.play();
        mainBtn.innerHTML = "⏸️ Pause";

        // 💌 Show letter once
        letter.classList.remove("hidden");

        // 💖 Start hearts once
        if (!heartsStarted) {
            startHearts();
            heartsStarted = true;
        }
    }
    // ⏸️ Pause
    else {
        song.pause();
        mainBtn.innerHTML = "▶️ Play";
    }
});

/* 🎵 When song finishes */
song.addEventListener("ended", () => {
    mainBtn.innerHTML = "🔁 Restart";
});

/* 🔄 Restart logic */
function restartSong() {
    song.currentTime = 0;
    currentLine = 0;
    lyrics.innerText = "";
    song.play();
    mainBtn.innerHTML = "⏸️ Pause";
}

/* 🎶 Lyrics timing */
const lyricsData = [
    { time: 0, text: "🎶 お誕生日おめでとう" },
    { time: 6, text: "新しい一年の始まりだね 🎉" },
    { time: 11, text: "誕生日は生まれてきた事に感謝する日" },
    { time: 21, text: "歳が一つ増えても" },
    { time: 27, text: "今日まで生きてきた" },
    { time: 32, text: "あなたという証がここにある" },
    { time: 37, text: "とてもすごいこと" },
    { time: 44, text: "あなたがいるから助かっている人がいる" },
    { time: 55, text: "あなたがいるから感謝している人がいる" },
    { time: 67, text: "あなたの代わりはいないのです" },
    { time: 72, text: "いつもありがとう" },
    { time: 77, text: "今日は楽しく過ごそう😊" },
    { time: 83, text: "Happy birthday🎂🎉🎶" },
    { time: 88, text: "あなたにとって幸せな一年になりますように 🎂🎉" }
];

song.addEventListener("timeupdate", () => {
    if (
        currentLine < lyricsData.length &&
        song.currentTime >= lyricsData[currentLine].time
    ) {
        lyrics.innerText = lyricsData[currentLine].text;
        lyrics.style.animation = "none";
        lyrics.offsetHeight;
        lyrics.style.animation = "glow 1.2s";
        currentLine++;
    }
});

/* 💖 Floating hearts */
function startHearts() {
    setInterval(() => {
        const heart = document.createElement("div");
        heart.className = "heart";
        heart.innerText = ["❤️","🎂","🎈","🎉","✨","💗","🎁","🌸"][Math.floor(Math.random() * 8)];
        heart.style.left = Math.random() * 100 + "vw";
        heart.style.animationDuration = (4 + Math.random() * 3) + "s";
        document.body.appendChild(heart);

        setTimeout(() => heart.remove(), 7000);
    }, 500);
}
