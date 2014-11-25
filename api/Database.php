<?php namespace MiniWeebly\Database;

use \mysqli;

/**
* Singleton database class
*
* @package  MiniWeebly
* @author   Colin Armstrong <colinarms@gmail.com>
*
*/
class Database {
	private $_connection;
	private static $_instance; //The single instance
	private $_host = "localhost";
	private $_username = "root";
	private $_password = "P@ssw0rd";
	private $_database = "weebly";

  //$url=parse_url(getenv("CLEARDB_DATABASE_URL"));


	/**
	* Singleton database class
	*
	* @package  MiniWeebly
	* @author   Colin Armstrong <colinarms@gmail.com>
	*
	*/
	public static function getInstance() {
		if(!self::$_instance) { // If no instance then make one
			self::$_instance = new self();
		}
		return self::$_instance;
	}

	private function __construct() {
		$this->_connection = new mysqli($this->_host, $this->_username,
			$this->_password, $this->_database);

		// Error handling
		if(mysqli_connect_error()) {
			trigger_error("Failed to conencto to MySQL: " . mysql_connect_error(),
				 E_USER_ERROR);
		}
	}
	// Magic method clone is empty to prevent duplication of connection
	private function __clone() { }

	/**
	* Retrieve the database connection
	*
	* @return   database connection
	*
	*/
	public function getConnection() {
		return $this->_connection;
	}
}
?>
