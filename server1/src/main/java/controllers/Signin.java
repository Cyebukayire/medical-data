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

        response.addHeader("Access-Control-Allow-Origin", "*"); //Allow access from all domains
        String requestData = req.getReader().lines().collect(Collectors.joining());
        User fromJson = new Gson().fromJson(requestData, User.class);

        LinkedHashMap<Integer, User> mappedUsers = new LinkedHashMap<Integer, User>();
        mappedUsers = Database.getInstance().getData();

        boolean userFound = false;
        for (User user : usersList(mappedUsers)) {
            if (user.getUsername().equals(fromJson.getUsername())
                    && user.getPassword() == fromJson.getPassword()) {
                userFound = true;
                handleLogin(user.getUsertype().toLowerCase(), user.getUsername(),
                        String.valueOf(user.getPassword()));
            }
        }

        authResponse(response, userFound);

    }

    private ArrayList<User> usersList(LinkedHashMap<Integer, User> mappedUsers) {
        ArrayList<User> usersList = new ArrayList<>();

        for (Map.Entry<Integer, User> entry : mappedUsers.entrySet()) {
            User umData = entry.getValue();
            usersList.add(umData);
        }
        return usersList;
    }

    private void authResponse(HttpServletResponse response, boolean userFound) {
        PrintWriter out;
        try {
            out = response.getWriter();
            if (userFound == false) {
                out.print("Invalid credentials");
            } else {
//                out.print(Admin.getUsertype());
            }
        } catch (Exception e) {
//            System.out.print(e.getMessage());
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
