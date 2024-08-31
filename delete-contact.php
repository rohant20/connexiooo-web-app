<?php
	// Connect to database
	define('DB_HOST', "localhost");
	define('DB_USER', "TheBeast");
	define('DB_PASS', "WeLoveCOP4331");
	define('DB_NAME', "COP4331");

	// Incoming JSON data from webpage
	$inData = getRequestInfo();

	$id = $inData["id"];

	$conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);

	if($conn->connect_error){
		die('Connection Failed ' . $conn->connect_error);
	} else {
		// Delete the contact with the specified ID
		$stmt = $conn->prepare("DELETE FROM Contacts WHERE ID = ?");
		$stmt->bind_param("i", $id);
		$stmt->execute();

		// Check if the deletion was successful
		if($stmt->affected_rows > 0){
			// Shift the IDs of the subsequent contacts
			$stmt_shift = $conn->prepare("UPDATE Contacts SET ID = ID - 1 WHERE ID > ?");
			$stmt_shift->bind_param("i", $id);
			$stmt_shift->execute();
			$stmt_shift->close();

			returnWithError(""); // Successfully deleted and shifted
		} else {
			returnWithError("No contact found with the specified ID");
		}

		$stmt->close();
		$conn->close();
	}

	function getRequestInfo(){
		return json_decode(file_get_contents('php://input'), true);
	}

	function sendResultInfoAsJson($obj){
		header('Content-type: application/json');
		echo $obj;
	}

	function returnWithError($err){
		$retValue = '{"error":"' . $err . '"}';
		sendResultInfoAsJson($retValue);
	}

	echo 'CONNECTED!';
?>
