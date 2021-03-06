

$(document).ready(function(){

	$('#logoutLink').click(function() {
		$.post({
			url:'../rest/logout',
			contentType: 'application/json',
			success: function(data) {
				window.location.href="../LogIn.html";
			},
			error: function(data) {
			}
		});
	});
	var pom = ``;
	$.get({
		url:'../rest/preuzmiSadrzaj',
		contentType: 'application/json',
		success: function(data1) {
			pom = data1;
		}
	});
	$.get("api/Domacin/VratiSadrzaj", function (data1) {
		pom = data1;
	});
	let korisnik = '';
	$.get({
		url:'../rest/trenutniKorisnik',
		contentType: 'application/json',
		success: function(data){
			korisnik = data;
			if(data){
if(data.uloga == 'gost'){
	window.location.href = "Gost.html";}
else if(data.uloga == 'administartor'){
	window.location.href = "Admin.html";
}
else {
$("#korisnik").html(data.korisnickoIme + `<span class="caret"></span>`);
}
}
			
		}
	});
	$("#pocetna").click(function () {
		window.location.href="Domacin.html";
	 });
	
	 $("#prikaziPodatke").click(function () {
         ispisiPodatke(korisnik);
	 });
	 
	 $("#izmijeniPodatke").click(function () {
		 izmijeniPodatke2(korisnik);
	 });
	 
	 $("#promijeniSifru").click(function () {
		 izmijeniSifru2(korisnik);
	 });
$('#dodajApartman').click(function() {
	$.get({
			url:'../rest/preuzmiSadrzaj',
			contentType: 'application/json',
			success: function(data) {
				dodajApartman(data,korisnik.korisnickoIme);
			},
			error: function(data) {
			}
		});
});

$('#pregledNeaktivnihApartmana').click(function() {
	$.get({
			url:'../rest/vratiNeaktivne',
			contentType: 'application/json',
			success: function(data) {
				
				ispisiApartmane(data,pom);
			},
			error: function() {
			}
		});
});

$('#pregledAktivnihApartmana').click(function() {
	$.get({
			url:'../rest/vratiAktivne',
			contentType: 'application/json',
			success: function(data) {
				
				ispisiAktivneApartmane(data,pom);
			},
			error: function() {
			}
		});
});


 
});