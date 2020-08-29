let ispisiSveAktivne = function(data,pom1) {
	let temp='';
	    var t = ``;
	    for (ap2 in pom1) {
	        t += (`<input type="checkbox" id="${pom1[ap2].id}" name="sadrzaj" value="${pom1[ap2].naziv}">${pom1[ap2].naziv}</input></br>`);
	    }
	
		for (i in data){
			var pom = [];
	        for (p in data[i].sadrzajApartmana) {
	            pom[p] = "Naziv:" + data[i].sadrzajApartmana[p].naziv + "\n";
	        }
			temp+=`<tr><td>`+data[i].tip+`</td><td>`+data[i].brojSoba+`</td><td>`+data[i].brojGostiju+`</td><td>`+data[i].cijenaPoNoci+`</td><td>`+data[i].vrijemeZaPrijavu+`</td><td>`+data[i].vrijemeZaOdjavu+`</td>`;
			temp += (`<td>${pom}</td>`);
			 var lok = ``;
		        if (data[i].lokacija.adresa.ulica != null) {
		            lok += data[i].lokacija.adresa.ulica;
		            lok += ` `;
		        }
		        if (data[i].lokacija.adresa.ulica != null && data[i].lokacija.adresa.broj != null) {
		            lok += data[i].lokacija.adresa.broj;
		            lok += `<br> `;
		        }
		        if (data[i].lokacija.adresa.nasljenoMjesto != null) {
		            lok += data[i].lokacija.adresa.nasljenoMjesto;
		            lok += ` `;
		        }
		        if (data[i].lokacija.adresa.pozivniBrojMjesta != null) {
		            lok += data[i].lokacija.adresa.pozivniBrojMjesta;
		        }
		        temp += (`<td>${(lok.trim() != ``) ? lok : `-`}</td>`);
		        lok = ``;

			temp+=`<td>`+data[i].domacin+`</td></tr>`;
		}
		$("#prikazPodataka2").html(`
	      <table class="table table-bordered">
	        <thead>
	          <tr>
	            <th colspan="9" class = " success text-info" style="text-align: center;">AKTIVNI APARTKAMI</th>
	          </tr>
	          <tr class="text-info success">
	            <th>Tip</th>
	            <th>Broj soba</th>
	            <th>Broj gostiju</th>
	            <th>Cijena po noci</th>
	            <th>Vrijeme za prijavu</th>
	            <th>Vrijeme za odjavu</th>
	            <th>Lista sadrzaja</th>
	            <th>Lokacija</th>
	            <th>Domacin</th>
	          
	          </tr>
	        </thead>
	        <tbody id="apartmaniTabela">
	        </tbody>
	      </table>
	    
				`);
	    
		$('#apartmaniTabela').html(temp);

};