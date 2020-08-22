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

import beans.Korisnik;
import beans.PretraziPoKorisnickom;
import dao.KorisnikDAO;

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
}