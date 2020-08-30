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

			temp+=`<td>`+data[i].domacin+`</td>`;
			temp+=`<td>
		        <input id="btnRez` + data[i].id + `" name = "rezervisi" class="btn btn-primary" type="button" value="Rezervisi"/>
			                	
			                </td></tr>`;
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
		
		$("input:button[name=rezervisi]").click(function () {
			var id = this.id;
			 $.post({
					url:'../rest/slobodniDatumi',
					data : JSON.stringify({id:this.id}),
					contentType: 'application/json',
					success: function(data){
						var temp = '';
					    temp += '<select id="datumi">';
					    for (d2 in data) {
					        temp += '<option value="' + data[d2] +'">' + data[d2] + '</option>';
					    }
						$("#prikazPodataka2").html(`
							    <table class="table table-bordered" style="width: 40%;height: 100px;overflow: auto; margin: 0 auto;">
							        <thead>
							            <tr class="success">
							                <th colspan="2" class = "text-info" style= "text-align:center;">
							                    Kreiranje rezervacije
							                </th>
							            </tr>
							<div class="hidden" id="upozorenje"></div>
							        </thead>
							        <tbody> 
							            <tr>
							                <td>Dostupni datumi:</td>
							                <td>
							                ${temp}
							                </td>
							            </tr>
							            <tr>
							                <td>Unesite ukupan broj nocenja:</td>
							                <td>
							                    <input type="number" id="nocenje" placeholder="Uneste broj nocenja..." />
							                </td>
							            </tr>
							            <tr>
							                <td colspan = "2" style= "text-align:center;">
							                    <input type="button" id="btnKreirajRezervaciju" class = "btn btn-primary" value="Rezervisi" />
							                </td>
							            </tr>`);
						 				$("#btnKreirajRezervaciju").click(function () {
						 					var datum = $("#datumi").val();
						 					var broj = $("#nocenje").val();
						 					if(datum!='' && broj!='') {
						 						$.post({
						 							url:'../rest/rezervisiApartman',
						 							data : JSON.stringify({datum:datum,broj:broj,id:id}),
						 							contentType: 'application/json',
						 							success: function(){
						 								alert("Uspjesno ste kreirali rezervaciju");
						 								location.href = "Gost.html";
						 							},
						 							error: function(message){
						 							$("#upozorenje").removeClass('hidden');
						 							$("#upozorenje").addClass('alert-danger');
						 							$("#upozorenje").html(`<td colspan="2"><strong>Greska!</strong> Nije validan datum.</td>`);
						 							}
						 					});
						 					}
						 				});
						 				
						
					},
					error: function(message){
						alert('Neuspjesno');
					}
				
				});
	    });

};
