$(document).ready(function() {
$("#btnLogin").click(function(){
var korisnickoIme = $("#txtUsername").val();
var lozinka = $("#txtPassword").val();
var pom = JSON.stringify({korisnickoIme: korisnickoIme, lozinka: lozinka});
if(korisnickoIme.trim() != '' && lozinka.trim() != ''){
$("#upozorenje").addClass('hidden');
$.post({
url: 'rest/logovanje',
data: pom,
contentType: 'application/json',
success: function(data) {
if(data.uloga == 'gost'){
	window.location.href = "html/Gost.html";}
 if(data.uloga == 'administartor'){
	window.location.href = "html/Admin.html";
}
 if(data.uloga == 'domacin'){
	window.location.href = "html/Domacin.html";
}

},
error: function(message) {
$("#upozorenje").removeClass('hidden');
$("#upozorenje").addClass('alert-danger');
$("#upozorenje").html('<td colspan="2"><strong>Greska!</strong> Korisnik sa datim korisnickim imenom i lozinkom ne postoji.</td>');

}
});

}
else{

$("#upozorenje").removeClass('hidden');
$("#upozorenje").addClass('alert-danger');
$("#upozorenje").html('<td colspan="2"><strong>Greska!</strong> Sva polja moraju biti popunjena.</td>');
}

});
$("#btnPregled").click(function () {
	location.href = "html/Pregled.html";
});
});
