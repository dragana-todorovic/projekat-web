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
import beans.Status;
import beans.Uloga;
import dao.KorisnikDAO;

@Path("")
public class DomacinService {
	@Context
	ServletContext c;
	
    public DomacinService() {
        // TODO Auto-generated constructor stub
    }

    @PostConstruct
	public void init(){ 
    	String contextPath = c.getRealPath("");
    	if(c.getAttribute("korisnikDAO")==null) {
    		
    		c.setAttribute("korisnikDAO", new KorisnikDAO(contextPath));
    		
    	}
    }
    
    @POST
	@Path("/dodajApartman")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	   public Response dodajApartman(Apartman apartman,@Context HttpServletRequest request){
    	KorisnikDAO korisnikDAO = (KorisnikDAO) c.getAttribute("korisnikDAO"); 
    	System.out.println(apartman.getBrojSoba());
    	Korisnik k = (Korisnik) request.getSession().getAttribute("korisnik");
    	System.out.println(k);
    	if(k!=null) {
    	   apartman.setStatus(Status.neaktivno);
		   k.dodajApartman(apartman);	
		   
		   String contextPath = c.getRealPath("");
		   korisnikDAO.sacuvajKorisnike(contextPath);
			   return  Response.status(200).build();
    	}else { 		  
			   return Response.status(400).build();
    	} 
		
    } 
}