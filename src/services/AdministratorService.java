package services;

import java.io.IOException;
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
        KorisnikDAO kd=(KorisnikDAO) c.getAttribute("korisnikDAO");
    	for(SadrzajApartmana sad:sadrzajDAO.getSadrzaj().values()){
       		if(sad.getId() == ID) {
       			sad.obrisan = true;       			
       			String contextPath = c.getRealPath("");
       			sadrzajDAO.sacuvajSadrzaj(contextPath);
       			
       			for(Korisnik k:kd.getKorisnici().values()) {
       				if(k!=null && k.getApartmanZaIzdavanje()!=null) {
       				for(Apartman a:k.getApartmanZaIzdavanje()) {
       					
       					for(SadrzajApartmana s:a.getSadrzajApartmana()) {
       						if(s.getId()==ID) {
       							s.obrisan=true;
       							kd.sacuvajKorisnike(contextPath);
       						}
       					}
       				}}
       			}
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
    
    @GET
   	@Path("/vratiSveApartmane")
   	@Produces(MediaType.APPLICATION_JSON)
   	@Consumes(MediaType.APPLICATION_JSON)
   	   public List<Apartman> vratiApartmane(@Context HttpServletRequest request){	
    		KorisnikDAO korisnikDAO = (KorisnikDAO) c.getAttribute("korisnikDAO");
    		List<Apartman> pomocnaLista = new ArrayList<Apartman>();
    		List<SadrzajApartmana> pomocniSadrzaj = new ArrayList<SadrzajApartmana>();
    		for(Korisnik k: korisnikDAO.getKorisnici().values()) {
    		if(k != null) {
    			for(Apartman a:k.getApartmanZaIzdavanje()) {
    				if( !a.obrisan) {
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
   	@Path("/obrisiApartman1")
   	@Produces(MediaType.APPLICATION_JSON)
   	@Consumes(MediaType.APPLICATION_JSON)
       public Response obrisi(String id,@Context HttpServletRequest request) {
       	String pom = id.substring(16,id.length()-2);
       	int ID = Integer.parseInt(pom);
       	KorisnikDAO korisnikDAO = (KorisnikDAO) c.getAttribute("korisnikDAO");
        for(Korisnik k: korisnikDAO.getKorisnici().values()) {
    		if(k != null) {
	    	for(Apartman a: k.getApartmanZaIzdavanje()){
	    		System.out.println("usao u for");
	       		if(a.getId() == ID) {
	       			a.obrisan = true;       			
	       			String contextPath = c.getRealPath("");
	       			korisnikDAO.sacuvajKorisnike(contextPath);
	       			return Response.status(200).build();
	       		}
       	}}}
       	return Response.status(400).build();
       }
    
    @POST
	@Path("/preuzmiApartmanPoId1")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
    public Response preuzmiApartmanPoId(String id,@Context HttpServletRequest request) {
    	String pom = id.substring(18,id.length()-2);
       	int ID = Integer.parseInt(pom);
       	KorisnikDAO korisnikDAO = (KorisnikDAO) c.getAttribute("korisnikDAO");
        for(Korisnik k: korisnikDAO.getKorisnici().values()) {
    		if(k != null) {
       	for(Apartman a: k.getApartmanZaIzdavanje()){
       		if(a.getId() == ID) {
    			return Response.ok(a).status(200).build();
    		}
    	}
    		}}
    	return Response.status(400).build();
    }
    @POST
   	@Path("/postojeciSadrzaj1")
   	@Produces(MediaType.APPLICATION_JSON)
   	@Consumes(MediaType.APPLICATION_JSON)
       public Response postojeciSadrzaj(String id,@Context HttpServletRequest request) {
        String IDpom = id.substring(6, id.length()-1);
        int ID = Integer.parseInt(IDpom);
        List<SadrzajApartmana>pomocna = new ArrayList<SadrzajApartmana>();
        KorisnikDAO korisnikDAO = (KorisnikDAO) c.getAttribute("korisnikDAO");
        for(Korisnik k: korisnikDAO.getKorisnici().values()) {
    		if(k != null) {
        
        for(Apartman a:k.getApartmanZaIzdavanje()) {
        	if(a.getId() == ID) {
        		for (SadrzajApartmana s: a.getSadrzajApartmana()) {
        			if(!s.obrisan) {
        				pomocna.add(s);
        			}
        		}
        	}
        }}}

        return Response.ok(pomocna).status(200).build();
       }
    @POST
   	@Path("/nepostojeciSadrzaj1")
   	@Produces(MediaType.APPLICATION_JSON)
   	@Consumes(MediaType.APPLICATION_JSON)
       public Response nepostojeciSadrzaj(String id,@Context HttpServletRequest request) {
    	 String IDpom = id.substring(6, id.length()-1);
         int ID = Integer.parseInt(IDpom); 

    	
        List<SadrzajApartmana>pomocna = new ArrayList<SadrzajApartmana>();
    	SadrzajDAO sadrzajDAO = (SadrzajDAO) c.getAttribute("sadrzajDAO"); 
       	for(SadrzajApartmana s:sadrzajDAO.getSadrzaj().values()) {
       		if(!s.obrisan) {
       			pomocna.add(s);
       	}}
        KorisnikDAO korisnikDAO = (KorisnikDAO) c.getAttribute("korisnikDAO");
        for(Korisnik k: korisnikDAO.getKorisnici().values()) {
    		if(k != null) {
       	for(Apartman a:k.getApartmanZaIzdavanje()) {
        	if(a.getId() == ID) {
        		Iterator<SadrzajApartmana> it = pomocna.iterator();
               	int i =0;
               	while(i<a.getSadrzajApartmana().size() && it.hasNext()) {
               		it.next();
               		it.remove();
               		i++;
               	}
        		
        	}
       	}}}
       
        return Response.ok(pomocna).status(200).build();
       
    }  
    @POST
   	@Path("/izmijeniApartman1")
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
		List<SadrzajApartmana> pomocniSadrzaj = new ArrayList<SadrzajApartmana>();
		 
	        for(Korisnik k: korisnikDAO.getKorisnici().values()) {
	    		if(k != null) {
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
				for (SadrzajApartmana ps: pomocniSadrzaj) {
					System.out.println("pomocni sadrzaj" + ps.getNaziv());
				}
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
				}
		
		
				String[] datumi = pomocna.getDatumiZaIzdavanje().split(",");
				List<String> pomocnaa = new ArrayList<String>();
				for(int i = 0;i < datumi.length;i++)
				{
					pomocnaa.add(datumi[i]);
					
					
				}
				a.setDatumZaIzdavanje(pomocnaa);
				
		}}}
		String contextPath = c.getRealPath("");
		korisnikDAO.sacuvajKorisnike(contextPath);
			   return  Response.status(200).build();
		
    }
}