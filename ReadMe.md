RUNNING THE APPLICATION

1) In order to run the app run npm install and then run npm start/nodemon from root folder.

2) To test the application use Postman to send the information in the body

3) In order to test the application use Postman to send a request to http://localhost:3000/users. Make the key 'submission' and the value the copied and pasted information.

-----------------------------------------------------------------------------------------------
APPROACH

1) Used express in the command line to create a boilerplate model of an express server

2) Had to first connect the requests to the correct route and ensure that information was being parsed

3) Next was to take the request and manipulate it in the following steps in this order:
    a) Filtered out Federalists - easy enough
    b) Change the content inside such as creating acronyms or changing and adding dates
    c) Reorder based on year into their own arrays --- this would allow me to then alphabetize each one when they are within their respective range of years
    d) Reformat all of the arrays into one array and take the information to save as an CSV file
    e) Take the CSV file and send it as a response for the users to download from their browser using res.download() --- will prompt users to download file

-----------------------------------------------------------------------------------------------
GIVEN MORE TIME

Back-end is not my strongest skill at the moment - Ideally if I had more time I would fix the following:

1) Parsing requests in app.js when using app.use rather than the route where I am using the post

2) Add a database to store records rather than saving them server side and then responding --- currently not scalable

3) Become more familiar with JADE to test the submission --- this was my first time using csv-writer and JADE. I would have liked to test it to make sure I was sending the appropriate file

4) Use a proper front-end for submission with REACT --- would also let me test