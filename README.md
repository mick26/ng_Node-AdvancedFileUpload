## Synopsis

File Upload App built using AngularJS (v1.3.0), NodeJS and ExpressJS(v4.1).
The Angular code is taken from [Daniel Farid's](https://github.com/danialfarid/angular-file-upload) example file-upload code on Git Hub.

The Node server code is mine. I also added some http success and error callbacks to get access to the HTTP headers etc.


##Left to Discover

Daniel makes use of [FileAPI](https://github.com/mailru/FileAPI) for the image/file processing client side and has created what seems an excellent package.

The NodeJS server code works and is error free. However I am not an expert yet with Node and would be eager to hear feedback on how the code should be improved. 


## Motivation

Learning AngularJS and NodeJS.

 
##Using the program
* Install Node and NPM
* run `npm install` (this installs all dependencies listed in project.json)
* run `node server.js`

A local express server will now be available on port 3040 [http://localhost:3040/]

##

Michael Cullen 2014