<?php
// Connect to database
    define('DB_HOST', "localhost");
    define('DB_USER', "TheBeast");
    define('DB_PASS', "WeLoveCOP4331");
    define('DB_NAME', "COP4331");

    // Incoming JSON data from webpage
    $inData = getRequestInfo();

    $name = $inData["name"];
    $phone =  $inData["phone"];
    $email = $inData["email"];
    $id = $inData["id"];


    $conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);


    if($conn->connect_error){
        die('Connection Failed ' . $conn->connect_error);
    } else {
        echo $name . "<br>";
        echo $phone. "<br>";
        echo $email. "<br>";
        echo $id. "<br>";

        $stmt = $conn->prepare("UPDATE Contacts SET Name = ?, Phone = ?, Email = ? WHERE ID = ?");
        $stmt->bind_param("sssi", $name, $phone, $email, $id);
        $stmt->execute();
        $stmt->close();
        $conn->close();
        returnWithError("");
    }

    function getRequestInfo(){
        return json_decode(file_get_contents('php://input'), true);
    }

    function sendResultInfoAsJson($obj){
        header('Content-type: application/json');
        echo $obj;
    }

    function returnWithError( $err )
{
$retValue = '{"error":"' . $err . '"}';
sendResultInfoAsJson( $retValue );
}


    echo 'CONNECTED!';
?>
