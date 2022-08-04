const exp = require("express");
const app = exp();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const port = process.env.PORT || 5000;

app.use((req, res, next) => {
	res.on("finish", () => {
		console.log(req.method, req.url, res.statusCode);
	});
	next();
});

app.use(exp.static(__dirname + "/static/public"));
app.get("/", (req, res) => {
	res.sendFile(__dirname + "/static/public/index.html");
});

io.on("connection", (socket) => {
	socket.on("chat message", (msg) => {
		io.emit("chat message", msg);
	});
});

http.listen(port, () => {
	console.log(`Socket.IO server running at http://localhost:${port}/`);
});
