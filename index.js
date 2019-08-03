var express = require('express');
var app = express();
var bodyParser = require('body-parser');
//app.use(bodyParser());
//app.use(express.bodyParser());

app.use(bodyParser.json());                        

    // parse application/x-www-form-urlencoded
//app.use(bodyParser.urlencoded({ extended: true }));

    // parse multipart/form-data
//app.use(multer());

app.set("view engine", "ejs");

app.use(express.static(__dirname + '/views'));

app.engine('html', require('ejs').renderFile);




/*
AES Encryption Algorithm
*/
var crypto = require('crypto');
function encrypt(text, key){
  var cipher = crypto.createCipher('aes-256-ctr',key);
  var crypted = cipher.update(text,'utf8','hex');
  crypted += cipher.final('hex');
  return crypted;
}
 
function decrypt(text, key){
  var decipher = crypto.createDecipher('aes-256-ctr',key);
  var dec = decipher.update(text,'hex','utf8');
  dec += decipher.final('utf8');
  return dec;
}




app.get("/", function(req, res){
	res.render("app");
});


app.listen(3000, function(){
	console.log("on!");
});


app.post("/sendData",function(req,res){
	//console.log((req.body));
	var output = "";
	if(req.body.encryption == true){
		output = encrypt(req.body.textContent, req.body.key);
	}else{
		output = decrypt(req.body.textContent, req.body.key);
	}
	res.send(output);
});