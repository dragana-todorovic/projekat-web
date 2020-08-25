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