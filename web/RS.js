
$(window).scroll(function () {
    transparent();
});
$('#tambahDokterModal').on('hidden.bs.modal', function (e) {
    document.getElementById('tambahDokterStatus').innerHTML = "";
    document.getElementById('namaDokter').value = "";
    document.getElementById('spesialisDokter').value = "";
});
$('#tambahKlinikModal').on('hidden.bs.modal', function (e) {
    document.getElementById('idKlinik').value = "";
    document.getElementById('namaKlinik').value = "";
    document.getElementById('spesialisKlinik').value = "";
    document.getElementById('tambahKlinikStatus').innerHTML = "";
});
$('#tambahPasienModal').on('hidden.bs.modal', function (e) {
    document.getElementById('tambahPasienStatus').innerHTML = "";
    document.getElementById('noRm').value = "";
    document.getElementById('nama').value = "";
    document.getElementById('alamat').value = "";
    document.getElementById('nik').value = "";
    document.getElementById('tanggalLahir').value = "";
});
$('#cariPasienResultForm').hide();
$('#tambahAntrianForm').hide();
$('#cariPasienModal').on('hidden.bs.modal', function (e) {
    $('#cariPasienResultForm').hide();
});
$('#tambahAntrianModal').on('hidden.bs.modal', function (e) {
    document.getElementById('tambahAntrianStatus').innerHTML = "";
    $('#tambahAntrianForm').hide();
});
function transparent() {
    if ($(window).scrollTop() > 0) {
        $('nav').removeClass("bg-transparent");
        $('nav').addClass("bg-rs-dark");
    } else {
        $('nav').removeClass("bg-rs-dark");
        $('nav').addClass("bg-transparent");
    }
}

$(function () {
    $('#bacaKlinik').on('click', function () {
        loadKlinik();
    });
    $('#daftarDokter').on('click', function () {
        loadDokter();
    });
    function loadKlinik() {
        var user = getCookie("username");
        var password = getCookie("password");
        if (user != "" && password != "") {
            console.log("siap");
            var url = "http://202.94.83.190:8080/165314045rsku/webresources/klinik";
            var xhttp = new XMLHttpRequest();
            xhttp.open("GET", url, true);
            xhttp.send();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
//                    document.getElementById("klinik").innerHTML = this.responseText;
                    var obj = JSON.parse(this.responseText);
                    var html = "<table class='table table-striped'><thead><tr><th>Nama</th> <th>Spesialis</th></tr></thead><tbody>";
                    for (var i = 0; i < obj.length; i++) {
                        html += '<tr><td>' + obj[i].nama + '</td><td>' + obj[i].spesialis + '</td></tr>';
                    }
                    html += '</tbody></table>';
//                            document.getElementById("klinik").innerHTML = html;
                    $('.modal-header #exampleModalLabel').text("Daftar Klinik");
                    $('#rsmodal-body').append(html);
                    $('#rsmodal').on('hidden.bs.modal', function (e) {
                        $('#rsmodal-body').text("");
                    })
                }
            }
        } else {
            alert("Belum Login, silahkan login dulu");
        }
    }

    function loadDokter() {
        var user = getCookie("username");
        var password = getCookie("password");
        if (user != "" && password != "") {
            var url = "http://202.94.83.190:8080/165314045rsku/webresources/dokter";
            var xhttp = new XMLHttpRequest();
            xhttp.open("GET", url, true);
            xhttp.send();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
//                    document.getElementById("table").innerHTML = this.responseText;
                    var obj = JSON.parse(this.responseText);
                    var html = "<table class='table table-striped'><thead><tr><th>Nama</th> <th>Spesialis</th></tr></thead><tbody>";
                    for (var i = 0; i < obj.length; i++) {
                        html += '<tr><td>' + obj[i].nama + '</td><td>' + obj[i].spesialis + '</td></tr>';
                    }
                    html += '</tbody></table>';
                    $('.modal-header #exampleModalLabel').text("Daftar Dokter");
                    $('#rsmodal-body').append(html);
                    $('#rsmodal').on('hidden.bs.modal', function (e) {
                        $('#rsmodal-body').text("");
                    })
//                    
                }
            }

        } else {
            alert("Belum Login, silahkan login dulu");
        }
    }

});
function bacaAntrian() {
    var user = getCookie("username");
    var password = getCookie("password");
    if (user != "" && password != "") {
        $('#cariAntrian-body').text("");
        var url = "http://202.94.83.190:8080/165314045rsku/webresources/antrian/cariAntrian?tanggal=" + tanggal.value;
        var xhttp = new XMLHttpRequest();
        xhttp.open("GET", url, true);
        xhttp.send();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var obj = JSON.parse(this.responseText);
                var x = "<table class='table my-4'>";
                x += "<thead class='thead-light'>";
                x += "<tr>";
                x += "<th>Nomor Rekam Medis</th>";
                x += "<th>Nama Pasien</th>";
                x += "<th>Nama Klinik</th>";
                x += "</tr>";
                x += "</thead>";
                for (var i = 0; i < obj.length; i++) {
                    x += "<tr>";
                    x += "<td>" + obj[i].noRm + "</td>";
                    x += "<td>" + obj[i].nama + "</td>";
                    x += "<td>" + obj[i].namaKlinik + "</td>";
                    x += "</tr>";
                }
                x += "</table>";
                $('#cariAntrian-body').append(x);
                $('#cariAntrianModal').on('hidden.bs.modal', function (e) {
                    $('#cariAntrian-body').text("");
                })
            }
        }
    } else {
        alert("Belum Login, silahkan login dulu");
    }
}

