const canvas = document.getElementById("game");
canvas.height = window.innerHeight-20
canvas.width = window.innerWidth-2
const ctx = canvas.getContext("2d");

async function run(states = {}) {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	for (let state of states) {
		if (typeof state != "object") continue;
		for (let key in state) {
			if (Array.isArray(state[key])) {
				ctx[key](...state[key]);
				continue;
			}
			ctx[key] = state[key];
		}
	}
}

function clamp ( n=0, a=0, z=0 ) {
	if ( n < a ) return a;
	if ( n > z ) return z;
	return n;
}
var obj = {
	x: 10,
	y: 10,
	height: 50,
	width: 50,
	color: "green",
};
var stateStack = [
	{
		fillStyle: obj.color,
		fillRect: [obj.x1, obj.y1, obj.x2, obj.y2],
	},
];
var lastStack;
const drag = (e) => {
	let x = e.targetTouches[0].clientX;
	let y = e.targetTouches[0].clientY;

	obj.x = clamp(parseInt(x - obj.width / 2), 0, canvas.width - obj.width);
	obj.y = clamp(parseInt(y - obj.height / 2), 0, canvas.height - obj.height);

	move();
};

function move() {
	stateStack[0] = {
		fillStyle: obj.color,
		fillRect: [obj.x, obj.y, obj.width, obj.height],
	};
	run(stateStack);
}

function wait(n = 0) {
	return new Promise((a) => setTimeout(a, n));
}

window.ontouchmove = drag;
window.ontouchstart = drag;
