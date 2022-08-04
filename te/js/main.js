function doGetCaretPosition (oField) {
	return  oField.selectionStart + ", " + oField.selectionEnd
  
 }
 
 const qs = a => document.querySelector(a);
 const pageEdit = qs(".page-edit");
 (async function () {
 	var lastPos = 0;
 	while(1) {
 		await new Promise (a => setTimeout(a, 50));
 		var pos = doGetCaretPosition(pageEdit);
 		if ( pos != lastPos ) {
 			log(pos);
 			lastPos = pos;
		}
	}
})();

//qs(".page-edit").addEventListener('keyup', function(e) {log(e.key, e.keyCode)})

qs(".logs").onclick = function (e) {
	let {lastClick = 0} = e.target;
	if ( Date.now() - lastClick < 200 ) {
		e.target.innerHTML = "LOGs :- <br /><br />"
	}
	e.target.lastClick = Date.now();
}

const log = (...a) => {
	let logs = qs(".logs");
	a.forEach(b => logs.innerHTML += (typeof b == "object" ? JSON.stringify(b) : b) + " ");
	logs.innerHTML += "<br />";
	logs.scrollTo(0, logs.scrollHeight);
}

const getSel = () => {
	console.log(document.getSelection());
	log(document.getSelection());
}









