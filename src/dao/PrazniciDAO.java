package dao;

import java.io.File;
import java.io.IOException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;

import beans.Korisnik;
import beans.Praznik;
import beans.SadrzajApartmana;

public class PrazniciDAO {
private HashMap<Integer, Praznik> praznici = new HashMap<>();
	
	public PrazniciDAO() {
		// TODO Auto-generated constructor stub
	}
	
	/***
	 * @param contextPath Putanja do aplikacije u Tomcatu. Mo�e se pristupiti samo iz servleta.
	 */
	public PrazniciDAO(String contextPath) {
		ucitajPraznike(contextPath);
	}
	

	
	public HashMap<Integer, Praznik> getPraznici() {
		return praznici;
	}

	public void setPraznici(HashMap<Integer, Praznik> praznici) {
		this.praznici = praznici;
	}


	public Collection<Praznik> pronadjiSve() {
		return praznici.values();
	}

	
	public void sacuvajPraznike(String contextPath) {
		ObjectMapper objectMapper = new ObjectMapper();
		List<Praznik> prazniciLista = new ArrayList<>();
		prazniciLista.addAll(praznici.values());

		try {
			File file = new File(contextPath + "/praznici.json");
			objectMapper.writerWithDefaultPrettyPrinter().writeValue(file, prazniciLista);
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
	private void ucitajPraznike(String contextPath) {
		
		try
		{
			File file = new File(contextPath + "/praznici.json");
			System.out.println(contextPath);
			ObjectMapper objectMapper = new ObjectMapper();
			objectMapper.configure(DeserializationFeature.ACCEPT_SINGLE_VALUE_AS_ARRAY, true);
			objectMapper.configure(DeserializationFeature.ACCEPT_EMPTY_STRING_AS_NULL_OBJECT, true);
			if(file.exists()) {
			List<Praznik> sad = objectMapper.readValue(file, objectMapper.getTypeFactory().constructCollectionType(List.class, Praznik.class));
		
			for(Praznik u : sad)
			{
				praznici.put(u.getId(), u);
			}}
			
			
		}
		catch (Exception ex) {
			System.out.println(ex);
			ex.printStackTrace();
		} finally {
			
		}
		
	}

	@Override
	public String toString() {
		return "UserDAO [sadrzaj=" + praznici + "]";
	}
}
