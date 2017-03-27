<?php
header('Content-type: application/json');
ini_set('error_reporting', E_ALL);
ini_set('display_errors', 1);



$appName = 'teelaunch';

$appPath = $_SERVER['DOCUMENT_ROOT'] . '/a/' . $appName . '/';

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


$query = "SELECT shopifyAC FROM integrationsData.appMembers WHERE status = 'a' AND shop = '{$shop}' AND appName = 'teelaunch'";

$results = $database->dbQueryGenericSQL($query);
$results = $results[0];
$shopifyAPI->api_shopifyToken = $results['shopifyAC'];
$shopifyAPI->api_url = $shop;


if($action == 'getProduct') {
    $product_id = $_GET['product_id'];
    $metafields = $shopifyAPI->getProductMetadata($product_id);
    $metafields = $metafields->metafields;

    $personalization = array();

    foreach($metafields as $field) {
        if($field->key == 'personalization_details') {
            $personalization = $field->value;
        }
    }

    if(!empty($personalization)) {
        $response['data'] = $personalization;
    } else {
        $response['success'] = false;
        $response['error'] = 'Personalization not found for product ID ' . $product_id;
    }


    echo json_encode($response);
}

