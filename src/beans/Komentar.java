package beans;

public class Komentar {
	private String gost;
	private String apartman;
	private String tekst;
	private String ocjena;
	private Boolean dozvoli;
	private int id;
	public static int brojac = 0;
	
	public Komentar () {
		dozvoli = false; //zabranjen
		gost ="";
		apartman="";
		tekst="";
		ocjena="";
		setId(brojac);
		brojac++;
	}
	
	
	public String getGost() {
		return gost;
	}
	public void setGost(String gost) {
		this.gost = gost;
	}
	public String getApartman() {
		return apartman;
	}
	public void setApartman(String apartman) {
		this.apartman = apartman;
	}
	public String getTekst() {
		return tekst;
	}
	public void setTekst(String tekst) {
		this.tekst = tekst;
	}
	public String getOcjena() {
		return ocjena;
	}
	public void setOcjena(String ocjena) {
		this.ocjena = ocjena;
	}
	public Boolean getDozoli() {
		return dozvoli;
	}
	public void setDozoli(Boolean dozoli) {
		this.dozvoli = dozoli;
	}


	public int getId() {
		return id;
	}


	public void setId(int id) {
		this.id = id;
	}
	

}
