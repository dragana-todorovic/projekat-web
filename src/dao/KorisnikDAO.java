package dao;

import java.io.File;
import java.io.IOException;
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
	 * @param contextPath Putanja do aplikacije u Tomcatu. Mo�e se pristupiti samo iz servleta.
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

	
	public void sacuvajKorisnike(String contextPath) {
		ObjectMapper objectMapper = new ObjectMapper();
		List<Korisnik> korisniciLista = new ArrayList<>();
		korisniciLista.addAll(korisnici.values());

		try {
			File file = new File(contextPath + "/korisnici.json");
			objectMapper.writerWithDefaultPrettyPrinter().writeValue(file, korisniciLista);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}
	
	
	
	/**
	 * U�itava korisnike iz WebContent/users.txt fajla i dodaje ih u mapu {@link #users}.
	 * Klju� je korisni�ko ime korisnika.
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
			if(file.exists()) {
			List<Korisnik> kori = objectMapper.readValue(file, objectMapper.getTypeFactory().constructCollectionType(List.class, Korisnik.class));
		
			for(Korisnik u : kori)
			{
				korisnici.put(u.getKorisnickoIme(),u);
			}
			}
			
			
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
	

	
	public Korisnik izmijeniKorisnika(Korisnik korisnik,String contextPath) {
		Korisnik korisnikZaIzmjenu = korisnici.containsKey(korisnik.getKorisnickoIme()) ? korisnici.get(korisnik.getKorisnickoIme()) : null;
		if(korisnikZaIzmjenu != null) {
			korisnikZaIzmjenu.setIme(korisnik.getIme());
			korisnikZaIzmjenu.setPrezime(korisnik.getPrezime());
			korisnikZaIzmjenu.setPol(korisnik.getPol());
			korisnikZaIzmjenu.setLozinka(korisnik.getLozinka());
			korisnici.put(korisnikZaIzmjenu.getKorisnickoIme(), korisnikZaIzmjenu);
			sacuvajKorisnike(contextPath);
			return korisnik;
		} else {
			return null;
		}
		
	}
	
}
