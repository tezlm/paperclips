// "drift"
const dots = [];
const vel = 0.5;
const dir = [];

function init(screen) {
	while(dots.length) dots.pop();
	dir[0] = 0;
	dir[1] = 1;
	for(let i = 0; i < 300; i++) {
		dots.push([
			Math.random() * screen.width,
			Math.random() * screen.height,
			Math.random() + 1,
			Math.floor(Math.random() * 3) + 3,
		]);
	}
}

function update(screen, mouse) {
	for(let i of dots) {
		i[0] += vel * i[3] * dir[0];
		i[1] += vel * i[3] * dir[1];
		if(i[0] > screen.width) i[0] = -i[2];
		if(i[1] > screen.height) i[1] = -i[2];
		if(i[0] < -i[2]) i[0] = screen.width;
		if(i[1] < -i[2]) i[1] = screen.height;
	}
	if(mouse.x < 0 || mouse.y < 0) return;
	const w = screen.width / 2;
	const h = screen.height / 2;
	dir[0] = (mouse.x - w) / w;
	dir[1] = (mouse.y) / h;
}

function render(colors, painter, dirty) {
	painter.setColor(colors.darkblue);
	painter.fillRect(dirty);
	painter.setColor(colors.grey);
	for(let i of dots) {
		painter.arc({ x: i[0], y: i[1] }, i[3], 0, Math.PI * 2);
		painter.fill();
	}
}

module.exports = { init, update, render };
