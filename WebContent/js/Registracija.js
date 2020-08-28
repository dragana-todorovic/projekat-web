$(document).ready(function() {
	$("#btnRegister").click(function(){
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
			
			$("#upozorenje").removeClass('hidden');
			$("#upozorenje").addClass('alert-danger');
			$("#greskaLozinka").addClass('hidden');
			 $("#upozorenje").html(`<td colspan="2"><strong>Greska!</strong> Sva polja moraju biti popunjena.</td>`);
		}
		
	});
});