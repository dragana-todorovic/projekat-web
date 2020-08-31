package beans;

import java.util.Date;

public class Rezervacija {
	private int apartman;
	private String pocetniDatum;
	private int brojNocenja = 1;
	private double ukupnaCijena;
	private String poruka;
	private String gost;
	private StatusRezervacije status;
	private static int brojac = 0;
	private int id;
	public Rezervacija() {
		id = brojac;
		brojac++;	
	}
	
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getApartman() {
		return apartman;
	}
	public void setApartman(int apartman) {
		this.apartman = apartman;
	}
	public String getPocetniDatum() {
		return pocetniDatum;
	}
	public void setPocetniDatum(String pocetniDatum) {
		this.pocetniDatum = pocetniDatum;
	}
	public int getBrojNocenja() {
		return brojNocenja;
	}
	public void setBrojNocenja(int brojNocenja) {
		this.brojNocenja = brojNocenja;
	}
	public double getUkupnaCijena() {
		return ukupnaCijena;
	}
	public void setUkupnaCijena(double ukupnaCijena) {
		this.ukupnaCijena = ukupnaCijena;
	}
	public String getPoruka() {
		return poruka;
	}
	public void setPoruka(String poruka) {
		this.poruka = poruka;
	}
	public String getGost() {
		return gost;
	}
	public void setGost(String gost) {
		this.gost = gost;
	}
	public StatusRezervacije getStatus() {
		return status;
	}
	public void setStatus(StatusRezervacije status) {
		this.status = status;
	}
	

}
