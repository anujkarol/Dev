# Teaacher Admin API - Readme
This a set of API services created for service Teacher Adminstration requirement.
The Below set of services are service by the API
​
* Allocate/assign a set of students to a teacher.
* List down the common students among the given list of teacher
* Suspend a student
* Retrive active student list who were alloted to a teacher and eligible for notification
​
​
# Build and Run
​
First Header  | Second Header
------------- | -------------
Content Cell  | Content Cell
Content Cell  | Content Cell


| Purpose | Command|
|---------| -------|
|Build | `npm install`|
|Build | `npm run build`|
|Run Tests| `npm run test`|
|Boot Node server| `npm run start`|
​
## Server Port Change
​
Node server is set to run on port 3001 (`app.ts`). The port can be overriden by passing **PORT** arguemnt to node command
​
## DB Connection configuration
​
Change the required Database connection configuration in the file `data/connection.ts`
​
```JAVASCRIPT
export const pool = mysql.createPool({
    connectionLimit: 10,
    host: "localhost",
    user: "root",
    password: "password",
    database: "school"
});
```
​
## Databse Scripts
Execute the Databse scripts from the location `<workspace>/mysql/`
* Data structure creatio script - `<workspace>/mysql/schema.sql`
* Data creation script - `<workspace>/mysql/data.sql`
  
​
​
  
# API Guide
​
## Postman Integraion
​
* Download Postman integraion from the below locaion
  `<workspace>/Admin.postman_collection.json`
​
## API Refernce
​
### Register Student to Teacher API
​
#### URL
[http://localhot:3001/api/register](http://localhot:3001/api/register)
​
​
#### Request
​
```JSON
{
"teacher": "teacherken@gmail.com",
"students":[
		"studentjon@example.com", 
		"studenthon@example.com",
		"studentkon@example.com"
	] 
}
```
​
#### Response
```JSON
{"errorCode":"","message":"","status":"SUCCESS"}
```
​
​
​
### Retrieve Common STudents API
#### URL
[http://localhost:3001/api/commonstudents?teacher=teacher@abc.com&teacher=teacherken@gmail.com](http://localhost:3001/api/commonstudents?teacher=teacher@abc.com&teacher=teacherken@gmail.com)
​
​
#### Request
```JSON
teacher:teacher@abc.com
teacher:teacherken@gmail.com
```
​
#### Response
```JSON
{
    "errorCode": "",
    "message": "",
    "students": [
        "studentjon@example.com"
    ]
}
```
​
​
### Suspend a student(s) API
#### URL
[http://localhost:3001/api/suspend](http://localhost:3001/api/suspend)
​
​
​
#### Request
```JSON
{
"student" : "studentmary@gmail.com"
}
```
​
#### Response
```JSON
{
    "errorCode": "",
    "message": "",
    "status": "SUCCESS"
}
```
​
​
​
### Retrieve All eligible Notification Student API
#### URL
[http://localhost:3001/api/retrievefornotifications](http://localhost:3001/api/retrievefornotifications)
​
​
#### Request
```JSON
{
	"teacher": "teacherken@example.com",
	"notification": "Hello students! @studentagnes@example.com @studentmiche@example.com"
}
```
​
#### Response
```JSON
{
    "errorCode": "",
    "message": "",
    "recipients": [
        "studentagnes@example.com",
        "studentmiche@example.com"
    ]
}
```
