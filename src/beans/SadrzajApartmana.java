package beans;

public class SadrzajApartmana {
	private int id;
	private String naziv;
	public static int brojac = 0;
	public Boolean obrisan;
	public SadrzajApartmana() {
		obrisan = false;
		id = brojac;
		brojac++;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getNaziv() {
		return naziv;
	}
	public void setNaziv(String naziv) {
		this.naziv = naziv;
	}


}
