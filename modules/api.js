const cuaca = document.createElement("section");
const judulCuaca = document.createElement("h3");
judulCuaca.textContent = "Cuaca Hari Ini";
cuaca.appendChild(judulCuaca);

const inputKota = document.createElement("input");
inputKota.placeholder = "Masukkan nama kota";
cuaca.appendChild(inputKota);

const tombolCuaca = document.createElement("button");
tombolCuaca.textContent = "Cek Cuaca";
cuaca.appendChild(tombolCuaca);

const infoCuaca = document.createElement("div");
infoCuaca.id = "info-cuaca";
cuaca.appendChild(infoCuaca);

kolomKanan.appendChild(cuaca);

export async function ambilCuaca(kota) {
    const apiKey = "5149aba722871f4e343fbb456371136c";

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(kota)}&appid=${apiKey}&units=metric&lang=id`;

    infoCuaca.textContent = "Memuat data cuaca...";

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error( "Kota tidak ditemukan atau API Key tidak valid.");
        }

        const data = await response.json();

        document.getElementById("info-cuaca").innerHTML = `
            <p><strong>${data.name}</strong></p>
            <p>Suhu: ${data.main.temp}°C</p>
            <p>${data.weather[0].description}</p>
        `;

    } catch (error) {
        document.getElementById("info-cuaca").textContent = error.message;
    }
}


tombolCuaca.addEventListener("click",() => {

    const kota = inputKota.value.trim();

        if (kota === "") {
            infoCuaca.textContent = "Silakan masukkan nama kota.";
            return;
        }

        ambilCuaca(kota).catch(() => {});
    });

const kutipan = document.createElement("div");
kutipan.id = "kutipan harian";

const judulKutipan = document.createElement("h3");
judulKutipan.textContent = "Kutipan Hari Ini";

const isiKutipan = document.createElement("p");
isiKutipan.textContent = "Memuat kutipan...";

const tombolKutipan = document.createElement("button");
tombolKutipan.textContent = "Ganti kutipan";
tombolKutipan.id = "ganti-kutipan";

kutipan.appendChild(judulKutipan);
kutipan.appendChild(isiKutipan);
kutipan.appendChild(tombolKutipan);

cuaca.appendChild(kutipan);

export async function ambilKutipan() {
    try {
        const response = await fetch("https://dummyjson.com/quotes/random");

        if (!response.ok) {
            throw new Error("Gagal mengambil kutipan.");
        }

        const data = await response.json();
        isiKutipan.textContent = `"${data.quote}"`;
        
    } catch (error) {
        isiKutipan.textContent = "Kutipan gagal dimuat.";
    }
}

tombolKutipan.addEventListener("click", ambilKutipan);

ambilKutipan();
renderTugas();

muatCatatanDariStorage();
renderCatatan();

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
