function validateString(nekiString) {
    var re = /^[A-Za-z]+$/;
    if (re.test(nekiString))
        return true;
    else
        return false;
}

let ispisiPodatke = function(korisnik) {
	var pol = '';
	if(korisnik.pol == "1") {
		pol = 'Muski';
	} else {
		pol = 'Zenski';
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
		    </table>`);
	
};