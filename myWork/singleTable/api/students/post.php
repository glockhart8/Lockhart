<?php
if (isset($_POST["lastname"]) &&  $_POST["lastname"]!='' &&
    isset($_POST["firstname"]) && $_POST["firstname"]!='' &&
	isset($_POST["address"]) && $_POST["address"]!='' &&
	isset($_POST["city"]) && $_POST["city"]!='' &&
	isset($_POST["state"]) &&  $_POST["state"]!='' &&
    isset($_POST["zip"]) && $_POST["zip"]!='' &&
    isset($_POST["phone"]) && $_POST["phone"]!='' &&
    isset($_POST["email"]) && $_POST["email"]!='' &&
    isset($_POST["major"]) && $_POST["major"]!='') {



	try {
		$firstname = $_POST["firstname"];
		$lastname = $_POST["lastname"];
		$address = $_POST["address"];
		$city = $_POST["city"];
		$state = $_POST["state"];
        $zip = $_POST["zip"];
        $phone = $_POST["phone"];
        $email = $_POST["email"];
        $major = $_POST["major"];


		$result = PDOQuery("INSERT INTO students (lastname, firstname, address, city, state, zip, phone, email, major) VALUES (?,?,?,?,?,?,?,?,?)",
							[$lastname, $firstname, $address, $city, $state, $zip, $phone, $email, $major],$dsn,$username,$password);
			
		http_response_code(201);
		echo json_encode("Create Succesful");
	} catch (Exception $e) {
		error_log($e->getMessage());
		exit('Error processing');
	}
} 
?>