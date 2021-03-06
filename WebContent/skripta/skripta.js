
function validateString(nekiString) {
    var re = /^[A-Za-z ]+$/;
    if (re.test(nekiString))
        return true;
    else
        return false;
};
function validateNumber(nekiBroj) {
    var re = /^[0-9]+$/;
    if (re.test(nekiBroj))
        return true;
    else
        return false;
};

function iscrtajKorisnike(data){
	let temp='';
	for (i in data){
		temp+=`<tr><td>`+data[i].korisnickoIme+`</td><td>`+data[i].ime+`</td><td>`+data[i].prezime+`</td><td>`+data[i].pol+`</td><td>`+data[i].uloga+`</td>`;
		temp+=`<td>`
		if(data[i].uloga !="administartor"){
		if(data[i].blokiran==false){	
		temp +=`<input id="btnBlokiraj` + data[i].korisnickoIme + `" name = "blokiraj" class="btn btn-danger pull-center" type="button"
	                           value="Blokiraj" />`;}
		else{
			temp +=`<input id="btnBlokiraj` + data[i].korisnickoIme + `" name = "blokiraj" class="btn btn-success pull-center" type="button"
	                           value="Odblokiraj" />`;
			
		}}
		temp+=`</td>`;
		temp+=`</tr>`;
		
	}
	
	
	$('#korisniciTabela').html(temp);
	$("input:button[name=blokiraj]").click(function () {
		 $.post({
				url:'../rest/blokiraj',
				data : JSON.stringify({id:this.id}),
				contentType: 'application/json',
				success: function(kor){
					iscrtajKorisnike(kor);
					
				},
				error: function(message){
					alert('Neuspjesno');
				}
			
			});
	 });
	$("#korIme").keyup(function () {
        var nadji = ($('#korIme').val()).toLowerCase();
        $("#table tbody tr").each(function () {
            var ime = ($('td:eq(0)', this).text()).toLowerCase();
            if (ime.includes(nadji) || nadji == "") {
                $(this).show()
            } else {
                $(this).hide()
            }
        });
    });
    $("#korIme").keydown(function () {
        var nadji = ($('#korIme').val()).toLowerCase();
        $("#table tbody tr").each(function () {
            var ime = ($('td:eq(0)', this).text()).toLowerCase();
            if (ime.includes(nadji) || nadji == "") {
                $(this).show()
            } else {
                $(this).hide()
            }
        });
    });
	$("#pol").keyup(function () {
        var nadji = ($('#pol').val()).toLowerCase();
        $("#table tbody tr").each(function () {
            var polovi = ($('td:eq(3)', this).text()).toLowerCase();
            if (polovi.includes(nadji) || nadji == "") {
                $(this).show()
            } else {
                $(this).hide()
            }
        });
    });
    $("#pol").keydown(function () {
        var nadji = ($('#pol').val()).toLowerCase();
        $("#table tbody tr").each(function () {
            var polovi = ($('td:eq(3)', this).text()).toLowerCase();
            if (polovi.includes(nadji) || nadji == "") {
                $(this).show()
            } else {
                $(this).hide()
            }
        });
    });
	$("#uloga").keyup(function () {
        var nadji = ($('#uloga').val()).toLowerCase();
        $("#table tbody tr").each(function () {
            var uloge = ($('td:eq(4)', this).text()).toLowerCase();
            if (uloge.includes(nadji) || nadji == "") {
                $(this).show()
            } else {
                $(this).hide()
            }
        });
    });
    $("#uloga").keydown(function () {
        var nadji = ($('#uloga').val()).toLowerCase();
        $("#table tbody tr").each(function () {
            var uloge = ($('td:eq(4)', this).text()).toLowerCase();
            if (uloge.includes(nadji) || nadji == "") {
                $(this).show()
            } else {
                $(this).hide()
            }
        });
    });
}

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
	$("#txtUsername").keyup(function () {
				if (("#txtUsername").val()=="")
					$(this).addClass(`alert-danger`);
				else
					$(this).removeClass(`alert-danger`);
			});
				$("#txtIme").keyup(function () {
				if (!validateString($("#txtIme").val()))
					$(this).addClass(`alert-danger`);
				else
					$(this).removeClass(`alert-danger`);
			});
				$("#txtPrezime").keyup(function () {
				if (!validateString($("#txtPrezime").val()))
					$(this).addClass(`alert-danger`);
				else
					$(this).removeClass(`alert-danger`);
			});
	 $("#btnRegister").click(function () {
		 var korisnickoIme = $("#txtUsername").val();
			var lozinka = $("#txtPassword").val();
			var potvrdaLozinke = $("#txtPasswordConfirmation").val();
			var ime = $("#txtIme").val();
			var prezime = $("#txtPrezime").val();
			var pol = $("input:radio[name=pol]:checked").val();
			
			if(korisnickoIme.trim() != '' && lozinka.trim() != '' && potvrdaLozinke.trim() != '' && validateString(ime) && validateString(prezime)){
				if(lozinka != potvrdaLozinke) {
					$("#greskaLozinka").removeClass('hidden');
					$("#greskaLozinka").addClass('alert-danger');					
					$("#upozorenje").addClass('hidden');
					$("#txtPassword").focus();
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
			 if (korisnickoIme.trim()=="") {
						$("#upozorenje").removeClass(`hidden`);
						$("#upozorenje").addClass(`alert-danger`);
						$("#greskaLozinka").addClass(`hidden`);
						$("#upozorenje").html(`<td colspan="2"><strong>Greska!</strong>Popunite korisnicko ime.</td>`);
						$("#txtUsername").focus();
					}
			 else if (!validateString(ime)) {
						$("#upozorenje").removeClass(`hidden`);
						$("#upozorenje").addClass(`alert-danger`);
						$("#greskaLozinka").addClass(`hidden`);
						$("#upozorenje").html(`<td colspan="2"><strong>Greska!</strong> Ime moze sadrzati samo slova.</td>`);
						$("#txtIme").focus();
					}
			else if (!validateString(prezime)) {
						$("#upozorenje").removeClass(`hidden`);
						$("#upozorenje").addClass(`alert-danger`);
						$("#greskaLozinka").addClass(`hidden`);
						$("#upozorenje").html(`<td colspan="2"><strong>Greska!</strong>Prezime moze sadrzati samo slova.</td>`);
						$("#txtPrezime").focus();
					}}
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

let ispisiPodatkeGost = function(korisnik) {
	var pol = '';
	if(korisnik.pol == 'zenski') {
		pol = 'Zenski';
	} else {
		pol = 'Muski';
	}
	 $("#prikazPodataka2").html(`<table class="table table-bordered">
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
    $("#prikazPodataka2").html(`<table class="table table-bordered">
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
	$("#txtIme").keyup(function () {
				if (!validateString($("#txtIme").val()))
					$(this).addClass(`alert-danger`);
				else
					$(this).removeClass(`alert-danger`);
			});
				$("#txtPrezime").keyup(function () {
				if (!validateString($("#txtPrezime").val()))
					$(this).addClass(`alert-danger`);
				else
					$(this).removeClass(`alert-danger`);
			});
    $("#btnIzmijeniPodatke").click(function () {
		var ime = $("#txtIme").val();
		var prezime = $("#txtPrezime").val();
		var pol = $("input:radio[name=pol]:checked").val();
		
		if(validateString(ime) && validateString(prezime)){
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
		}  else{
			  if (!validateString(ime)) {
						$("#upozorenje").removeClass(`hidden`);
						$("#upozorenje").addClass(`alert-danger`);
						$("#greskaLozinka").addClass(`hidden`);
						$("#upozorenje").html(`<td colspan="2"><strong>Greska!</strong> Ime moze sadrzati samo slova.</td>`);
						$("#txtIme").focus();
					}
			else if (!validateString(prezime)) {
						$("#upozorenje").removeClass(`hidden`);
						$("#upozorenje").addClass(`alert-danger`);
						$("#greskaLozinka").addClass(`hidden`);
						$("#upozorenje").html(`<td colspan="2"><strong>Greska!</strong>Prezime moze sadrzati samo slova.</td>`);
						$("#txtPrezime").focus();
					}
					}
	});
    
};

let izmijeniPodatke1 = function (korisnik) {
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
$("#txtIme").keyup(function () {
				if (!validateString($("#txtIme").val()))
					$(this).addClass(`alert-danger`);
				else
					$(this).removeClass(`alert-danger`);
			});
				$("#txtPrezime").keyup(function () {
				if (!validateString($("#txtPrezime").val()))
					$(this).addClass(`alert-danger`);
				else
					$(this).removeClass(`alert-danger`);
			});
    $("#btnIzmijeniPodatke").click(function () {
		var ime = $("#txtIme").val();
		var prezime = $("#txtPrezime").val();
		var pol = $("input:radio[name=pol]:checked").val();
		
		

if(validateString(ime) && validateString(prezime)){
			$("#upozorenje").addClass('hidden');
			$.post({
				url: '../rest/izmjenaPodataka',
				data: JSON.stringify({korisnickoIme: korisnik.korisnickoIme, lozinka: korisnik.lozinka, ime: ime, prezime : prezime, pol : pol}),
				contentType: 'application/json',
				success: function() {
					alert("Uspjesno ste izmijenili podatke");
					location.href = "Admin.html";
				},
				error: function(message) {
					$("#upozorenje").removeClass('hidden');
					$("#upozorenje").addClass('alert-danger');
				}
		});
		}else{
			  if (!validateString(ime)) {
						$("#upozorenje").removeClass(`hidden`);
						$("#upozorenje").addClass(`alert-danger`);
						$("#greskaLozinka").addClass(`hidden`);
						$("#upozorenje").html(`<td colspan="2"><strong>Greska!</strong> Ime moze sadrzati samo slova.</td>`);
						$("#txtIme").focus();
					}
			else if (!validateString(prezime)) {
						$("#upozorenje").removeClass(`hidden`);
						$("#upozorenje").addClass(`alert-danger`);
						$("#greskaLozinka").addClass(`hidden`);
						$("#upozorenje").html(`<td colspan="2"><strong>Greska!</strong>Prezime moze sadrzati samo slova.</td>`);
						$("#txtPrezime").focus();
					}
					}
	});
    
};

let izmijeniPodatke2 = function (korisnik) {
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
$("#txtIme").keyup(function () {
				if (!validateString($("#txtIme").val()))
					$(this).addClass(`alert-danger`);
				else
					$(this).removeClass(`alert-danger`);
			});
				$("#txtPrezime").keyup(function () {
				if (!validateString($("#txtPrezime").val()))
					$(this).addClass(`alert-danger`);
				else
					$(this).removeClass(`alert-danger`);
			});
			
    $("#btnIzmijeniPodatke").click(function () {
		var ime = $("#txtIme").val();
		var prezime = $("#txtPrezime").val();
		var pol = $("input:radio[name=pol]:checked").val();
		
		

		if(validateString(ime) && validateString(prezime)){
			$("#upozorenje").addClass('hidden');
			$.post({
				url: '../rest/izmjenaPodataka',
				data: JSON.stringify({korisnickoIme: korisnik.korisnickoIme, lozinka: korisnik.lozinka, ime: ime, prezime : prezime, pol : pol}),
				contentType: 'application/json',
				success: function() {
					alert("Uspjesno ste izmijenili podatke");
					location.href = "Domacin.html";
				},
				error: function(message) {
					$("#upozorenje").removeClass('hidden');
					$("#upozorenje").addClass('alert-danger');
				}
		});
		} else{
			  if (!validateString(ime)) {
						$("#upozorenje").removeClass(`hidden`);
						$("#upozorenje").addClass(`alert-danger`);
						$("#greskaLozinka").addClass(`hidden`);
						$("#upozorenje").html(`<td colspan="2"><strong>Greska!</strong> Ime moze sadrzati samo slova.</td>`);
						$("#txtIme").focus();
					}
			else if (!validateString(prezime)) {
						$("#upozorenje").removeClass(`hidden`);
						$("#upozorenje").addClass(`alert-danger`);
						$("#greskaLozinka").addClass(`hidden`);
						$("#upozorenje").html(`<td colspan="2"><strong>Greska!</strong>Prezime moze sadrzati samo slova.</td>`);
						$("#txtPrezime").focus();
					}
					}
	});
    
};



let izmijeniSifru = function (korisnik) {
    $("#prikazPodataka2").html(`<table class="table table-bordered">
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

let izmijeniSifru1 = function (korisnik) {
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
					location.href = "Admin.html";
				},
				error: function(message) {
					$("#upozorenje").removeClass('hidden');
					$("#upozorenje").addClass('alert-danger');
				}
		});}
    });
};

let izmijeniSifru2 = function (korisnik) {
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
					location.href = "Domacin.html";
				},
				error: function(message) {
					$("#upozorenje").removeClass('hidden');
					$("#upozorenje").addClass('alert-danger');
				}
		});}
    });
};

let jsonObjekat;
function reverseGeocode(coords) {
    fetch('https://nominatim.openstreetmap.org/reverse?format=json&lon=' + coords[0] + '&lat=' + coords[1])
        .then(function (response) {
            //alert(response);
            return response.json();
        }).then(function (json) {
        	$("#txtUlica").val(json["address"]["road"]);
        	$("#txtBroj").val(json["address"]["house_number"]);
        	$("#txtGrad").val(json["address"]["city"]);
        	$("#txtPostanskiBroj").val(json["address"]["postcode"]);
        	$("#txtSirina").val(json["lon"]);
        	$("#txtDuzina").val(json["lat"]);
            console.log(json);
            jsonObjekat = json;
        });
};

let pomocna = function () {
    var map = new ol.Map({
        target: 'map',
        layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM()
            })
        ],
        view: new ol.View({
            center: ol.proj.fromLonLat([19.8424, 45.2541]),
            zoom: 15
        })
    });
    map.on('click', function (evt) {
        var coord = ol.proj.toLonLat(evt.coordinate);
        reverseGeocode(coord);
        var iconFeatures = [];
        var lon = coord[0];
        var lat = coord[1];
        
        var icon = "";
        var iconGeometry = new ol.geom.Point(ol.proj.transform([lon, lat], 'EPSG:4326', 'EPSG:3857'));
        var iconFeature = new ol.Feature({
            geometry: iconGeometry
        });
        iconFeatures.push(iconFeature);
        var vectorSource = new ol.source.Vector({
            features: iconFeatures //add an array of features
        });
        var iconStyle = new ol.style.Style({
            image: new ol.style.Icon(/** @type {olx.style.IconOptions} */({
                anchor: [0.5, 46],
                anchorXUnits: 'fraction',
                anchorYUnits: 'pixels',
                opacity: 0.95,
                src: icon
            }))
        });
        var vectorLayer = new ol.layer.Vector({
            source: vectorSource,
            style: iconStyle
        });
        map.addLayer(vectorLayer);
  
    });

};
