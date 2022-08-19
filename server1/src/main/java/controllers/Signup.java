package controllers;

import com.google.gson.Gson;

import services.Admin;
import services.Patient;
import services.Pharmacist;
import services.Physician;
import model.User;
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
import com.google.gson.Gson;
import java.util.stream.Collectors;
import javax.servlet.annotation.MultipartConfig;
import org.json.JSONObject;

@WebServlet("/signup")
 public class Signup extends HttpServlet {
    private static final long serialVersionUID = 1L; // Tomcat&JVM container use this ID to identify this bean
	PrintWriter out;
    protected void processRequest(HttpServletRequest req, HttpServletResponse response)
            throws ServletException, IOException {
                response.addHeader("Access-Control-Allow-Origin", "*");
                //response.setContentType("application/json");
                 out = response.getWriter();

             try {
      
                Admin admin = new Admin();
                Patient patient = new Patient();
                Physician physician = new Physician();
                Pharmacist pharmacist = new Pharmacist();
                LinkedHashMap<Integer, User> lhmUsers = new LinkedHashMap<Integer, User>();
                
                String jsonString = req.getReader().lines().collect(Collectors.joining());                         
            
                User myObject = new Gson().fromJson(jsonString, User.class); 

                String successMessage = null;               
                

               if(myObject.getUsertype().equalsIgnoreCase("admin")){
                    if(Password.getPassword().adminPassword(String.valueOf(myObject.getPassword())) == true){
                        lhmUsers = admin.signup(myObject);
                        successMessage = "Admin account is created successfully";
                    } else {
                        successMessage="Password should be 8 numbers";
                                         
                    }
             } else if(myObject.getUsertype().equalsIgnoreCase("Patient")){
                 System.out.println("Patient account..");
                 if(Password.getPassword().patientPassword(String.valueOf(myObject.getPassword())) == true){
                  lhmUsers = patient.signup(myObject);  
                   successMessage = "Patient account is created successfully";
                 } else {                             
                      successMessage = "Password should be only 7 numbers";
                      
                 }
             }else if(myObject.getUsertype().equalsIgnoreCase("Physician")){
             
                 if(Password.getPassword().physicianPassword(String.valueOf(myObject.getPassword())) == true){
                  lhmUsers = physician.signup(myObject);  
                    successMessage = "Physician account is created successfully";
                 }else {                             
                     successMessage =  "Password should be only 6 numbers";   
                 }
             
             }else if(myObject.getUsertype().equalsIgnoreCase("pharmacist")){
                 
                 if(Password.getPassword().pharmacistPassword(String.valueOf(myObject.getPassword())) == true){
                  lhmUsers = pharmacist.signup(myObject);  
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
