package controllers;

import com.google.gson.Gson;


import db.Database;
import model.User;
import repository.UserRepository;
import services.Admin;
import services.Patient;
import services.Pharmacist;
import services.Physician;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.stream.Collectors;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.*;

@WebServlet("/Signin")
public class Signin extends HttpServlet {

    private static final long serialVersionUID = 1L;

	protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
    }
    
    @Override
    // handle get requests
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }
    
    @Override
    // handle post requests
    protected void doPost(HttpServletRequest req, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(req, response);

      //Allow access from all domains
        response.addHeader("Access-Control-Allow-Origin", "*"); 
        String rawdata = req.getReader().lines().collect(Collectors.joining());
        User jsondata = new Gson().fromJson(rawdata, User.class);

        LinkedHashMap<Integer, User> users = new LinkedHashMap<Integer, User>();
        users = Database.getInstance().getData();

        boolean exists = false;
        User authUser = null;
        for (User user : usersList(users)) {
            if (user.getUsername().equals(jsondata.getUsername())
                    && user.getPassword() == jsondata.getPassword()) {
                exists = true;
                authUser = user;
                handleLogin(user.getUsertype().toLowerCase(), user.getUsername(),
                        String.valueOf(user.getPassword()));
            }
        }

        authResponse(response, authUser, exists);

    }

    private ArrayList<User> usersList(LinkedHashMap<Integer, User> mappedUsers) {
        ArrayList<User> usersList = new ArrayList<>();

        for (Map.Entry<Integer, User> entry : mappedUsers.entrySet()) {
            User umData = entry.getValue();
            usersList.add(umData);
        }
        return usersList;
    }

    private void authResponse(HttpServletResponse response, User authUser, boolean userFound) {
        PrintWriter out;
        try {
            out = response.getWriter();
            if (userFound == false) {
                out.print("Invalid credentials");
            } else {
                out.print(authUser.getUsertype());
            }
        } catch (Exception e) {
            System.out.print("something went wrong");

        }

    }

    private void handleLogin(String role, String username, String password) {
        if (role.equals("admin")) {
            Admin admin = new Admin();
            admin.login(username, password);
            
        } else if (role.equals("patient")) {
            Patient patient = new Patient();
            patient.login(username, password);

        } else if (role.equals("physician")) {
            Physician physician = new Physician();
            physician.login(username, password);
            
        } else if (role.equals("pharmacist")) {
            Pharmacist pharmacist = new Pharmacist();
            pharmacist.login(username, password);
        }
    }
}
