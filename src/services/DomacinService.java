package services;


import com.fasterxml.jackson.core.json.JsonReadContext;

import java.io.IOException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Collection;
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
   	@Path("/vratiRezervacije")
   	@Produces(MediaType.APPLICATION_JSON)
   	@Consumes(MediaType.APPLICATION_JSON)
   	   public Response vratiRezervacije(String id,@Context HttpServletRequest request){
    	String pom = id.substring(13,id.length()-2);
		int ID = Integer.parseInt(pom);		
		List<Rezervacija>pomocna = new ArrayList<Rezervacija>();
    	Korisnik domacin = (Korisnik) request.getSession().getAttribute("korisnik");
    	if(domacin!=null) {
    	for(Apartman a:domacin.getApartmanZaIzdavanje()) {
    		if(a.getId()== ID) {
    			
    			pomocna = a.getRezervacije();
    			return Response.ok(pomocna).status(200).build();
    		}
    	}}

    	return Response.status(400).build();
    		
    		
    }
    
    @POST
   	@Path("/pretraziPoDatumima1")
   	@Produces(MediaType.APPLICATION_JSON)
   	@Consumes(MediaType.APPLICATION_JSON)
   	   public Response pretrazi(PretragaPoDatumima datum,@Context HttpServletRequest request){
       	Korisnik k = (Korisnik) request.getSession().getAttribute("korisnik");
       		long brojDana = 0;
   		   LocalDate pocetni;
   		   LocalDate krajnji;
   		   List<Apartman> pomocnaLista = new ArrayList<Apartman>();
   		   List<LocalDate> pomocniDatumi = new ArrayList<LocalDate>();
   		   
   		   if(datum.getOd()!=null && datum.getDoo()!=null) {
   			   pocetni = LocalDate.parse(datum.getOd(),DateTimeFormatter.ofPattern("dd/MM/yyyy"));
   			   krajnji = LocalDate.parse(datum.getDoo(),DateTimeFormatter.ofPattern("dd/MM/yyyy"));
   			   long izmedju = ChronoUnit.DAYS.between(pocetni, krajnji);
   			   brojDana = izmedju;
   			   for(int i = 0;i<brojDana;i++) {
   				   pomocniDatumi.add(pocetni.plusDays(i));
   			   }
   			   if(k!=null) {
   					   for(Apartman a:k.getApartmanZaIzdavanje()) {
   						   if(!a.obrisan && a.getStatus().equals(Status.aktivno)) {
   							   List<LocalDate> datumi1 = new ArrayList<LocalDate>();
   							   for(String d : a.getDatumZaIzdavanje()) {
   								   datumi1.add(LocalDate.parse(d,DateTimeFormatter.ofPattern("dd/MM/yyyy")));
   							   }
   							for(LocalDate ld:pomocniDatumi) {
   								if(datumi1.contains(ld)) {
   									if(!pomocnaLista.contains(a)) {
   										pomocnaLista.add(a);
   									}
   								}
   							}
   						   }
   						   
   					   }
   				   }}
   		   return Response.ok(pomocnaLista).status(200).build();
   		   
   		
       } 
    
    @POST
   	@Path("/promijeniStatus")
   	@Produces(MediaType.APPLICATION_JSON)
   	@Consumes(MediaType.APPLICATION_JSON)
   	   public Response promijeniStatus(String id,@Context HttpServletRequest request){
    	String pom = id.substring(18,id.length()-2);
		int ID = Integer.parseInt(pom);	
		String gost="";
		Boolean uspjesno = false;
		Apartman apart = new Apartman();
		KorisnikDAO korisnikDAO = (KorisnikDAO) c.getAttribute("korisnikDAO");
    	Korisnik domacin = (Korisnik) request.getSession().getAttribute("korisnik");
    	if(domacin != null ) {
    	for(Apartman a:domacin.getApartmanZaIzdavanje()) {
    		for(Rezervacija r:a.getRezervacije()) {
    			if(r.getId() == ID && r.getStatus().equals(StatusRezervacije.kreirana)) {
    				uspjesno = true;
    				gost = r.getGost();
    				r.setStatus(StatusRezervacije.prihvacena);
    				apart = a;		
    				String pocetniDatum = r.getPocetniDatum();
    				System.out.println("pocetni datum"+pocetniDatum);
    				LocalDate pocetniD = LocalDate.parse(pocetniDatum,DateTimeFormatter.ofPattern("dd/MM/yyyy"));
    				for(int i =0;i<r.getBrojNocenja();i++) {
    					
    				String pomoc =DateTimeFormatter.ofPattern("dd/MM/yyyy").format(pocetniD.plusDays(i));
    				
    				System.out.println("pomoc"+pomoc);
    				a.getDatumZaIzdavanje().remove(pomoc);
    				
    				}
    	
    			}
    		}  		
    		}
    	}
    	if(!uspjesno) {
    		return Response.status(400).build();
    	}
    	
    	for(Korisnik k:korisnikDAO.getKorisnici().values()) {
    		if(k.getUloga().equals(Uloga.gost)){
    			for(Rezervacija rez:k.getRezervacije()) {
    				System.out.println("id druge" + rez.getId());
    				if(rez.getId() == ID) {
    				if(rez.getStatus().equals(StatusRezervacije.kreirana)) {
    					rez.setStatus(StatusRezervacije.prihvacena);   					
        				
    				}}
    			}
    		}
    	}
    	
    	for(Korisnik k:korisnikDAO.getKorisnici().values()) {
    		if(k.getUloga().equals(Uloga.gost)){
    			if(k.getKorisnickoIme().equals(gost)) {
    				k.getIznajmljeniApartman().add(apart);
    			}
    			
    		}}
    	
    	String contextPath = c.getRealPath("");
		korisnikDAO.sacuvajKorisnike(contextPath);
		return  Response.status(200).build();
    		
    		
    }
    @POST
   	@Path("/odbij")
   	@Produces(MediaType.APPLICATION_JSON)
   	@Consumes(MediaType.APPLICATION_JSON)
   	   public Response odbij(String id,@Context HttpServletRequest request){
    	String pom = id.substring(15,id.length()-2);
		int ID = Integer.parseInt(pom);	
		System.out.println("Iddddd" + ID);
		String gost="";
		Boolean uspjesno = false;
		KorisnikDAO korisnikDAO = (KorisnikDAO) c.getAttribute("korisnikDAO");
    	Korisnik domacin = (Korisnik) request.getSession().getAttribute("korisnik");
    	if(domacin!=null) {
    	for(Apartman a:domacin.getApartmanZaIzdavanje()) {
    		for(Rezervacija r:a.getRezervacije()) {
    			if(r.getId() == ID  ) {
    				if(r.getStatus().equals(StatusRezervacije.prihvacena)) {
    				gost = r.getGost();    					
    				String pocetniDatum = r.getPocetniDatum();
    				LocalDate pocetniD = LocalDate.parse(pocetniDatum,DateTimeFormatter.ofPattern("dd/MM/yyyy"));
    				for(int i =0;i<r.getBrojNocenja();i++) {    					
    				String pomoc =DateTimeFormatter.ofPattern("dd/MM/yyyy").format(pocetniD.plusDays(i));   				
    				a.getDatumZaIzdavanje().add(pomoc);    				
    				}
    				r.setStatus(StatusRezervacije.odbijena);   	
    			}
    				if(r.getStatus().equals(StatusRezervacije.kreirana)) {
    					r.setStatus(StatusRezervacije.odbijena);
    				}
    			}	
    		}
    	} }	
    	for(Korisnik k:korisnikDAO.getKorisnici().values()) {
    		if(k.getUloga().equals(Uloga.gost)){
    			for(Rezervacija rez:k.getRezervacije()) {
    				if(rez.getId() == ID) {
    				if(rez.getStatus().equals(StatusRezervacije.prihvacena) || rez.getStatus().equals(StatusRezervacije.kreirana)) {
    					rez.setStatus(StatusRezervacije.odbijena);   					
        				
    				}}
    			}
    		}
    	}
    	for(Korisnik k:korisnikDAO.getKorisnici().values()) {
    		if(k.getUloga().equals(Uloga.gost)){
    			for(Apartman ap:k.getIznajmljeniApartman()) {
    				for(Rezervacija rez:ap.getRezervacije()) {
    					if(rez.getId() == ID) {
    						if(rez.getStatus().equals(StatusRezervacije.prihvacena)) {
    						String pocetniDatum1 = rez.getPocetniDatum();
    	    				LocalDate pocetniD1 = LocalDate.parse(pocetniDatum1,DateTimeFormatter.ofPattern("dd/MM/yyyy"));
    	    				for(int i =0;i<rez.getBrojNocenja();i++) {    					
    	    				String pomoc =DateTimeFormatter.ofPattern("dd/MM/yyyy").format(pocetniD1.plusDays(i));   				
    	    				ap.getDatumZaIzdavanje().add(pomoc);    				
    	    				}
    	    				rez.setStatus(StatusRezervacije.odbijena);   	
    	    			
    			}
    						if(rez.getStatus().equals(StatusRezervacije.kreirana)) {
    							rez.setStatus(StatusRezervacije.odbijena);
				}
    						
    		}}}}}
    	
    	String contextPath = c.getRealPath("");
		korisnikDAO.sacuvajKorisnike(contextPath);
		return  Response.status(200).build();	
    }
    
    
    @POST
   	@Path("/zavrsi")
   	@Produces(MediaType.APPLICATION_JSON)
   	@Consumes(MediaType.APPLICATION_JSON)
   	   public Response zavrsi(String id,@Context HttpServletRequest request){
    	String pom = id.substring(15,id.length()-2);
		int ID = Integer.parseInt(pom);	
		System.out.println("Iddddd" + ID);
		Boolean uspjesno = false;
		int idd = -1;
		KorisnikDAO korisnikDAO = (KorisnikDAO) c.getAttribute("korisnikDAO");
    	Korisnik domacin = (Korisnik) request.getSession().getAttribute("korisnik");
    	if(domacin!=null) {
    	for(Apartman a:domacin.getApartmanZaIzdavanje()) {
    		for(Rezervacija r:a.getRezervacije()) {
    			if(r.getId() == ID  ) {
    				if(r.getStatus().equals(StatusRezervacije.prihvacena)) {					
    				String pocetniDatum = r.getPocetniDatum();
    				LocalDate pocetniD = LocalDate.parse(pocetniDatum,DateTimeFormatter.ofPattern("dd/MM/yyyy"));
    				int brojNocenja = r.getBrojNocenja();
    				LocalDate pomocna = pocetniD.plusDays(brojNocenja);
    				if(pomocna.isBefore(LocalDate.now())) {
    					System.out.println("usaooo a nije trebao");
    					r.setStatus(StatusRezervacije.zavrsena);
    					uspjesno = true;
    				}
    				}
    			}
    		}
    	}}
    	
    	for(Korisnik kor:korisnikDAO.getKorisnici().values()) {
    		if(kor.getUloga().equals(Uloga.gost)) {
    		for(Apartman ap:kor.getIznajmljeniApartman()) {
        		for(Rezervacija r:ap.getRezervacije()) {
        			if(r.getId() == ID  ) {
        				if(r.getStatus().equals(StatusRezervacije.prihvacena)) {					
        				String pocetniDatum = r.getPocetniDatum();
        				LocalDate pocetniD = LocalDate.parse(pocetniDatum,DateTimeFormatter.ofPattern("dd/MM/yyyy"));
        				int brojNocenja = r.getBrojNocenja();
        				LocalDate pomocna = pocetniD.plusDays(brojNocenja);
        				if(pomocna.isBefore(LocalDate.now())) {
        					r.setStatus(StatusRezervacije.zavrsena);
        					uspjesno = true;
        				}
        				}
        			}
        		}
        	}}
    	}
    	
    	for(Korisnik kor:korisnikDAO.getKorisnici().values()) {
    		if(kor.getUloga().equals(Uloga.gost)) {
    			for(Rezervacija r:kor.getRezervacije()) {
    				if(r.getId() == ID  ) {
    					if(r.getStatus().equals(StatusRezervacije.prihvacena)) {	
    				r.setStatus(StatusRezervacije.zavrsena);
    				uspjesno = true;}}
    			}
    	}}
    	if(!uspjesno) {
    		System.out.println("blablabla");
    		return Response.status(400).build();
    	} else {		
    	String contextPath = c.getRealPath("");
		korisnikDAO.sacuvajKorisnike(contextPath);
		return  Response.status(200).build();	
    	}
    }
  
  
    @POST
	@Path("/dodajApartman")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	   public Response dodajApartman(PomocnaKlasa pomocna,@Context HttpServletRequest request){
		List<Integer> pomocnaLista = new ArrayList<Integer>();
    	String[] pom = pomocna.getSadrzajApartmana().trim().split(",");
    	if(pomocna.getSadrzajApartmana()!="") {
		for (int i = 0; i < pom.length; i++)
		{
			System.out.println(pom[i]);
			pomocnaLista.add(Integer.parseInt(pom[i]));
		}}
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
		a.setSlika(pomocna.getSlika());
		
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
    		List<SadrzajApartmana> pomocniSadrzaj = new ArrayList<SadrzajApartmana>();
    		if(k != null && k.getApartmanZaIzdavanje() != null) {
    			for(Apartman a:k.getApartmanZaIzdavanje()) {
    				if(a.getStatus().equals(Status.neaktivno) && !a.obrisan) {
    					for (SadrzajApartmana s: a.getSadrzajApartmana()) {
    	        			if(!s.obrisan) {
    	        				pomocniSadrzaj.add(s);
    	        				
    	        			}}
    					a.setSadrzajApartmana(pomocniSadrzaj);
    					pomocniSadrzaj = new ArrayList<SadrzajApartmana>();
    					pomocnaLista.add(a);
    				}
    			}
    		}
    		return pomocnaLista;
    		
    }
    
    @GET
   	@Path("/vratiAktivne")
   	@Produces(MediaType.APPLICATION_JSON)
   	@Consumes(MediaType.APPLICATION_JSON)
   	   public List<Apartman> preuzmiAktivne(@Context HttpServletRequest request){
    		Korisnik k = (Korisnik) request.getSession().getAttribute("korisnik");
    	    		List<Apartman> pomocnaLista = new ArrayList<Apartman>();
    		List<SadrzajApartmana> pomocniSadrzaj = new ArrayList<SadrzajApartmana>();
    		if(k != null && k.getApartmanZaIzdavanje() != null) {
    			for(Apartman a:k.getApartmanZaIzdavanje()) {
    				if(a.getStatus().equals(Status.aktivno) && !a.obrisan) {
    					for (SadrzajApartmana s: a.getSadrzajApartmana()) {
    	        			if(!s.obrisan) {
    	        				pomocniSadrzaj.add(s);
    	        				
    	        			}}
    					a.setSadrzajApartmana(pomocniSadrzaj);
    					pomocniSadrzaj = new ArrayList<SadrzajApartmana>();
    					pomocnaLista.add(a);
    				}
    			}
    		}
    		return pomocnaLista;
    		
    }
    
    @GET
   	@Path("/vratiSveAktivne")
   	@Produces(MediaType.APPLICATION_JSON)
   	@Consumes(MediaType.APPLICATION_JSON)
   	   public List<Apartman> vratiAktivne(@Context HttpServletRequest request){	
    		KorisnikDAO korisnikDAO = (KorisnikDAO) c.getAttribute("korisnikDAO");
    		List<Apartman> pomocnaLista = new ArrayList<Apartman>();
    		List<SadrzajApartmana> pomocniSadrzaj = new ArrayList<SadrzajApartmana>();
    		for(Korisnik k: korisnikDAO.getKorisnici().values()) {
    		if(k != null) {
    			for(Apartman a:k.getApartmanZaIzdavanje()) {
    				if(a.getStatus().equals(Status.aktivno) && !a.obrisan) {
    					for (SadrzajApartmana s: a.getSadrzajApartmana()) {
    	        			if(!s.obrisan) {
    	        				pomocniSadrzaj.add(s);
    	        				
    	        			}}
    					a.setSadrzajApartmana(pomocniSadrzaj);
    					pomocniSadrzaj = new ArrayList<SadrzajApartmana>();
    					pomocnaLista.add(a);
    				}
    			}
    		}
    		}
    		System.out.println("velicina" + pomocnaLista.size());
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
        if(k!=null) {
    	for(Apartman a: k.getApartmanZaIzdavanje()){
       		if(a.getId() == ID) {
       			a.obrisan = true;
       			a.getRezervacije().clear();
       			String contextPath = c.getRealPath("");
       			kd.sacuvajKorisnike(contextPath);
       			return Response.status(200).build();
       		}
       	}}
    	
       	return Response.status(400).build();
       }
    
    @POST
	@Path("/preuzmiApartmanPoId")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
    public Response preuzmiApartmanPoId(String id,@Context HttpServletRequest request) {
    	String pom = id.substring(18,id.length()-2);
       	int ID = Integer.parseInt(pom);
       	KorisnikDAO kd = (KorisnikDAO) c.getAttribute("korisnikDAO"); 
        Korisnik k = (Korisnik) request.getSession().getAttribute("korisnik");
        if(k!=null) {
       	for(Apartman a: k.getApartmanZaIzdavanje()){
       		if(a.getId() == ID) {
    			return Response.ok(a).status(200).build();
    		}
    	}}
    	return Response.status(400).build();
    }
    @POST
   	@Path("/postojeciSadrzaj")
   	@Produces(MediaType.APPLICATION_JSON)
   	@Consumes(MediaType.APPLICATION_JSON)
       public Response postojeciSadrzaj(String id,@Context HttpServletRequest request) {
        String IDpom = id.substring(6, id.length()-1);
        int ID = Integer.parseInt(IDpom);
    	
    	Korisnik k = (Korisnik) request.getSession().getAttribute("korisnik");
        List<SadrzajApartmana>pomocna = new ArrayList<SadrzajApartmana>();
        if(k!=null) {
        for(Apartman a:k.getApartmanZaIzdavanje()) {
        	if(a.getId() == ID) {
        		for (SadrzajApartmana s: a.getSadrzajApartmana()) {
        			if(!s.obrisan) {
        				if(!pomocna.contains(s)) {
        				pomocna.add(s);
        				}
        			}
        		}
        	}
        }
        }
        return Response.ok(pomocna).status(200).build();
       }
    @POST
   	@Path("/nepostojeciSadrzaj")
   	@Produces(MediaType.APPLICATION_JSON)
   	@Consumes(MediaType.APPLICATION_JSON)
       public Response nepostojeciSadrzaj(String id,@Context HttpServletRequest request) {
    	 String IDpom = id.substring(6, id.length()-1);
         int ID = Integer.parseInt(IDpom); 

    	Korisnik k = (Korisnik) request.getSession().getAttribute("korisnik");
        List<SadrzajApartmana>pomocna = new ArrayList<SadrzajApartmana>();
    	SadrzajDAO sadrzajDAO = (SadrzajDAO) c.getAttribute("sadrzajDAO"); 
       	for(SadrzajApartmana s:sadrzajDAO.getSadrzaj().values()) {
       		if(!s.obrisan) {
       			pomocna.add(s);
       	}}
       	for(SadrzajApartmana sa:pomocna) {
       	System.out.println("nepostojeci sadrzaj prije    " + sa.getNaziv());}
       	if(k!=null) {
       	for(Apartman a:k.getApartmanZaIzdavanje()) {
        	if(a.getId() == ID) {
        		for(SadrzajApartmana sa: a.getSadrzajApartmana()) {
        			pomocna.remove(sa);
        		}
        	}
       	}}
       	for(SadrzajApartmana sa:pomocna) {
           	System.out.println("nepostojeci sadrzaj poslije    " + sa.getNaziv());}
       
        return Response.ok(pomocna).status(200).build();
       
    }  
    @POST
   	@Path("/izmijeniApartman")
   	@Produces(MediaType.APPLICATION_JSON)
   	@Consumes(MediaType.APPLICATION_JSON)
       public Response izmijeniPodatke(PomocnaKlasa pomocna,@Context HttpServletRequest request) {
    	List<Integer> pomocnaLista = new ArrayList<Integer>();
    	String[] pom = pomocna.getSadrzajApartmana().trim().split(",");
    	if(pomocna.getSadrzajApartmana()!="") {   		
		for (int i = 0; i < pom.length; i++)
		{
			pomocnaLista.add(Integer.parseInt(pom[i]));
		}}
		KorisnikDAO korisnikDAO = (KorisnikDAO) c.getAttribute("korisnikDAO");
		SadrzajDAO sadrzajDAO = (SadrzajDAO) c.getAttribute("sadrzajDAO"); 
		Korisnik k = (Korisnik) request.getSession().getAttribute("korisnik");
		List<SadrzajApartmana> pomocniSadrzaj = new ArrayList<SadrzajApartmana>();
		if(k!=null) {
		for(Apartman a: k.getApartmanZaIzdavanje()) {
			if(a.getId() == pomocna.getId()) {
				if(pomocnaLista.size() == 0 && a.getSadrzajApartmana().size()!=0) {
					a.getSadrzajApartmana().clear();
				}

				for(SadrzajApartmana s:sadrzajDAO.getSadrzaj().values()) {
					for(int i =0;i < pomocnaLista.size();i++) {
					if (s.getId() == pomocnaLista.get(i))
					{
						pomocniSadrzaj.add(s);
					}
				}}

					a.setSadrzajApartmana(pomocniSadrzaj);
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
					a.setStatus(pomocna.getStatus());
					a.setRezervacije(new ArrayList<Rezervacija>());
					a.setSlika(pomocna.getSlika());
				
		
		
				String[] datumi = pomocna.getDatumiZaIzdavanje().split(",");
				List<String> pomocnaa = new ArrayList<String>();
				for(int i = 0;i < datumi.length;i++)
				{
					pomocnaa.add(datumi[i]);
					
					
				}
				a.setDatumZaIzdavanje(pomocnaa);}
				
		}}
		String contextPath = c.getRealPath("");
		korisnikDAO.sacuvajKorisnike(contextPath);
			   return  Response.status(200).build();
		
    }
    @POST
   	@Path("/vratiKomentare")
   	@Produces(MediaType.APPLICATION_JSON)
   	@Consumes(MediaType.APPLICATION_JSON)
   	   public Response preuzmiKomentare(String id,@Context HttpServletRequest request){
    	String pom = id.substring(17,id.length()-2);
    	int ID = Integer.parseInt(pom);
    	Korisnik k = (Korisnik) request.getSession().getAttribute("korisnik");
    	List<Komentar> pomocnaLista = new ArrayList<Komentar>();
    	if(k!=null) {
    	for(Apartman a:k.getApartmanZaIzdavanje()) {
    		System.out.println(k.getApartmanZaIzdavanje().size());
    		if(a.getId() == ID) {
    			pomocnaLista = a.getKomentar();
    		}
    	}}
    	return Response.ok(pomocnaLista).status(200).build();
    		
    }
    
    @POST
   	@Path("/dozvoliKom")
   	@Produces(MediaType.APPLICATION_JSON)
   	@Consumes(MediaType.APPLICATION_JSON)
   	   public Response dozvoliKom(String id,@Context HttpServletRequest request){
    	Boolean uspjesno = false;
    	String pom = id.substring(18,id.length()-2);
    	int ID = Integer.parseInt(pom);
    	KorisnikDAO korisnikDAO = (KorisnikDAO) c.getAttribute("korisnikDAO");
    	Korisnik k = (Korisnik) request.getSession().getAttribute("korisnik");
    	if(k!=null) {
    	for(Apartman a:k.getApartmanZaIzdavanje()) {
    		for(Komentar kom:a.getKomentar()) {
    			if(kom.getId() == ID) {
    				uspjesno = true;
    				kom.setDozoli(true);
    			}
    			
    		}
    	}}
    	for(Korisnik kor:korisnikDAO.getKorisnici().values()) {
    		if(kor.getUloga().equals(Uloga.gost)) {
    			for(Apartman ap:kor.getIznajmljeniApartman()) {
    				for(Komentar kom1:ap.getKomentar()) {
    					if(kom1.getId() == ID) {
    						kom1.setDozoli(true);
    					}
    				}
    			}
    		}
    	}
    	if(!uspjesno) {
    		return Response.status(400).build();
    	}
    	String contextPath = c.getRealPath("");
		korisnikDAO.sacuvajKorisnike(contextPath);
		return Response.status(200).build();
    }
    
    @POST
   	@Path("/zabraniKom")
   	@Produces(MediaType.APPLICATION_JSON)
   	@Consumes(MediaType.APPLICATION_JSON)
   	   public Response ZabraniKom(String id,@Context HttpServletRequest request){
    	Boolean uspjesno = false;
    	String pom = id.substring(15,id.length()-2);
    	int ID = Integer.parseInt(pom);
    	KorisnikDAO korisnikDAO = (KorisnikDAO) c.getAttribute("korisnikDAO");
    	Korisnik k = (Korisnik) request.getSession().getAttribute("korisnik");
    	if(k!=null) {
    	for(Apartman a:k.getApartmanZaIzdavanje()) {
    		for(Komentar kom:a.getKomentar()) {
    			if(kom.getId() == ID) {
    				uspjesno = true;
    				kom.setDozoli(false);
    			}
    			
    		}
    	}}
    	for(Korisnik kor:korisnikDAO.getKorisnici().values()) {
    		if(kor.getUloga().equals(Uloga.gost)) {
    			for(Apartman ap:kor.getIznajmljeniApartman()) {
    				for(Komentar kom1:ap.getKomentar()) {
    					if(kom1.getId() == ID) {
    						kom1.setDozoli(false);
    					}
    				}
    			}
    		}
    	}
    	if(!uspjesno) {
    		return Response.status(400).build();
    	}
    	String contextPath = c.getRealPath("");
		korisnikDAO.sacuvajKorisnike(contextPath);
    return Response.status(200).build();
    }
}