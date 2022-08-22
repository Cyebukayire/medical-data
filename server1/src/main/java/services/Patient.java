package services;
/*@author: Peace Cyebukayire
 * created: 19th Aug 2022*/

import java.util.LinkedHashMap;

import java.util.Random;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;

import model.Model;
import repository.User;

// Patient
public class Patient implements User{


	public String usertype = "";
	
	@Override
    public String login(String username, String password, HttpServletRequest request){
		ServletContext context = request.getServletContext();
		if(context.getAttribute("users") == null) return null;
		LinkedHashMap<Integer, Model> users = (LinkedHashMap<Integer, Model>) context.getAttribute("users");
        for (Model user : users.values()) {
        	if(user.getUsername() == username && user.getPassword() == password) return user.getUsertype();
        }
		return null;
    }

    @Override
    public LinkedHashMap<Integer, Model> signup(Model patient, HttpServletRequest request) {
    	ServletContext context = request.getServletContext(); //servlet scope
		LinkedHashMap<Integer, Model> users = null;
		if(context.getAttribute("users") != null){
		users = (LinkedHashMap<Integer, Model>) context.getAttribute("users"); // first, typecasting current users to LinkedHashMap
		}else{
		users = new LinkedHashMap<Integer, Model>();
		}
		users.put(new Random().nextInt(18), patient);
		context.setAttribute("users", users);
		return users;
    }
    
//	Getters and Setters

	public String getUsertype() {
	return this.usertype;
	}

	public void setUsertype(String usertype) {
		this.usertype = usertype;
	}
    
}
