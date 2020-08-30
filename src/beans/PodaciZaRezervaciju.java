package beans;

public class PodaciZaRezervaciju {
	private String datum;
	private int broj;
	private String id;
	
	public PodaciZaRezervaciju() {
		datum="";
		broj = 0;
		id = "";
	}

	public String getDatum() {
		return datum;
	}

	public void setDatum(String datum) {
		this.datum = datum;
	}

	public int getBroj() {
		return broj;
	}

	public void setBroj(int broj) {
		this.broj = broj;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	
}
