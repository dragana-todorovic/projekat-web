package beans;

import java.util.ArrayList;
import java.util.List;

public class PomocnaKlasa {
	
	private String ulica;
	private String broj;
	private String nasljenoMjesto;
	private String pozivniBrojMjesta;
	private String geografskaSirina;
	private String geografskaDuzina;
	private Tip tip;
	private int brojSoba;
	private int brojGostiju;
	private String datumiZaIzdavanje;
	private String domacin;
	private double cijenaPoNoci;
	private String vrijemeZaPrijavu; 
	private String vrijemeZaOdjavu; 
	private String sadrzajApartmana;
	public String getDatumiZaIzdavanje() {
		return datumiZaIzdavanje;
	}
	public void setDatumiZaIzdavanje(String datumiZaIzdavanje) {
		this.datumiZaIzdavanje = datumiZaIzdavanje;
	}
	public String getSadrzajApartmana() {
		return sadrzajApartmana;
	}
	public void setSadrzajApartmana(String sadrzajApartmana) {
		this.sadrzajApartmana = sadrzajApartmana;
	}
	public PomocnaKlasa() {
		ulica = "";
		broj = "";
		nasljenoMjesto="";
		pozivniBrojMjesta="";
		geografskaSirina="";
		geografskaDuzina="";
		brojSoba=0;
		brojGostiju=0;
		//datumiZaIzdavanje= new ArrayList<String>();
		//sadrzajApartmana= new ArrayList<SadrzajApartmana>();
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
	public Tip getTip() {
		return tip;
	}
	public void setTip(Tip tip) {
		this.tip = tip;
	}
	public int getBrojSoba() {
		return brojSoba;
	}
	public void setBrojSoba(int brojSoba) {
		this.brojSoba = brojSoba;
	}
	public int getBrojGostiju() {
		return brojGostiju;
	}
	public void setBrojGostiju(int brojGostiju) {
		this.brojGostiju = brojGostiju;
	}
	/*public List<String> getDatumiZaIzdavanje() {
		return datumiZaIzdavanje;
	}
	public void setDatumiZaIzdavanje(List<String> datumiZaIzdavanje) {
		this.datumiZaIzdavanje = datumiZaIzdavanje;
	}*/
	public String getDomacin() {
		return domacin;
	}
	public void setDomacin(String domacin) {
		this.domacin = domacin;
	}
	public double getCijenaPoNoci() {
		return cijenaPoNoci;
	}
	public void setCijenaPoNoci(double cijenaPoNoci) {
		this.cijenaPoNoci = cijenaPoNoci;
	}
	public String getVrijemeZaPrijavu() {
		return vrijemeZaPrijavu;
	}
	public void setVrijemeZaPrijavu(String vrijemeZaPrijavu) {
		this.vrijemeZaPrijavu = vrijemeZaPrijavu;
	}
	public String getVrijemeZaOdjavu() {
		return vrijemeZaOdjavu;
	}
	public void setVrijemeZaOdjavu(String vrijemeZaOdjavu) {
		this.vrijemeZaOdjavu = vrijemeZaOdjavu;
	}
	/*public List<SadrzajApartmana> getSadrzajApartmana() {
		return sadrzajApartmana;
	}
	public void setSadrzajApartmana(List<SadrzajApartmana> sadrzajApartmana) {
		this.sadrzajApartmana = sadrzajApartmana;
	}*/
	
	

}
