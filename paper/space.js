// TODO: pseudo-3d dot rotations?
// "space"
const starColors = ["blue1", "blue2", "white", "yellow"];
const planetColors = ["red", "orange", "yellow", "lightgreen", "grey"];
const objects = [];
const rand = (s, e) => Math.floor(Math.random() * (s - e)) + e;
const randarr = arr => arr[Math.floor(Math.random() * arr.length)];
let anim = 0;

function star(disp) {
	const pos = rand(0, disp.width + disp.height);
	let x = 0, y = 0;
	if(pos <= disp.width) {
		x = pos;
	} else {
		y = pos - disp.width;
	}
	objects.push({
		color: randarr(starColors),
		depth: Math.random() + 1,
		x,
		y,
	});
}

function init(screen) {
	while(objects.length) objects.pop();
	for(let i = 0; i < rand(4, 6); i++) {
		objects.push({
			color: randarr(planetColors),
			x: rand(0, screen.width),
			y: rand(0, screen.height),
			depth: rand(-300, -50),
		});
	}
	for(let i = 0; i < rand(100, 150); i++) star(screen);
}

function update(screen, mouse) {
	// update state
}

function render(colors, painter, dirty) {
	painter.setColor(colors.darkBlue);
	painter.fillRect(dirty);
	// render state
}

module.exports = { init, update, render };
