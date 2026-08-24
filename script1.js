const app = document.getElementById("app");

const judul = document.createElement("h2");
judul.textContent = "Selamat datang di DailyBoard!";
app.appendChild(judul);

judul.style.color = "#070d1a";

const dashboard = document.createElement("div");
dashboard.className = "dashboard";

const kolomKanan = document.createElement("div");
kolomKanan.className = "kolomkanan";

const kolomKiri = document.createElement("div");
kolomKiri.className = "kolomkiri";

app.appendChild(dashboard);

dashboard.appendChild(kolomKanan);
dashboard.appendChild(kolomKiri);

const toggleTema = document.createElement("button");
toggleTema.id = "toggle-tema";

toggleTema.textContent = "Dark Mode";

document.querySelector("header").appendChild(toggleTema);

toggleTema.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");
    
    const modeAktif = document.body.classList.contains("dark-mode");
    
    localStorage.setItem("tema", modeAktif ? "gelap" : "terang");
    
    toggleTema.textContent = modeAktif ? "Light Mode" : "Dark Mode";
});

function muatTema() {
    if (localStorage.getItem("tema") === "gelap") {
        document.body.classList.add("dark-mode");
        toggleTema.textContent = "Light Mode"
    }
}

window.addEventListener("DOMContentLoaded",muatSemuaWidget); 

function debounce(fn, delay = 300) {
    let timer;

    return (...args) => {
        clearTimeout(timer);

        timer = setTimeout(() => {
            fn(...args);
        }, delay);
    };
}

const inputCari = document.getElementById("cari-tugas");

const cariTugasDebounced = debounce((katakunci) => {

    const hasil = daftarTugas.filter(tugas =>
        tugas.nama
            .toLowerCase()
            .includes(katakunci.toLowerCase())
    );

    renderTugas(hasil);

}, 300);

inputCari.addEventListener("input", (event) => {
    cariTugasDebounced(event.target.value);
});
