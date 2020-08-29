let preuzmiSadrzaj = function(a) {
	
	let temp='';
	for (i in a){
		temp+=`<tr><td>`+a[i].id+`</td><td>`+a[i].naziv+`</td>`;
		temp+=`<td style="width: 20%" style = "text-align:center;">
        <input name="izmijeni" id="btnIzmijeni` + a[i].id + `" name = "izmijeni" class="btn btn-primary" type="button" value="Izmijeni sadrzaj"></br>
	                    <input id="btnObrisi` + a[i].id + `" name = "obrisi" class="btn btn-primary pull-center" type="button"
	                           value="Obrisi sadrzaj" />
	                	
	                </td></tr>`;
	}
	$("#prikazPodataka").html(`
			<div style="width: 80%;height: 500px;overflow: auto; margin: 0 auto;">
			 <input id="btnDodaj" class="btn btn-primary pull-center" type="button"
                           value="Dodaj sadrzaj" />
      <table class="table table-bordered">
        <thead>
          <tr>
            <th colspan="2" class = " success text-info" style="text-align: center;">SADRZAJ</th>
          </tr>
          <tr class="text-info success">
            <th>Id</th>
            <th>Naziv</th>
          
          </tr>
        </thead>
        <tbody id="sadrzajTabela">
        </tbody>
      </table>
    </div>
			`);
	$('#sadrzajTabela').html(temp);
	
	 $("#btnDodaj").click(function () {
		 dodajSadrzaj();
	 });

	 $("input:button[name=obrisi]").click(function () {
		 $.post({
				url:'../rest/obrisiSadrzaj',
				data : JSON.stringify({id:this.id}),
				contentType: 'application/json',
				success: function(){
					alert("Uspjesno ste obrisali sadrzaj");
					location.href = "Admin.html";
				},
				error: function(message){
					alert('Neuspjesno');
				}
			
			});
	 });
	 $("input:button[name=izmijeni]").click(function () {
		 $.post({
				url:'../rest/preuzmiSadrzajPoId',
				data : JSON.stringify({id:this.id}),
				contentType: 'application/json',
				success: function(a){
					izmijeniSadrzaj(a);
				},
				error: function(message){
					alert('Neuspjesno');
				}
			
			});
	 });
	
}

let izmijeniSadrzaj = function(data) {
	$("#prikazPodataka").html(`
	<div style="width: 60%;height: 500px;overflow: auto; margin: 0 auto;">
	<table class="table table-bordered">
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
	                <td>Naziv:</td>
	                <td>
	                    <input type="text" id="txtNaziv" value="`+ ((data.naziv != null) ? data.naziv:``) + `"/>
	                </td>
	            </tr>
	            <tr class="success">
	                <td colspan="2" style = "text-align:center;">
	                    <input id="btnIzmijeni" class="btn btn-primary pull-center" type="button"
	                           value="Izmijeni podatke" />
	                </td>
	            </tr>
	        </tbody>
	    </table></div>`);
	$('#btnIzmijeni').click(function() {
		var naziv = $('#txtNaziv').val();
		if( naziv.trim() != '' ){
			$.post({
				url:'../rest/izmijeniSadrzaj',
				data : JSON.stringify({id:data.id,naziv:naziv}),
				contentType: 'application/json',
				success: function(){
					alert("Uspjesno ste izmijenili sadrzaj");
					location.href = "Admin.html";
				},
				error: function(message){
					alert('neuspjesno');
				}
			
			});
		}
		});
		
}

