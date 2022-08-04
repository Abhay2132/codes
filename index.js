const exp = require("express");
const app = exp();
const port = process.env.PORT || 5000;
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const bodyParser = require('body-parser')

app.use(bodyParser.json());
app.use(cors());
app.use((req, res, next) => {
	res.on("finish", () => console.log(req.method, req.url, res.statusCode));
	next();
});

app.post("/ls", (req, res) => {
	let { dir = '' } = req.body || {};
	console.log(req.body);
	const dirPath = path.resolve(dir);
	if ( ! fs.existsSync(dirPath)) return res.status(404).json({error : `dir '${dir}' not found`})
	let ls = {folders : [], files : []};
	let files = fs.readdirSync(dirPath);
	files.forEach( file => {
		let isDir = fs.statSync(path.join(dirPath, file)).isDirectory();
		if ( isDir) return ls.folders.push(file);
		ls.files.push(file);
	});
	
	res.json(ls);
});
app.use(exp.static(__dirname));
app.use((req, res) => res.sendFile(path.resolve("index.htm")));
app.listen(port, () => console.log("localhost:%i is online !", port));