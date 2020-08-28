let dodajApartman = function(data,korisnickoIme){
var temp = ``;
    for (ap in data) {
        temp += (`<input type="checkbox" id="${data[ap].id}" name="sadrzaj" value="${data[ap].id}">${data[ap].naziv}</input></br>`);
    }
$("#prikazPodataka").html(`
<table class="table table-bordered" style="width:30%;height:500px;float:left;">
        <thead>
             <tr class = "border border-white">
                <th colspan="2" class = "text-info" style= "text-align:center;"  >
                    DODAVANJE APARTMANA
                </th>
            </tr>
        </thead>
        <tbody>
        	 <tr id="upozorenje" class="hidden">
                <td colspan="2"><strong>Greska!</strong></td>
            </tr>
  				<tr>
                <td>Tip:</td>
                <td>
                    <input type="radio" name="tip" value="0"> cijeli apartman
                    <input type="radio" name="tip" value="1" checked="checked"> soba
                </td>
            </tr>
            <tr>
                <td>Broj soba:</td>
                <td>
                    <input type="number" name="txtBrojSoba" id="txtBrojSoba" placeholder="Broj soba..." />
                </td>
            </tr>
              <tr>
                <td>Broj gostiju:</td>
                <td>
                    <input type="number" name="txtBrojGostiju" id="txtBrojGostiju" placeholder="Broj gostiju..." />
                </td>
            </tr>
  <tr><td>Izaberite dostupne datume:</td>
<td class="container">
	<input type="text" class="form-control date" placeholder="Izaberite datume" id="date">
            </td>
            </tr>
   <tr>
                <td>Cijena po noci:</td>
                <td>
                    <input type="number" name="txtCijena" id="txtCijena" placeholder="Cijena..." />
                </td>
            </tr>
   <tr>
                <td>Ulica:</td>
                <td>
                    <input type="text" name="txtUlica" id="txtUlica" placeholder="Ulica..." />
                </td>
            </tr>
   <tr>
                <td>Broj:</td>
                <td>
                    <input type="text" name="txtBroj" id="txtBroj" placeholder="Broj..." />
                </td>
            </tr>
   <tr>
                <td>Grad:</td>
                <td>
                    <input type="text" name="txtGrad" id="txtGrad" placeholder="Grad..." />
                </td>
            </tr>
   <tr>
                <td>Postanski broj:</td>
                <td>
                    <input type="text" name="txtPostanskiBroj" id="txtPostanskiBroj" placeholder="Postanski broj..." />
                </td>
            </tr>
   <tr>
                <td>Geografska sirina:</td>
                <td>
                    <input type="text" name="txtSirina" id="txtSirina" placeholder="Geografska sirina..." />
                </td>
            </tr>
   <tr>
                <td>Geografska duzina:</td>
                <td>
                    <input type="text" name="txtDuzina" id="txtDuzina" placeholder="Geografska duzina..." />
                </td>
            </tr>
     <tr>
                <td>Vrijeme za prijavu:</td>
                <td>
                    <input type="time" name="vrijemeZaPrijavu" id="vrijemeZaPrijavu"  value="14:00"  />
                </td>
            </tr>
     <tr>
                <td>Vrijeme za odjavu:</td>
                <td>
                    <input type="time" name="vrijemeZaOdjavu" id="vrijemeZaOdjavu" value="10:00"  />
                </td>
            </tr>
<tr>
<td>Izaberite sadrzaj</td>
<td>${temp}</td>
</tr>
            <tr class="success">
                <td colspan="2" style = "text-align:center;">
                    <input id="btnDodaj" class="btn btn-primary pull-center" type="button"
                           value="Dodaj apartman" />
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

	$("#btnDodaj").click(function(){
		var sadrzaj = ``;
        $('input[name="sadrzaj"]:checked').each(function () {
            sadrzaj += ($(this).val()) + ",";
        });		
		var brojSoba = $("#txtBrojSoba").val();
		var brojGostiju = $("#txtBrojGostiju").val();
		var datumZaIzdavanje = $("#date").val();
		var cijenaPoNoci = $("#txtCijena").val();
		var tip= $("input:radio[name=tip]:checked").val();
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
		if(sadrzaj!=null && ulica.trim()!='' && broj.trim()!='' && grad.trim()!='' && postanskiBroj.trim()!='' && duzina.trim()!='' && sirina.trim()!='' && brojSoba.trim() != '' && brojGostiju.trim() != '' && cijenaPoNoci.trim() != '' && datumZaIzdavanje.trim()!=''){
		$.post({
		url:'../rest/dodajApartman',
		data : JSON.stringify({id:data.id,ulica:ulica,broj:broj,nasljenoMjesto:grad,pozivniBrojMjesta:postanskiBroj,geografskaSirina:sirina,geografskaDuzina:duzina,tip:tip,brojSoba:brojSoba,brojGostiju:brojGostiju,domacin:korisnickoIme,cijenaPoNoci:cijenaPoNoci,vrijemeZaPrijavu:vrijemeZaPrijavu,vrijemeZaOdjavu:vrijemeZaOdjavu,sadrzajApartmana:sadrzaj,datumiZaIzdavanje:datumZaIzdavanje}),
		contentType: 'application/json',
		success: function(){
			alert("Uspjesno ste dodali apartman");
			location.href = "Domacin.html";
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
let jsonObjekat;
function reverseGeocode(coords) {
    fetch('https://nominatim.openstreetmap.org/reverse?format=json&lon=' + coords[0] + '&lat=' + coords[1])
        .then(function (response) {
            //alert(response);
            return response.json();
        }).then(function (json) {
            console.log(json);
            jsonObjekat = json;
        });
};
let pomocna = function () {
    var map = new ol.Map({
        target: 'map',
        layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM()
            })
        ],
        view: new ol.View({
            center: ol.proj.fromLonLat([19.8424, 45.2541]),
            zoom: 15
        })
    });
    //var jsonObjekat;
    map.on('click', function (evt) {
        var coord = ol.proj.toLonLat(evt.coordinate);
        alert(coord);
        reverseGeocode(coord);
        var iconFeatures = [];
        var lon = coord[0];
        var lat = coord[1];
        var icon = "marker.png";
        var iconGeometry = new ol.geom.Point(ol.proj.transform([lon, lat], 'EPSG:4326', 'EPSG:3857'));
        var iconFeature = new ol.Feature({
            geometry: iconGeometry
        });
        iconFeatures.push(iconFeature);
        var vectorSource = new ol.source.Vector({
            features: iconFeatures //add an array of features
        });
        var iconStyle = new ol.style.Style({
            image: new ol.style.Icon(/** @type {olx.style.IconOptions} */({
                anchor: [0.5, 46],
                anchorXUnits: 'fraction',
                anchorYUnits: 'pixels',
                opacity: 0.95,
                src: icon
            }))
        });
        var vectorLayer = new ol.layer.Vector({
            source: vectorSource,
            style: iconStyle
        });
        map.addLayer(vectorLayer);
        //addMarker(coord[0], coord[1], "marker.png");
    });

};

let ispisiNeaktivne = function(data,pom1) {
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
            <th colspan="8" class = " success text-info" style="text-align: center;">NEAKTIVNI APARTMANI</th>
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
          
          </tr>
        </thead>
        <tbody id="apartmaniTabela">
        </tbody>
      </table>
    
			`);
    
	$('#apartmaniTabela').html(temp);
	$("input:button[name=obrisi]").click(function () {
		 $.post({
				url:'../rest/obrisiApartman',
				data : JSON.stringify({id:this.id}),
				contentType: 'application/json',
				success: function(){
					alert("Uspjesno ste obrisali apartman");
					location.href = "Domacin.html";
				},
				error: function(message){
					alert('Neuspjesno');
				}
			
			});
	 });
 $("input:button[name=izmijeni]").click(function () {
		 $.post({
				url:'../rest/preuzmiApartmanPoId',
				data : JSON.stringify({id:this.id}),
				contentType: 'application/json',
				success: function(a){
					 $.post({
						url:'../rest/postojeciSadrzaj',
						data : JSON.stringify({id:a.id}),
						contentType: 'application/json',
						success: function(data){
								$.post({
									url:'../rest/nepostojeciSadrzaj',
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
			url:'../rest/izmijeniApartman',
			data : JSON.stringify({id:data.id,ulica:ulica,broj:broj,nasljenoMjesto:grad,pozivniBrojMjesta:postanskiBroj,geografskaSirina:sirina,geografskaDuzina:duzina,tip:tip,brojSoba:brojSoba,brojGostiju:brojGostiju,domacin:data.domacin,cijenaPoNoci:cijenaPoNoci,vrijemeZaPrijavu:vrijemeZaPrijavu,vrijemeZaOdjavu:vrijemeZaOdjavu,sadrzajApartmana:sadrzaj,datumiZaIzdavanje:datumZaIzdavanje,status:status}),
			contentType: 'application/json',
			success: function(){
			alert("Uspjesno ste izmijenili apartman");
			location.href = "Domacin.html";
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
		

