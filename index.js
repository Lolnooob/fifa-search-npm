const fs = require("fs");
const { parse } = require("csv-parse");
const csv = require("csv");
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
let info = [];

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html');
});

app.use(express.static(__dirname + '/public'));
app.get('*.js', function (req, res, next) {
  res.set('Content-Type', 'application/javascript');
  next();
});

io.on('connection', (socket) => {
// socket.broadcast.emit('hi');
	socket.on('display contents', () => {
		io.emit('display contents', info);
	});
});

server.listen(9999, () => {
	console.log('Active on port 9999');
});

// fs.createReadStream("../../D2/fifaDataset/players_22.csv")
fs.createReadStream("fifaDataset/players_22.csv")
	.pipe(parse({ delimiter: ",", from_line: 1 }))
	.on("data", (row) => {
	info.push(row)
})
.on("error", (error) => {
	console.log(error.message);
})
.on("end", () => {
	// console.log(info);
});

// var readStream = fs.createReadStream("Book1.csv");
// var writeStream = fs.createWriteStream("Book2.csv");

// var csvStream = csv.parse();

// csvStream.on("data", function(data) {
  //console.log(data)
//   info.push(data)
//   writeStream.write(data);
// })
// .on("end", function(){
    // console.log("done");
// })
// .on("error", function(error){
    // console.log(error)
// });
// 
// readStream.pipe(csvStream)