let dodajSadrzaj = function() {
	$("#prikazPodataka").html(`
			<div style="width: 60%;height: 500px;overflow: auto; margin: 0 auto;">
			<table class="table table-bordered">
			        <thead>
			             <tr class="success">
			                <th colspan="2" class = "text-info" style= "text-align:center;"  >
			                    DODAVANJE SADRZAJA
			                </th>
			            </tr>
			        </thead>
			        <tbody>
			        	 <tr id="upozorenje" class="hidden">
			                <td colspan="2"><strong>Greska!</strong></td>
			            </tr>
			              <tr>
			                <td>Naziv:</td>
			                <td>
			                    <input type="text" name="txtNaziv" id="txtNaziv" placeholder="Naziv..." />
			                </td>
			            </tr>
			  
			            <tr class="success">
			                <td colspan="2" style = "text-align:center;">
			                    <input id="btnDodaj" class="btn btn-primary pull-center" type="button"
			                           value="Dodaj sadrzaj" />
			                </td>
			            </tr>
			        </tbody>
			    </table></div>`);
	
				$('#btnDodaj').click(function() {
					var naziv = $('#txtNaziv').val();
					if( naziv.trim() != '' ){
						$.post({
							url:'../rest/dodajSadrzaj',
							data : JSON.stringify({naziv:naziv}),
							contentType: 'application/json',
							success: function(){
								alert("Uspjesno ste dodali sadrzaj");
								location.href = "Admin.html";
							},
							error: function(message){
							$("#upozorenje").removeClass('hidden');
							$("#upozorenje").addClass('alert-danger');
							$("#upozorenje").html(`<td colspan="2"><strong>Greska!</strong> Vec postoji sadrzaj sa tim nazivom.</td>`);
							}
						
						});
					} else {
						$("#upozorenje").removeClass('hidden');
						$("#upozorenje").addClass('alert-danger');
						$("#upozorenje").html(`<td colspan="2"><strong>Greska!</strong> Sva polja moraju biti popunjena.</td>`);
					}
				})
}

