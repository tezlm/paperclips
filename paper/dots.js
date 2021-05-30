// "snowstorm"
const dots = [];
const vel = 3;

function init(screen) {
	while(dots.length) dots.pop();
	for(let i = 0; i < 300; i++) {
		dots.push([
			Math.random() * screen.width,
			Math.random() * screen.height,
			0,
			0,
			Math.floor(Math.random() * 3) + 3,
		]);
	}
}

function update(screen, mouse) {
	for(let i of dots) {
		i[0] += (i[2] *= 0.8) + vel / 2;
		i[1] += (i[3] *= 0.8) + vel;
		if(i[0] > screen.width) i[0] = -i[4];
		if(i[1] > screen.height) i[1] = -i[4];
		if(i[0] < -i[4]) i[0] = screen.width;
		if(i[1] < -i[4]) i[1] = screen.height;
		const fdist = (mouse.x - i[0]) ** 2 + (mouse.y - i[1]) ** 2;
		if(fdist < 150 ** 2) {
			const dist = Math.sqrt(fdist);
			const x = mouse.x - i[0];
			const y = mouse.y - i[1];
			i[2] += (x / -dist) * (100 / dist);
			i[3] += (y / -dist) * (100 / dist);
		};
	}
}

function render(colors, painter, dirty) {
	painter.setColor(colors.darkblue);
	painter.fillRect(dirty);
	painter.setColor(colors.white);
	for(let i of dots) {
		painter.arc({ x: i[0], y: i[1] }, i[4], 0, Math.PI * 2);
		painter.fill();
	}
}

module.exports = { init, update, render };
