package services;

import java.io.IOException;
import java.util.List;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import baza.BazaKorisnika;
import beans.Korisnik;
import beans.Uloga;
import beans.UlogujSe;

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
				   System.out.println("blablavdajfukhk");
				   return Response.status(400).build();
			   } 
		   }
		   System.out.println("blabla");
		   kor.setUloga(Uloga.gost);
		   korisnici.add(kor);
		   return Response.status(200).build();
	     
	   }
   @POST
	@Path("/logovanje")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
    public Response login(UlogujSe vrijednost,@Context HttpServletRequest request) {
    	List<Korisnik> korisnici = BazaKorisnika.korisnici;
    	String userName = vrijednost.getKorisnickoIme();
    	String password = vrijednost.getLozinka();
    	for(Korisnik k:korisnici){
			   if(k.getKorisnickoIme().equals(userName) && (k.getLozinka().equals(password))){
				   request.getSession().setAttribute("korisnik", k);
				   return Response.status(200).build();
			   } 
		   }
		   return Response.status(400).build();	
    }
    @GET
	@Path("/trenutniKorisnik")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
    public Korisnik trenutniKorisnik(@Context HttpServletRequest request) {
    	Korisnik k = (Korisnik) request.getSession().getAttribute("korisnik");
    	System.out.println(k.getKorisnickoIme());
    	return k;
    }
    
    @POST
	@Path("/logout")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
    public Response logout(@Context HttpServletRequest request) {
    		request.getSession().invalidate();
    		System.out.println("uspjesno");
    		return Response.status(200).build();
	   }
}

