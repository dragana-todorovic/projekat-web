package beans;

import java.awt.Image;
import java.sql.Time;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class Apartman {
	private int id;
	private Tip tip;
	private int brojSoba;
	private int brojGostiju;
	private Lokacija lokacija;
	private List<String> datumiZaIzdavanje;
	//dostupnost
	private String domacin;
	private List<Komentar> komentar;
	private String slika ;
	private double cijenaPoNoci;
	private String vrijemeZaPrijavu; //inicijalno na 2pm
	private String vrijemeZaOdjavu; //inicijalno na 10AM
	public static int brojac = 0;
	public Boolean obrisan;
	public Apartman() {
		komentar = new ArrayList<Komentar>();
		lokacija = new Lokacija();
		sadrzajApartmana = new ArrayList<SadrzajApartmana>();
		datumiZaIzdavanje = new ArrayList<String>();
		domacin = "";
		obrisan = false;
		id = brojac;
		brojac++;
		
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
	public Lokacija getLokacija() {
		return lokacija;
	}
	public void setLokacija(Lokacija lokacija) {
		this.lokacija = lokacija;
	}
	public List<String> getDatumZaIzdavanje() {
		return datumiZaIzdavanje;
	}
	public void setDatumZaIzdavanje(List<String> datumZaIzdavanje) {
		this.datumiZaIzdavanje = datumZaIzdavanje;
	}
	public String getDomacin() {
		return domacin;
	}
	public void setDomacin(String domacin) {
		this.domacin = domacin;
	}
	public List<Komentar> getKomentar() {
		return komentar;
	}
	public void setKomentar(List<Komentar> komentar) {
		this.komentar = komentar;
	}
	public String getSlika() {
		return slika;
	}
	public void setSlika(String slika) {
		this.slika = slika;
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
	public Status getStatus() {
		return status;
	}
	public void setStatus(Status status) {
		this.status = status;
	}
	public List<SadrzajApartmana> getSadrzajApartmana() {
		return sadrzajApartmana;
	}
	public void setSadrzajApartmana(List<SadrzajApartmana> sadrzajApartmana) {
		this.sadrzajApartmana = sadrzajApartmana;
	}
	public List<Rezervacija> getRezervacije() {
		return rezervacije;
	}
	public void setRezervacije(List<Rezervacija> rezervacije) {
		this.rezervacije = rezervacije;
	}
	private Status status;
	private List<SadrzajApartmana> sadrzajApartmana;
	private List<Rezervacija> rezervacije;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	
	

}
