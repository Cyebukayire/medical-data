package services;

import java.util.LinkedHashMap;


import java.util.Random;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;

import model.User;
import repository.UserRepository;

// Physician
public class Physician implements UserRepository{
	public String usertype = "";
	
    @Override
    public String login(String username, String password, HttpServletRequest request){
    	ServletContext context = request.getServletContext();
		if(context.getAttribute("users") == null) return null;
		LinkedHashMap<Integer, User> users = (LinkedHashMap<Integer, User>) context.getAttribute("users");
        for (User user : users.values()) {
        	if(user.getUsername() == username && user.getPassword() == password) return user.getUsertype();
        }
		return null;
    }

    @Override
    public LinkedHashMap<Integer, User> signup(User physician, HttpServletRequest request){
    	ServletContext context = request.getServletContext(); //servlet scope
		LinkedHashMap<Integer, User> users = null;
		if(context.getAttribute("users") != null){
		users = (LinkedHashMap<Integer, User>) context.getAttribute("users"); // first, typecasting current users to LinkedHashMap
		}else{
		users = new LinkedHashMap<Integer, User>();
		}
		users.put(new Random().nextInt(18), physician);
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