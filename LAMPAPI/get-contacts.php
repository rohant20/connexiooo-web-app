
<?php

define('DB_HOST', "localhost");
define('DB_USER', "TheBeast");
define('DB_PASS', "WeLoveCOP4331");
define('DB_NAME', "COP4331");



	$inData = getRequestInfo();
	
	$id = 0;

	$conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
    
	if( $conn->connect_error )
	{
		returnWithError( $conn->connect_error );
	}
	else
	{
		$stmt = $conn->prepare("SELECT ID, Name, Phone, Email FROM Contacts WHERE UserID = ?");
		$stmt->bind_param("i", $inData["userId"]);
		$stmt->execute();
        // Get result set from statement
        $result = $stmt->get_result();
		echo $result
        // Fetch all the results into an associative array
        $contacts = $result->fetch_all(MYSQLI_ASSOC);       


		if($contacts  )
		{
			returnWithInfo($contacts);
		}
		else
		{
			returnWithError("No Records Found");
		}

		$stmt->close();
		$conn->close();
	}
	
	function getRequestInfo()
	{
		return json_decode(file_get_contents('php://input'), true);
	}

	function sendResultInfoAsJson( $obj )
	{
		header('Content-type: application/json');
		echo $obj;
	}
	
	function returnWithError( $err )
	{
		$retValue = '{"id":0,"firstName":"","lastName":"","error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
	
	function returnWithInfo( $arr)
	{

		sendResultInfoAsJson( $arr );
	}
	
?>
