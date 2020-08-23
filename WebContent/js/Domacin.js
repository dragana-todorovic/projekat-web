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
	$("#prikazPodataka").html(`
<table class="table table-bordered">
        <thead>
             <tr class = "border border-white">
                <th colspan="2" class = "text-info" style= "text-align:center;"  >
                    DODAVANJE APARTMANA
                </th>
            </tr>
        </thead>
        <tbody>
        	 <tr id="upozorenje" class="hidden">
                <td colspan="2"><strong>Greska!</strong></td>
            </tr>
  				<tr>
                <td>Tip:</td>
                <td>
                    <input type="radio" name="tip" value="0"> cijeli apartman
                    <input type="radio" name="tip" value="1" checked="checked"> soba
                </td>
            </tr>
            <tr>
                <td>Broj soba:</td>
                <td>
                    <input type="text" name="txtBrojSoba" id="txtBrojSoba" placeholder="Broj soba..." />
                </td>
            </tr>
              <tr>
                <td>Broj gostiju:</td>
                <td>
                    <input type="text" name="txtBrojGostiju" id="txtBrojGostiju" placeholder="Broj gostiju..." />
                </td>
            </tr>
   <tr>
                <td>Datum izdavanja:</td>
                <td>
                    <input type="date" name="datumIzdavanja" id="datumIzdavanja" />
                </td>
            </tr>
   <tr>
                <td>Cijena po noci:</td>
                <td>
                    <input type="text" name="txtCijena" id="txtCijena" placeholder="Cijena..." />
                </td>
            </tr>
     <tr>
                <td>Vrijeme za prijavu:</td>
                <td>
                    <input type="time" name="vrijemeZaPrijavu" id="vrijemeZaPrijavu"  value="14:00"  />
                </td>
            </tr>
     <tr>
                <td>Vrijeme za odjavu:</td>
                <td>
                    <input type="time" name="vrijemeZaOdjavu" id="vrijemeZaOdjavu" value="10:00"  />
                </td>
            </tr>
            <tr class="success">
                <td colspan="2" style = "text-align:center;">
                    <input id="btnDodaj" class="btn btn-primary pull-center" type="button"
                           value="Dodaj apartman" />
                </td>
            </tr>
        </tbody>
    </table>`);
	$("#btnDodaj").click(function(){
		var brojSoba = $("#txtBrojSoba").val();
		var brojGostiju = $("#txtBrojGostiju").val();
		var datumZaIzdavanje = $("#datumIzdavanja").val();
		var cijenaPoNoci = $("#txtCijena").val();
		var tip= $("input:radio[name=tip]:checked").val();
		var vrijemeZaOdjavu = $("#vrijemeZaOdjavu").val();
		var vrijemeZaPrijavu = $("#vrijemeZaPrijavu").val();
		if(brojSoba.trim() != '' && brojGostiju.trim() != '' && cijenaPoNoci.trim() != '' && datumZaIzdavanje.trim()!=''){
		$.post({
		url:'../rest/dodajApartman',
		data : JSON.stringify({tip:tip,brojSoba:brojSoba,brojGostiju:brojGostiju,datumZaIzdavanje:datumZaIzdavanje,cijenaPoNoci:cijenaPoNoci,vrijemeZaPrijavu:vrijemeZaPrijavu,vrijemeZaOdjavu:vrijemeZaOdjavu}),
		contentType: 'application/json',
		success: function(){
			alert("Uspjesno ste dodali apartman");
			location.href = "Domacin.html";
		},
		error: function(message){
			$("#upozorenje").removeClass('hidden');
		$("#upozorenje").addClass('alert-danger');
		$("#upozorenje").html(`<td colspan="2"><strong>Greska!</strong> Sva polja moraju biti popunjena.</td>`);
		}
	
	});
	}else{
		$("#upozorenje").removeClass('hidden');
		$("#upozorenje").addClass('alert-danger');
		$("#upozorenje").html(`<td colspan="2"><strong>Greska!</strong> Sva polja moraju biti popunjena.</td>`);
	}
	
	});
});
 
});