<?php
require 'vendor/autoload.php';
use Mailgun\Mailgun;

//$to_email, $subject, $message_body, $headers


	//Your credentials
	$mg = new Mailgun("mailgun-key");
	$domain = "megambox.com";

	//Customise the email - self explanatory
	$mg->sendMessage($domain, array(
	'from'=>'ojamail@megambox.com',
	'to'=> $to_email,
	'subject' => $subject,
	'text' => $message_body
	    )
	)

?>
