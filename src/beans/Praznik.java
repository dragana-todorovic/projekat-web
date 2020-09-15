package beans;

import java.time.LocalDate;

public class Praznik {
	private int id;
	private String praznik;
	public static int brojac=0;
	
	public Praznik() {
		id = brojac;
		brojac++;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getPraznik() {
		return praznik;
	}

	public void setPraznik(String praznik) {
		this.praznik = praznik;
	}
	

}
