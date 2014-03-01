Zappos-Internship-Challenge
===========================


View here : http://poojanjhaveri.com/Zappos-Challenge/

Challenge : 

One of the most important aspects of ecommerce and online retail is pricing. In order to increase purchases on their mobile app, Zappos is considering sending price notifications any time a saved/favorited item goes on sale!

Write a small application using the Zappos API that lets a user pick their desired product(s) and then notifies them when the price hit at least 20% off the original price.


API key provided was not used. Instead API key mentioned on site was used as the other one 2500 limit was crossed by other prospecitve intern applicants.

TO Test :

Enter Email address where you wish to receive email alert.

Search by product or product ID eg. clothes, watch or product ID
This sends a normal search request to Zappos API and renders the results.

Next : 
Click on Create PRice Alert to create a price alert.
After that try mocking - change of price by the form provided.


Overall Logic :
Once the products are displayed, price alert triggers a function which saves email address of user along with skuID and original price.
Next when the price changes, it checks into this database and then sends email to all those who have subscribed to this particular product if priceChange is atleast 20%.
