<?php

/// 	PDO Database class for all DB activity


class DatabaseConnect {

    private $hostDB = '7e241a8112a48b91965c51e6a5c88257f0d2a0ff.rackspaceclouddb.com';
    private $userDB = 'nm35fchbrg27yu87';
    private $passDB = 'ee2^c!*uknbQrP^6';
    private $nameDB = 'integrationsData';

	public $selectLimit = '';
	public $selectOrderBy = '';
	public $setWhereComparator = 'OR';
	public $selectJoinQuery = '';
	public $selectGroupBy = '';
	public $sumSelect = '';
	private $db;
	private $lastIDused;

    public $checkSTMT;

	function __construct() {

		$this->dbConnect();

	}


	function dbConnect(){

		try {
            $this->db = new PDO("mysql:host=$this->hostDB;dbname=$this->nameDB", $this->userDB, $this->passDB, array(PDO::MYSQL_ATTR_FOUND_ROWS => true) );
            $this->db->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
            $this->db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

		}
		catch(PDOException $e) {
			//print_r($e);
			echo $e->getMessage();
		}
	}



	function dbQueryDelete($tableName, $fieldsArrayWhere, $fieldsArrayWhereEqual){

		if(!empty($fieldsArrayWhere) && $tableName){

			unset($createWhereArray);
			$createWhereArray = '';

			foreach($fieldsArrayWhere as $key=>$value){
				$createWhereArray .=' '.$value.' = :'.$value.' '.$this->setWhereComparator;
			}
			/// remove trailing comma
			if($this->setWhereComparator == ' AND'){ $createWhereArray = substr($createWhereArray,0,-4);   }
			if($this->setWhereComparator == ' OR'){ $createWhereArray = substr($createWhereArray,0,-3); }


			if($this->selectLimit > 0){ $limitSet=' LIMIT '.$this->selectLimit.' '; } else { $limitSet = ''; }
			$stmt = $this->db->prepare("DELETE FROM $tableName WHERE $createWhereArray $limitSet");

			foreach($fieldsArrayWhere as $key=>$value){
				$stmt->bindValue(':'.$value, $fieldsArrayWhereEqual[$key], PDO::PARAM_STR);
			}
			$stmt->execute();
			$countDelete = $stmt->rowCount();
			return $countDelete;

		} else {
			echo 'ERROR: Missing parameters for DELETE query';
		}

	}


	function dbQuerySelect($fieldsArraySelect, $tableName, $fieldsArrayWhere, $fieldsArrayWhereEqual){

		if($tableName && $fieldsArraySelect){

			unset($createWhereArray);
			$createWhereArray = '';

			if($fieldsArrayWhere){
				foreach($fieldsArrayWhere as $key=>$value){
					/// remove . in where clause for joins
					$valueJoinVariant = explode('.', $value);
					if(count($valueJoinVariant)==2){$value2=$valueJoinVariant[1];} else {$value2=$value;}
					$createWhereArray .=' '.$value.' = :'.$value2.''.$this->setWhereComparator;
				}
				/// remove trailing comma
				if($this->setWhereComparator == ' AND'){ $createWhereArray = substr($createWhereArray,0,-4); }
				if($this->setWhereComparator == ' OR'){ $createWhereArray = substr($createWhereArray,0,-3); }
				$createWhereArray = 'WHERE '.$createWhereArray;
			}

			/// Clear where array if no value
			if(count($fieldsArrayWhere)==0){ $createWhereArray = ''; }

			if($this->selectJoinQuery){ $joinClause = $this->selectJoinQuery; } else { $joinClause=''; }
			if($this->selectLimit){ $limitSet=' LIMIT '.$this->selectLimit.' '; } else { $limitSet = ''; }
			if($this->selectOrderBy){ $orderBySet=' ORDER BY '.$this->selectOrderBy.' '; } else { $orderBySet = ''; }
			if($this->selectGroupBy){ $groupBySet=' GROUP BY '.$this->selectGroupBy.' '; } else { $groupBySet = ''; }
			if($this->sumSelect){ $sumSelectAdd=', SUM('.$this->sumSelect.') AS mySUM '; } else { $sumSelectAdd=''; }


			$stmt = $this->db->prepare("SELECT $fieldsArraySelect $sumSelectAdd FROM $tableName $joinClause  $createWhereArray $orderBySet $groupBySet $limitSet ");
            $this->checkSTMT = ("SELECT $fieldsArraySelect $sumSelectAdd FROM $tableName $joinClause  $createWhereArray $orderBySet $groupBySet $limitSet ");

			//print_r($stmt);
			if($fieldsArrayWhere){
				foreach($fieldsArrayWhere as $key=>$value){
					/// remove . in where clause for joins
					$valueJoinVariant = explode('.', $value);
					if(count($valueJoinVariant)==2){$value2=$valueJoinVariant[1];} else {$value2=$value;}
					if(is_numeric($fieldsArrayWhereEqual[$key])){ $stmt->bindValue(':'.$value2, $fieldsArrayWhereEqual[$key], PDO::PARAM_INT); }
					if(is_string($fieldsArrayWhereEqual[$key])){  $stmt->bindValue(':'.$value2, $fieldsArrayWhereEqual[$key], PDO::PARAM_STR); }
				}
			}

			$stmt->execute();
			$results = $stmt->fetchAll(PDO::FETCH_ASSOC);

			return $results;

		} else {
			echo 'ERROR: Missing parameters for SELECT query';
		}

	}



