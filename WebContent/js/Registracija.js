$(document).ready(function() {
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
	$("#btnRegister").click(function(){
		var korisnickoIme = $("#txtUsername").val();
		var lozinka = $("#txtPassword").val();
		var potvrdaLozinke = $("#txtPasswordConfirmation").val();
		var ime = $("#txtIme").val();
		var prezime = $("#txtPrezime").val();
		var pol = $("input:radio[name=pol]:checked").val();
		
		if(validateString(korisnickoIme) && lozinka.trim() != '' && potvrdaLozinke.trim() != '' && validateString(ime) && validateString(prezime)){
			if(lozinka != potvrdaLozinke) {			
				$("#greskaLozinka").removeClass('hidden');
				$("#greskaLozinka").addClass('alert-danger');
				$("#upozorenje").addClass('hidden');
				$("#txtPassword").focus();
			}
			 else {
				$("#upozorenje").addClass('hidden');
				$("#greskaLozinka").addClass('hidden');
				$.post({
					url: '../rest/registracija',
					data: JSON.stringify({korisnickoIme: korisnickoIme, lozinka: lozinka, ime: ime, prezime : prezime, pol : pol}),
					contentType: 'application/json',
					success: function() {
						alert("Uspjesno ste se registrovali");
						location.href = "../LogIn.html";
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
					}
				
			
			
		}
		
	});
});