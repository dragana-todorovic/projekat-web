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
	
	
	$("#registrujDomacina").click(function () {
		registrujDomacina();
	 });
	
	 $("#prikaziPodatke").click(function () {
         ispisiPodatke(korisnik);
	 });
	 
	 $("#izmijeniPodatke").click(function () {
		 izmijeniPodatke1(korisnik);
	 });
	 
	 $("#promijeniSifru").click(function () {
		 izmijeniSifru1(korisnik);
	 });
	 
	 $("#korisniciTab").click(function () {
		 $('#prikazPodataka').html(`
					<div style="width: 80%;height: 500px;overflow: auto; margin: 0 auto;">
		      <table class="table table-bordered">
		        <thead>
		          <tr>
		            <th colspan="8" style="text-align: center;" class="success">KORISNICI</th>
		          </tr>
		          <tr class="success">
		            <th>Korisnicko ime</th>
		            <th>Ime</th>
		            <th>Prezime</th>
		            <th>Pol</th>
		            <th>Uloga</th>
		          </tr>
		        </thead>
		        <tbody id="korisniciTabela">
		        </tbody>
		      </table>
		    </div>
					`);
		 	var korisnici;
			$.get({
				url:'../rest/preuzmiKorisnike',
				contentType: 'application/json',
				success: function(data){
					korisnici = data;
					iscrtajKorisnike(data);
				}
			});
});
});