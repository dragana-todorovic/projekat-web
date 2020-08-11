package beans;

import java.util.List;

public class Korisnik {
	
	private String korisnickoIme; 
	private String lozinka;
	private String ime;
	private String prezime;
	private Pol pol;
	private Uloga uloga;
	private List<Apartman> apartmanZaIzdavanje;
	public String getKorisnickoIme() {
		return korisnickoIme;
	}
	public void setKorisnickoIme(String korisnickoIme) {
		this.korisnickoIme = korisnickoIme;
	}
	public String getLozinka() {
		return lozinka;
	}
	public void setLozinka(String lozinka) {
		this.lozinka = lozinka;
	}
	public String getIme() {
		return ime;
	}
	public void setIme(String ime) {
		this.ime = ime;
	}
	public String getPrezime() {
		return prezime;
	}
	public void setPrezime(String prezime) {
		this.prezime = prezime;
	}
	public Pol getPol() {
		return pol;
	}
	public void setPol(Pol pol) {
		this.pol = pol;
	}
	public Uloga getUloga() {
		return uloga;
	}
	public void setUloga(Uloga uloga) {
		this.uloga = uloga;
	}
	public List<Apartman> getApartmanZaIzdavanje() {
		return apartmanZaIzdavanje;
	}
	public void setApartmanZaIzdavanje(List<Apartman> apartmanZaIzdavanje) {
		this.apartmanZaIzdavanje = apartmanZaIzdavanje;
	}
	public List<Apartman> getIznajmljeniApartman() {
		return iznajmljeniApartman;
	}
	public void setIznajmljeniApartman(List<Apartman> iznajmljeniApartman) {
		this.iznajmljeniApartman = iznajmljeniApartman;
	}
	public List<Rezervacija> getRezervacije() {
		return rezervacije;
	}
	public void setRezervacije(List<Rezervacija> rezervacije) {
		this.rezervacije = rezervacije;
	}
	private List<Apartman> iznajmljeniApartman;
	private List<Rezervacija> rezervacije; //za posljednja tri uslovi
	
	

}

