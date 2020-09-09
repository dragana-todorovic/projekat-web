package services;


import com.fasterxml.jackson.core.json.JsonReadContext;
import com.sun.org.glassfish.gmbal.ParameterNames;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
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
import beans.Komentar;
import beans.Korisnik;
import beans.PodaciZaRezervaciju;
import beans.PomocnaKlasa;
import beans.PretragaPoDatumima;
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
    		
    		return Response.ok(pomocnaLista).status(200).build();
    		
    		
    }
    
    @POST
	@Path("/pretraziPoDatumima2")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	   public Response pretrazi(PretragaPoDatumima datum,@Context HttpServletRequest request){
    	KorisnikDAO kd=(KorisnikDAO) c.getAttribute("korisnikDAO");
    		long brojDana = 0;
		   LocalDate pocetni;
		   LocalDate krajnji;
		   List<Apartman> pomocnaLista = new ArrayList<Apartman>();
		   List<LocalDate> pomocniDatumi = new ArrayList<LocalDate>();
		   
		   if(datum.getOd()!=null && datum.getDoo()!=null) {
			   pocetni = LocalDate.parse(datum.getOd(),DateTimeFormatter.ofPattern("dd/MM/yyyy"));
			   System.out.println(pocetni);
			   krajnji = LocalDate.parse(datum.getDoo(),DateTimeFormatter.ofPattern("dd/MM/yyyy"));
			   System.out.println(krajnji);
			   long izmedju = ChronoUnit.DAYS.between(pocetni, krajnji);
			   brojDana = izmedju;
			   for(int i = 0;i<brojDana;i++) {
				   pomocniDatumi.add(pocetni.plusDays(i));
			   }
			   for(Korisnik k:kd.getKorisnici().values()) {
				   if(k.getUloga().equals(Uloga.domacin)) {
					   for(Apartman a:k.getApartmanZaIzdavanje()) {
						   if(!a.obrisan && a.getStatus().equals(Status.aktivno)) {
							   List<LocalDate> datumi1 = new ArrayList<LocalDate>();
							   for(String d : a.getDatumZaIzdavanje()) {
								   datumi1.add(LocalDate.parse(d,DateTimeFormatter.ofPattern("dd/MM/yyyy")));
							   }
							for(LocalDate ld:pomocniDatumi) {
								System.out.println(" *************" + ld);
								if(datumi1.contains(ld)) {
									System.out.println(" #################  usao u pretraguuu");
									if(!pomocnaLista.contains(a)) {
										pomocnaLista.add(a);
									}
								}
							}
						   }
						   
					   }
				   }
			   }
			   
		   }
		   return Response.ok(pomocnaLista).status(200).build();
		   
		
    } 
    
    @POST
   	@Path("/rezervisiApartman")
   	@Produces(MediaType.APPLICATION_JSON)
   	@Consumes(MediaType.APPLICATION_JSON)
   	   public Response rezervisi(PodaciZaRezervaciju podaci,@Context HttpServletRequest request){
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
        						dostupniDatumi.add(LocalDate.parse(d,DateTimeFormatter.ofPattern("dd/MM/yyyy")));
        					}
        					String pocetniDatum = podaci.getDatum();
        					LocalDate pocetniD = LocalDate.parse(pocetniDatum,DateTimeFormatter.ofPattern("dd/MM/yyyy"));
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
    
    
    
    @GET
   	@Path("/vratiSveRezervacije")
   	@Produces(MediaType.APPLICATION_JSON)
   	@Consumes(MediaType.APPLICATION_JSON)
   	   public Response vratiRezervacije(@Context HttpServletRequest request){
    	Korisnik gost = (Korisnik) request.getSession().getAttribute("korisnik");
    	List<Rezervacija> rpomocna = new ArrayList<Rezervacija>();
    	if(gost.getRezervacije().size()>0) {
    	rpomocna = gost.getRezervacije();}
    	return Response.ok(rpomocna).status(200).build();
    		
    		
    }
    
    @POST
   	@Path("/komentarisanje")
   	@Produces(MediaType.APPLICATION_JSON)
   	@Consumes(MediaType.APPLICATION_JSON)
   	   public Response komentarisi(String id,@Context HttpServletRequest request){
    	String pom = id.substring(13,id.length()-2);
		int ID = Integer.parseInt(pom);
		System.out.println(ID);
    	Korisnik gost = (Korisnik) request.getSession().getAttribute("korisnik");
    	for(Rezervacija r:gost.getRezervacije()) {
    		if(r.getApartman() == ID) {
    			if(r.getStatus() == StatusRezervacije.odbijena || r.getStatus() == StatusRezervacije.zavrsena){
    				return Response.status(200).build();
    			}
    		}
    	}
    	return Response.status(400).build();
    }
    
    @POST
   	@Path("/ostaviKom")
   	@Produces(MediaType.APPLICATION_JSON)
   	@Consumes(MediaType.APPLICATION_JSON)
   	   public Response ostaviKom(Komentar kom,@Context HttpServletRequest request){
    	String komentar = kom.getApartman().substring(6);
    	KorisnikDAO korisnikDAO = (KorisnikDAO) c.getAttribute("korisnikDAO");
    	int ID = Integer.parseInt(komentar);
       	Korisnik gost = (Korisnik) request.getSession().getAttribute("korisnik");
       	kom.setGost(gost.getKorisnickoIme());
       	kom.setApartman(komentar);
       	for(Apartman a:gost.getIznajmljeniApartman()) {
       		System.out.println("usao u for");
    		if(a.getId()==ID) {
           		System.out.println("usao u IF");
    			a.getKomentar().add(kom);
    		}
       	}
       	for(Korisnik kor:korisnikDAO.getKorisnici().values()) {
       		for(Apartman a1:kor.getApartmanZaIzdavanje()) {
       			if(a1.getId() == ID) {
       				a1.getKomentar().add(kom);
       			}
       		}
       	}
       	String contextPath = c.getRealPath("");
		korisnikDAO.sacuvajKorisnike(contextPath);
		return Response.status(200).build();
    }
    @POST
   	@Path("/odustani")
   	@Produces(MediaType.APPLICATION_JSON)
   	@Consumes(MediaType.APPLICATION_JSON)
   	   public Response odustani(String id,@Context HttpServletRequest request){
    	String pom = id.substring(19,id.length()-2);
		int ID = Integer.parseInt(pom);		
		Boolean uspjesno = false;
		Apartman apart = new Apartman();
		KorisnikDAO korisnikDAO = (KorisnikDAO) c.getAttribute("korisnikDAO");
    	Korisnik gost = (Korisnik) request.getSession().getAttribute("korisnik");
    	for(Rezervacija r:gost.getRezervacije()) {
    		if(r.getId()==ID) {
    			if(r.getStatus().equals(StatusRezervacije.prihvacena) || r.getStatus().equals(StatusRezervacije.kreirana)) {
    				r.setStatus(StatusRezervacije.odustanak);
    				uspjesno = true;
    			}
    		}
    	}
    	if(!uspjesno) {
    		return Response.status(400).build();
    	}
    	for(Apartman ap: gost.getIznajmljeniApartman()) {
    		for(Rezervacija rez : ap.getRezervacije()) {
    			if(rez.getId() == ID  ) {
    				if(rez.getStatus().equals(StatusRezervacije.prihvacena)) {   					
    				String pocetniDatum = rez.getPocetniDatum();
    				LocalDate pocetniD = LocalDate.parse(pocetniDatum,DateTimeFormatter.ofPattern("dd/MM/yyyy"));
    				for(int i =0;i<rez.getBrojNocenja();i++) {    					
    				String pomoc =DateTimeFormatter.ofPattern("dd/MM/yyyy").format(pocetniD.plusDays(i));   				
    				ap.getDatumZaIzdavanje().add(pomoc);    				
    				}
    				rez.setStatus(StatusRezervacije.odustanak);   	
    			}
    				if(rez.getStatus().equals(StatusRezervacije.kreirana)) {
    					rez.setStatus(StatusRezervacije.odustanak);
    				}
    			
    		}
    	}}
    		for(Korisnik kor: korisnikDAO.getKorisnici().values()) {
    		for(Apartman ap1: kor.getApartmanZaIzdavanje()) {
        		for(Rezervacija rez1 : ap1.getRezervacije()) {
        			if(rez1.getId() == ID  ) {
        				System.out.println("usao");
        				if(rez1.getStatus().equals(StatusRezervacije.prihvacena)) {  
        					
        				String pocetniDatum = rez1.getPocetniDatum();
        				LocalDate pocetniD = LocalDate.parse(pocetniDatum,DateTimeFormatter.ofPattern("dd/MM/yyyy"));
        				for(int i =0;i<rez1.getBrojNocenja();i++) {    	
        				
        				String pomoc =DateTimeFormatter.ofPattern("dd/MM/yyyy").format(pocetniD.plusDays(i));   				
        				ap1.getDatumZaIzdavanje().add(pomoc);    				
        				}
        				rez1.setStatus(StatusRezervacije.odustanak);   	
        			}
        				if(rez1.getStatus().equals(StatusRezervacije.kreirana)) {
        					rez1.setStatus(StatusRezervacije.odustanak);
        				}
        			
        		}
        		}}}
    	
    	String contextPath = c.getRealPath("");
		korisnikDAO.sacuvajKorisnike(contextPath);
		return  Response.status(200).build();
    		
    		
    }
    
    @POST
   	@Path("/vratiKomentare1")
   	@Produces(MediaType.APPLICATION_JSON)
   	@Consumes(MediaType.APPLICATION_JSON)
   	   public Response preuzmiKomentare(String id,@Context HttpServletRequest request){
    	String pom = id.substring(17,id.length()-2);
    	int ID = Integer.parseInt(pom);
    	//Korisnik k = (Korisnik) request.getSession().getAttribute("korisnik");
    	KorisnikDAO korisnikDAO = (KorisnikDAO) c.getAttribute("korisnikDAO");
    	List<Komentar> pomocnaLista = new ArrayList<Komentar>();
    	for(Korisnik k :korisnikDAO.getKorisnici().values()) {
    	for(Apartman a:k.getIznajmljeniApartman()) {
    		if(a.getId() == ID ) {
    			for(Komentar kom:a.getKomentar()) {
    				if(kom.getDozoli()) {
    					if(!pomocnaLista.contains(kom)) {
    						pomocnaLista.add(kom);
    					}
    				}
    			}
    		}
    	}}
    	System.out.println("pomocna lista    1111 " +pomocnaLista.size());
    	return Response.ok(pomocnaLista).status(200).build();
    		
    }
    
  
    }