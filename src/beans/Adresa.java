package beans;

public class Adresa {

	private String ulica;
	private String broj;
	private String nasljenoMjesto;
	private String pozivniBrojMjesta;
	
	public Adresa() {
		ulica = "";
		broj = "";
		nasljenoMjesto = "";
		pozivniBrojMjesta = "";
	}

	public String getUlica() {
		return ulica;
	}

	public void setUlica(String ulica) {
		this.ulica = ulica;
	}

	public String getBroj() {
		return broj;
	}

	public void setBroj(String broj) {
		this.broj = broj;
	}

	public String getNasljenoMjesto() {
		return nasljenoMjesto;
	}

	public void setNasljenoMjesto(String nasljenoMjesto) {
		this.nasljenoMjesto = nasljenoMjesto;
	}

	public String getPozivniBrojMjesta() {
		return pozivniBrojMjesta;
	}

	public void setPozivniBrojMjesta(String pozivniBrojMjesta) {
		this.pozivniBrojMjesta = pozivniBrojMjesta;
	}

}
