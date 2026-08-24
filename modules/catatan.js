const catatan = document.createElement("section");
catatan.textContent = "Catatan";
kolomKiri.appendChild(catatan);

const textarea = document.createElement("textarea");
textarea.placeholder = "Tulis catatan cepat...";

catatan.appendChild(textarea);

const tombolCatatan = document.createElement("button");
tombolCatatan.textContent = "Tambah Catatan";

catatan.appendChild(tombolCatatan);

const containerCatatan = document.createElement("div");

containerCatatan.id = "daftar-catatan";

catatan.appendChild(containerCatatan);

let daftarCatatan = [];

function tambahCatatan(isi) {
    if (!validasiInput(isi)) {
        return;
    }

    daftarCatatan.push({
        id: Date.now(),
        isi: isi.trim(),
        tanggal:  new Date().toLocaleDateString()
    });

    simpanCatatanKeStorage();
    renderCatatan();
}


function editCatatan(id,isiBaru) {
    if (!validasiInput(isiBaru)) {
        return;
    }

    daftarCatatan = daftarCatatan.map((catatan) => catatan.id === id ? { ...catatan, isi: isiBaru.trim() } : catatan);

    simpanCatatanKeStorage();
    renderCatatan();
}

function hapusCatatan(id) {
  daftarCatatan = daftarCatatan.filter((catatan)) => catatan.id !== id
  );
  simpanCatatanKeStorage();
  renderCatatan();
}
  

function renderCatatan() {
    containerCatatan.innerHTML = "";

    daftarCatatan.forEach((catatan) => {
        const div = document.createElement("div");
        div.className = "catatan-item";

        const isi = document.createElement("p");
        isi.textContent = catatan.isi;

        const tanggal = document.createElement("small");
        tanggal.textContent = catatan.tanggal;
        
        const tombolhapuscatatan = document.createElement("button");
        tombolhapuscatatan.textContent = "hapus";
        
        tombolhapuscatatan.addEventListener("click", (event) => {
          event.stopPropagation();
          hapusCatatan(catatan.id);
        });

        div.appendChild(isi);
        div.appendChild(tanggal);
        div.appendChild(tombolhapuscatatan);

            
        div.addEventListener("dblclick",() => {
            const isiBaru = prompt("Edit catatan:",catatan.isi);

                if (isiBaru !== null && isiBaru.trim() !== "") {
                    editCatatan(catatan.id,isiBaru.trim());
                }
        });

        containerCatatan.appendChild(div);

    });
} 


tombolCatatan.addEventListener("click",() => {
    const isiCatatan = textarea.value;

        if (validasiInput(isiCatatan)) {

            tambahCatatan(isiCatatan);
            textarea.value = "";
        }
    });
