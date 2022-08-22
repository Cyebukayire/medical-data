package controllers;
/*@author: Peace Cyebukayire
 * created: 18th Aug 2022*/

import com.google.gson.Gson;

import services.Admin;
import services.Patient;
import services.Pharmacist;
import services.Physician;
import model.Model;
import util.Password;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.LinkedHashMap;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.google.gson.Gson;
import java.util.stream.Collectors;
import javax.servlet.annotation.MultipartConfig;
import org.json.JSONObject;

//@WebServlet("/signup")
 public class Signup extends HttpServlet {
    private static final long serialVersionUID = 1L; // Tomcat&JVM container use this ID to identify this bean
	PrintWriter out;
	LinkedHashMap<Integer, Model> listedUsers;
    protected void processRequest(HttpServletRequest req, HttpServletResponse response)
            throws ServletException, IOException {
                response.addHeader("Access-Control-Allow-Origin", "*");
                 out = response.getWriter();

             try {
      
                Admin admin = new Admin();
                Patient patient = new Patient();
                Physician physician = new Physician();
                Pharmacist pharmacist = new Pharmacist();
                HttpSession session = req.getSession(); 

                if(session.getAttribute("users") != null){
                listedUsers = (LinkedHashMap<Integer, Model>) session.getAttribute("users");
                }else{
                listedUsers = new LinkedHashMap<Integer, Model>();
                }
                
                String jsonString = req.getReader().lines().collect(Collectors.joining());                         
            
                Model myObject = new Gson().fromJson(jsonString, Model.class); 

                String successMessage = null;               
                

               if(myObject.getUsertype().equalsIgnoreCase("admin")){
                    if(Password.getPassword().adminPassword(String.valueOf(myObject.getPassword())) == true){
                    	listedUsers = admin.signup(myObject, req);
                    	session.setAttribute("users", listedUsers);
                    	successMessage = "Admin account is created successfully";
                    } else {
                        successMessage="Password should be 8 numbers";
                                         
                    }
             } else if(myObject.getUsertype().equalsIgnoreCase("Patient")){
                 if(Password.getPassword().patientPassword(String.valueOf(myObject.getPassword())) == true){
                  listedUsers = patient.signup(myObject, req);
                  session.setAttribute("users", listedUsers);
                   successMessage = "Patient account is created successfully";
                 } else {                             
                      successMessage = "Password should be only 7 numbers";
                      
                 }
             }else if(myObject.getUsertype().equalsIgnoreCase("Physician")){
             
                 if(Password.getPassword().physicianPassword(String.valueOf(myObject.getPassword())) == true){
                	 listedUsers = physician.signup(myObject, req);
                	 session.setAttribute("users", listedUsers);
                    successMessage = "Physician account is created successfully";
                 }else {                             
                     successMessage =  "Password should be only 6 numbers";   
                 }
             
             }else if(myObject.getUsertype().equalsIgnoreCase("pharmacist")){
                 
                 if(Password.getPassword().pharmacistPassword(String.valueOf(myObject.getPassword())) == true){
                  listedUsers = pharmacist.signup(myObject, req); 
                  session.setAttribute("users", listedUsers);
                   successMessage = "Pharmacist account is successfully";
                 }else {                           
                     successMessage = "Password should be only 5 numbers";
                     }
                 }
                       
              out.print(successMessage);

           } catch (Exception e) {
	    e.printStackTrace();
                out.print(e.getMessage());
        }
   
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(req, response);
    }

}
