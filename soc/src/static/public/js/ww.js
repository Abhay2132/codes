
importScripts('/socket.io/socket.io.js');
var socket = io();
socket.on("chat message", function (msg) {
	postMessage(msg);
});

onmessage = function (e) {
	socket.emit("chat message", e.data);
}