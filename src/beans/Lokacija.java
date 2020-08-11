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

}
