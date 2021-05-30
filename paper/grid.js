// "checkerboard"
let scroll = 0;
const rotate = 0.1;
const size = 50;

function init() {}

function update() {
	scroll++;
	if(scroll > size * 2) scroll = 0;
}

function render(colors, painter, dirty) {
	const cx = dirty.width / 2;
	const cy = dirty.height / 2;
	painter.setColor(colors.darkblue);
	painter.fillRect(dirty);
	painter.setColor(colors.darkgrey);
	painter.save();
	painter.rotate(rotate);
	painter.translate({ x: cx, y: scroll });
	for(let i = 0; i < 40; i++) {
		for(let j = 0; j < 40; j++) {
			if((i + j) % 2 === 0) continue;
			painter.rect({ x: i * size - cx, y: j * size - cy, width: size, height: size });
		}
	}
	painter.fill();
	painter.restore();
}

module.exports = { init, update, render };
