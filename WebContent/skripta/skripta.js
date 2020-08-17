function validateString(nekiString) {
    var re = /^[A-Za-z]+$/;
    if (re.test(nekiString))
        return true;
    else
        return false;
};

let ispisiPodatke = function(korisnik) {
	var pol = '';
	if(korisnik.pol == 'zenski') {
		pol = 'Zenski';
	} else {
		pol = 'Muski';
	}
	 $("#prikazPodataka").html(`<table class="table table-bordered">
		        <thead>
		            <tr class="success">
		                <th colspan="2" class = "text-info" style= "text-align:center;">Moji podaci</th>
		            </tr>
		        </thead>
		        <tbody>
		            <tr>
		                <td>Korisnicko ime:</td>
		                <td>` + ((korisnik.korisnickoIme != null) ? korisnik.korisnickoIme:`-`) + `</td>
		            </tr>
		            <tr>
		                <td>Ime:</td>
		                <td>` + ((korisnik.ime != null) ? korisnik.ime:`-`) + `</td>
		            </tr>
		            <tr>
		                <td>Prezime:</td>
		                <td>` + ((korisnik.prezime != null) ? korisnik.prezime:`-`) + `</td>
		            </tr>
		                <td>Pol:</td>
		                <td>` + pol + `</td>
		            </tr>
		        </tbody>
		    </table> <p id="er"> </p>`);
};

let izmijeniPodatke = function (korisnik) {
    var pol = ``;
    if (korisnik.pol == "zenski") {
        pol = `<input type="radio"  name="pol" value="0"> Muski
               <input type="radio"  name="pol" value="1" checked="checked"> Zenski`;
    } else {
        pol = `<input type="radio"  name="pol" value="0" checked="checked"> Muski
               <input type="radio"  name="pol" value="1"> Zenski`;
    }
    $("#prikazPodataka").html(`<table class="table table-bordered">
        <thead>
            <tr class="success">
                <th colspan="2" class = "text-info" style= "text-align:center;">
                    Izmjena podataka                    
                </th>
            </tr>
        </thead>
        <tbody>
            <tr class="hidden" id="upozorenje">
                <td colspan="2"></td>
            </tr>
            <tr>
                <td>Korisnicko ime:</td>
                <td>`
        + ((korisnik.korisnickoIme != null) ? korisnik.korisnickoIme:``) +
        `</td>
            </tr>
            
            <tr>
                <td>Ime:</td>
                <td>
                    <input type="text" id="txtIme" value="`+ ((korisnik.ime != null) ? korisnik.korisnickoIme:``) + `"/>
                </td>
            </tr>
            <tr>
                <td>Prezime:</td>
                <td>
                    <input type="text" id="txtPrezime" value="`+ ((korisnik.prezime != null) ? korisnik.prezime:`` ) + `"/>
                </td>
            </tr>
            <tr>
                <td>Pol:</td>
                <td>`
        + pol +
        `</td>
            </tr>
           
            <tr class="success">
                <td colspan="2" style = "text-align:center;">
                    <input id="btnIzmijeniPodatke" class="btn btn-primary pull-center" type="button"
                           value="Izmijeni podatke" />
                </td>
            </tr>
        </tbody>
    </table>`);
    $("#btnIzmijeniPodatke").click(function () {
		var ime = $("#txtIme").val();
		var prezime = $("#txtPrezime").val();
		var pol = $("input:radio[name=pol]:checked").val();
		
		if(ime.trim() != '' && prezime.trim() != ''){
			$("#upozorenje").addClass('hidden');
			$.post({
				url: '../rest/izmjenaPodataka',
				data: JSON.stringify({korisnickoIme: korisnik.korisnickoIme, lozinka: korisnik.lozinka, ime: ime, prezime : prezime, pol : pol}),
				contentType: 'application/json',
				success: function() {
					alert("Uspjesno ste izmijenili podatke");
					location.href = "Gost.html";
				},
				error: function(message) {
					$("#upozorenje").removeClass('hidden');
					$("#upozorenje").addClass('alert-danger');
				}
		});
		} else {
			$("#upozorenje").removeClass('hidden');
			$("#upozorenje").addClass('alert-danger');
			 $("#upozorenje").html(`<td colspan="2"><strong>Greska!</strong> Sva polja moraju biti popunjena.</td>`);
			
		}
	});

};