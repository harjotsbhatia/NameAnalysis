# First Name analysis 
# API that takes name and Birth Month to analyze first name
Base URL

The base URL for the API is:

arduino
Copy code
https://7dnizng4pl.execute-api.us-west-1.amazonaws.com/v1
Endpoints

/getdata
This endpoint is used to retrieve analysis data for a given first name and birth month.

URL: /getdata
Method: GET
Auth required: Yes
Headers:
x-api-key: bGQlYuoG9T2BSBE49tsDR6nptE2HfLxe10PIUtmb
Parameters

Parameter	Type	Description
name	string	The first name to be analyzed
birthMonth	string	The birth month
Sample Request

http
Copy code
GET /getdata?name=John&birthMonth=January HTTP/1.1
Host: 7dnizng4pl.execute-api.us-west-1.amazonaws.com
x-api-key: bGQlYuoG9T2BSBE49tsDR6nptE2HfLxe10PIUtmb
https://7dnizng4pl.execute-api.us-west-1.amazonaws.com/v1/getdata

Header API key
x-api-key:- bGQlYuoG9T2BSBE49tsDR6nptE2HfLxe10PIUtmb

Structure
![image](https://user-images.githubusercontent.com/89289963/170779316-56b4ec18-122a-46da-8a30-8ea0fe67195b.png)

Postman
<img width="852" alt="image" src="https://user-images.githubusercontent.com/89289963/170777799-abd34a86-eb1f-4ccf-883f-f0ad9826b119.png">

![image](https://user-images.githubusercontent.com/89289963/170781741-755f3994-e9c3-4966-a82d-1c51d793694c.png)


