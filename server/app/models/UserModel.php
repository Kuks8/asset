<?php

class UserModel {
    private $db;

    public function __construct($database) {
        $this->db = $database;
    }


    public function getUserByEmail($emailAddress) {
        try{
            $query = $this->db->prepare("SELECT * FROM users WHERE `email_address` = :emailAddress");
            $query->bindParam(':emailAddress', $emailAddress, PDO::PARAM_STR);
            $query->execute();

            return $query->fetch(PDO::FETCH_ASSOC);

        } catch (PDOException $e) {
            echo "Error: " . $e->getMessage();
            return false;
        }
    }

    // public function getUserRoles_assigned($userID) {
    //     try {
    //         $query = $this->db->prepare("SELECT roles_id FROM roles_assigned WHERE user_id = :userID");
    //         $query->bindParam(':userID', $userID, PDO::PARAM_INT);
    //         $query->execute();
    //         return $query->fetchAll(PDO::FETCH_ASSOC);

    //     } catch (PDOException $e) {
    //         echo "Error: " . $e->getMessage();
    //         return false;
    //     }
    // }

    public function getUserRoles($userId) {
        $query = "SELECT role_type
                  FROM roles_assigned
                  WHERE user_id = :user_id";
       $stmt = $this->db->prepare($query);

       try {
        $stmt->bindParam(':user_id', $userId, PDO::PARAM_INT);
        $stmt->execute();

        // Fetch all results
        $roles = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // Check if roles were found
        if ($roles && count($roles) > 0) {
            return $roles;
        } else {
            // Return an empty array if no roles were found
            return [];
        }
    } catch (PDOException $e) {
        // Log the error message if necessary and return false or empty array to signal failure
        error_log("Error fetching user roles: " . $e->getMessage());
        return [];
    }
}


    


    public function setLogins($userID, $employeeID){
        try {
            $ipAddress = $_SERVER['REMOTE_ADDR'];
            $timestamp = strtotime('now');
            $loggedInAt = date('Y-m-d H:i:s', $timestamp);
            $loginID = $timestamp;

            $query = $this->db->prepare(
                "INSERT INTO logins SET 
                    user_id = :userID, 
                    employee_id = :employeeID,
                    login_id = :loginID, 
                    ip_address = :IPAddress, 
                    logged_in_at = :loggedInAt, 
                    logged_out_at = :loggedOutAt"
            );
            
            // Bind parameters
            $query->bindParam(':userID', $userID);
            $query->bindParam(':employeeID', $employeeID);
            $query->bindParam(':loginID', $loginID);
            $query->bindParam(':IPAddress', $ipAddress);
            $query->bindParam(':loggedInAt', $loggedInAt);
            $query->bindParam(':loggedOutAt', $loggedOutAt);

            // Execute the query
            return $query->execute();
            
        } catch (PDOException $e) {
            echo "Error: " . $e->getMessage();
            return false;
        }
    }


    // public function storeOTP($userId, $otp) {
    //     $query = $this->db->prepare("UPDATE users SET login_otp = :otp, updated_on = NOW() WHERE id = :id");
    //     $query->execute(['otp' => $otp, 'id' => $userId]);
    // }


    // public function verifyLogin($email, $password, $otp) {
    //     $query = $this->db->prepare("SELECT * FROM users WHERE email = :email AND password = :password AND otp = :otp");
    //     $query->execute(['email' => $email, 'password' => md5($password), 'otp' => $otp]);
    //     return $query->fetch(PDO::FETCH_ASSOC);
    // }


    public function doRegistration($params){
        try {
            $query = $this->db->prepare(
                "INSERT INTO users SET 
                    employee_id = :employeeID, 
                    email_address = :email, 
                    encrypted_password = :userPassword, 
                    password_salt = :passSalt,
                    registered_by_user_id = :registeredByUserID"
            );
            
            $emailAddress = $params['emailAddress'];
            $userPassword = $params['userPassword'];
            $registeredByUserID = $params['registeredByUserID'];
            $employeeID = $params['employeeID'];

            $passwordSalt = password_hash($emailAddress.$userPassword, PASSWORD_DEFAULT);
            $encryptedPassword = md5($passwordSalt.$userPassword);
            
            // Bind parameters
            $query->bindParam(':employeeID', $employeeID);
            $query->bindParam(':email', $emailAddress);
            $query->bindParam(':userPassword', $encryptedPassword);
            $query->bindParam(':passSalt', $passwordSalt);
            $query->bindParam(':registeredByUserID', $registeredByUserID);

            // Execute the query
            return $query->execute();
            
        } catch (PDOException $e) {
            echo "Error: " . $e->getMessage();
            return false;
        }
    }


    public function userExists($emailAddress, $employeeId = ''){
        try{
            $query =  $this->db->prepare("SELECT * FROM users WHERE email_address = :emailAddress OR employee_id = :employeeID");
            $query->bindParam(':emailAddress', $emailAddress);
            $query->bindParam(':employeeID', $employeeId);
            $query->execute();
            $userData = $query->fetch(PDO::FETCH_ASSOC);

            if (is_array($userData) && count($userData) > 0) {
                return $userData;
            }

            return 0;

        } catch (PDOException $e) {
            echo "Error: " . $e->getMessage();
            return false;
        }
    }


    public function listAdmins($status='ALL'){
        if (in_array($status, ['ACTIVE', 'INACTIVE'])) {
            $condition = " WHERE status = :status";
        } else {
            $condition = "";
        }

        $query =  $this->db->prepare("SELECT * FROM users{$condition}");

        if(isset($status) && !empty($condition)){
            $query->bindParam(':status', $status);
        }
        
        $query->execute();
        $userData = $query->fetch(PDO::FETCH_ASSOC);

        if (count($userData) > 0) {
            return $userData;
        }

        return 0;
    }
}
