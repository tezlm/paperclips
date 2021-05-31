// "orbit"
const planetColors = ["red", "orange", "white", "blue1", "blue2", "lightgreen", "grey"];
const objects = [];

function init(screen) {
	while(objects.length) objects.pop();
	const num = Math.floor(Math.random() * 2) + 3;
	for(let i = 0; i < num; i++) {
		objects.push({
			color: planetColors[Math.floor(Math.random() * planetColors.length)],
			dist: Math.random() * (i / num) * (screen.height / 2) + 150,
			orbit: Math.random() * Math.PI,
			size: Math.random() * 30 + 8,
			speed: Math.random() / 200,
		});
	}
}

function update(screen, mouse) {
	for(let i of objects) i.orbit += i.speed;
}

function render(colors, painter, dirty) {
	const center = { x: dirty.width / 2, y: dirty.height / 2 };
	painter.setColor(colors.darkblue);
	painter.fillRect(dirty);
	painter.setColor(colors.yellow);
	painter.arc(center, 100, 0, Math.PI * 2);
	painter.fill();
	painter.setLineWidth(1);
	painter.setColor(colors.white);
	for(let i of objects) {
		painter.arc(center, i.dist, 0, Math.PI * 2);
		painter.stroke();
	}
	for(let i of objects) {
		painter.setColor(colors[i.color]);
		painter.arc({
			x: Math.sin(i.orbit) * i.dist + center.x,
			y: Math.cos(i.orbit) * i.dist + center.y,
		}, i.size, 0, Math.PI * 2);
		painter.fill();
	}
}

module.exports = { init, update, render };