var map;
function initMap() {
//                var url = 'http://localhost:8084/165314045rsku/webresources/location';
    var url = 'http://202.94.83.190:8080/165314045rsku/webresources/location';
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var obj = JSON.parse(this.responseText);
            map = new google.maps.Map(document.getElementById('map'), {
                center: {lat: obj[0].lat, lng: obj[0].lng},
                zoom: 8
            });
            var marker = [];
            for (var i = 0; i < obj.length; i++) {
                marker[i] = new google.maps.Marker({position: {lat: obj[i].lat, lng: obj[i].lng}, map: map});
            }

        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
}

function addDokter(form) {
//                console.log("ok");
    var user = getCookie("username");
    var password = getCookie("password");
    if (user != "" && password != "") {
        var json = {
            "nama": form.namaDokter.value,
            "spesialis": form.spesialisDokter.value
        };
        var html = JSON.stringify(json, 0, 100);
        var url = "http://202.94.83.190:8080/165314045rsku/webresources/dokter/addDokter";
        var xhr = new XMLHttpRequest();
        xhr.open("post", url, true);
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.send(html);
        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                document.getElementById('tambahDokterStatus').innerHTML = "Tambah Dokter Berhasil";
            }
        }
    } else {
        alert("Belum Login, silahkan login dulu");
    }
    return false;
}

function addKlinik(form) {
//                console.log("ok");
    var user = getCookie("username");
    var password = getCookie("password");
    if (user != "" && password != "") {
        var json = {
            "idKlinik": form.idKLinik.value,
            "nama": form.namaKlinik.value,
            "spesialis": form.spesialisKlinik.value
        };
        var html = JSON.stringify(json, 0, 100);
        var url = "http://202.94.83.190:8080/165314045rsku/webresources/klinik/addKlinik";
        var xhr = new XMLHttpRequest();
        xhr.open("post", url, true);
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.send(html);
        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                document.getElementById('tambahKlinikStatus').innerHTML = "Tambah Klinik Berhasil";
            }
        }
    } else {
        alert("Belum Login, silahkan login dulu");
    }
    return false;
}

