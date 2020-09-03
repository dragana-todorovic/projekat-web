$(document).ready(function() {
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
	$.get({
			url:'../rest/vratiSveAktivne',
			contentType: 'application/json',
			success: function(data) {
				ispisiSveAktivneZaNeulogovanog(data,pom);
			},
			error: function() {
			}
		});
	$("#vrati").click(function(){
		location.href = "../LogIn.html";
	});
});