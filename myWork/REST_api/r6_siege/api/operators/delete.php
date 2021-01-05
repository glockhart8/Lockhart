<?php
parse_str(file_get_contents('php://input'), $_DELETE);

if (isset($_DELETE["id"])) {

	try {
		$id = $_DELETE["id"];
		$result = PDOQuery("DELETE FROM operators WHERE id = ?",
							[$id],$dsn,$username,$password);
			
		http_response_code(200);
		echo "Delete Succesful";
	} catch (Exception $e) {
		error_log($e->getMessage());
		exit('Error processing');
	}
}
else if (isset($_DELETE["name"])) {

	try {
		$name = $_DELETE["name"];
		$result = PDOQuery("DELETE FROM operators WHERE name = ?",
							[$name],$dsn,$username,$password);
			
		http_response_code(200);
		echo "Delete Succesful";
	} catch (Exception $e) {
		error_log($e->getMessage());
		exit('Error processing');
	}
}
?>