<?php
// required files (logic)
require __DIR__ . '/../config/base_utility.php';
require ROOT_PATH . 'config/env.php';
require ROOT_PATH . 'config/database.php';
require ROOT_PATH . 'app/controllers/UserController.php';
require ROOT_PATH . 'app/models/UserModel.php';

// create objects of database class
$db = new Database();
// create objects of user model class and pass the db connection as param
$model = new UserModel($db->dbconn());
// create an object of the user controller class and pass the model object as param
$controller = new UserController($model);

// check the request name
switch (getRequestName()){
	case "register":
		// compare the request method
		// must be POST in this instance
		isRequestMethod("POST");
		$controller->register();
		break;

	case "login":
		isRequestMethod("POST");
		$controller->login();
		break;
	
	case "admin-list":
		isRequestMethod("GET");
		$controller->adminUsersList();
		break;
	
	case "admin-details":
		isRequestMethod("POST");
		$controller->adminDetails();
		break;

	case "admin-details-update":
		isRequestMethod("POST");
		$controller->adminDetailsUpdate();
		break;

	case "logout":
		isRequestMethod("GET");
		$controller->logout();
		break;
		
	default:
		// 
		break;
}