	function dbQuerySelectLIKEsearch($fieldsArraySelect, $tableName, $fieldsArrayWhere, $fieldsArrayWhereEqual){

		if($tableName && $fieldsArraySelect){

			unset($createWhereArray);
			$createWhereArray = '';

			if($fieldsArrayWhere){
				foreach($fieldsArrayWhere as $key=>$value){
					/// remove . in where clause for joins
					$valueJoinVariant = explode('.', $value);
					if(count($valueJoinVariant)==2){$value2=$valueJoinVariant[1];} else {$value2=$value;}
					$createWhereArray .=' '.$value.' LIKE :'.$value2.' '.$this->setWhereComparator;
				}
				/// remove trailing comma
				if($this->setWhereComparator == ' AND'){ $createWhereArray = substr($createWhereArray,0,-4); }
				if($this->setWhereComparator == ' OR'){ $createWhereArray = substr($createWhereArray,0,-3); }
				$createWhereArray = 'WHERE ('.$createWhereArray.')';
			}

			/// Clear where array if no value
			if(count($fieldsArrayWhere)==0){ $createWhereArray = ''; }

			if($this->selectJoinQuery){ $joinClause = $this->selectJoinQuery; } else { $joinClause=''; }
			if($this->selectLimit > 0){ $limitSet=' LIMIT '.$this->selectLimit.' '; } else { $limitSet = ''; }
			if($this->selectOrderBy){ $orderBySet=' ORDER BY '.$this->selectOrderBy.' '; } else { $orderBySet = ''; }

			$stmt = $this->db->prepare("SELECT $fieldsArraySelect FROM $tableName $joinClause  $createWhereArray $orderBySet $limitSet ");
			//print_r($stmt);
			if($fieldsArrayWhere){
				foreach($fieldsArrayWhere as $key=>$value){
					/// remove . in where clause for joins
					$valueJoinVariant = explode('.', $value);
					if(count($valueJoinVariant)==2){$value2=$valueJoinVariant[1];} else {$value2=$value;}
					if(is_numeric($fieldsArrayWhereEqual[$key])){ $stmt->bindValue(':'.$value2, ''.$fieldsArrayWhereEqual[$key].'%', PDO::PARAM_INT); }
					if(is_string($fieldsArrayWhereEqual[$key])){  $stmt->bindValue(':'.$value2, ''.$fieldsArrayWhereEqual[$key].'%', PDO::PARAM_STR); }
				}}

			$stmt->execute();
			$results = $stmt->fetchAll(PDO::FETCH_ASSOC);

			return $results;

		} else {
			echo 'ERROR: Missing parameters for SELECT query';
		}

	}





	function dbQueryUpdate($tableName, $fieldsArraySet, $fieldsArraySetEqual, $whereClause){

		if(!empty($fieldsArraySet) && $tableName){

			$createSetArray = '';
			foreach($fieldsArraySet as $key=>$value){

				if($fieldsArraySetEqual[$key]=='NOW()'){
					$createSetArray .=' '.$value.' = NOW(),';
				} else {
					$createSetArray .=' '.$value.' = :'.$value.',';
				}
			}
			$createSetArray = substr($createSetArray,0,-1); /// remove trailing comma  
			if($this->selectLimit){ $limitSet=' LIMIT '.$this->selectLimit.' '; } else { $limitSet = ''; }

			$stmt = $this->db->prepare("UPDATE $tableName SET $createSetArray WHERE $whereClause $limitSet");
	//print_r($stmt);
			foreach($fieldsArraySet as $key=>$value){
				if($fieldsArraySetEqual[$key] != 'NOW()'){
					$stmt->bindValue(':'.$value, $fieldsArraySetEqual[$key], PDO::PARAM_STR);
				}
			}
			$stmt->execute();
			return $stmt->rowCount();

		} else {
			echo 'ERROR: Missing parameters for UPDATE query';
		}
	}

