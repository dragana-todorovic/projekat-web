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
import beans.SadrzajApartmana;

public class SadrzajDAO {
private HashMap<Integer, SadrzajApartmana> sadrzaj = new HashMap<>();
	
	public SadrzajDAO() {
		// TODO Auto-generated constructor stub
	}
	
	/***
	 * @param contextPath Putanja do aplikacije u Tomcatu. Mo�e se pristupiti samo iz servleta.
	 */
	public SadrzajDAO(String contextPath) {
		ucitajSadrzaj(contextPath);
	}
	

	
	public HashMap<Integer, SadrzajApartmana> getSadrzaj() {
		return sadrzaj;
	}

	public void setSadrzaj(HashMap<Integer, SadrzajApartmana> sadrzaj) {
		this.sadrzaj = sadrzaj;
	}


	public Collection<SadrzajApartmana> pronadjiSve() {
		return sadrzaj.values();
	}

	
	public void sacuvajSadrzaj(String contextPath) {
		ObjectMapper objectMapper = new ObjectMapper();
		List<SadrzajApartmana> sadrzajLista = new ArrayList<>();
		sadrzajLista.addAll(sadrzaj.values());

		try {
			File file = new File(contextPath + "/sadrzaj.json");
			objectMapper.writerWithDefaultPrettyPrinter().writeValue(file, sadrzajLista);
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
	private void ucitajSadrzaj(String contextPath) {
		
		try
		{
			File file = new File(contextPath + "/sadrzaj.json");
			System.out.println(contextPath);
			ObjectMapper objectMapper = new ObjectMapper();
			objectMapper.configure(DeserializationFeature.ACCEPT_SINGLE_VALUE_AS_ARRAY, true);
			objectMapper.configure(DeserializationFeature.ACCEPT_EMPTY_STRING_AS_NULL_OBJECT, true);
			List<SadrzajApartmana> sad = objectMapper.readValue(file, objectMapper.getTypeFactory().constructCollectionType(List.class, SadrzajApartmana.class));
			for(SadrzajApartmana s:sad)
			System.out.println("load Sadrzaj: "+ s.getId());
			for(SadrzajApartmana u : sad)
			{
				sadrzaj.put(u.getId(), u);
			}
			
			System.out.println(sadrzaj);
			
		}
		catch (Exception ex) {
			System.out.println(ex);
			ex.printStackTrace();
		} finally {
			
		}
		
	}

	@Override
	public String toString() {
		return "UserDAO [sadrzaj=" + sadrzaj + "]";
	}
	public SadrzajApartmana izmijeniSadrzaj(SadrzajApartmana s,String contextPath) {
		SadrzajApartmana sadrzajZaIzmjenu = sadrzaj.containsKey(s.getId()) ? sadrzaj.get(s.getId()) : null;
		if(sadrzajZaIzmjenu != null) {
			sadrzajZaIzmjenu.setNaziv(s.getNaziv());
			sadrzaj.put(sadrzajZaIzmjenu.getId(), sadrzajZaIzmjenu);
			
			sacuvajSadrzaj(contextPath);
			return s;
		} else {
			return null;
		}
		
	}

}
