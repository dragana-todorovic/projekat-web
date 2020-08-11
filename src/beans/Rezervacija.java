package beans;

import java.util.Date;

public class Rezervacija {
	private Apartman apartman;
	private Date pocetniDatum;
	private int brojNocenja = 1;
	private double ukupnaCijena;
	private String poruka;
	private Gost gost;
	private StatusRezervacije status;
	public Apartman getApartman() {
		return apartman;
	}
	public void setApartman(Apartman apartman) {
		this.apartman = apartman;
	}
	public Date getPocetniDatum() {
		return pocetniDatum;
	}
	public void setPocetniDatum(Date pocetniDatum) {
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
	public Gost getGost() {
		return gost;
	}
	public void setGost(Gost gost) {
		this.gost = gost;
	}
	public StatusRezervacije getStatus() {
		return status;
	}
	public void setStatus(StatusRezervacije status) {
		this.status = status;
	}
	

}
