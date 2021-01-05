<?php
function PDOQuery($sql, $vars, $dsn, $username, $password) {
	$opt = [
		PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
		PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
		PDO::ATTR_EMULATE_PREPARES   => false,
	];

	try {
		$pdo = new PDO($dsn, $username, $password, $opt);
		
		$stmt = $pdo->prepare($sql);
		$stmt->execute($vars);
		
		$results = $stmt->fetchAll(PDO::FETCH_ASSOC);

		return $results;
	} catch (Exception $e) {
		error_log($e->getMessage());
		exit("Error occurred: " . $e);		
	}
}
?>