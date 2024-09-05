
<?php

define('DB_HOST', "localhost");
define('DB_USER', "TheBeast");
define('DB_PASS', "WeLoveCOP4331");
define('DB_NAME', "COP4331");



	$inData = getRequestInfo();
	
	$id = 0;
	$firstName = "";
	$lastName = "";

	$conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
    
	if( $conn->connect_error )
	{
		returnWithError( $conn->connect_error );
	}
	else
	{
		$stmt = $conn->prepare("SELECT ID FROM Users WHERE Login=?");
		$stmt->bind_param("s", $inData["login"]);
		$stmt->execute();
		$result = $stmt->get_result();

		if( $row = $result->fetch_assoc()  )
		{
            returnWithError("Username already exsists");
		}
		else
		{
            $insertStmt = $conn->prepare("INSERT into Users (FirstName,LastName,Login,Password) VALUES (?,?,?,?)");

            $insertStmt->bind_param("ssss", $inData["firstName"],$inData["lastName"],$inData["login"],$inData["password"]);

            $insertStmt->execute();
            $result = $insertStmt->get_result();

            if( $row = $result->fetch_assoc()  ){
                returnWithInfo( $row['firstName'], $row['lastName'], $row['ID'] );            
            }
            else
            {
                returnWithError("Error inserting DB");
            }
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
	
	function returnWithInfo( $firstName, $lastName, $id )
	{
		$retValue = '{"id":' . $id . ',"firstName":"' . $firstName . '","lastName":"' . $lastName . '","error":""}';
		sendResultInfoAsJson( $retValue );
	}
	
?>
