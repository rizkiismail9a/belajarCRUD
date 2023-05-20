let sampul = document.getElementById("sampul");
const judul = document.getElementById("judul");
const pengarang = document.getElementById("pengarang");
const penerbit = document.getElementById("penerbit");
const tahunTerbit = document.getElementById("tahunterbit");
const formTambahBuku = document.getElementById("tambahBuku");
const rakBuku = document.getElementById("rakBuku");

let books = [];

formTambahBuku.addEventListener("submit", (e) => {
  e.preventDefault();
  if (judul.value === "" || pengarang.value === "" || tahunTerbit === "") {
    alert("judul atau pengarang atau tahun terbit tidak boleh kosong");
    return false;
  }

  ambilData();
});

// formTambahBuku.addEventListener("submit", tampilkanBuku);

const ambilData = () => {
  let dataSampul = sampul.files;
  dataSampul = URL.createObjectURL(dataSampul[0]);

  let book = {
    sampul: dataSampul,
    judul: judul.value,
    penerbit: penerbit.value,
    pengarang: pengarang.value,
    tahunTerbit: tahunTerbit.value,
  };
  books.push(book);
  submitBook();
};

const submitBook = () => {
  rakBuku.innerHTML = `<tr>
  <th>No.</th>
  <th>Sampul</th>
  <th>Judul</th>
  <th>Pengarang</th>
  <th>Penerbit</th>
  <th>Tahun Terbit</th>
  <th>Aksi</th>
</tr>`;
  books.forEach((items, i) => {
    rakBuku.innerHTML += `<tr class="baris">
    <td class="nomor">${i + 1}</td>
    <td><img src="${items.sampul} " alt="" width="100" /></td>
    <td>${items.judul}</td>
    <td>${items.pengarang} </td>
    <td>${items.penerbit} </td>
    <td>${items.tahunTerbit} </td>
    <td ><button onclick="editBook(this, ${i})" >Edit</button> | <button onclick="deleteBook(this, ${i})" >Hapus</button></td>
  </tr>`;
  });
};

const deleteBook = (e, i) => {
  const konfirmasi = confirm("Yakin Mau dibuang?");
  if (konfirmasi) {
    e.parentElement.parentElement.remove();
    books.splice(i, 1);
  } else {
    return false;
  }
};

const editBook = (e, i) => {
  document.getElementById("simpanBuku").style.display = "none";
  const tombolUpdate = document.createElement("button");
  tombolUpdate.innerHTML = "Update Data";
  tombolUpdate.setAttribute("onclick", `updateData(${i})`);
  tombolUpdate.setAttribute("id", "editBuku");
  formTambahBuku.appendChild(tombolUpdate);

  tahunTerbit.value = e.parentElement.previousElementSibling.innerHTML;
  penerbit.value = e.parentElement.previousElementSibling.previousElementSibling.innerHTML;
  pengarang.value = e.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.innerHTML;
  judul.value = e.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.innerHTML;

  // formTambahBuku.onsubmit =
  // e.parentElement.parentElement.remove();
  // books.splice(i, 1);
};

const updateData = (i) => {
  let dataSampul = sampul.files;
  dataSampul = URL.createObjectURL(dataSampul[0]);
  const dataBaru = {
    sampul: dataSampul,
    judul: judul.value,
    penerbit: penerbit.value,
    pengarang: pengarang.value,
    tahunTerbit: tahunTerbit.value,
  };
  books.splice(i, 1, dataBaru);
  document.getElementById("simpanBuku").style.display = "block";
  console.log(books);
  document.getElementById("editBuku").remove();
  submitBook();
};
