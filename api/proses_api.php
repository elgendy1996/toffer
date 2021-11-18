<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: PUT, GET , POST , DELETE, OPTIONS ");
header("Access-Control-Allow-Headers: Origin, Content-type, Authorization, Accept, X-Requested-With, x-xsrf-token");
header("Content-Type: application/json; charset=utf-8");

include "config.php";
$postjson = json_decode(file_get_contents('php://input'), true);

if ($postjson['aski'] == "poses_login") {
    $password = md5($postjson['password']);
    $checkemail = mysqli_fetch_array(mysqli_query($mysqli, "SELECT email_address FROM TofferExact_2.loginCredentials WHERE email_address = '$postjson'[
    email_address]'	 "));
    echo $result;
}
