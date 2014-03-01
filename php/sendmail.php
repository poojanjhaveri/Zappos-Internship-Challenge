<?
$productURL=$_GET['productURL'];
$productName=$_GET['productName'];
$brandName=$_GET['brandName'];

$to = $_GET['email'];
echo $to;
   $subject = "Zappos Price Alert";
   $message = "This is to inform you that the price of the product ".$brandName." ".$productName." has now decreased.";
   $message=$message." Discount of atleast 20% now available. Check out out here ".$productURL."";
   $header = "Zappos Price Alert";
   $retval = mail ($to,$subject,$message,$header);
   if( $retval == true )  
   {
      echo "Message sent successfully...";
	  return 1;
   }
   else
   {
      echo "Message could not be sent...";
	  return 0;
   }


?>