<?php
@session_start();

define("APPNAME", 'Asset Manager');
define("IP_ADDRESS", "127.0.0.1");
define("DB_HOST", "127.0.0.1");
define("DB_PORT", '');
define("DB_USERNAME", "root");
define("DB_PASSWORD", "Localhost245$");
define("DB_NAME", "asset_manager_db");

// header message
define("HTTP_200", "HTTP/1.1 200 OK");
define("HTTP_201", "HTTP/1.1 201 Created");
define("HTTP_400", "HTTP/1.1 400 Bad Request");
define("HTTP_401", "HTTP/1.1 401 Unauthorized");
define("HTTP_403", "HTTP/1.1 403 Forbidden");
define("HTTP_404", "HTTP/1.1 404 Not Found");
define("HTTP_405", "HTTP/1.1 405 Method Not Allowed");
define("HTTP_422", "HTTP/1.1 422 Unprocessable Entity");
define("HTTP_500", "HTTP/1.1 500 Internal Server Error");

define("HTTP_ERROR_MSG_200", "OK");
define("HTTP_ERROR_MSG_201", "Created");
define("HTTP_ERROR_MSG_400", "Bad Request");
define("HTTP_ERROR_MSG_401", "Unauthorized");
define("HTTP_ERROR_MSG_403", "Forbidden");
define("HTTP_ERROR_MSG_404", "Not Found");
define("HTTP_ERROR_MSG_405", "Method Not Allowed");
define("HTTP_ERROR_MSG_422", "Unprocessable Entity");
define("HTTP_ERROR_MSG_500", "Internal Server Error");

define("REQ_REQUEST", $_REQUEST);
define("REQ_POST", $_POST);
define("REQ_GET", $_GET);
define("REQ_FILES", $_FILES);
// define("REQ_PUT", $_PUT);

define("REQUEST_METHODS", ["POST", "GET", "PUT", "DELETE", "PATCH", "REQUEST", "HEADER", "FILES"]);

define("CODE_SUCCESS", "20");
define("CODE_FAILED", "10");
define("CODE_FATAL_ERROR", "99");