const tugas = document.createElement("section");
tugas.textContent = "Tugas";
kolomKiri.appendChild(tugas);

const cariTugas = document.createElement("input");
cariTugas.placeholder = "Cari tugas...";
tugas.appendChild(cariTugas);

const input = document.createElement("input");
input.placeholder = "Masukkan nama tugas";
tugas.appendChild(input);

const tombol = document.createElement("button");
tombol.textContent = "Tambah";
tugas.appendChild(tombol);

const tombolSemua = document.createElement("button");
tombolSemua.textContent = "Semua";
tugas.appendChild(tombolSemua);

const tombolSelesai = document.createElement("button");
tombolSelesai.textContent = "Selesai";
tugas.appendChild(tombolSelesai);

const tombolBelum = document.createElement("button");
tombolBelum.textContent = "Belum Selesai";
tugas.appendChild(tombolBelum);

const list = document.createElement("ul");
list.id = "daftar-tugas";
tugas.appendChild(list);



let daftarTugas = [
    { id: 1, nama: "Belajar JavaScript", selesai: false },
    { id: 2, nama: "Olahraga pagi", selesai: false }
];

let nextId = 3;

export function validasiInput(nilai) {
    if (nilai.trim() === "") {
        alert("Input tidak boleh kosong!");
        return false;
    }

    if (nilai.length > 100) {
        alert("Input maksimal 100 karakter!");
        return false;
    }

    return true;
}

export function tambahTugas(nama) {
    if (!validasiInput(nama)) {
        return;
    }

    daftarTugas.push({
      id: nextId++, 
      nama: nama.trim(), 
      selesai: false
    });

    simpanKeStorage();
    renderTugas();
}


export function editTugas(id, namaBaru) {
    if (!validasiInput(namaBaru)) {
        return;
    }

    daftarTugas = daftarTugas.map((t) =>
        t.id === id ? { ...t, nama: namaBaru.trim() } : t
    );

    simpanKeStorage();
    renderTugas();
}

export function hapusTugas(id) {
    daftarTugas = daftarTugas.filter((t) => t.id !== id
    );

    simpanKeStorage();
    renderTugas();
}

export function toggleSelesai(id) {
    daftarTugas = daftarTugas.map((t) =>
        t.id === id ? { ...t, selesai: !t.selesai }: t
    );

    simpanKeStorage();
    renderTugas();
}


export function aktifkanDragDrop() {
    const items = document.querySelectorAll(".tugas-item");

    items.forEach((item) => {
        item.setAttribute("draggable", true);

        item.addEventListener("dragstart", (e) => { 
            e.dataTransfer.setData("text/plain",item.dataset.id);
        });

        item.addEventListener("dragover", (e) => {
            e.preventDefault();
        });

        item.addEventListener("drop", (e) => {
            e.preventDefault();

    const idDipindahkan = Number(e.dataTransfer.getData("text/plain"));

    const idTujuan = Number(item.dataset.id);

    if (idDipindahkan === idTujuan) {
        return;
    }

    const indexAsal = daftarTugas.findIndex((t) => t.id === idDipindahkan);

    const indexTujuan = daftarTugas.findIndex((t) => t.id === idTujuan);

    if (
        indexAsal !== -1 &&
        indexTujuan !== -1
    ) {

    const [tugasDipindahkan] = daftarTugas.splice(indexAsal, 1); daftarTugas.splice(indexTujuan,0,tugasDipindahkan);

        simpanKeStorage();
        renderTugas();
    }

    console.log("Tugas dipindahkan:",idDipindahkan);
    });
    });
}

export function renderTugas(filter = "semua") {
    list.innerHTML = "";

    const tugasTersaring =
        daftarTugas.filter((t) => {
            if (filter === "selesai") {
                return t.selesai;
            }

            if (filter === "belum") {
                return !t.selesai;
            }

            return true;
        });

    tugasTersaring.forEach((tugas) => {
        const li = document.createElement("li");
        li.className = "tugas-item";

        li.dataset.id = tugas.id;

        li.textContent = tugas.nama + " ";
        
        li.addEventListener("dblclick", (event) => {
            event.stopPropagation();

            const namaBaru = prompt("Edit nama tugas:",tugas.nama);

                if (namaBaru !== null && namaBaru.trim() !== "") {
                    editTugas(tugas.id, namaBaru.trim());
                }
            });

        const tombolSelesai = document.createElement("button");

        tombolSelesai.textContent = "Selesai";

        tombolSelesai.addEventListener("click", () => {
            toggleSelesai(tugas.id);
        });

        li.style.textDecoration = tugas.selesai
                ? "line-through"
                : "none";

        const tombolHapus = document.createElement("button");
        tombolHapus.textContent = "Hapus";

        tombolHapus.addEventListener("click", (event) => {
                event.stopPropagation();

                hapusTugas(tugas.id);
            }
        );

        li.appendChild(tombolSelesai);
        li.appendChild(tombolHapus);
        list.appendChild(li);
    });

    
    aktifkanDragDrop();
}


tombol.addEventListener("click", () => {
    const namaTugas = input.value;

    if (validasiInput(namaTugas)) {
        tambahTugas(namaTugas);

        console.log("Nama tugas:", namaTugas);
        input.value = "";
    }
});


tombolSemua.addEventListener("click", () => {
        renderTugas("semua");
    }
);

tombolSelesai.addEventListener("click",() => {
        renderTugas("selesai");
    }
);

tombolBelum.addEventListener("click",() => {
        renderTugas("belum");
    }
);
