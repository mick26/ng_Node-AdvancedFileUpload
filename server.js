/*=========================================================
Michael Cullen
File Upload
server.js

May 2014
Working - (Tá se ag obair)
============================================================*/


/* ========================================================== 
External Modules/Packages Required
============================================================ */
var express = require('express');			//Express Web Server 
var busboy = require('connect-busboy');		//middleware for form/file upload
//var im = require('imagemagick');
//var easyimg = require('easyimage');			//image processing
var path = require('path');					//used for file path
var fs = require('fs-extra');				//File System - for file manipulation
var util = require('util');					//for stream

/* ========================================================== 
Create a new application with Express
============================================================ */
var app = express();

/* ========================================================== 
Use busboy middleware
============================================================ */
app.use(busboy());

/* ========================================================== 
serve the static index.html from the public folder
============================================================ */
app.use(express.static(path.join(__dirname, 'public')));


/* ========================================================== 
Create a Route (/upload) to handle the Form submission 
(handle POST & PUT requests to /upload)
Express v4  Route definition
============================================================ */

app.route('/upload')

	.post(function (req, res, next) {

		var arr;
	    var fstream;
	    var filesize = 0;
	    req.pipe(req.busboy);

	    //--------------------------------------------------------------------------
	    req.busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
         
	        //uploaded file name, encoding, MIME type
	        console.log('File [' + fieldname +']: filename:' + filename + ', encoding:' + encoding + ', MIME type:'+ mimetype);

	        //uploaded file size
	        file.on('data', function(data) {
	    		console.log('File [' + fieldname + '] got ' + data.length + ' bytes');
	    		fileSize = data.length;
	    		console.log("fileSize= " + fileSize);
  			});

	        file.on('end', function() {
	            console.log('File [' + fieldname + '] ENDed');
	            console.log("-------------------------");
	        });

			//populate array
			//I am collecting file info in data read about the file. It may be more correct to read 
			//file data after the file has been saved to img folder i.e. after file.pipe(stream) completes
			//the file size can be got using stats.size as shown below
			arr= [{fieldname: fieldname, filename: filename, encoding: encoding, MIMEtype: mimetype}];
			
   	        //Path where image will be uploaded
	        fstream = fs.createWriteStream(__dirname + '/img/' + filename);	//create a writable stream

	        file.pipe(fstream);		//pipe the post data to the file


			//stream Ended - (data written) send the post response
		  	req.on('end', function () {
		    	res.writeHead(200, {"content-type":"text/html"});		//http response header

		    		//res.end(JSON.stringify(arr));							//http response body - send json data
		  	});

			//Finished writing to stream
			fstream.on('finish', function () { 
				console.log('Finished writing!'); 

					//Get file stats (including size) for file saved to server
					fs.stat(__dirname + '/img/' + filename, function(err, stats) {
				    	if(err) 
				    		throw err;	    
				    	//if a file
					    if (stats.isFile()) {
	      					//console.log("It\'s a file & stats.size= " + JSON.stringify(stats));	
	      					console.log("File size saved to server: " + stats.size);	
	      					console.log("-----------------------");
				    	};
	  				});
			});


   			// error
  			fstream.on('error', function (err) {
    			console.log(err);
  			});

		
		});  //	@END/ .req.busboy
    })	//	@END/ POST
	


	//PUT
	.put(function (req, res, next) {

	    var fstream;
	    req.pipe(req.busboy);
	    req.busboy.on('file', function (fieldname, file, filename) {
	        console.log("Uploading: " + filename);

	        //Path where image will be uploaded
	        fstream = fs.createWriteStream(__dirname + '/img/' + filename);
	        file.pipe(fstream);

	        fstream.on('close', function () {
	            console.log("Upload Finished of " + filename);
	            res.redirect('back');				//where to go next
	        });
	    });
	});



/* ========================================================== 
Bind to a port and listen for connections on it 
============================================================ */
var server = app.listen(3040, function() {
	console.log('Listening on port %d', server.address().port);
	console.log("========LISTENING==3040=======")
});


