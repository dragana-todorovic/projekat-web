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
	
	let korisnik = '';
	$.get({
		url:'../rest/trenutniKorisnik',
		contentType: 'application/json',
		success: function(data){
			korisnik = data;
			$("#korisnik").html(data.korisnickoIme + `<span class="caret"></span>`);
		}
	});
	$("#pocetna").click(function () {
		window.location.href="Gost.html";
	 });

	 $("#prikaziPodatke").click(function () {
         ispisiPodatke(korisnik);
	 });
	 
	 $("#izmijeniPodatke").click(function () {
		 izmijeniPodatke(korisnik);
	 });
	 
	 $("#promijeniSifru").click(function () {
		 izmijeniSifru(korisnik);
	 });
	
});
