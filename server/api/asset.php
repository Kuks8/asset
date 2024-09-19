<?php
session_start();

require __DIR__ . "/../../config/bootstrap.php";
require ROOT_PATH . "/app/Controllers/Api/HighOddsController.php";
use BaseController as BaseCon;

ini_set("error_log", ROOT_PATH . "/tmp/routes.log");

switch (BaseCon::getRequestName()){
	case "upcoming":
		BaseCon::isRequestMethod("GET");
		$strMethodName = "upcomingEventsList";
		break;
	default:
		BaseCon::isRequestMethod("GET");
		$strMethodName = "highOddsList";
		break;
}

BaseCon::getMethodName(
	new OairHighoddsController(), 
	$strMethodName
);
