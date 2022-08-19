/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package db;

import model.User;

import java.util.LinkedHashMap;

/**
 *
 * @author janvier
 */
public class Database {
    private LinkedHashMap<Integer, User> records = new LinkedHashMap<Integer, User>();
	private static final Database instance = new Database();
	private Database() {
		
	}
	public static Database getInstance() {
		return instance;
	}
	public LinkedHashMap<Integer, User> getData() {
		return records;
	}
    
}
