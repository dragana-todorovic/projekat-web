let ispisiSveRezervacije = function(data) {
	let temp='';
	   
	
		for (i in data){
			temp+=`<tr><td>`+data[i].gost+`</td><td>`+data[i].pocetniDatum+`</td><td>`+data[i].brojNocenja+`</td><td>`+data[i].ukupnaCijena+`</td><td class="col1">`+data[i].status+`</td><td>`+data[i].poruka+`</td>`;
			
			temp+=`</tr>`;
		}
		
		$("#prikazPodataka").html(`
		</br>
		<div> <b>Filtriraj po statusu:&nbsp;&nbsp;</b><select id="filterStatus">
         <option value="Bez naznake" selected>Bez naznake</option>
         <option value="kreirana">kreirana</option>
         <option value="prihvacena">prihvacena</option>
		 <option value="odustanak">odustanak</option>
	     <option value="odbijena">odbijena</option>
    </select>
    </div><br>

	      <table class="table table-bordered" id="table">
	        <thead>
	          <tr>
	            <th colspan="6" class = " success text-info" style="text-align: center;">REZERVACIJE</th>
	          </tr>
	<tr>
			<th   colspan="6" class = " success text-info">Pretrazivanje po korisnickom imenu gosta:<input type="text" min="0" id="gost" style="width:10%"/></th>
			
			</tr>
			
	          <tr class="text-info success">
				<th>Gost</th>
	            <th>Pocetni datum</th>
	            <th>Broj nocenja</th>
	            <th class="success" style="text-align:center" name="sortiraj">UkupnaCijena<span name="strelica" class="glyphicon glyphicon-arrow-down"/></th>
	            <th>Status</th>	            
	          <th>Poruka</th>	 
	          </tr>
	        </thead>
	        <tbody id="rezervacijeTabela">
	        </tbody>
	      </table>
	    
				`);
	    
		$('#rezervacijeTabela').html(temp);	
		$("#filterStatus").change(function () { //filter po tipu ap
	
        if ($(this).val() == "Bez naznake") {
            $("#table td.col1").parent().show();
        } else if ($(this).val() == "kreirana") {
            $("#table td.col1:not(:contains('" + $(this).val() + "'))").parent().hide();
            $("#table td.col1:contains('" + $(this).val() + "')").parent().show();
        }else if ($(this).val() == "odbijena") {
            $("#table td.col1:not(:contains('" + $(this).val() + "'))").parent().hide();
            $("#table td.col1:contains('" + $(this).val() + "')").parent().show();
        }
		else if ($(this).val() == "prihvacena") {
            $("#table td.col1:not(:contains('" + $(this).val() + "'))").parent().hide();
            $("#table td.col1:contains('" + $(this).val() + "')").parent().show();
        }
        else {
            $("#table td.col1:not(:contains('" + $(this).val() + "'))").parent().hide();
            $("#table td.col1:contains('" + $(this).val() + "')").parent().show();
        }
});
		$("th[name=sortiraj]").click(function () {
        if ($(this.getElementsByTagName("span")).attr(`class`) == "glyphicon glyphicon-arrow-down") {
            $(this.getElementsByTagName("span")).removeClass("glyphicon glyphicon-arrow-down");
            $(this.getElementsByTagName("span")).toggleClass("glyphicon glyphicon-arrow-up");
        } else {
            $(this.getElementsByTagName("span")).removeClass("glyphicon glyphicon-up-down");
            $(this.getElementsByTagName("span")).toggleClass("glyphicon glyphicon-arrow-down");
        }
        var table = $(this).parents('table').eq(0)
        var rows = table.find('tr:gt(2)').toArray().sort(comparer($(this).index()))
        this.asc = !this.asc
        if (!this.asc) { rows = rows.reverse() }
        for (var i = 0; i < rows.length; i++) { table.append(rows[i]) }
    });	
		$("#gost").keyup(function () {
        var ime = ($('#gost').val()).toLowerCase();
        $("#table tbody tr").each(function () {
            var korIme = ($('td:eq(0)', this).text()).toLowerCase();
            if (korIme.includes(ime) || ime == "") {
                $(this).show()
            } else {
                $(this).hide()
            }
        });
    });
    $("#gost").keydown(function () {
        var ime = ($('#gost').val()).toLowerCase();
        $("#table tbody tr").each(function () {
            var korIme = ($('td:eq(0)', this).text()).toLowerCase();
            if (korIme.includes(ime) || ime == "") {
                $(this).show()
            } else {
                $(this).hide()
            }
        });
    });
	
		
	

};

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
	var t = ``;
    for (ap2 in pom1) {
        t += (`<input type="checkbox" id="${pom1[ap2].id}" name="sadrzaj" value="${pom1[ap2].naziv}">${pom1[ap2].naziv}</input></br>`);
    }

	for (i in data){
		var pom = [];
        for (p in data[i].sadrzajApartmana) {
            pom[p] = data[i].sadrzajApartmana[p].naziv + "\n";
        }
		temp+=`<tr><td class="col1">`+data[i].tip+`</td><td class="soba">`+data[i].brojSoba+`</td><td class="brojG">`+data[i].brojGostiju+`</td><td class="cijena">`+data[i].cijenaPoNoci+`</td><td>`+data[i].vrijemeZaPrijavu+`</td><td>`+data[i].vrijemeZaOdjavu+`</td>`;
		temp += (`<td class="sad">${pom}</td>`);
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
	        temp += (`<td class="lok">${(lok.trim() != ``) ? lok : `-`}</td>`);
	        lok = ``;
	      
	        temp += (`<td>`+data[i].domacin+`</td><td class="col">`+data[i].status+`</td>`);
	        temp+=`<td> <img id="output" height="150px" alt="slika" src="`+ data[i].slika+`"></td>`;
	    temp+=`<td><input id="btnPrikaz` + data[i].id + `" name = "kom" class="btn btn-primary" type="button" value="Prikazi"/> </td> `;
	    
	    temp+=`<td colspan="2" style = "text-align:center;">
         <input name="izmijeni" id="btnIzmijeni` + data[i].id + `" name = "izmijeni" class="btn btn-primary" type="button" value="Izmijeni apartman"></br>
	                    <input id="btnObrisi` + data[i].id + `" name = "obrisi" class="btn btn-primary pull-center" type="button"
	                           value="Obrisi apartman" />
	                </td></tr>`;
	}
	$("#prikazPodataka").html(`</br>
    <div> <b>Filtriraj po tipu:&nbsp;&nbsp;</b><select id="filterTip">
         <option value="Bez naznake" selected>Bez naznake</option>
         <option value="cijeliApartman">cijeliApartman</option>
         <option value="soba">soba</option>
    </select>
    </div><br>
<div> <b>Filtriraj po statusu:&nbsp;&nbsp;</b><select id="filterStatus">
         <option value="Bez naznake" selected>Bez naznake</option>
         <option value="aktivno">aktivno</option>
         <option value="neaktivno">neaktivno</option>
    </select>
    </div><br>
     <br/>
     <div id="filterSadrzaj">
    </br><b>Filtriraj po sadrzaju:&nbsp;&nbsp;</b><br/>
        ${t}
    </div><br>
  <div id="upozorenje" class="hidden"></div>
  <div><b>Pretrazi po datumu:&nbsp;&nbsp;</br>
<b>od: <input style = "width:10%"  type="text" class="form-control date" id="date1"/> <b>do: <input style = "width:10%"  type="text" class="form-control date"  id="date2"/>&nbsp;&nbsp;<input type="button" style="height:33px"  id="pretrazi" class= "btn btn-primary pull-center" value="Pretrazi"/>
    </div><br>
			
      <table class="table table-bordered" id="table">
        <thead>
         <tr>
            <th colspan="13" class = " success text-info" style="text-align: center;">APARTMANI</th>
          </tr>
	          <tr class="success">
           <th></th>
           <th style="text-align:center">
               od:<input type="number" name="filter" id="odSoba" min="0" style="width:60px;"/></br>
               do:<input type="number" name="filter" id="doSoba" min="0" style="width:60px;"/>
           </th>
            <th style="text-align:center">
               <input type="number" name="filter" id="osobe" min="1" style="width:60px; placeholder="Unesite broj""/></br>  
           </th>
           <th style="text-align:center">
               od:<input type="number" name="filter" id="odCijena" min="0" style="width:60px;"/></br>
               do:<input type="number" name="filter" id="doCijena" min="0" style="width:60px;"/>
           </th> 
           <th colspan="3"></th>
           
			 <th style="text-align:center">
               <input type="text" name="filter" id="lokacija" min="0" style="width:150px; placeholder="Unesite lokaciju""/></br>  
           </th>
           
           <th colspan="5"></th>
         
          </tr>
        
          <tr class="text-info success">
            <th>Tip</th>
            <th style = "width:10%">Broj soba</th>
            <th >Broj gostiju</th>
             <th style = "width:10%" class="success" style="text-align:center" name="sortiraj">Cijena po noci<span name="strelica" class="glyphicon glyphicon-arrow-down"/></th>
            <th>Vrijeme za prijavu</th>
            <th>Vrijeme za odjavu</th>
            <th>Lista sadrzaja</th>
            <th>Lokacija</th>
            <th>Domacin</th>
            <th>Status</th>
            <th>Slika</th>
             <th>Komentari</th>
             
             <th></th>
                     
          </tr>
        </thead>
        <tbody id="apartmaniTabela">
        </tbody>
      </table>
    
			`);
    
	$('#apartmaniTabela').html(temp);
	//filtriranje sadrzaja
	
	  $("#filterSadrzaj").click(function () {
	        var imaCekiranih = false;
	        $('input[name="sadrzaj"]:checked').each(function () {
	            $("#table td.sad:not(:contains('" + $(this).val() + "'))").parent().hide();
	            $("#table td.sad:contains('" + $(this).val() + "')").parent().show();
	            imaCekiranih = true;
	        });
	        if (!imaCekiranih)
	            $("#table td.sad:contains('" + $(this).val() + "')").parent().show();
	    });
	
	$('.date1').datepicker({
        format: 'dd/mm/yyyy'
    });
    $("#date1").datepicker({
        format: 'dd/mm/yyyy'
    });
    
	$('.date2').datepicker({
        format: 'dd/mm/yyyy'
    });
    $("#date2").datepicker({
        format: 'dd/mm/yyyy'
    });
	//datum
	 $("#pretrazi").click(function () {
	        var od = $("#date1").val();
	        var doo = $("#date2").val();
	 if(od == "" || doo == "") {
		 $("#upozorenje").removeClass('hidden');
			$("#upozorenje").addClass('alert-danger');
			$("#upozorenje").html(`<td colspan="2"><strong>Greska!</strong> Morate unijeti oba datuma.</td>`);
			}
		 
	  else {
		 $.post({
				url:'../rest/pretraziPoDatumima',
				data : JSON.stringify({od:od,doo:doo}),
				contentType: 'application/json',
				success: function(data){
					ispisiSveApartmane(data,pom1);
			},
				error: function(message){}
				
			
		 });
	 }
});
	

    $("#prikazPodataka").on('change paste keyup','[name=filter]',function (event) {
        var osobe=$("#osobe").val();
        var lokacija=$("#lokacija").val();
        var odc=$("#odCijena").val();
        var doc=$("#doCijena").val();
        var ods=$("#odSoba").val();
        var dos=$("#doSoba").val();
       // var k=$("#filterKategorija").val();
        if ($("#osobe").val()==""){
        	var osobe1=$("#table td.brojG").parent();
        }else{
        	var osobe1=$("#table td.brojG:contains('" + osobe + "')").parent()
        }
        if ($("#lokacija").val()==""){
        	var adresa=$("#table td.brojG").parent();
        }else{
        	var adresa=$("#table td.lok:contains('" + lokacija + "')").parent()
        }
       if(odc==""){
      		var cijenaOd=$("#table td.brojG").parent();
    	}else {
    		var cijenaOd=$("#table td.cijena").filter(function() { return $(this).text()-odc>=0}).parent();
    	}
    	if(doc==""){
    		var cijenaDo=$("#table td.brojG").parent();
    	}else {
    		var cijenaDo=$("#table td.cijena").filter(function() {return $(this).text()-doc<=0}).parent();
    	}
    	if(ods==""){
      		var sobaOd=$("#table td.brojG").parent();
    	}else {
    		var sobaOd=$("#table td.soba").filter(function() { return $(this).text()-ods>=0}).parent();
    	}
    	if(dos==""){
    		var sobaDo=$("#table td.brojG").parent();
    	}else {
    		var sobaDo=$("#table td.soba").filter(function() {return $(this).text()-dos<=0}).parent();
    	}
        osobe1.filter(cijenaOd).filter(cijenaDo).filter(adresa).filter(sobaOd).filter(sobaDo).show();
        $("#table td.brojG").parent().not(osobe1.filter(cijenaOd).filter(cijenaDo).filter(adresa).filter(sobaOd).filter(sobaDo)).hide();
    });
	$("#filterTip").change(function () { //filter po tipu ap
	
        if ($(this).val() == "Bez naznake") {
            $("#table td.col1").parent().show();
        } else if ($(this).val() == "cijeliApartman") {
            $("#table td.col1:not(:contains('" + $(this).val() + "'))").parent().hide();
            $("#table td.col1:contains('" + $(this).val() + "')").parent().show();
        }
        else {
            $("#table td.col1:not(:contains('" + $(this).val() + "'))").parent().hide();
            $("#table td.col1:contains('" + $(this).val() + "')").parent().show();
        }
});
$("#filterStatus").change(function () { 

        if ($(this).val() == "Bez naznake") {
            $("#table td.col").parent().show();
        } else if ($(this).val() == "aktivno") {
            $("#table td.col:not(:contains('" + $(this).val() + "'))").parent().hide();
            $("#table td.col:contains('" + $(this).val() + "')").parent().show();
        }
        else {
            $("#table td.col:not(:contains('" + $(this).val() + "'))").parent().hide();
            $("#table td.col:contains('" + $(this).val() + "')").parent().show();
        }
});
	$("th[name=sortiraj]").click(function () {
        if ($(this.getElementsByTagName("span")).attr(`class`) == "glyphicon glyphicon-arrow-down") {
            $(this.getElementsByTagName("span")).removeClass("glyphicon glyphicon-arrow-down");
            $(this.getElementsByTagName("span")).toggleClass("glyphicon glyphicon-arrow-up");
        } else {
            $(this.getElementsByTagName("span")).removeClass("glyphicon glyphicon-up-down");
            $(this.getElementsByTagName("span")).toggleClass("glyphicon glyphicon-arrow-down");
        }
        var table = $(this).parents('table').eq(0)
        var rows = table.find('tr:gt(2)').toArray().sort(comparer($(this).index()))
        this.asc = !this.asc
        if (!this.asc) { rows = rows.reverse() }
        for (var i = 0; i < rows.length; i++) { table.append(rows[i]) }
    });
	
	$("input:button[name=kom]").click(function () {
		 $.post({
				url:'../rest/vratiKomentare2',
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
           <tr>
          <td> <label>Slika: </label> </td>
          <td> <img id="output" height="150px" alt="slika" src="`+ data.slika+`"></td>
      </tr>
       <tr>
      	<td colspan="2" align="right"><input type="file"  onchange="readURL(this);"  id="fileSlika" accept=".jpg, .jpeg, .png" /></td>
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
$('#fileSlika').change(function(){
	readURL(this);
});
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
		var slika = $('#output').attr('src');
		if(slika == 'undefined' || slika == null || slika==''){
			alert('Ubacite sliku');
			return;
		}
		$('.date').datepicker({
            multidate: true,
            format: 'dd/mm/yyyy'
        });
		if( ulica.trim()!='' && broj.trim()!='' && grad.trim()!='' && postanskiBroj.trim()!='' && duzina.trim()!='' && sirina.trim()!='' && brojSoba.trim() != '' && brojGostiju.trim() != '' && cijenaPoNoci.trim() != '' && datumZaIzdavanje.trim()!=''){
			$.post({
			url:'../rest/izmijeniApartman1',
			data : JSON.stringify({id:data.id,slika:slika,ulica:ulica,broj:broj,nasljenoMjesto:grad,pozivniBrojMjesta:postanskiBroj,geografskaSirina:sirina,geografskaDuzina:duzina,tip:tip,brojSoba:brojSoba,brojGostiju:brojGostiju,domacin:data.domacin,cijenaPoNoci:cijenaPoNoci,vrijemeZaPrijavu:vrijemeZaPrijavu,vrijemeZaOdjavu:vrijemeZaOdjavu,sadrzajApartmana:sadrzaj,datumiZaIzdavanje:datumZaIzdavanje,status:status}),
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
		$("#prikazPodataka").html(`<table class="table table-bordered center"  style="width: 60%;height: 500px;overflow: auto; margin: 0 auto;">
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
function comparer(index) { //ZA SORTIRANJE!
    return function (a, b) {
        var valA = getCellValue(a, index), valB = getCellValue(b, index)
        return $.isNumeric(valA) && $.isNumeric(valB) ? valA - valB : valA.toString().localeCompare(valB)
    }
};
function getCellValue(row, index) {
    return $(row).children('td').eq(index).text()
};

function pretragaCijene() { 
    var min = parseInt($('#odCijena').val(), 10);
    var max = parseInt($('#doCijena').val(), 10);
    $("#table tbody tr").each(function () {
        var age = parseFloat($('td:eq(3)', this).text()) || 0;
        if ((isNaN(min) && isNaN(max)) ||
            (isNaN(min) && age <= max) ||
            (min <= age && isNaN(max)) ||
            (min <= age && age <= max)) {
            $(this).show()
        } else {
            $(this).hide()
        }
    });
};

function pretragaSobe() { //za cijenu
    var min = parseInt($('#odSoba').val(), 10);
    var max = parseInt($('#doSoba').val(), 10);
    $("#table tbody tr").each(function () {
        var age = parseFloat($('td:eq(1)', this).text()) || 0;
        if ((isNaN(min) && isNaN(max)) ||
            (isNaN(min) && age <= max) ||
            (min <= age && isNaN(max)) ||
            (min <= age && age <= max)) {
            $(this).show()
        } else {
            $(this).hide()
        }
    });
};		

function readURL(input) {
	if(input.files && input.files[0]){
		var reader = new FileReader();
		var file = input.files[0];
		
		reader.onload = function(e){	
			$('#output').attr('src', e.target.result);
		}
		reader.readAsDataURL(input.files[0]);
	}
}
