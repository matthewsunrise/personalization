<?php


class DatabasePDO {


	private $host;
	private $user;
	private $pass;
	private $dbname;

	private $dbh;
	private $error;
	private $stmt;

	public function __construct() {

		$this->host = '7e241a8112a48b91965c51e6a5c88257f0d2a0ff.rackspaceclouddb.com';

		$this->user = 'nm35fchbrg27yu87';
		$this->pass = 'ee2^c!*uknbQrP^6';

		$this->dbname = 'integrationsData';

		// Setup or change DSN here
		$dsn = 'mysql:host=' . $this->host . ';dbname=' . $this->dbname;

		$options = array(
			PDO::MYSQL_ATTR_FOUND_ROWS => true,
			PDO::ATTR_EMULATE_PREPARES => false,
			PDO::ATTR_PERSISTENT       => true,
			PDO::ATTR_ERRMODE          => PDO::ERRMODE_EXCEPTION
		);

		try {
			$this->dbh = new PDO($dsn, $this->user, $this->pass, $options);
		}
		catch (PDOException $e) {
			$this->error = $e->getMessage();
			//echo '<br>Message:'.$e->getMessage();
		}
	}

	public function showPDOdump() {
		return $this->stmt->debugDumpParams();
	}

	public function showPDOStmt() {
		return $this->stmt;
	}

	public function query($query) {
		$this->stmt = $this->dbh->prepare($query);
	}


	public function bind($param, $value, $type = null) {
		if(is_null($type)) {
			switch (true) {
				case is_int($value):
					$type = PDO::PARAM_INT;
					break;
				case is_bool($value):
					$type = PDO::PARAM_BOOL;
					break;
				case is_null($value):
					$type = PDO::PARAM_NULL;
					break;
				default:
					$type = PDO::PARAM_STR;
			}
		}
		$this->stmt->bindValue($param, $value, $type);
	}

	public function execute() {
		return $this->stmt->execute();
	}

	public function resultsFromDB($type = PDO::FETCH_ASSOC) {
		$this->execute();

		return $this->stmt->fetchAll($type);
	}

	//Return 0 index if only one row selected
	public function returnResultsFromDB() {
		$this->execute();
		$results = $this->stmt->fetchAll(PDO::FETCH_ASSOC);
		if(count($results) == 1) {
			return $results[0];
		} else {
			return $results;
		}
	}

	public function getLastInsertId() {
		return $this->dbh->lastInsertId();
	}


	public function getRowCount() {
		return $this->stmt->rowCount();
	}


	public function beginBatchTransaction() {
		return $this->dbh->beginTransaction();
	}

	public function commitChanges() {
		return $this->dbh->commit();
	}


	public function stripString($stringToClean) {
		$replacedString = preg_replace("/[^ \w]+/", "", $stringToClean);
		$finalString    = filter_var($replacedString, FILTER_SANITIZE_STRING, FILTER_FLAG_STRIP_HIGH);

		return trim($finalString);
	}

	function sanitizeString($stringToClean) {
		/// sanitize high ASCII but leave all other characters
		$finalString = filter_var($stringToClean, FILTER_SANITIZE_STRING, FILTER_FLAG_STRIP_HIGH);
		$finalString = htmlspecialchars($finalString, ENT_QUOTES, 'UTF-8');

		return trim($finalString);
	}

	public function generateRandomKey($sizeOf) {
		if( ! isset($sizeOf)) {
			return false;
		} else {
			$chars    = "abcdefghjknpqrstwxyzABCDEFGHJKLMQSTUVWXYZ23456789";
			$finalKey = "";
			while (strlen($finalKey) < $sizeOf) {
				$finalKey .= $chars[mt_rand(0, strlen($chars))];
			}

			return $finalKey;
		}
	}

}
