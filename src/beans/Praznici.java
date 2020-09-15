package beans;
import java.time.LocalDate;
import java.util.*;

public class Praznici {
	private List<Praznik> praznici;
	
	public Praznici() {
		praznici = new ArrayList<Praznik>();
	}

	public List<Praznik> getPraznici() {
		return praznici;
	}

	public void setPraznici(List<Praznik> praznici) {
		this.praznici = praznici;
	}
	
	
	
}
