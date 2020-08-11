package beans;

public class Komentar {
	private Gost gost;
	private Apartman apartman;
	private String tekst;
	private Ocjena ocjena;
	public Gost getGost() {
		return gost;
	}
	public void setGost(Gost gost) {
		this.gost = gost;
	}
	public Apartman getApartman() {
		return apartman;
	}
	public void setApartman(Apartman apartman) {
		this.apartman = apartman;
	}
	public String getTekst() {
		return tekst;
	}
	public void setTekst(String tekst) {
		this.tekst = tekst;
	}
	public Ocjena getOcjena() {
		return ocjena;
	}
	public void setOcjena(Ocjena ocjena) {
		this.ocjena = ocjena;
	}
	

}
