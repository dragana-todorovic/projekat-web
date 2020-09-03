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
		        
			    <input id="btnKom` + data[i].id + `" name = "komentar" class="btn btn-primary" type="button" value="Komentarisi"/></br>
			    <input id="btnPrikazi` + data[i].id + `" name = "kom" class="btn btn-primary" type="button" value="Prikazi"/></td>`;
			    temp+=`<td><input id="btnRez` + data[i].id + `" name = "rezervisi" class="btn btn-primary" type="button" value="Rezervisi"/>
			                </td></tr>`;
		}
		$("#prikazPodataka2").html(`
	      <table class="table table-bordered">
	        <thead>
	          <tr>
	            <th colspan="10" class = " success text-info" style="text-align: center;">AKTIVNI APARTKAMI</th>
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
	            <th>Komentar</th>
	            <th></th>
	          
	          </tr>
	        </thead>
	        <tbody id="apartmaniTabela">
	        </tbody>
	      </table>
	    
				`);
	    
		$('#apartmaniTabela').html(temp);
		$("input:button[name=kom]").click(function () {
			 $.post({
					url:'../rest/vratiKomentare1',
					data : JSON.stringify({id:this.id}),
					contentType: 'application/json',
					success: function(data){
						ispisiKomentare(data);
					},
					error: function(message){
						alert('Neuspjesno');
					}
				
				});
		 });
		
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
		$("input:button[name=komentar]").click(function () {
			var id = this.id;
			 $.post({
					url:'../rest/komentarisanje',
					data : JSON.stringify({id:this.id}),
					contentType: 'application/json',
					success: function(){
						ostaviKomentar(id);
					},
					error: function(message){
						alert('Nemate pravo da ostavite komentar.');
					}
				
				});
	    });

};

let ispisiSveAktivneZaNeulogovanog = function(data,pom1) {
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
		        
			    
			    <input id="btnPrikazi` + data[i].id + `" name = "kom" class="btn btn-primary" type="button" value="Prikazi"/></td></tr>`;
		}
		$("#prikazPodataka2").html(`
	      <table class="table table-bordered">
	        <thead>
	          <tr>
	            <th colspan="10" class = " success text-info" style="text-align: center;">AKTIVNI APARTKAMI</th>
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
	            <th>Komentar</th>
	            <th></th>
	          
	          </tr>
	        </thead>
	        <tbody id="apartmaniTabela">
	        </tbody>
	      </table>
	    
				`);
	    
		$('#apartmaniTabela').html(temp);
		$("input:button[name=kom]").click(function () {
			 $.post({
					url:'../rest/vratiKomentare1',
					data : JSON.stringify({id:this.id}),
					contentType: 'application/json',
					success: function(data){
						ispisiKomentare(data);
					},
					error: function(message){
						alert('Neuspjesno');
					}
				
				});
		 });
		
		
};


let ostaviKomentar = function(id) {
	$("#prikazPodataka2").html(`<table class="table table-bordered" style="width: 30%;height: 200px;overflow: auto; margin: 0 auto;"> 
	        <thead>
	            <tr class="success">
	                <th colspan="2">
	                    Komentarisanje
	                </th>
	            </tr>
	        </thead>
	        <tbody>
	            
	            <tr>
	                <td>Ocjena:</td>
	                <td>
	                    <select id="ocjena">
	                        <option value="0" selected>Neocijenjeno</option>
	                        <option value="1">Jedan</option>
	                        <option value="2">Dva</option>
	                        <option value="3">Tri</option>
	                        <option value="4">Cetiri</option>
	                        <option value="5">Pet</option>
	                    </select>
	                </td>
	            </tr>
	            <tr>
	                <td>Komentar:</td>
	                <td>
	                    <textarea type="text" id="txtKom" placeholder="Unesi komentar..." />
	                </td>
	            </tr>
	            
	            <tr class="success">
	                <td colspan="2" style = "text-align:center;">
	                    <input id="btnKomentar" class="btn btn-primary pull-center" type="button" value="Ostavi komentar">                    
	                </td>
	            </tr>
	        </tbody>
	     </table>`
	    );
	 $("#btnKomentar").click(function () {
	        var ocjena = $("#ocjena").val();
	        var tekst = $("#txtKom").val();
	        $.post({
				url:'../rest/ostaviKom',
				data : JSON.stringify({ocjena:ocjena,tekst:tekst,apartman:id}),
				contentType: 'application/json',
				success: function(){
					location.href = "Gost.html";
				},
				error: function(message){
					alert('Neuspjesno dodavanje komentara.');
				}
			
			});
	    });
	
}
let ispisiSveRezervacije = function(data) {
	let temp='';
	   
	
		for (i in data){
			temp+=`<tr><td>`+data[i].pocetniDatum+`</td><td>`+data[i].brojNocenja+`</td><td>`+data[i].ukupnaCijena+`</td><td>`+data[i].status+`</td>`;
			if(data[i].status == 'kreirana' || data[i].status == 'prihvacena') {
			temp+=`<td> <input id="btnOdustanak` + data[i].id + `" name = "odustani" class="btn btn-primary pull-center" type="button"
	                           value="Odustanak" /></td>`; }
			else {
				temp+=`<td></td>`;
			}
			temp+=`</tr>`;
		}
		
		$("#prikazPodataka2").html(`
	      <table class="table table-bordered">
	        <thead>
	          <tr>
	            <th colspan="4" class = " success text-info" style="text-align: center;">MOJE REZERVACIJE</th>
	          </tr>
	          <tr class="text-info success">
	            <th>Pocetni datum</th>
	            <th>Broj nocenja</th>
	            <th>Ukupna cijena</th>
	            <th>Status</th>	            
	          
	          </tr>
	        </thead>
	        <tbody id="rezervacijeTabela">
	        </tbody>
	      </table>
	    
				`);
	    
		$('#rezervacijeTabela').html(temp);
		$("input:button[name=odustani]").click(function () {
		 $.post({
				url:'../rest/odustani',
				data : JSON.stringify({id:this.id}),
				contentType: 'application/json',
				success: function(data){
					alert('Uspjesno');
					location.href = "Gost.html";
				},
				error: function(message){
					alert('Neuspjesno');
				}
			
			});
	 });
		
	

};

let ispisiKomentare = function(data) {
	let temp='';
	
		for (i in data){
			let pom ='';
			if(data[i].ocjena == "0") {
				pom = "Neocijenjeno";
			} else if (data[i].ocjena == "1") {
				pom = "Jedan";
			} else if( data[i].ocjena == "2") {
				pom = "Dva";
			} else if( data[i].ocjena == "3") {
				pom = "Tri";
			} else if( data[i].ocjena == "4") {
				pom = "Cetiri";
			} else {
				pom = "Pet";
			}
			temp+=`<tr><td>`+data[i].gost+`</td><td>`+pom+`</td><td>`+data[i].tekst+`</td>`;
			temp+=`</tr>`;
		}
		$("#prikazPodataka2").html(`<table class="table table-bordered center"  style="width: 60%;height: 500px;overflow: auto; margin: 0 auto;">
        <thead>
        <tr>
          <th colspan="3" class = " success text-info" style="text-align: center;">KOMENTARI</th>
        </tr>
        <tr class="text-info success">
          <th>Gost</th>
          <th>Ocjena</th>
          <th>Tekst</th>         
        
        </tr>
      </thead>
      <tbody id="komentariTabela">
      </tbody>
    </table>
  
			`);
		$('#komentariTabela').html(temp);
};


