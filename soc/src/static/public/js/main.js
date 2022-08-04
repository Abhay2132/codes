const ww = new Worker("/js/ww.js");
var messages = document.getElementById("messages");
var form = document.getElementById("form");
var input = document.getElementById("input");

form.addEventListener("submit", function (e) {
	e.preventDefault();
	if (input.value) {
		ww.postMessage(input.value);
		input.value = "";
	}
});

ww.onmessage = function (e) {
	var item = document.createElement("li");
	item.textContent = e.data;
	messages.appendChild(item);
	window.scrollTo(0, document.body.scrollHeight);
}

