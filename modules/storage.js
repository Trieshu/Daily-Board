function simpanKeStorage() {
    localStorage.setItem("daftarTugas",JSON.stringify(daftarTugas));
}

function muatDariStorage() {
    const data = localStorage.getItem("daftarTugas");

    if (data) {
        daftarTugas = JSON.parse(data);

        if (daftarTugas.length > 0) {
            nextId = Math.max(...daftarTugas.map((t) => t.id)) + 1;
        }
    }
}

function simpanCatatanKeStorage() {
    localStorage.setItem("daftarCatatan",JSON.stringify(daftarCatatan));
}

function muatCatatanDariStorage() {
    const data = localStorage.getItem("daftarCatatan");

    if (data) {
        daftarCatatan = JSON.parse(data);
    }
}
