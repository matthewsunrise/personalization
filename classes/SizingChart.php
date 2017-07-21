<?php
require_once('databaseConnect.class.php');

class SizingChart {
	public static function getBySku($skus)
	{
		$database = new DatabaseConnect();

		$skuTokens = '';
		$skuBinds = array();
		foreach($skus as $key => $value) {
			$skuTokens .= ":sku{$key},";

			$skuBinds[":sku{$key}"] = $value;
		}
		$skuTokens = rtrim($skuTokens, ',');

		$skus = is_array($skus) ? implode(',', $skus) : $skus;


		$query = "select SC.*, M.masterKey, M.productSKU, M.productTitle as title from teelaunch_masters as M, teelaunch_sizing_chart as SC where M.productSKU in ({$skuTokens}) AND SC.masterKey=M.masterKey order by M.masterKey";
		$sizingDetails = $database->dbQueryGenericSqlBind($query, $skuBinds);

		$database = null;

		return $sizingDetails;
	}

	public static function getChartRows($ids)
	{
		$database = new DatabaseConnect();

		$idTokens  = '';
		$idBinds   = array();
		foreach($ids as $key => $value) {
			$idTokens .= ":id{$key},";

			$idBinds[":id{$key}"] = $value;
		}
		$idTokens = rtrim($idTokens, ',');

		$query = "SELECT sizing_chart_id, sizing_chart_unit_id, sizeName, column1Value, column2Value, column3Value FROM `teelaunch_sizing_chart_rows` WHERE sizing_chart_id IN ({$idTokens}) ORDER BY column1Value, column2Value, column3Value";

		$chartRows = $database->dbQueryGenericSqlBind($query, $idBinds);

		$database = null;
		return $chartRows;
	}

	public static function getChartUnits($ids)
	{
		$database = new DatabaseConnect();

		$idTokens  = '';
		$idBinds   = array();
		foreach($ids as $key => $value) {
			$idTokens .= ":id{$key},";

			$idBinds[":id{$key}"] = $value;
		}
		$idTokens = rtrim($idTokens, ',');

		$ids = is_array($ids) ? implode(',', $ids) : $ids;
		$query = "SELECT id, name, abbreviation, sort FROM `teelaunch_sizing_chart_units` WHERE id IN ({$idTokens}) ORDER BY sort";
		$chartRows = $database->dbQueryGenericSqlBind($query, $idBinds);

		$database = null;

		return $chartRows;
	}


}