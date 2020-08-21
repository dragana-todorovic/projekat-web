package dao;

import java.io.File;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;

import beans.Korisnik;
import beans.Pol;


public class KorisnikDAO {
	private HashMap<String, Korisnik> korisnici = new HashMap<>();
	
	public KorisnikDAO() {
		// TODO Auto-generated constructor stub
	}
	
	/***
	 * @param contextPath Putanja do aplikacije u Tomcatu. Može se pristupiti samo iz servleta.
	 */
	public KorisnikDAO(String contextPath) {
		ucitajKorisnike(contextPath);
	}
	
	public Korisnik pronadjiKorisnika(String username, String password) {
		if (!korisnici.containsKey(username)) {
			return null;
		}
		Korisnik korisnik = korisnici.get(username);
		if (!korisnik.getLozinka().equals(password)) {
			return null;
		}
		return korisnik;
	}
	
	public HashMap<String, Korisnik> getKorisnici() {
		return korisnici;
	}

	public void setKorisnici(HashMap<String, Korisnik> users) {
		this.korisnici = korisnici;
	}

	public boolean pronadjiPoKorisnickom(String username) {
		if (!korisnici.containsKey(username)) {
			return false;
		}
		
		return true;
	}
	
	public Korisnik pretragaKorisnika(String u) {
		if (!korisnici.containsKey(u)) {
			return null;
		}
		Korisnik korisnik = korisnici.get(u);
	
		return korisnik;
	}
	
	public Collection<Korisnik> pronadjiSve() {
		return korisnici.values();
	}
	
	public void dodaj(Korisnik u, String contextPath)
	{
				
		try
		{
			File file = new File(contextPath + "/korisnici.json");
			System.out.println(file.getPath());
			System.out.println(contextPath);
			ObjectMapper objectMapper = new ObjectMapper();
			objectMapper.configure(DeserializationFeature.ACCEPT_SINGLE_VALUE_AS_ARRAY, true);
			objectMapper.configure(DeserializationFeature.ACCEPT_EMPTY_STRING_AS_NULL_OBJECT, true);
			List<Korisnik> proba=new ArrayList<Korisnik>();
		
			List<Korisnik> kor = objectMapper.readValue(file, objectMapper.getTypeFactory().constructCollectionType(List.class, Korisnik.class));
			for(Korisnik g : kor)
			{
				proba.add(g);
			}
			proba.add(u);
			objectMapper.writerWithDefaultPrettyPrinter().writeValue(file, proba);
			korisnici.put(u.getKorisnickoIme(), u);
			
			System.out.println("##############" + korisnici);
		
			
		}
		catch (Exception ex) {
			System.out.println(ex);
			ex.printStackTrace();
		} finally {
			
		}
		
		
	}
	
	/**
	 * Uèitava korisnike iz WebContent/users.txt fajla i dodaje ih u mapu {@link #users}.
	 * Kljuè je korisnièko ime korisnika.
	 * @param contextPath Putanja do aplikacije u Tomcatu
	 */
	private void ucitajKorisnike(String contextPath) {
		
		try
		{
			File file = new File(contextPath + "/korisnici.json");
			System.out.println(contextPath);
			ObjectMapper objectMapper = new ObjectMapper();
			objectMapper.configure(DeserializationFeature.ACCEPT_SINGLE_VALUE_AS_ARRAY, true);
			objectMapper.configure(DeserializationFeature.ACCEPT_EMPTY_STRING_AS_NULL_OBJECT, true);
			List<Korisnik> kori = objectMapper.readValue(file, objectMapper.getTypeFactory().constructCollectionType(List.class, Korisnik.class));
			for(Korisnik k:kori)
			System.out.println("load User: "+k.getKorisnickoIme());
			for(Korisnik u : kori)
			{
				korisnici.put(u.getKorisnickoIme(),u);
			}
			
			System.out.println(korisnici);
			
		}
		catch (Exception ex) {
			System.out.println(ex);
			ex.printStackTrace();
		} finally {
			
		}
		
	}

	@Override
	public String toString() {
		return "UserDAO [users=" + korisnici + "]";
	}
	
	public void dodajuFile(HashMap<String, Korisnik> korisnici, String contextPath)
	{
				
		try
		{
			File file = new File(contextPath + "/korisnici.json");
			System.out.println(contextPath);
			ObjectMapper objectMapper = new ObjectMapper();
			objectMapper.configure(DeserializationFeature.ACCEPT_SINGLE_VALUE_AS_ARRAY, true);
			objectMapper.configure(DeserializationFeature.ACCEPT_EMPTY_STRING_AS_NULL_OBJECT, true);
			objectMapper.configure(DeserializationFeature.ACCEPT_EMPTY_ARRAY_AS_NULL_OBJECT, true);

			ArrayList<Korisnik> proba=new ArrayList<>();
			
					
			for(Korisnik g : korisnici.values())
			{
				proba.add(g);
			}
			objectMapper.writeValue(new File(contextPath + "/korisnici.json"), proba);
			
			System.out.println(korisnici +" u file");
			
		}
		catch (Exception ex) {
			System.out.println(ex);
			ex.printStackTrace();
		} finally {
			
		}
		
		
	}
	
	public Korisnik izmijeniKorisnika(Korisnik korisnik,String contextPath) {
		Korisnik korisnikZaIzmjenu = korisnici.containsKey(korisnik.getKorisnickoIme()) ? korisnici.get(korisnik.getKorisnickoIme()) : null;
		if(korisnikZaIzmjenu != null) {
			korisnikZaIzmjenu.setIme(korisnik.getIme());
			korisnikZaIzmjenu.setPrezime(korisnik.getPrezime());
			korisnikZaIzmjenu.setPol(korisnik.getPol());
			korisnikZaIzmjenu.setLozinka(korisnik.getLozinka());
			korisnici.put(korisnikZaIzmjenu.getKorisnickoIme(), korisnikZaIzmjenu);
			dodaj(korisnikZaIzmjenu,contextPath);
			return korisnikZaIzmjenu;
		} else {
			return null;
		}
		
	}
	
}
