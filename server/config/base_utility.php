<?php
header_remove("Set-Cookie");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: *");
header("Content-type: application/json");
header("HTTP/1.1 200 OK");
ini_set("log_errors", 1);

define("ROOT_PATH", __DIR__ . "/../");

function isRequestMethod($getReqMethod) {
    $getReqMethod = strtoupper($getReqMethod);
    $requestMethod = $requestMethod ?? $_SERVER['REQUEST_METHOD'];

    if($requestMethod !== $getReqMethod){
        $responseData = resultStatus(405, HTTP_ERROR_MSG_405);
        sendOutput($responseData, HTTP_405 ?? '');
    }

    return ($requestMethod) === $getReqMethod && isset($requestParams);
}


function getRequestPayload() {
    $requestMethod = ${"_{$_SERVER['REQUEST_METHOD']}"} ?? $_REQUEST;
    
    if(isset($requestMethod)){
        return $requestMethod;
    }

    return -1;
}


function getRequestName(){
    if(!isset(getRequestPayload()["request"]) || empty(getRequestPayload()["request"])) {
        $responseData = resultStatus(400, 'Request not found');
        sendOutput($responseData, HTTP_400 ?? '');
        exit;
    }

    $requestName = getRequestPayload()["request"];
    return $requestName;
}


function sendOutput($data = null, $httpHeader = HTTP_200) {
    header_remove("Set-Cookie");
    header ($httpHeader);
    echo json_encode($data, JSON_PRETTY_PRINT); exit;
} 


function getRequestValue($requestParams, $request, $error_message = null, $default_val = null) {
    $err_msg = (empty($error_message)) ? "invalid entry" : $error_message;

    if(empty($requestParams[$request])) {
        if (!isset($default_val)){
            $responseData = resultStatus(400, $err_msg);
            sendOutput($responseData, HTTP_400 ?? '');
        } else {
            return $default_val;
        }
    } else {
        return $requestParams[$request];
    }
}


function resultStatus($status_code, $message = null, $data = null){
    $state = [];
    $state["code"] = isset($status_code) ? $status_code : 0;

    if(!empty($message))
        $state["message"] = $message;

    if(!empty($data) || $data != null)
        $state["data"] = $data;
    
    return $state;
}


function isSystemAdminRole(){
    $roles = [];
    $roles = $_SESSION['roles'] ?? [];

    if(isset($_SESSION) && in_array('SYSTEM_ADMIN', $roles)){
        return 1;
    }

    $responseData = resultStatus(0, 'Insufficient previlleges!');
    sendOutput($responseData, HTTP_401);
}