	function dbQueryUpdateMulti($tableName, $fieldsArraySet, $fieldsArraySetEqual, $whereName, $whereInArray){

		if(!empty($fieldsArraySet) && $tableName){

			$createSetArray = '';
			foreach($fieldsArraySet as $key=>$value){

				if($fieldsArraySetEqual[$key]=='NOW()'){
					$createSetArray .=' '.$value.' = NOW(),';
				} else {
					$createSetArray .=' '.$value.' = :'.$value.',';
				}
			}
			$createSetArray = substr($createSetArray,0,-1); /// remove trailing comma

			foreach($whereInArray as $k => $v) {
				$whereInArray[$k] = PDO::quote($v);
			}
			$whereIn = join(', ', $whereInArray);

			$stmt = $this->db->prepare("UPDATE $tableName SET $createSetArray WHERE $whereName IN $whereIn");
			//print_r($stmt);
			foreach($fieldsArraySet as $key=>$value){
				if($fieldsArraySetEqual[$key] != 'NOW()'){
					$stmt->bindValue(':'.$value, $fieldsArraySetEqual[$key], PDO::PARAM_STR);
				}
			}
			$stmt->execute();
			return $stmt->rowCount();

		} else {
			echo 'ERROR: Missing parameters for UPDATE query';
		}
	}

	function dbQueryInsert($tableName, $fieldsArraySet, $fieldsArraySetEqual){

		if(!empty($fieldsArraySet) && $tableName){

			$createSetArray = '';
			foreach($fieldsArraySet as $key=>$value){

				if($fieldsArraySetEqual[$key]=='NOW()'){
					$createSetArray .=' '.$value.' = NOW(),';
				} else {
					$createSetArray .=' '.$value.' = :'.$value.',';
				}
			}
			$createSetArray = substr($createSetArray,0,-1); /// remove trailing comma  

			$stmt = $this->db->prepare("INSERT INTO $tableName SET $createSetArray ");

			foreach($fieldsArraySet as $key=>$value){
				if($fieldsArraySetEqual[$key] != 'NOW()'){
					$stmt->bindValue(':'.$value, $fieldsArraySetEqual[$key], PDO::PARAM_STR);
				}
			}
			$stmt->execute();
			return $this->db->lastInsertId();

		} else {
			echo 'ERROR: Missing parameters for INSERT query';
		}
	}



	function dbCountSelect($countWhatField, $tableName, $fieldsArrayWhere, $fieldsArrayWhereEqual){

		if($tableName && $countWhatField){

			unset($createWhereArray);
			$createWhereArray = '';

			if($fieldsArrayWhere){
				foreach($fieldsArrayWhere as $key=>$value){
					/// remove . in where clause for joins
					$valueJoinVariant = explode('.', $value);
					if(count($valueJoinVariant)==2){$value2=$valueJoinVariant[1];} else {$value2=$value;}
					$createWhereArray .=' '.$value.' = :'.$value2.''.$this->setWhereComparator;
				}
				/// remove trailing comma
				if($this->setWhereComparator == ' AND'){ $createWhereArray = substr($createWhereArray,0,-4); }
				if($this->setWhereComparator == ' OR'){ $createWhereArray = substr($createWhereArray,0,-3); }
				$createWhereArray = 'WHERE '.$createWhereArray;
			}

			/// Clear where array if no value
			if(count($fieldsArrayWhere)==0){ $createWhereArray = ''; }

			if($this->selectJoinQuery){ $joinClause = $this->selectJoinQuery; } else { $joinClause=''; }
			if($this->selectLimit > 0){ $limitSet=' LIMIT '.$this->selectLimit.' '; } else { $limitSet = ''; }
			if($this->selectOrderBy){ $orderBySet=' ORDER BY '.$this->selectOrderBy.' '; } else { $orderBySet = ''; }
			$stmt = $this->db->prepare("SELECT COUNT( $countWhatField ) FROM $tableName $joinClause  $createWhereArray $orderBySet $limitSet ");
			//print_r($stmt);
			if($fieldsArrayWhere){
				foreach($fieldsArrayWhere as $key=>$value){
					/// remove . in where clause for joins
					$valueJoinVariant = explode('.', $value);
					if(count($valueJoinVariant)==2){$value2=$valueJoinVariant[1];} else {$value2=$value;}
					if(is_numeric($fieldsArrayWhereEqual[$key])){ $stmt->bindValue(':'.$value2, $fieldsArrayWhereEqual[$key], PDO::PARAM_INT); }
					if(is_string($fieldsArrayWhereEqual[$key])){  $stmt->bindValue(':'.$value2, $fieldsArrayWhereEqual[$key], PDO::PARAM_STR); }
				}}

			$stmt->execute();
			$results = $stmt->fetchAll(PDO::FETCH_ASSOC);

			return $results;

		} else {
			echo 'ERROR: Missing parameters for SELECT query';
		}

	}


