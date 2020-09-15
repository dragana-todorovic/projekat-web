

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
			if(data){
if(data.uloga == 'gost'){
	window.location.href = "Gost.html";}
else if(data.uloga == 'domacin'){
	window.location.href = "Domacin.html";
}else {
$("#korisnik").html(data.korisnickoIme + `<span class="caret"></span>`);
}
}
			
		}
	});
	
	$("#pocetna").click(function () {
		window.location.href="Admin.html";
	 });
	
	
	$("#registrujDomacina").click(function () {
		registrujDomacina();
	 });
	
	 $("#prikaziPodatke").click(function () {
         ispisiPodatke(korisnik);
	 });
	 
	 $("#praznici").click(function () {
		 ispisiPraznike();
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
					
		      <table class="table table-bordered" id="table">
		        <thead>
		          <tr>
		            <th colspan="5" style="text-align: center;" class="success">KORISNICI</th>
		          </tr>
<tr>
			<th   colspan="5" class = " success text-info">Pretrazivanje po ulozi:<input type="text" min="0" id="uloga" style="width:10%"/></th>
			
			</tr>
			<tr>
			<th   colspan="5" class = " success text-info">Pretrazivanje po polu:<input type="text" min="0" id="pol" style="width:10%"/></th>
			
			</tr>
			<tr>
			<th   colspan="5" class = " success text-info">Pretrazivanje po korisnickom imenu:<input type="text" min="0" id="korIme" style="width:10%"/></th>
			
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
	 $("#btnPretrazi").click(function () {
		 var korisnickoIme = $("#pretraziKorisnike").val();
		 $.post({
				url: '../rest/pretraga',
				data: JSON.stringify({korisnickoIme: korisnickoIme}),
				contentType: 'application/json',
				success: function(data) {
					iscrtajKorisnike(data);
				}
				
			});
	 });
	 
	 $("#upravljajSadrzajem").click(function () {
		 $.get({
				url:'../rest/preuzmiSadrzaj',
				contentType: 'application/json',
				success: function(data){
					preuzmiSadrzaj(data);
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
		$("#pregledApartmana").click(function () {
			$.get({
				url:'../rest/vratiSveApartmane',
				contentType: 'application/json',
				success: function(data) {
					ispisiSveApartmane(data,pom);
				},
				error: function() {
				}
			});
		});
				
		$("#pregledRezervacija").click(function () {
			$.get({
				url:'../rest/vratiSveRezervacije1',
				contentType: 'application/json',
				success: function(data) {
					ispisiSveRezervacije(data);
				},
				error: function() {
				}
			});
		});
	 
	 
	 
	
});