package beans;

public class PodaciZaRezervaciju {
	private String datum;
	private int broj;
	private String id;
	private String poruka;
	
	public PodaciZaRezervaciju() {
		datum="";
		broj = 0;
		id = "";
		poruka="";
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

	public String getPoruka() {
		return poruka;
	}

	public void setPoruka(String poruka) {
		this.poruka = poruka;
	}

	
}
