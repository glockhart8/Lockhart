<?php
include_once("../creds/creds.php");
include_once("../pdoutils.php");

$request = $_SERVER["REQUEST_METHOD"];


if ($request == "DELETE") {
	include_once("delete.php");
} else if ($request == "POST") {
	include_once("post.php");
} else if ($request == "PUT") {
	include_once("put.php");
} else {	
	include_once("get.php");
}
?>