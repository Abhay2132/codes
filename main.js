var href = location.href.split("?")[0]
href = href.startsWith('http') ? href.split("/").slice(3).join("/") : href;
href = href.split("/").filter(a => !!a);

function setPathsStyles (){
	const tags = Array.from(document.querySelectorAll(".nav-item-con"));
	tags[0].style.zIndex = ""+tags.length;
	const size = 15;
	const padding = 5;
	
	for(let i = 1; i < tags.length ; i++) {
		let tag = tags[i]
		let tag_item = tags[i].children[0]
		let txt = tag_item.textContent.slice(0, 10);
		txt += tag_item.textContent.length > 10 ? "..." : "";
		
		tag.style.zIndex = "" + tags.length - i;
		tag.style.left = "-" + (i*size) + "px";
		tag_item.style.paddingLeft = ((size +5) + padding) + "px";
		tag_item.textContent = txt;
	};
}

function addNewPath ({name, url}) {
	let tag = document.createElement("div");
	document.querySelector("nav").innerHTML += `<div class="nav-item-con" onclick = "location.href = '`
		+ url
		+`'"><div class="nav-item" >`
		+ name
		+ `</div><div class="tail"></div></div>`
}

function configPath () {
	for(let i =0 ; i < href.length; i++) {
		let name = href[i];
		let url = "/"+href.slice(0, i+1).join("/");
		addNewPath ({name, url})
	}
	setPathsStyles ()
}

configPath () 


const svgs = {
	folder : '<svg class="svg-icon folder-icon" viewBox="0 0 20 20"><path d="M17.927,5.828h-4.41l-1.929-1.961c-0.078-0.079-0.186-0.125-0.297-0.125H4.159c-0.229,0-0.417,0.188-0.417,0.417v1.669H2.073c-0.229,0-0.417,0.188-0.417,0.417v9.596c0,0.229,0.188,0.417,0.417,0.417h15.854c0.229,0,0.417-0.188,0.417-0.417V6.245C18.344,6.016,18.156,5.828,17.927,5.828 M4.577,4.577h6.539l1.231,1.251h-7.77V4.577z M17.51,15.424H2.491V6.663H17.51V15.424z"></path></svg>',
	file : `<svg class="svg-icon file-icon" viewBox="0 0 20 20"><path fill="#333" d="M17.222,5.041l-4.443-4.414c-0.152-0.151-0.356-0.235-0.571-0.235h-8.86c-0.444,0-0.807,0.361-0.807,0.808v17.602c0,0.448,0.363,0.808,0.807,0.808h13.303c0.448,0,0.808-0.36,0.808-0.808V5.615C17.459,5.399,17.373,5.192,17.222,5.041zM15.843,17.993H4.157V2.007h7.72l3.966,3.942V17.993z"></path></svg>`,
	"go-back" : `<svg class="svg-icon go-back-icon" viewBox="0 0 20 20">
	<path fill="#333" d="M18.271,9.212H3.615l4.184-4.184c0.306-0.306,0.306-0.801,0-1.107c-0.306-0.306-0.801-0.306-1.107,0
	L1.21,9.403C1.194,9.417,1.174,9.421,1.158,9.437c-0.181,0.181-0.242,0.425-0.209,0.66c0.005,0.038,0.012,0.071,0.022,0.109
	c0.028,0.098,0.075,0.188,0.142,0.271c0.021,0.026,0.021,0.061,0.045,0.085c0.015,0.016,0.034,0.02,0.05,0.033l5.484,5.483
	c0.306,0.307,0.801,0.307,1.107,0c0.306-0.305,0.306-0.801,0-1.105l-4.184-4.185h14.656c0.436,0,0.788-0.353,0.788-0.788
	S18.707,9.212,18.271,9.212z"></path>
</svg>`
}

function setIcons (name) {
	let tags = Array.from(document.querySelectorAll("."+name));
	tags.forEach(tag => {
		tag.innerHTML = svgs[name] + tag.innerHTML;
	});
}

function set_list_dir (ls) {
let { folders = [], files = [], error = false} = ls || {};

if ( error ) return alert(error);

folders.forEach(folder => document.querySelector(".folders-list").innerHTML += `<div class="folder" onclick="openPath(this)" >${folder}</div>`);
files.forEach(file => document.querySelector(".files-list").innerHTML += `<div class="file" onclick="openPath(this)" >${file}</div>`);

setIcons ("folder")
setIcons ("file")
setIcons ("go-back")
}

fetch("/ls", {
	headers : {
		"Content-Type" : "application/json"
	},
	method : "POST",
	body : JSON.stringify({dir : href.join("/")})
})
.then(data => data.json())
.then(set_list_dir)

function openPath (tag) {
	if ( ! tag.lastTouch ) return tag.lastTouch = Date.now();
	if ( Date.now() - (tag.lastTouch || 0) > 500 ) return tag.lastTouch = Date.now();
	
	location.href += tag.textContent;
}

function goBack (tag) {
	if ( ! tag.lastTouch ) return tag.lastTouch = Date.now();
	if ( Date.now() - (tag.lastTouch) > 500 ) return tag.lastTouch = Date.now();
	tag.lastTouch = Date.now();
	
	location.href = "http://localhost:5000/"+ href.slice(0, href.length -1).join("/");
}











