package services;

import java.io.IOException;
import java.util.List;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import baza.BazaKorisnika;
import beans.Korisnik;
import beans.Uloga;

@Path("")
public class KorisniciService {
	@Context
	ServletContext c;
	
    public KorisniciService() {
        // TODO Auto-generated constructor stub
    }

    @PostConstruct
	public void init(){ }

    @POST
	@Path("/registracija")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
    public Response register(Korisnik kor,@Context HttpServletRequest request) {
		  List<Korisnik> korisnici = BazaKorisnika.korisnici;
		   for(Korisnik k:korisnici){
			   if(k.getKorisnickoIme().equals(kor.getKorisnickoIme())){
				   return Response.status(400).build();
			   } 
		   }
		   kor.setUloga(Uloga.gost);
		   korisnici.add(kor);
		   return Response.status(200).build();
	     
	   }
}
