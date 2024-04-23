<?php 

$_POST = file_get_contents("php://input", true);
$_POST = json_decode($_POST, true);


$name = $_POST['name'];
$email = $_POST['email'];
$text = $_POST['text'];
$text = htmlspecialchars($text);
$text = urldecode($text);
$text = trim($text); 
$beg = $_POST["begin"];
$end = $_POST["ending"];
// $checkbox = $_POST['checkbox'];

require_once('phpmailer/PHPMailerAutoload.php');
require_once('phpmailer/surplus.php');


$mail = new PHPMailer;
$mail->CharSet = 'utf-8';

$cantle = res();
$part = req();
// $mail->SMTPDebug = 3;                               // Enable verbose debug output

$mail->isSMTP();                                      // Set mailer to use SMTP
$mail->Host = 'smtp.gmail.com';  // Specify main and backup SMTP servers
$mail->SMTPAuth = true;                               // Enable SMTP authentication
$mail->Username = 'sinzem@gmail.com';                 // Наш логин
$mail->Password = "{$beg}{$cantle}{$part}{$end}";                           // Наш пароль от ящика
$mail->SMTPSecure = 'TLS';                            // Enable TLS encryption, `ssl` also accepted
$mail->Port = 587;                                    // TCP port to connect to
 
$mail->setFrom('sinzem@gmail.com', 'Portfolio');   // От кого письмо 
$mail->addAddress('sergzerg3@gmail.com');
// $mail->addAddress('sinzem@gmail.com');     // Add a recipient
//$mail->addAddress('ellen@example.com');               // Name is optional
//$mail->addReplyTo('info@example.com', 'Information');
//$mail->addCC('cc@example.com');
//$mail->addBCC('bcc@example.com');
//$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
//$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
$mail->isHTML(true);                                  // Set email format to HTML

$mail->Subject = 'Данные';
$mail->Body    = '
		Пользователь оставил данные <br> 
	Имя: ' . $name . ' <br> 
	E-mail:  ' . $email . ' <br>
	Message:  ' . $text . '' ;

if(!$mail->send()) {
    return false;
} else {
    return true;
}

?>