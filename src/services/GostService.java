package services;


import com.fasterxml.jackson.core.json.JsonReadContext;
import com.sun.org.glassfish.gmbal.ParameterNames;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.Iterator;
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
import beans.PodaciZaRezervaciju;
import beans.PomocnaKlasa;
import beans.PretraziPoKorisnickom;
import beans.Rezervacija;
import beans.SadrzajApartmana;
import beans.Status;
import beans.StatusRezervacije;
import beans.Uloga;
import dao.KorisnikDAO;
import dao.SadrzajDAO;
import javafx.util.converter.LocalDateStringConverter;

@Path("")
public class GostService {
	@Context
	ServletContext c;
	
    public GostService() {
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
   	@Path("/slobodniDatumi")
   	@Produces(MediaType.APPLICATION_JSON)
   	@Consumes(MediaType.APPLICATION_JSON)
   	   public Response preuzmiDatume(String id,@Context HttpServletRequest request){
    		System.out.println(id);
    		String pom = id.substring(13,id.length()-2);
    		int ID = Integer.parseInt(pom);
    		List<String> pomocnaLista = new ArrayList<String>();
    		KorisnikDAO korisnikDAO = (KorisnikDAO) c.getAttribute("korisnikDAO");
    		for(Korisnik k : korisnikDAO.getKorisnici().values()) {
    			for(Apartman a : k.getApartmanZaIzdavanje()) {
    				if(!a.obrisan && a.getId() == ID) {
    					pomocnaLista = a.getDatumZaIzdavanje();
    				}
    			}
    		}
    		System.out.println(pomocnaLista);
    		return Response.ok(pomocnaLista).status(200).build();
    		
    		
    }
    
    @POST
   	@Path("/rezervisiApartman")
   	@Produces(MediaType.APPLICATION_JSON)
   	@Consumes(MediaType.APPLICATION_JSON)
   	   public Response rezervisi(PodaciZaRezervaciju podaci,@Context HttpServletRequest request){
    		System.out.println(podaci.getId());
    		String pom = podaci.getId().substring(6);
    		int ID = Integer.parseInt(pom);
    		Rezervacija r = new Rezervacija();
    		Apartman a = new Apartman();
    		Korisnik gost = (Korisnik) request.getSession().getAttribute("korisnik");
    		KorisnikDAO korisnikDAO = (KorisnikDAO) c.getAttribute("korisnikDAO");
    		for(Korisnik k : korisnikDAO.getKorisnici().values()) {
    			if(k.getUloga().equals(Uloga.domacin)) {
    			for(Apartman ap : k.getApartmanZaIzdavanje()) {
    				if (ap.getId() == ID && !ap.obrisan) {
    					a = ap;
    				}
    			}
    		}}
    		
    		for(Korisnik k : korisnikDAO.getKorisnici().values()) {
    			if(k.getUloga().equals(Uloga.domacin)) {
    				for(Apartman ap : k.getApartmanZaIzdavanje()) {
        				if (ap.getId() == ID && !ap.obrisan) {
        					List<String> datumi = ap.getDatumZaIzdavanje();
        					List<LocalDate> dostupniDatumi = new ArrayList<LocalDate>();;
        					for(String d : datumi) {
        						dostupniDatumi.add(LocalDate.parse(d,DateTimeFormatter.ofPattern("dd-MM-yyyy")));
        					}
        					String pocetniDatum = podaci.getDatum();
        					LocalDate pocetniD = LocalDate.parse(pocetniDatum,DateTimeFormatter.ofPattern("dd-MM-yyyy"));
        					List<LocalDate> pomocna = new ArrayList<LocalDate>();
        					pomocna.add(pocetniD);
        					for (int i=1;i<=podaci.getBroj();i++) {
        						pomocna.add(pocetniD.plusDays(i));
        					}
        					
        					if(!dostupniDatumi.contains(pocetniD)) {
        						return Response.status(400).build();
        					} else {
        						for(LocalDate lok: pomocna) {
        							if(!dostupniDatumi.contains(lok)) {
        								return Response.status(400).build();
        							}
        						}
        					}
        					
        					r.setBrojNocenja(podaci.getBroj());
        					r.setGost(gost.getKorisnickoIme());
        					r.setStatus(StatusRezervacije.kreirana);
        					r.setApartman(ID);
        					r.setPocetniDatum(pocetniDatum);
        					r.setUkupnaCijena(ap.getCijenaPoNoci()*podaci.getBroj());
        					a.getRezervacije().add(r);
        					
        				}
    				}}}
    		
    		
			gost.getRezervacije().add(r);
			String contextPath = c.getRealPath("");
			korisnikDAO.sacuvajKorisnike(contextPath);
    		
    		return Response.status(200).build();
    		
    				
    }
  
    }