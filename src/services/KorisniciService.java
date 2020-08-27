package services;

import java.io.File;
import java.io.IOException;
import java.util.Collection;
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


import beans.Korisnik;
import beans.Pol;
import beans.Uloga;
import beans.UlogujSe;
import dao.KorisnikDAO;

@Path("")
public class KorisniciService {
	@Context
	ServletContext c;
	
    public KorisniciService() {
        // TODO Auto-generated constructor stub
    }

    @PostConstruct
	public void init(){ 
    	String contextPath = c.getRealPath(File.separator);
    	if(c.getAttribute("korisnikDAO")==null) {
    		
    		c.setAttribute("korisnikDAO", new KorisnikDAO(contextPath));
    		
    	}
    }
    
    @GET
	@Path("/preuzmiKorisnike")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	   public Collection<Korisnik> preuzmiKorisnike(@Context HttpServletRequest request){
		   
		   KorisnikDAO kd=(KorisnikDAO) c.getAttribute("korisnikDAO");
		   System.out.println(kd.getKorisnici().values());
		   return kd.pronadjiSve();
    } 

    @POST
	@Path("/registracija")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
    public Response register(Korisnik kor,@Context HttpServletRequest request) {
		KorisnikDAO korisnikDAO = (KorisnikDAO) c.getAttribute("korisnikDAO"); 
    	for(Korisnik k:korisnikDAO.getKorisnici().values()){
			   if(k.getKorisnickoIme().equals(kor.getKorisnickoIme())){
				   
				   return Response.status(400).build();
			   } 
		   }
    	   korisnikDAO.getKorisnici().put(kor.getKorisnickoIme(), kor);
		   kor.setUloga(Uloga.gost);
		   String contextPath = c.getRealPath("");
		   korisnikDAO.sacuvajKorisnike(contextPath);
		   return Response.status(200).build();
	     
	   }
    @POST
	@Path("/registracija1")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
    public Response register1(Korisnik kor,@Context HttpServletRequest request) {
		KorisnikDAO korisnikDAO = (KorisnikDAO) c.getAttribute("korisnikDAO"); 
    	for(Korisnik k:korisnikDAO.getKorisnici().values()){
			   if(k.getKorisnickoIme().equals(kor.getKorisnickoIme())){
				   return Response.status(400).build();
			   } 
		   }
    	   korisnikDAO.getKorisnici().put(kor.getKorisnickoIme(), kor);
		   kor.setUloga(Uloga.domacin);
		   String contextPath = c.getRealPath("");
		   korisnikDAO.sacuvajKorisnike(contextPath);
		   return Response.status(200).build();
	     
	   }
   @POST
	@Path("/logovanje")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
    public Response login(UlogujSe vrijednost,@Context HttpServletRequest request) {
	   KorisnikDAO korisnikDAO = (KorisnikDAO) c.getAttribute("korisnikDAO"); 
    	String userName = vrijednost.getKorisnickoIme();
    	String password = vrijednost.getLozinka();
    	for(Korisnik k:korisnikDAO.getKorisnici().values()){
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
    	return k;
    }
    
    @POST
	@Path("/logout")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
    public Response logout(@Context HttpServletRequest request) {
    		request.getSession().invalidate();
    		return Response.status(200).build();
	   }
    
    @POST
	@Path("/izmjenaPodataka")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
    public Response izmijeniPodatke(Korisnik kor,@Context HttpServletRequest request) {
    	KorisnikDAO korisnikDAO = (KorisnikDAO) c.getAttribute("korisnikDAO"); 
		   for(Korisnik k:korisnikDAO.getKorisnici().values()){
			   if(k.getKorisnickoIme().equals(kor.getKorisnickoIme())){
				   String contextPath = c.getRealPath("");
				   k = korisnikDAO.izmijeniKorisnika(kor,contextPath);
				   request.getSession().setAttribute("korisnik", k);
				   return Response.status(200).build();
			   } 
		   }
		   return Response.status(400).build();
	   }
}

