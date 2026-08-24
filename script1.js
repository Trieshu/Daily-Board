import {
    tambahTugas,
    hapusTugas,
    editTugas,
    toggleTugas,
    filterTugas
} from "./modules/tugas.js";

import {
    tambahCatatan,
    hapusCatatan,
    editCatatan
} from "./modules/catatan.js";

import {
    simpanData,
    ambilData
} from "./modules/storage.js";

import {
    ambilKutipan
} from "./modules/api.js";

let daftarTugas = ambilData("tugas", []);
let daftarCatatan = ambilData("catatan", []);

const app = document.getElementById("app");

const judul = document.createElement("h2");
judul.textContent = "Selamat datang di DailyBoard!";
judul.style.color = "#070d1a";

app.appendChild(judul);

const dashboard = document.createElement("div");
dashboard.className = "dashboard";

const kolomKanan = document.createElement("div");
kolomKanan.className = "kolomkanan";

const kolomKiri = document.createElement("div");
kolomKiri.className = "kolomkiri";

app.appendChild(dashboard);

dashboard.appendChild(kolomKanan);
dashboard.appendChild(kolomKiri);

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

