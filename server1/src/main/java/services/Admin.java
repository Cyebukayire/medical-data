package services;

import java.util.LinkedHashMap;
import java.util.Random;

import db.Database;
import model.User;
import repository.UserRepository;

public class Admin implements UserRepository{

	public String usertype = "";
	@Override
	public String login(String username, String password){
		LinkedHashMap<Integer, User> users = Database.getInstance().getData();
        for (User user : users.values()) {
        	if(user.getUsername() == username && user.getPassword() == password) return user.getUsertype();
        }
		return null;
	}
	@Override
	public LinkedHashMap<Integer, User> signup(User admin){
		LinkedHashMap<Integer, User> user = Database.getInstance().getData();
		user.put(new Random().nextInt(18), admin);
		return user;
	}
    
//	Getters and Setters

	public String getUsertype() {
	return this.usertype;
	}

	public void setUsertype(String usertype) {
		this.usertype = usertype;
	}
	
}
