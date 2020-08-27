package services;


import com.fasterxml.jackson.core.json.JsonReadContext;

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
import javax.websocket.server.PathParam;
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
import beans.PomocnaKlasa;
import beans.PretraziPoKorisnickom;
import beans.Rezervacija;
import beans.SadrzajApartmana;
import beans.Status;
import beans.Uloga;
import dao.KorisnikDAO;
import dao.SadrzajDAO;

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
    	if(c.getAttribute("sadrzajDAO")==null) {
    		
    		c.setAttribute("sadrzajDAO", new SadrzajDAO(contextPath));
    		
    	}
    }
  
    @POST
	@Path("/dodajApartman")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	   public Response dodajApartman(PomocnaKlasa pomocna,@Context HttpServletRequest request){
		List<Integer> pomocnaLista = new ArrayList<Integer>();
    	String[] pom = pomocna.getSadrzajApartmana().trim().split(",");
		for (int i = 0; i < pom.length; i++)
		{
			System.out.println(pom[i]);
			pomocnaLista.add(Integer.parseInt(pom[i]));
		}
		Apartman a = new Apartman();
		KorisnikDAO korisnikDAO = (KorisnikDAO) c.getAttribute("korisnikDAO");
		SadrzajDAO sadrzajDAO = (SadrzajDAO) c.getAttribute("sadrzajDAO"); 
	
		for(SadrzajApartmana s:sadrzajDAO.getSadrzaj().values()) {
			for(int i =0;i < pomocnaLista.size();i++) {
			if (s.getId() == pomocnaLista.get(i))
			{
				a.getSadrzajApartmana().add(s);
			}
		}}
		a.getLokacija().getAdresa().setBroj(pomocna.getBroj());
		a.getLokacija().getAdresa().setUlica(pomocna.getUlica());
		a.getLokacija().getAdresa().setNasljenoMjesto(pomocna.getNasljenoMjesto());
		a.getLokacija().getAdresa().setPozivniBrojMjesta(pomocna.getPozivniBrojMjesta());
		a.getLokacija().setGeografskaDuzina(pomocna.getGeografskaDuzina());
		a.getLokacija().setGeografskaSirina(pomocna.getGeografskaSirina());
		a.setTip(pomocna.getTip());
		a.setBrojSoba(pomocna.getBrojSoba());
		a.setBrojGostiju(pomocna.getBrojGostiju());
		a.setDomacin(pomocna.getDomacin());
		a.setCijenaPoNoci(pomocna.getCijenaPoNoci());
		a.setVrijemeZaOdjavu(pomocna.getVrijemeZaOdjavu());
		a.setVrijemeZaPrijavu(pomocna.getVrijemeZaPrijavu());
		a.setStatus(Status.neaktivno);
		a.setRezervacije(new ArrayList<Rezervacija>());
		
		String[] datumi = pomocna.getDatumiZaIzdavanje().split(",");
		List<String> pomocnaa = new ArrayList<String>();
		for(int i = 0;i < datumi.length;i++)
		{
			pomocnaa.add(datumi[i]);
			
			
		}
		a.setDatumZaIzdavanje(pomocnaa);
		
		Korisnik k = (Korisnik) request.getSession().getAttribute("korisnik");
    	System.out.println(k);
    	if(k!=null) {
    	 
		   k.dodajApartman(a);			   
		   String contextPath = c.getRealPath("");
		   korisnikDAO.sacuvajKorisnike(contextPath);
			   return  Response.status(200).build();
    	}else { 		  
			   return Response.status(400).build();
	
    } 
    }
    @GET
   	@Path("/vratiNeaktivne")
   	@Produces(MediaType.APPLICATION_JSON)
   	@Consumes(MediaType.APPLICATION_JSON)
   	   public List<Apartman> preuzmiApartmane(@Context HttpServletRequest request){
    		Korisnik k = (Korisnik) request.getSession().getAttribute("korisnik");
    		System.out.println(k.getKorisnickoIme());
    		List<Apartman> pomocnaLista = new ArrayList<Apartman>();
    		if(k != null && k.getApartmanZaIzdavanje() != null) {
    			for(Apartman a:k.getApartmanZaIzdavanje()) {
    				if(a.getStatus().equals(Status.neaktivno) && !a.obrisan) {
    					pomocnaLista.add(a);
    				}
    			}
    		}
    		return pomocnaLista;
    		
    }
    
    @POST
   	@Path("/obrisiApartman")
   	@Produces(MediaType.APPLICATION_JSON)
   	@Consumes(MediaType.APPLICATION_JSON)
       public Response preuzmiApartman(String id,@Context HttpServletRequest request) {
       	String pom = id.substring(16,id.length()-2);
       	int ID = Integer.parseInt(pom); 
        KorisnikDAO kd=(KorisnikDAO) c.getAttribute("korisnikDAO");
        Korisnik k = (Korisnik) request.getSession().getAttribute("korisnik");
    	for(Apartman a: k.getApartmanZaIzdavanje()){
       		if(a.getId() == ID) {
       			a.obrisan = true;       			
       			String contextPath = c.getRealPath("");
       			kd.sacuvajKorisnike(contextPath);
       			return Response.status(200).build();
       		}
       	}
       	return Response.status(400).build();
       }
   
   
}