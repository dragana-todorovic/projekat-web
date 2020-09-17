let ispisiSveAktivne = function(data,pom1) {
	
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
		var datumi =[];
		for(d in data[i].datumZaIzdavanje){
			datumi[d] = data[i].datumZaIzdavanje[d] + "\n";
		}
		temp+=`<tr><td >${datumi} </td><td class="col1">`+data[i].tip+`</td><td class="soba">`+data[i].brojSoba+`</td><td class="brojG">`+data[i].brojGostiju+`</td><td class="cijena">`+data[i].cijenaPoNoci+`</td><td>`+data[i].vrijemeZaPrijavu+`</td><td>`+data[i].vrijemeZaOdjavu+`</td>`;
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
		        temp+=`<td>`+data[i].domacin+`</td>`;
		        temp+=`<td> <img id="output" height="150px" alt="slika" src="`+ data[i].slika+`"></td>`;
			
			temp+=`<td>
		        
			    <input id="btnKom` + data[i].id + `" name = "komentar" class="btn btn-primary" type="button" value="Komentarisi"/></br>
			    <input id="btnPrikazi` + data[i].id + `" name = "kom" class="btn btn-primary" type="button" value="Prikazi"/></td>`;
			    temp+=`<td><input id="btnRez` + data[i].id + `" name = "rezervisi" class="btn btn-primary" type="button" value="Rezervisi"/>
			                </td></tr>`;
		}
		$("#prikazPodataka2").html(`
		</br>
    <div> <b>Filtriraj po tipu:&nbsp;&nbsp;</b><select id="filterTip">
         <option value="Bez naznake" selected>Bez naznake</option>
         <option value="cijeliApartman">cijeliApartman</option>
         <option value="soba">soba</option>
    </select>
    </div>
           <br/>
     <div id="filterSadrzaj">
    <b>Filtriraj po sadrzaju:&nbsp;&nbsp;</b><br/>
        ${t}
    </div><br>
  <div id="upozorenje" class="hidden"></div>
  <div><b>Pretrazi po datumu:&nbsp;&nbsp;</br>
<b>od: <input style = "width:10%"  type="text" class="form-control date" id="date1"/> <b>do: <input style = "width:10%"  type="text" class="form-control date"  id="date2"/>&nbsp;&nbsp;<input type="button" style="height:33px"  id="pretrazi" class= "btn btn-primary pull-center" value="Pretrazi"/>
    </div><br>
	      <table class="table table-bordered" id = "table">
	        <thead>
	        
	          <tr>
	            <th colspan="13" class = " success text-info" style="text-align: center;">AKTIVNI APARTMANI</th>
	          </tr>
	          <tr class="success">
            <th colspan="2"></th>
            <th style="text-align:center">
                od:<input type="number" name="filter" id="odSoba" min="0" style="width:60px;"/></br>
                do:<input type="number" name="filter" id="doSoba" min="0" style="width:60px;"/>
            </th>
             <th style="text-align:center">
                <input type="number" id="osobe" name="filter" min="1" style="width:60px; placeholder="Unesite broj""/></br>  
            </th>
            <th style="text-align:center">
                od:<input type="number" name="filter" id="odCijena" min="0" style="width:60px;"/></br>
                do:<input type="number" name="filter" id="doCijena" min="0" style="width:60px;"/>
            </th> 
            <th colspan="3"></th>
          
			 <th style="text-align:center">
                <input type="text" name="filter" id="lokacija" min="0" style="width:60px; placeholder="Unesite lokaciju""/></br>  
            </th>
            
            <th colspan="5"></th>
            
           </tr>
	          <tr class="text-info success">
				<th>Datumi</th>
	            <th>Tip</th>
	            <th>Broj soba</th>
	            <th>Broj gostiju</th>
	             <th class="success" style="text-align:center" name="sortiraj">Cijena po noci<span name="strelica" class="glyphicon glyphicon-arrow-down"/></th>
	            <th>Vrijeme za prijavu</th>
	            <th>Vrijeme za odjavu</th>
	            <th>Lista sadrzaja</th>
	            <th>Lokacija</th>
	            <th>Domacin</th>
	              <th>Slika</th>
	            <th>Komentar</th>
	             <th></th>
	           
	          
	          </tr>
	        </thead>
	        <tbody id="apartmaniTabela">
	        </tbody>
	      </table>
	    
				`);
	    
		$('#apartmaniTabela').html(temp);
		
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
					url:'../rest/pretraziPoDatumima2',
					data : JSON.stringify({od:od,doo:doo}),
					contentType: 'application/json',
					success: function(data){
						ispisiSveAktivne(data,pom1);
				},
					error: function(message){}
					
				
			 });
		 }
	});
		 $("#prikazPodataka2").on('change paste keyup','[name=filter]',function (event) {
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
	    //filter
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
							                    <input type="number" id="nocenje" placeholder="Unesite broj nocenja..." />
							                </td>
							            </tr>
							              <tr>
							                <td>Unesite poruku:</td>
							                <td>
							                    <input type="text" id="poruka" placeholder="Unesite poruku..." />
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
						 					var poruka = $("#poruka").val();
						 					if(datum!='' && broj!='') {
						 						$.post({
						 							url:'../rest/rezervisiApartman',
						 							data : JSON.stringify({datum:datum,broj:broj,id:id,poruka:poruka}),
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
	            pom[p] = data[i].sadrzajApartmana[p].naziv + "\n";
	        }
		var datumi =[];
		for(d in data[i].datumZaIzdavanje){
			datumi[d] = data[i].datumZaIzdavanje[d] + "\n";
		}
		temp+=`<tr><td >${datumi} </td><td class="col1">`+data[i].tip+`</td><td class="soba">`+data[i].brojSoba+`</td><td class="brojG">`+data[i].brojGostiju+`</td><td class="cijena">`+data[i].cijenaPoNoci+`</td><td>`+data[i].vrijemeZaPrijavu+`</td><td>`+data[i].vrijemeZaOdjavu+`</td>`;
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
		       
			temp+=`<td>`+data[i].domacin+`</td>`;
			 temp+=`<td> <img id="output" height="150px" alt="slika" src="`+ data[i].slika+`"></td>`;
			temp+=`<td>
		        
			    
			    <input id="btnPrikazi` + data[i].id + `" name = "kom" class="btn btn-primary" type="button" value="Prikazi"/></td></tr>`;
		}
		$("#prikazPodataka2").html(`
		</br>
    <div> <b>Filtriraj po tipu:&nbsp;&nbsp;</b><select id="filterTip">
         <option value="Bez naznake" selected>Bez naznake</option>
         <option value="cijeliApartman">cijeliApartman</option>
         <option value="soba">soba</option>
    </select>
    </div>
           <br/>
     <div id="filterSadrzaj">
    <b>Filtriraj po sadrzaju:&nbsp;&nbsp;</b></br>
        ${t}
    </div><br>
  <div id="upozorenje" class="hidden"></div>
  <div><b>Pretrazi po datumu:&nbsp;&nbsp;</br>
<b>od: <input style = "width:10%"  type="text" class="form-control date" id="date1"/> <b>do: <input style = "width:10%"  type="text" class="form-control date"  id="date2"/>&nbsp;&nbsp;<input type="button" style="height:33px"  id="pretrazi" class= "btn btn-primary pull-center" value="Pretrazi"/>
    </div><br>
	      <table class="table table-bordered" id = "table">
	        <thead>
	        
	          <tr>
	            <th colspan="12" class = " success text-info" style="text-align: center;">APARTMANI</th>
	          </tr>
	          <tr class="success">
           <th colspan="2"></th>
           <th style="text-align:center">
               od:<input type="number"  name="filter" id="odSoba" min="0" style="width:60px;"/></br>
               do:<input type="number"  name="filter" id="doSoba" min="0" style="width:60px;"/>
           </th>
            <th style="text-align:center">
               <input type="number"  name="filter" id="osobe" min="1" style="width:60px; placeholder="Unesite broj""/></br>  
           </th>
           <th style="text-align:center">
               od:<input type="number"  name="filter" id="odCijena" min="0" style="width:60px;"/></br>
               do:<input type="number"  name="filter"  id="doCijena" min="0" style="width:60px;"/>
           </th> 
           <th></th>
           <th></th>
           
          
           <th></th>
			 <th style="text-align:center">
               <input type="text" name="filter" id="lokacija" min="0" style="width:150px; placeholder="Unesite lokaciju""/></br>  
           </th>
           
           <th colspan="4"></th>
          
          </tr>
	          <tr class="text-info success">
				<th>Datumi</th>
	            <th>Tip</th>
	            <th>Broj soba</th>
	            <th>Broj gostiju</th>
	              <th class="success" style="text-align:center" name="sortiraj">Cijena po noci<span name="strelica" class="glyphicon glyphicon-arrow-down"/></th>
	            <th>Vrijeme za prijavu</th>
	            <th>Vrijeme za odjavu</th>
	            <th>Lista sadrzaja</th>
	            <th>Lokacija</th>
	            <th>Domacin</th>
	             <th>Slika</th>
	            <th>Komentar</th>
	           
	          
	          </tr>
	        </thead>
	        <tbody id="apartmaniTabela">
	        </tbody>
	      </table>
	    
				`);
	    
		$('#apartmaniTabela').html(temp);
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
					url:'../rest/pretraziPoDatumima2',
					data : JSON.stringify({od:od,doo:doo}),
					contentType: 'application/json',
					success: function(data){
						ispisiSveAktivneZaNeulogovanog(data,pom1);
				},
					error: function(message){}
					
				
			 });
		 }
	});
		 $("#prikazPodataka2").on('change paste keyup','[name=filter]',function (event) {
        var osobe=$("#osobe").val();
        var lokacija=$("#lokacija").val();
        var odc=$("#odCijena").val();
        var doc=$("#doCijena").val();
        var ods=$("#odSoba").val();
        var dos=$("#doSoba").val();
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
		 //filter
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
					
						alert("Uspjesno ste ostavili komentar.")
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
			temp+=`<tr><td>`+data[i].pocetniDatum+`</td><td>`+data[i].brojNocenja+`</td><td>`+data[i].ukupnaCijena+`</td><td>`+data[i].status+`</td><td>`+data[i].poruka+`</td>`;
			if(data[i].status == 'kreirana' || data[i].status == 'prihvacena') {
			temp+=`<td> <input id="btnOdustanak` + data[i].id + `" name = "odustani" class="btn btn-primary pull-center" type="button"
	                           value="Odustanak" /></td>`; }
			else {
				temp+=`<td></td>`;
			}
			temp+=`</tr>`;
		}
		
		$("#prikazPodataka2").html(`<br>
	      <table class="table table-bordered" id="table">
	        <thead>
	          <tr>
	            <th colspan="5" class = " success text-info" style="text-align: center;">MOJE REZERVACIJE</th>
	          </tr>
	          <tr class="text-info success">
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
		$("th[name=sortiraj]").click(function () {
	        if ($(this.getElementsByTagName("span")).attr(`class`) == "glyphicon glyphicon-arrow-down") {
	            $(this.getElementsByTagName("span")).removeClass("glyphicon glyphicon-arrow-down");
	            $(this.getElementsByTagName("span")).toggleClass("glyphicon glyphicon-arrow-up");
	        } else {
	            $(this.getElementsByTagName("span")).removeClass("glyphicon glyphicon-up-down");
	            $(this.getElementsByTagName("span")).toggleClass("glyphicon glyphicon-arrow-down");
	        }
	        var table = $(this).parents('table').eq(0)
	        var rows = table.find('tr:gt(1)').toArray().sort(comparer($(this).index()))
	        this.asc = !this.asc
	        if (!this.asc) { rows = rows.reverse() }
	        for (var i = 0; i < rows.length; i++) { table.append(rows[i]) }
	    });
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



