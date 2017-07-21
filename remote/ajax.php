<?php
header('Content-type: application/json');
ini_set('error_reporting', E_ALL);
ini_set('display_errors', 1);

$appName = 'teelaunch';

$appPath = $_SERVER['DOCUMENT_ROOT'] . '/a/' . $appName . '/';

require_once($appPath . 'classes/SizingChart.php');

/// get the app class from sunrise
require_once($appPath . 'classes/shopifyAPP.class.php');
$shopifyAPI = new shopifyAPIconnect();

require_once($appPath . 'classes/databaseConnect.class.php');
$database = new DatabaseConnect();


$response = array(
    'success' => true
);

$_GET  = filter_input_array(INPUT_GET, FILTER_SANITIZE_STRING);


$action = isset($_GET['action']) ? $_GET['action'] : '';
$shop   = isset($_GET['shop']) ? $_GET['shop'] : '';

//
//$query = "SELECT shopifyAC FROM integrationsData.appMembers WHERE status = 'a' AND shop = '{$shop}' AND appName = 'teelaunch'";
//
//$results = $database->dbQueryGenericSQL($query);
//$results = $results[0];
//$shopifyAPI->api_shopifyToken = $results['shopifyAC'];
//$shopifyAPI->api_url = $shop;


if($action == 'getProduct') {

	$product_id = $_GET['product_id'];
	$skus       = $_GET['sku'];

	$skuString = is_array($skus) ? implode(',', $skus) : $skus;

	$query = "SELECT * FROM teelaunch_personalization as tp INNER JOIN teelaunch_personalization_fonts AS tpf ON tp.font = tpf.fontTitle  WHERE product_id = :product_id";

	$personalizationDetails = $database->dbQueryGenericSqlBind($query, array(':product_id' => $product_id));

	$sizingDetails = SizingChart::getBySku($skus);
	$chartIds      = array_map(function ($ar) { return $ar['id']; }, $sizingDetails);
	$chartRows     = SizingChart::getChartRows($chartIds);
	$unitIds       = array_unique(array_map(function($ar) { return intval($ar['sizing_chart_unit_id']); }, $chartRows));
	$sizingUnits   = SizingChart::getChartUnits($unitIds);

	$charts = array();
	foreach($chartRows as $row) {
		$charts[$row['sizing_chart_id']][] = array(
		  'sizeName'     => $row['sizeName'],
		  'column1Value' => $row['column1Value'],
		  'column2Value' => $row['column2Value'],
		  'column3Value' => $row['column3Value'],
		  'unit_id'      => $row['sizing_chart_unit_id']
		);
	}


	$sizing = array();
	foreach($sizingDetails as $key => $value) {
		$sizing[$value['productSKU']] = $value;
		$sizing[$value['productSKU']]['rows'] = $charts[$value['id']];
		$sizing[$value['productSKU']]['units'] = array();

		foreach($sizingUnits as $k => $v) {
			foreach($charts[$value['id']] as $row) {
				if($row['unit_id'] == $v['id']) {
					$unit = array(
					  'id'           => $v['id'],
					  'name'         => $v['name'],
					  'abbreviation' => $v['abbreviation'],
					  'sort'         => $v['sort']
					);
					if(!in_array($unit, $sizing[$value['productSKU']]['units'])) {
						$sizing[$value['productSKU']]['units'][] = $unit;
					}
				}
			}
		}
	}

	$variant_personalizations = array();
    if(!empty($personalizationDetails)) {
    	// make a associative array keyed on variant id
    	foreach($personalizationDetails as $key => $value) {
    		$variant_personalizations[$value['variant_id']] = $value;
	    }
        $response['personalization'] = $variant_personalizations;
    } else {
        $response['success'] = false;
        $response['error'] = 'Personalization not found for product ID ' . $product_id;
    }

    if(!empty($sizingDetails)) {
    	$response['sizing'] = $sizing;
    }


    echo json_encode($response);
}

