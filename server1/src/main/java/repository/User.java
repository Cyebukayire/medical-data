package repository;
/*@author: Peace Cyebukayire
 * created: 19th Aug 2022*/


import java.util.LinkedHashMap;

import javax.servlet.http.HttpServletRequest;

import model.User;

public abstract interface UserRepository {

	public String usertype = "";
	
//	Signup method
	public abstract LinkedHashMap<Integer, User> signup(User user, HttpServletRequest request);
	
//	Login method
	public abstract String login(String username, String password, HttpServletRequest request);
	
//	Getters and Setters

	public abstract String getUsertype();

	public abstract void setUsertype(String usertype);
}