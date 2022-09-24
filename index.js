// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


app.get("/api/:date?", (req, res) => {
  const d = req.params.date;

  if( d === '' || d === undefined) {
    return res.json({unix: (new Date()).getTime(), utc: (new Date()).toUTCString()})
  };
  
  const date = new Date(d);
  const dateMili = new Date(parseInt(d, 10));
  let unix;
  let utc;
  
// console.log(date.toString());
  
  if(date.toString() === 'Invalid Date'){
    if(dateMili.toString() === 'Invalid Date')
      return res.json({error : "Invalid Date" });
    // date = fullOFNumber (miliseconds)
    unix = dateMili.getTime();
    utc = dateMili.toUTCString();
    return res.json({ unix, utc})
    }
  
    unix = date.getTime();
    utc = date.toUTCString();
    res.json({ unix, utc})
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
