
<?php
//composer require mailgun/mailgun-php:~1.7.2
# Include the Autoloader (see "Libraries" for install instructions)
require 'vendor/autoload.php';
use Mailgun\Mailgun;

if (isset($_POST['user_name'])) {
$user_name		= $_POST["user_name"];
$user_email		= $_POST["user_email"];
$message		= $_POST["msg"];

}
	//email body
	//Your credentials
	$client = new \Http\Adapter\Guzzle6\Client(); 
    $mg = new \Mailgun\Mailgun('key-mailgun', $client);

	$domain = "ojamail.megambox.com";
	$subject = "Thank you for you feed back";

	//Customise the email - self explanatory
	$mg->sendMessage($domain, array(
	'from'=>'mailgun@ojamail.megambox.com',
	'to'=> $user_email,
	'subject' => $subject,
	'text' => $message
	    )
	)

?>