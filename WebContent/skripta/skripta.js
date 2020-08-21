function validateString(nekiString) {
    var re = /^[A-Za-z]+$/;
    if (re.test(nekiString))
        return true;
    else
        return false;
};

let registrujDomacina = function() {
	 $("#prikazPodataka").html(`<table class="table table-bordered">
        <thead>
             <tr class = "border border-white">
                <th colspan="2" class = "text-info" style= "text-align:center;"  >
                    REGISTRACIJA
                </th>
            </tr>
        </thead>
        <tbody>
        	 <tr id="upozorenje" class="hidden">
                <td colspan="2"><strong>Greska!</strong>Vec postoji korisnik sa zadatim korisnickim imenom</td>
            </tr>
            <tr>
                <td>Korisnicko ime:</td>
                <td>
                    <input type="text" name="txtUsername" id="txtUsername" placeholder="Korisnicko ime..." />
                </td>
            </tr>
            <tr>
                <td>Lozinka:</td>
                <td>
                    <input type="password" id="txtPassword"
                           placeholder="Lozinka..." />
                </td>
            </tr>
               <tr>
                <td>Potvrda lozinke:</td>
                <td>
                    <input type="password" id="txtPasswordConfirmation"
                           placeholder="Lozinka..." />
                </td>
            </tr>
             <tr id="greskaLozinka" class="hidden">
                <td colspan="2"><strong>Greska!</strong>Lozinke se moraju poklapati</td>
            </tr>
            <tr>
                <td>Ime:</td>
                <td>
                    <input type="text" id="txtIme" pattern="^[A-Za-z]*$"
                           placeholder="Ime..." />
                </td>
            </tr>
            <tr>
                <td>Prezime:</td>
                <td>
                    <input type="text" id="txtPrezime"
                           placeholder="Prezime..." />
                </td>
            </tr>
            <tr>
                <td>Pol:</td>
                <td>
                    <input type="radio" name="pol" value="0"> Muski
                    <input type="radio" name="pol" value="1" checked="checked"> Zenski
                </td>
            </tr>
            <tr class="success">
                <td colspan="2" style = "text-align:center;">
                    <input id="btnRegister" class="btn btn-primary pull-center" type="button"
                           value="Registruj se" />
                </td>
            </tr>
        </tbody>
    </table>`);
	 $("#btnRegister").click(function () {
		 var korisnickoIme = $("#txtUsername").val();
			var lozinka = $("#txtPassword").val();
			var potvrdaLozinke = $("#txtPasswordConfirmation").val();
			var ime = $("#txtIme").val();
			var prezime = $("#txtPrezime").val();
			var pol = $("input:radio[name=pol]:checked").val();
			
			if(korisnickoIme.trim() != '' && lozinka.trim() != '' && potvrdaLozinke.trim() != '' && ime.trim() != '' && prezime.trim() != ''){
				if(lozinka != potvrdaLozinke) {
					$("#greskaLozinka").removeClass('hidden');
					$("#greskaLozinka").addClass('alert-danger');
					$("#upozorenje").addClass('hidden');
				} else {
					$("#upozorenje").addClass('hidden');
					$("#greskaLozinka").addClass('hidden');
					$.post({
						url: '../rest/registracija1',
						data: JSON.stringify({korisnickoIme: korisnickoIme, lozinka: lozinka, ime: ime, prezime : prezime, pol : pol}),
						contentType: 'application/json',
						success: function() {
							alert("Uspjesno ste registrovali domacina");
							location.href = "../html/Admin.html";
						},
						error: function(message) {
							$("#upozorenje").removeClass('hidden');
							$("#upozorenje").addClass('alert-danger');
							$("#upozorenje").html(`<td colspan="2"><strong>Greska!</strong> Vec postoji korisnik sa datim korisnickim imenom.</td>`);
						}
					});
				}
			} else{
				
				$("#upozorenje").removeClass('hidden');
				$("#upozorenje").addClass('alert-danger');
				$("#greskaLozinka").addClass('hidden');
				 $("#upozorenje").html(`<td colspan="2"><strong>Greska!</strong> Sva polja moraju biti popunjena.</td>`);
			}
	 });
	
	
}

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
                    <input type="text" id="txtIme" value="`+ ((korisnik.ime != null) ? korisnik.ime:`-`) + `"/>
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
					location.href = "";
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

let izmijeniSifru = function (korisnik) {
    $("#prikazPodataka").html(`<table class="table table-bordered">
                    <thead>
                        <tr class="success">
                            <th colspan="2" class = "text-info" style= "text-align:center";>
                                Promjena sifre                         
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr id="upozorenje" class="hidden">
                            <td colspan="2"><strong>Greska!</strong> Moraju se poklapati sifre.</td>                
                        </tr>
                        <tr id="upozorenje2" class="hidden">
                            <td colspan="2"><strong>Greska!</strong> Pogresno unesena stara lozinka.</td>                
                        </tr>
                        <tr>
                            <td>Stara sifra:</td>
                            <td>
                                <input type="password" id="txtStaraSifra" placeholder="Stara sifra..." />
                            </td>
                        </tr>
                        <tr>
                            <td>Nova sifra:</td>
                            <td>
                                <input type="password" id="txtNovaSifra" placeholder="Nova sifra..." />
                            </td>
                        </tr>
                           <tr>
                            <td>Ponovi novu sifru:</td>
                            <td>
                                <input type="password" id="txtPonovljenaSifra" placeholder="Nova sifra..." />
                            </td>
                        </tr>
                        <tr class="success">
                            <td colspan="2" style= "text-align:center;">
                                 <input id="btnSacuvajIzmjenu" class="btn btn-primary pull-center" type="button" value="Sacuvaj">
                        <!--/form-->
                            </td>
                        </tr>
                    </tbody>
                </table>`);
    $("#btnSacuvajIzmjenu").click(function () {
        var stara = korisnik.lozinka;
        var staraUnesena = $("#txtStaraSifra").val();
        var novaUnesena = $("#txtNovaSifra").val();
        var novaPonovoUnesena = $("#txtPonovljenaSifra").val();
        if (stara != staraUnesena) {
            $("#upozorenje").addClass(`hidden`);
            $("#upozorenje2").removeClass(`hidden`);
            $("#upozorenje2").addClass(`alert-danger`);
            $("#txtStaraSifra").val(``);
            $("#txtStaraSifra").focus();
            $("#txtNovaSifra").val(``);
            $("#txtPonovljenaSifra").val(``);
        } else if (novaUnesena != novaPonovoUnesena) {
            $("#upozorenje2").addClass(`hidden`);
            $("#upozorenje").removeClass(`hidden`);
            $("#upozorenje").addClass(`alert-danger`);
            $("#txtNovaSifra").val(``);
            $("#txtNovaSifra").focus();
            $("#txtPonovljenaSifra").val(``);
        } else {
            $("#upozorenje2").addClass(`hidden`);
            $("#upozorenje").addClass(`hidden`);
            $.post({
				url: '../rest/izmjenaPodataka',
				data: JSON.stringify({korisnickoIme: korisnik.korisnickoIme, lozinka: novaUnesena, ime: korisnik.ime, prezime : korisnik.prezime, pol : korisnik.pol}),
				contentType: 'application/json',
				success: function() {
					alert("Uspjesno ste izmijenili lozinku");
					location.href = "Gost.html";
				},
				error: function(message) {
					$("#upozorenje").removeClass('hidden');
					$("#upozorenje").addClass('alert-danger');
				}
		});}
    });
};