package controllers;
/*@author: Peace Cyebukayire
 * created: 18th Aug 2022*/

import com.google.gson.Gson;

import model.Model;
import repository.User;
import services.Admin;
import services.Patient;
import services.Pharmacist;
import services.Physician;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.stream.Collectors;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.*;

//@WebServlet("/signin")
public class Signin extends HttpServlet {

    private static final long serialVersionUID = 1L;

	protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
    }
    
    @Override
    // handle post requests
    protected void doPost(HttpServletRequest req, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(req, response);

        //Allow access from all domains
        response.addHeader("Access-Control-Allow-Origin", "*"); 
        String rawdata = req.getReader().lines().collect(Collectors.joining());
        Model jsondata = new Gson().fromJson(rawdata, Model.class);

        LinkedHashMap<Integer, Model> users = new LinkedHashMap<Integer, Model>();
        ServletContext context = req.getServletContext();
        // if user not found
        if(context.getAttribute("users") == null) { 
        	System.out.println("CONTEXT IS NULL");
        authResponse(response, null, false);
        return;
        }
        users = (LinkedHashMap<Integer, Model>) context.getAttribute("users");
        System.out.println("USERS FOUND");
        System.out.println(users);
        
        boolean exists = false;
        Model authUser = null;
        for (Model user : usersList(users)) {
            if (user.getUsername().equals(jsondata.getUsername())
                    && user.getPassword().equals(jsondata.getPassword())) {
                exists = true;
                authUser = user;
                handleLogin(user.getUsertype().toLowerCase(), user.getUsername(),
                        String.valueOf(user.getPassword()), req);
            }
        }

        authResponse(response, authUser, exists);

    }

    private ArrayList<Model> usersList(LinkedHashMap<Integer, Model> mappedUsers) {
        ArrayList<Model> usersList = new ArrayList<>();

        for (Map.Entry<Integer, Model> entry : mappedUsers.entrySet()) {
            Model umData = entry.getValue();
            usersList.add(umData);
        }
        return usersList;
    }

    private void authResponse(HttpServletResponse response, Model authUser, boolean exists) {
        PrintWriter out;
        try {
            out = response.getWriter();
            if (exists == false) {
                out.print("password or username is wrong");
            } else {
                out.print(authUser.getUsertype());
            }
        } catch (Exception e) {
            System.out.print("something went wrong");

        }

    }

    private void handleLogin(String usertype, String username, String password, HttpServletRequest request) {
        if (usertype.equals("admin")) {
            Admin admin = new Admin();
            admin.login(username, password, request);
            
        } else if (usertype.equals("patient")) {
            Patient patient = new Patient();
            patient.login(username, password, request);

        } else if (usertype.equals("physician")) {
            Physician physician = new Physician();
            physician.login(username, password, request);
            
        } else if (usertype.equals("pharmacist")) {
            Pharmacist pharmacist = new Pharmacist();
            pharmacist.login(username, password, request);
        }
    }
}
