package services;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import beans.Apartman;
import beans.Korisnik;
import beans.PretraziPoKorisnickom;
import beans.SadrzajApartmana;
import beans.Uloga;
import dao.KorisnikDAO;
import dao.SadrzajDAO;

@Path("")
public class AdministratorService {
	@Context
	ServletContext c;
	
    public AdministratorService() {
        // TODO Auto-generated constructor stub
    }

    @PostConstruct
	public void init(){ 
    	String contextPath = c.getRealPath("");
    	if(c.getAttribute("korisnikDAO")==null) {
    		
    		c.setAttribute("korisnikDAO", new KorisnikDAO(contextPath));
    		
    	}
    	if(c.getAttribute("sadrzajDAO")==null) {
    		
    		c.setAttribute("sadrzajDAO", new SadrzajDAO(contextPath));
    		
    	}
    }
    
    @POST
	@Path("/pretraga")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	   public Response preuzmiKorisnike(PretraziPoKorisnickom kor,@Context HttpServletRequest request){
		   
		   KorisnikDAO kd=(KorisnikDAO) c.getAttribute("korisnikDAO");
		   System.out.println("blaaaa");
		   List<Korisnik> retVal = new ArrayList<Korisnik>();
		   if(kor != null && kd !=null) {
			   for(Korisnik k : kd.getKorisnici().values()) {
				   if(!k.getKorisnickoIme().toLowerCase().trim().contains(kor.getKorisnickoIme().toLowerCase().trim())) {
					   continue;
				   }
				   retVal.add(k);
				  
			   }
			   return Response.ok(retVal).status(200).build();
		   }
		   
		   else {
			   return Response.status(400).build();
		   }
		
    } 
    
    @POST
	@Path("/dodajSadrzaj")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
    public Response dodajSadrzaj(SadrzajApartmana s,@Context HttpServletRequest request) {
		SadrzajDAO sadrzajDAO = (SadrzajDAO) c.getAttribute("sadrzajDAO"); 
    	for(SadrzajApartmana sad:sadrzajDAO.getSadrzaj().values()){
			   if(sad.getNaziv().equals(s.getNaziv())){
				   return Response.status(400).build();
			   } 
		   }
    	   sadrzajDAO.getSadrzaj().put(s.getId(), s);
		   String contextPath = c.getRealPath("");
		   sadrzajDAO.sacuvajSadrzaj(contextPath);
		   return Response.status(200).build();
	     
	   }
    @POST
   	@Path("/obrisiSadrzaj")
   	@Produces(MediaType.APPLICATION_JSON)
   	@Consumes(MediaType.APPLICATION_JSON)
       public Response preuzmiApartman(String id,@Context HttpServletRequest request) {
       	String pom = id.substring(16,id.length()-2);
       	int ID = Integer.parseInt(pom);
       	SadrzajDAO sadrzajDAO = (SadrzajDAO) c.getAttribute("sadrzajDAO"); 
    	for(SadrzajApartmana sad:sadrzajDAO.getSadrzaj().values()){
       		if(sad.getId() == ID) {
       			sad.obrisan = true;
       			String contextPath = c.getRealPath("");
       			sadrzajDAO.sacuvajSadrzaj(contextPath);
       			return Response.status(200).build();
       		}
       	}
       	return Response.status(400).build();
       }
    
    @GET
	@Path("/preuzmiSadrzaj")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	   public List<SadrzajApartmana> preuzmiSadrzaj(@Context HttpServletRequest request){
		   
		   SadrzajDAO sd=(SadrzajDAO) c.getAttribute("sadrzajDAO");
		   for(SadrzajApartmana sad:sd.getSadrzaj().values()) {
			   System.out.println(sad.getNaziv());
		   }
		   List<SadrzajApartmana> pomocna = new ArrayList<SadrzajApartmana>();
		   for(SadrzajApartmana sad:sd.getSadrzaj().values()) {
			   if(sad.obrisan) {
				   continue;
			   } else {
				   pomocna.add(sad);
			   }
		   }
		   return pomocna;
		  
    }
    @POST
	@Path("/preuzmiSadrzajPoId")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
    public Response preuzmiSadrzaj(String id,@Context HttpServletRequest request) {
    	String pom = id.substring(18,id.length()-2);
       	int ID = Integer.parseInt(pom);
       	SadrzajDAO sadrzajDAO = (SadrzajDAO) c.getAttribute("sadrzajDAO"); 
       	for(SadrzajApartmana sad:sadrzajDAO.getSadrzaj().values()){
       		if(sad.getId() == ID) {
    			return Response.ok(sad).status(200).build();
    		}
    	}
    	return Response.status(400).build();
    }
    
    @POST
   	@Path("/izmijeniSadrzaj")
   	@Produces(MediaType.APPLICATION_JSON)
   	@Consumes(MediaType.APPLICATION_JSON)
       public Response izmijeniPodatke(SadrzajApartmana sa,@Context HttpServletRequest request) {
       	SadrzajDAO sadrzajDAO = (SadrzajDAO) c.getAttribute("sadrzajDAO"); 
       	for(SadrzajApartmana s:sadrzajDAO.getSadrzaj().values()) {
       		if(s.getNaziv().equals(sa.getNaziv())) {
       			return Response.status(400).build();
       		}
       	}
   		   for(SadrzajApartmana s:sadrzajDAO.getSadrzaj().values()){
   			   if(s.getId()==sa.getId()){
   				   String contextPath = c.getRealPath("");
   				   s = sadrzajDAO.izmijeniSadrzaj(sa, contextPath);
   				   return Response.status(200).build();
   			   } 
   		   }
   		   return Response.status(400).build();
   	   }
}