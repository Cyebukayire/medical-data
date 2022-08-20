package util;
/*@author: Peace Cyebukayire
 * created: 19th Aug 2022*/

public class Password {
	private static final Password password = new Password();
    public static Password getPassword() {
		return password;
	}
    public Boolean adminPassword(String password){
        if(password.length() != 8){
            return false;
        }
        return true;
    }
    
    public Boolean patientPassword(String password){
        if(password.length() != 7){
            return false;
        }
        return true;
        
    }
    
    public Boolean physicianPassword(String password){
        if(password.length() != 6){
            return false;
        }
        return true;
        
    }
    
    public Boolean pharmacistPassword(String password){
        if(password.length() != 5){
            return false;
        }
        return true;
        
    }
    
}