let ispisiSveApartmane = function(data,pom1) {
	let temp='';
   /* var t = ``;
    for (ap2 in pom1) {
        t += (`<input type="checkbox" id="${pom1[ap2].id}" name="sadrzaj" value="${pom1[ap2].naziv}">${pom1[ap2].naziv}</input></br>`);
    }
*/
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
	        temp += (`<td>`+data[i].domacin+`</td><td>`+data[i].status+`</td>`);

		temp+=`<td colspan="2" style = "text-align:center;">
         <input name="izmijeni" id="btnIzmijeni` + data[i].id + `" name = "izmijeni" class="btn btn-primary" type="button" value="Izmijeni apartman"></br>
	                    <input id="btnObrisi` + data[i].id + `" name = "obrisi" class="btn btn-primary pull-center" type="button"
	                           value="Obrisi apartman" />
	                </td></tr>`;
	}
	$("#prikazPodataka").html(`
      <table class="table table-bordered">
        <thead>
          <tr>
            <th colspan="10" class = " success text-info" style="text-align: center;">APARTMANI</th>
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
            <th>Status</th>
          
          </tr>
        </thead>
        <tbody id="apartmaniTabela">
        </tbody>
      </table>
    
			`);
    
	$('#apartmaniTabela').html(temp);
	$("input:button[name=obrisi]").click(function () {
		 $.post({
				url:'../rest/obrisiApartman1',
				data : JSON.stringify({id:this.id}),
				contentType: 'application/json',
				success: function(){
					alert("Uspjesno ste obrisali apartman");
					location.href = "Admin.html";
				},
				error: function(message){
					alert('Neuspjesno');
				}
			
			});
	 });
 $("input:button[name=izmijeni]").click(function () {
		 $.post({
				url:'../rest/preuzmiApartmanPoId1',
				data : JSON.stringify({id:this.id}),
				contentType: 'application/json',
				success: function(a){
					 $.post({
						url:'../rest/postojeciSadrzaj1',
						data : JSON.stringify({id:a.id}),
						contentType: 'application/json',
						success: function(data){
								$.post({
									url:'../rest/nepostojeciSadrzaj1',
									data : JSON.stringify({id:a.id}),
									contentType: 'application/json',
							success: function(dataa){
										izmijeniApartman(a,data,dataa);
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
let izmijeniApartman = function(data,data1,data2) {
	var postojeci = data1;
    var nepostojeci = data2;
    var temp = ``;
    for (ap in postojeci) {
        temp += (`<input type="checkbox" id="${postojeci[ap].id}" name="sadrzaj" value="${postojeci[ap].id}" checked>${postojeci[ap].naziv}</br>`);
    }
    for (ap in nepostojeci) {
        temp += (`<input type="checkbox" id="${nepostojeci[ap].id}"  name="sadrzaj" value="${nepostojeci[ap].id}">${nepostojeci[ap].naziv}</input></br>`);
    }

	var tip = ``;
    if (data.tip == "soba") {
        tip = `<input type="radio"  name="tip" value="0"> Cijeli apartman
               <input type="radio"  name="tip" value="1" checked="checked"> Soba`;
    } else {
        tip = `<input type="radio"  name="tip" value="0" checked="checked"> Cijeli apartman
               <input type="radio"  name="tip" value="1"> Soba`;
    }
	var status = ``;
    if (data.status == "neaktivno") {
        status = `<input type="radio"  name="status" value="0"> Aktivno
               <input type="radio"  name="status" value="1" checked="checked"> Neaktivno`;
    } else {
        status = `<input type="radio"  name="status" value="0" checked="checked"> Aktivno 
               <input type="radio"  name="status" value="1"> Neaktivno`;
    }
$("#prikazPodataka").html(`
<table class="table table-bordered" style="width:30%;height:500px;float:left;">
        <thead>
             <tr class = "border border-white">
                <th colspan="2" class = "text-info" style= "text-align:center;"  >
                    IZMIJENA APARTMANA
                </th>
            </tr>
        </thead>
        <tbody>
        	 <tr id="upozorenje" class="hidden">
                <td colspan="2"><strong>Greska!</strong></td>
            </tr>
  				<tr>
                <td>Tip:</td>
                <td>`
                  + tip +
                `</td>
            </tr>
            <tr>
                <td>Broj soba:</td>
                <td>
                    <input type="number" name="txtBrojSoba" id="txtBrojSoba" value="`+ ((data.brojSoba != null) ? data.brojSoba:`-`) + `"/>
                </td>
            </tr>
              <tr>
                <td>Broj gostiju:</td>
                <td>
                    <input type="number" name="txtBrojGostiju" id="txtBrojGostiju" value="`+ ((data.brojGostiju != null) ? data.brojGostiju:`-`) + `" />
                </td>
            </tr>
  <tr><td>Izaberite dostupne datume:</td>
<td class="container">
	<input type="text" class="form-control date"  id="date" value="`+ ((data.datumZaIzdavanje != null) ? data.datumZaIzdavanje:`-`) + `">
            </td>
            </tr>
   <tr>
                <td>Cijena po noci:</td>
                <td>
                    <input type="number" name="txtCijena" id="txtCijena" value="`+ ((data.cijenaPoNoci != null) ? data.cijenaPoNoci:`-`) + `" />
                </td>
            </tr>
   <tr>
                <td>Ulica:</td>
                <td>
                    <input type="text" name="txtUlica" id="txtUlica" value="`+ ((data.lokacija.adresa.ulica != null) ? data.lokacija.adresa.ulica:`-`) + `" />
                </td>
            </tr>
   <tr>
                <td>Broj:</td>
                <td>
                    <input type="text" name="txtBroj" id="txtBroj" value="`+ ((data.lokacija.adresa.broj != null) ? data.lokacija.adresa.broj:`-`) + `" />
                </td>
            </tr>
   <tr>
                <td>Grad:</td>
                <td>
                    <input type="text" name="txtGrad" id="txtGrad" value="`+ ((data.lokacija.adresa.nasljenoMjesto != null) ? data.lokacija.adresa.nasljenoMjesto:`-`) + `" />
                </td>
            </tr>
   <tr>
                <td>Postanski broj:</td>
                <td>
                    <input type="text" name="txtPostanskiBroj" id="txtPostanskiBroj" value="`+ ((data.lokacija.adresa.pozivniBrojMjesta != null) ? data.lokacija.adresa.pozivniBrojMjesta:`-`) + `" />
                </td>
            </tr>
   <tr>
                <td>Geografska sirina:</td>
                <td>
                    <input type="text" name="txtSirina" id="txtSirina" value="`+ ((data.lokacija.geografskaSirina != null) ? data.lokacija.geografskaSirina:`-`) + `" />
                </td>
            </tr>
   <tr>
                <td>Geografska duzina:</td>
                <td>
                    <input type="text" name="txtDuzina" id="txtDuzina" value="`+ ((data.lokacija.geografskaDuzina != null) ? data.lokacija.geografskaDuzina:`-`) + `" />
                </td>
            </tr>
     <tr>
                <td>Vrijeme za prijavu:</td>
                <td>
                    <input type="time" name="vrijemeZaPrijavu" id="vrijemeZaPrijavu"  value="`+((data.vrijemeZaPrijavu != null) ? data.vrijemeZaPrijavu:`-`) + `"/>
                </td>
            </tr>
     <tr>
                <td>Vrijeme za odjavu:</td>
                <td>
                    <input type="time" name="vrijemeZaOdjavu" id="vrijemeZaOdjavu" value="`+((data.vrijemeZaOdjavu != null) ? data.vrijemeZaOdjavu:`-`) + `"  />
                </td>
            </tr>
<tr>
<td>Izaberite sadrzaj</td>
<td>${temp}</td>
</tr>
		<tr>
                <td>Status:</td>
                <td>`
                  + status +
                `</td>
            </tr>
            <tr class="success">
                <td colspan="2" style = "text-align:center;">
                    <input id="btnIzmijeni" class="btn btn-primary pull-center" type="button"
                           value="Izmijeni apartman" />
                </td>
            </tr>
        </tbody>
    </table>

<button id="kreiranje" style="float:left;" class="btn btn-primary">Uzmi lokaciju sa mape</button>
        <div id="map" class="map" style="width:70%;padding:-400px 0px 0px 0px;float:right;"></div>`);
pomocna();
$('.date').datepicker({
        multidate: true,
        format: 'dd-mm-yyyy'
    });
    $("#date").datepicker({
        multidate: true,
        format: 'dd-mm-yyyy'
    });
   
$('#btnIzmijeni').click(function() {
		var sadrzaj = ``;
        $('input[name="sadrzaj"]:checked').each(function () {
            sadrzaj += ($(this).val()) + ",";
        });		
		var brojSoba = $("#txtBrojSoba").val();
		var brojGostiju = $("#txtBrojGostiju").val();
		var datumZaIzdavanje = $("#date").val();
		var cijenaPoNoci = $("#txtCijena").val();
		var tip= $("input:radio[name=tip]:checked").val();
		var status= $("input:radio[name=status]:checked").val();
		var vrijemeZaOdjavu = $("#vrijemeZaOdjavu").val();
		var vrijemeZaPrijavu = $("#vrijemeZaPrijavu").val();
		var ulica = $("#txtUlica").val();
		var postanskiBroj = $("#txtPostanskiBroj").val();
		var broj = $("#txtBroj").val();
		var grad = $("#txtGrad").val();
		var duzina = $("#txtDuzina").val();
		var sirina= $("#txtSirina").val();
		$('.date').datepicker({
            multidate: true,
            format: 'dd/mm/yyyy'
        });
		if( ulica.trim()!='' && broj.trim()!='' && grad.trim()!='' && postanskiBroj.trim()!='' && duzina.trim()!='' && sirina.trim()!='' && brojSoba.trim() != '' && brojGostiju.trim() != '' && cijenaPoNoci.trim() != '' && datumZaIzdavanje.trim()!=''){
			$.post({
			url:'../rest/izmijeniApartman1',
			data : JSON.stringify({id:data.id,ulica:ulica,broj:broj,nasljenoMjesto:grad,pozivniBrojMjesta:postanskiBroj,geografskaSirina:sirina,geografskaDuzina:duzina,tip:tip,brojSoba:brojSoba,brojGostiju:brojGostiju,domacin:data.domacin,cijenaPoNoci:cijenaPoNoci,vrijemeZaPrijavu:vrijemeZaPrijavu,vrijemeZaOdjavu:vrijemeZaOdjavu,sadrzajApartmana:sadrzaj,datumiZaIzdavanje:datumZaIzdavanje,status:status}),
			contentType: 'application/json',
			success: function(){
			alert("Uspjesno ste izmijenili apartman");
			location.href = "Admin.html";
		},
			error: function(message){
			$("#upozorenje").removeClass('hidden');
			$("#upozorenje").addClass('alert-danger');
			$("#upozorenje").html(`<td colspan="2"><strong>Greska!</strong> Sva polja moraju biti popunjena.</td>`);
			}
		
		});
		}else{
			$("#upozorenje").removeClass('hidden');
			$("#upozorenje").addClass('alert-danger');
			$("#upozorenje").html(`<td colspan="2"><strong>Greska!</strong> Sva polja moraju biti popunjena.</td>`);
		}
			});
			
}

		