function addPasien(form) {
    var user = getCookie("username");
    var password = getCookie("password");
    if (user != "" && password != "") {
        var json = {
            "noRm": form.noRm.value,
            "nama": form.nama.value,
            "alamat": form.alamat.value,
            "nik": form.nik.value,
            "tanggalLahir": form.tanggalLahir.value,
            "kelamin": form.kelamin.value
        };
        var html = JSON.stringify(json, 0, 100);
        var url = "http://202.94.83.190:8080/165314045rsku/webresources/pasien/addPasien";
        var xhr = new XMLHttpRequest();
        xhr.open("post", url, true);
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.send(html);
        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                document.getElementById('tambahPasienStatus').innerHTML = "Tambah Pasien Berhasil";
            }
        }
    } else {
        alert("Belum Login, silahkan login dulu");
    }
    return false;
}

function cariPasien() {
    var user = getCookie("username");
    var password = getCookie("password");
    if (user != "" && password != "") {
        var url = "http://202.94.83.190:8080/165314045rsku/webresources/pasien/cariPasien?nik=" + cariPasienNik.value;
        var xhttp = new XMLHttpRequest();
        xhttp.open("GET", url, true);
        xhttp.send();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                $('#cariPasienResultForm').show();
                var obj = JSON.parse(this.responseText);
                document.getElementById("cariPasienNoRM").value = obj.noRm;
                document.getElementById("cariPasienNama").value = obj.nama;
                document.getElementById("cariPasienAlamat").value = obj.alamat;
                document.getElementById("cariPasienTanggalLahir").value = obj.tanggalLahir;
                document.getElementById("cariPasienKelamin").value = obj.kelamin;
            }
        }
    } else {
        alert("Belum Login, silahkan login dulu");
    }

}

function cariPasienforTambahAntrian() {
    var user = getCookie("username");
    var password = getCookie("password");
    if (user != "" && password != "") {
        var url = "http://202.94.83.190:8080/165314045rsku/webresources/pasien/cariPasien?nik=" + tambahAntrianNik.value;
        var xhttp = new XMLHttpRequest();
        xhttp.open("GET", url, true);
        xhttp.send();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                $('#tambahAntrianForm').show();
                var obj = JSON.parse(this.responseText);
                document.getElementById("tambahAntrianNoRm").value = obj.noRm;
                document.getElementById("tambahAntrianNama").value = obj.nama;
                document.getElementById("tambahAntrianAlamat").value = obj.alamat;
            }
        }
    } else {
        alert("Belum Login, silahkan login dulu");
    }
}

function tambahAntrian(form) {
    var user = getCookie("username");
    var password = getCookie("password");
    if (user != "" && password != "") {
        var json = {
            "tanggal": form.tambahAntrianTanggal.value,
            "noRm": form.tambahAntrianNoRm.value,
            "nama": form.tambahAntrianNama.value,
            "alamat": form.tambahAntrianAlamat.value,
            "namaKlinik": form.tambahAntrianNamaKlinik.value
        };
        var html = JSON.stringify(json, 0, 100);
        var url = "http://202.94.83.190:8080/165314045rsku/webresources/antrian/addAntrian";
        var xhr = new XMLHttpRequest();
        xhr.open("post", url, true);
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.send(html);
        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                document.getElementById('tambahAntrianStatus').innerHTML = "Tambah Antrian Berhasil";
            }
        }
    } else {
        alert("Belum Login, silahkan login dulu");
    }
    return false;
}

function login() {
    var json = {
        "email": document.getElementById("email").value,
        "password": document.getElementById("password").value
    };
    var html = JSON.stringify(json, 0, 100);
    var url = "http://202.94.83.190:8080/165314045rsku/webresources/user/login";
    var xhr = new XMLHttpRequest();
    xhr.open("post", url, true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(html);
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            if (this.responseText != "") {
                var username = document.getElementById("email").value;
                var password = document.getElementById("password").value;
                setCookie("username", username, 1);
                setCookie("password", password, 1);
                window.open("index.html", "_self");
            } else {
//                document.getElementById("s").innerHTML = "Username atau Password Salah";
                document.getElementById("s").innerHTML = '<div class="alert alert-danger alert-dismissible fade show" role="alert"><strong>Username atau Password Salah</strong><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>';
            }

        }
    }

}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
