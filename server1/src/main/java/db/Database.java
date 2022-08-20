package db;

import model.User;

import java.util.LinkedHashMap;

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
