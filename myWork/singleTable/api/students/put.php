<?php
parse_str(file_get_contents('php://input'), $_PUT);

if (isset($_PUT["id"]) && 
		isset($_PUT["lastname"]) && 
		isset($_PUT["firstname"]) && 
		isset($_PUT["address"]) &&  
		isset($_PUT["city"]) && 
        isset($_PUT["state"]) &&  
        isset($_PUT["zip"]) &&
        isset($_PUT["phone"]) &&
        isset($_PUT["email"]) &&
		isset($_PUT["major"])) {

	try {
        $id = $_PUT["id"];
		$lastname = $_PUT["lastname"];
		$firstname = $_PUT["firstname"];
		$address = $_PUT["address"];
		$city = $_PUT["city"];
		$state = $_PUT["state"];
        $zip = $_PUT["zip"];
        $phone = $_PUT["phone"];
		$email = $_PUT["email"];
        $major = $_PUT["major"];

		$result = PDOQuery("UPDATE students SET lastname=?, firstname=?, address=?, city=?, state=?, zip=?, phone=?, email=?, major=? WHERE id=?",
							[$lastname, $firstname, $address, $city, $state, $zip, $phone, $email, $major, $id],$dsn,$username,$password);
			
		http_response_code(201);
		echo json_encode("Update Succesful");
	} catch (Exception $e) {
		error_log($e->getMessage());
		exit('Error processing');
	}
} 
?>