export function simpanKeStorage() {
    localStorage.setItem("daftarTugas",JSON.stringify(daftarTugas));
}

export function muatDariStorage() {
    const data = localStorage.getItem("daftarTugas");

    if (data) {
        daftarTugas = JSON.parse(data);

        if (daftarTugas.length > 0) {
            nextId = Math.max(...daftarTugas.map((t) => t.id)) + 1;
        }
    }
}

export function simpanCatatanKeStorage() {
    localStorage.setItem("daftarCatatan",JSON.stringify(daftarCatatan));
}

export function muatCatatanDariStorage() {
    const data = localStorage.getItem("daftarCatatan");

    if (data) {
        daftarCatatan = JSON.parse(data);
    }
}
