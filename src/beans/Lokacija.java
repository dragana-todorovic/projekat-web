package beans;

public class Lokacija {
	
	private String geografskaSirina;
	private String geografskaDuzina;
	private Adresa adresa;
	
	public Lokacija() {
		adresa = new Adresa();
		geografskaSirina = "";
		geografskaDuzina = "";
	}

	public String getGeografskaSirina() {
		return geografskaSirina;
	}

	public void setGeografskaSirina(String geografskaSirina) {
		this.geografskaSirina = geografskaSirina;
	}

	public String getGeografskaDuzina() {
		return geografskaDuzina;
	}

	public void setGeografskaDuzina(String geografskaDuzina) {
		this.geografskaDuzina = geografskaDuzina;
	}

	public Adresa getAdresa() {
		return adresa;
	}

	public void setAdresa(Adresa adresa) {
		this.adresa = adresa;
	}
	

}
