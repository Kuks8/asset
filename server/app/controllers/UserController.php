<?php

class UserController { 
    private $userModel;

    

    public function __construct($userModel) {
        $this->userModel = $userModel;
    }


     public function login() {
        $emailAddress = getRequestValue(REQ_POST, "email_address", "Please enter email address");
        $userPassword = getRequestValue(REQ_POST, "password", "invalid entry");

        if (session_status() == PHP_SESSION_NONE) {
            session_start();
        }

        if(!empty($_SESSION ['user_id'])){
            $responseData = resultStatus(0, 'Already logged in!');
            sendOutput($responseData, HTTP_200);
        } 

        // varify email
        $verifyEmailAddress = filter_var($emailAddress, FILTER_VALIDATE_EMAIL) !== false;

        if(!$verifyEmailAddress){
			$responseData = resultStatus(0, 'Wrong Email Format.');
            sendOutput($responseData, HTTP_400);
        }

        ob_start();
        // verify user login credentials
        $userData = $this->userModel->getUserByEmail($emailAddress);
       
        if(is_array($userData) && count($userData)){
            $emailAddress = $userData['email_address'];
            $encryptedPassword = $userData['encrypted_password'];
            $passwordSalt = $userData['password_salt'];
            // $roles_id = $roles['roles_id'];

            if(!($encryptedPassword === md5($passwordSalt.$userPassword))){
                $responseData = resultStatus(0, 'Wrong username and/or password.');
                sendOutput($responseData, HTTP_400);
            } 
            // set session
            $userID = $userData['id'];
            $employeeID = $userData['employee_id'];
            $emailAddress = $userData['email_address'];
            $ipAddress = $_SERVER['REMOTE_ADDR'];
            
            $_SESSION['user_id'] = $userID;
            $_SESSION['email_address'] = $emailAddress;
            $_SESSION['employee_id'] = $employeeID;
            $_SESSION['ip_address'] = $ipAddress;

            ini_set("error_log", "/Users/kukua/Desktop/Kukua Project/my-app/server/error.log");
            error_log("hghghg".$userID);
            
             $roles = $this->userModel->getUserRoles($userID);
            $_SESSION['roles'] = array_column($roles, 'role_type');
            
            if ($userID !== null) {
            
                $exptime = time() + (86400 * 30);
               
            
                // Store all cookie data as a JSON string
                $cookies = json_encode([
                    'user_id' => $userID,
                    'email_address' => $emailAddress,
                    'employee_id' => $employeeID,
                    'ip_address' => $ipAddress
                ]);
            
                // Set the cookie with the JSON string
                setcookie('user_data', $cookies, $exptime, '/', '', false);
            }
            // print_r(headers_list());
            // if(!isset($_SESSION)){
            //     $responseData = resultStatus(1, 'Oops! Something went wrong. Kindly login again after sometime.');
            //     sendOutput($responseData, HTTP_500);
            // }

            // log signin
            $setLogins = $this->userModel->setLogins($userID, $employeeID);

			$responseData = resultStatus(1, 'Login is successful!');
            $responseData['data'] = $_SESSION;
            sendOutput($responseData, HTTP_200);

        } else{
			$responseData = resultStatus(0, 'Sorry, user does not exist!');
            sendOutput($responseData, HTTP_401);
        }
        ob_end_flush();
    }


    public function register(){
        isSystemAdminRole();
        
        $employeeID = getRequestValue(REQ_POST, "employee_id", "invalid entry");
        $emailAddress = getRequestValue(REQ_POST, "email_address", "invalid entry");
        $userPassword = getRequestValue(REQ_POST, "password", "invalid entry");
        $registeredByUserID = getRequestValue(REQ_POST, "registered_by_user_id", "invalid entry");

        $verifyEmailAddress = filter_var($emailAddress, FILTER_VALIDATE_EMAIL) !== false;

        if(!$verifyEmailAddress){
			$responseData = resultStatus(0, 'Wrong Email Format.');
            sendOutput($responseData, HTTP_400);
        }

        $employeeID = strtoupper($employeeID);

        $params = [
            'employeeID' => strtoupper($employeeID),
            'emailAddress' => $emailAddress,
            'userPassword' => $userPassword,
            'registeredByUserID' => $registeredByUserID,
        ];

        // get the registered user data
        $userExists = $this->userModel->userExists($emailAddress, $employeeID);

        if($userExists){
            $responseData = resultStatus(0, 'User already exists!');
            $responseData['data'] = $userExists;
            sendOutput($responseData, HTTP_200);
        }

        // store in db
        if(!$this->userModel->doRegistration($params)){
            $responseData = resultStatus(0, 'Registration failed!');
            sendOutput($responseData, HTTP_500);
        }

        $responseData = resultStatus(1, 'Registration is successful!');
        // $responseData['data'] = $userData;
        sendOutput($responseData, HTTP_201);
    }


    public function adminUsersList(){
        // isSystemAdminRole();
        $status = getRequestValue(REQ_GET, "status", "invalid entry");
        $userListData = $this->userModel->listAdmins($status);

        $responseData = resultStatus(1, 'Admins Found!');
        $responseData['data'] = $userListData;
        sendOutput($responseData, HTTP_200);
    }


    public function adminDetails(){
        // 
    }


    public function adminDetailsUpdate(){
        isSystemAdminRole();
    }


    public function logout(){
        if(empty($_SESSION)){
            $responseData = resultStatus(0, 'Already logged out!');
            sendOutput($responseData, HTTP_200);
        } else{
            // Clear all session variables
            session_unset();
        if(session_destroy()){
            $responseData = resultStatus(1, 'Logout is successful!');
            sendOutput($responseData, HTTP_200);
        } else {
            // If session_destroy() fails for some reason
            $responseData = resultStatus(0, 'Logout failed, please try again.');
            sendOutput($responseData, HTTP_500);
        }
    }
}

}