	function dbQueryGenericSQLselect($genericQuery, $fetchType){

		if($genericQuery){

			$stmt = $this->db->prepare($genericQuery);
			///print_r($stmt);
			$stmt->execute();
			if (strtolower($fetchType) == 'count'){
				$results = $stmt->rowCount();
			} else {
				$results = $stmt->fetchAll(PDO::FETCH_ASSOC);
			}
			return $results;

		} else {
			echo 'ERROR: Missing parameters for GENERIC query';
		}
	}

    function dbQueryGenericSQL($genericQuery){

        if($genericQuery){

            $stmt = $this->db->prepare($genericQuery);
            ///print_r($stmt);exit();
            $stmt->execute();
            $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
            return $results;

        } else {
            echo 'ERROR: Missing parameters for GENERIC query';
        }
    }

	function dbQueryGenericSQL2($genericQuery){

		if($genericQuery){

			$stmt = $this->db->prepare($genericQuery);
			///print_r($stmt);exit();
			$stmt->execute();
		} else {
			echo 'ERROR: Missing parameters for GENERIC query';
		}
	}

	function dbQueryGenericSqlBind($genericQuery, $bindAr){

		if($genericQuery){
			$stmt = $this->db->prepare($genericQuery);
			foreach ($bindAr as $k=>$v)
			{
				$stmt->bindValue($k, $v);
			}
			///print_r($stmt);exit();
			$stmt->execute();
			$results = $stmt->fetchAll(PDO::FETCH_ASSOC);
			return $results;

		} else {
			echo 'ERROR: Missing parameters for GENERIC query';
		}
	}


	function encodeSEOurl($string){
		$string = strtolower($string);
		$string = preg_replace("/[^a-z0-9_\s-]/", "", $string);
		//Clean multiple dashes or whitespaces
		$string = preg_replace("/[\s-]+/", " ", $string);
		//Convert whitespaces and underscore to dash
		$string = preg_replace("/[\s_]/", "-", $string);
		return $string;
	}



	function stripString($stringToClean){
		/// leave only numbers and letters 
		$replacedString = preg_replace("/[^ \w]+/", "", $stringToClean);
		$finalString = filter_var($replacedString, FILTER_SANITIZE_STRING, FILTER_FLAG_STRIP_HIGH);
		return trim($finalString);
	}


	function sanitizeString($stringToClean){
		/// sanitize high ASCII but leave all other characters
        $finalString = filter_var($stringToClean, FILTER_SANITIZE_STRING, FILTER_FLAG_STRIP_HIGH);
        $finalString = htmlspecialchars($finalString, ENT_QUOTES, 'UTF-8');
        return trim($finalString);
	}


	function generateRandomKey($sizeOf){
		if(!isset($sizeOf)){
			return FALSE;
		} else {
			$chars = "abcdefghjknpqrstwxyzABCDEFGHJKLMQSTUVWXYZ23456789";
			$finalKey = "";
			while (strlen($finalKey) < $sizeOf) { $finalKey .= $chars[mt_rand(0,strlen($chars))]; }
			return $finalKey;
		}
	}


    function getCurrentIP(){

        if (!empty($_SERVER['HTTP_CLIENT_IP']))
        {
            $ip=$_SERVER['HTTP_CLIENT_IP'];
        }
        elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR']))
        {
            $ip=$_SERVER['HTTP_X_FORWARDED_FOR'];
        }
        else
        {
            $ip=$_SERVER['REMOTE_ADDR'];
        }
        return $ip;

    }


}//DatabaseConnect 



?>