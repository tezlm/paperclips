// "colors"
const choices = ["red", "orange", "yellow", "blue2", "blue3", "lightgreen", "purple"];
const current = {};

function init() {
	const rand = () => choices[Math.floor(Math.random() * choices.length)];
	let next = rand();
	while(current.color === next) next = rand();
	current.color = next;
	current.i = -100;
}

function update(screen, mouse) {
	current.i += 18;
	current.i *= 0.997;
	if(current.i > screen.width + 100) init();
}

function render(colors, painter, dirty) {
	painter.setColor(colors[current.color]);
	painter.save();
	painter.rotate(0.1);
	painter.fillRect({
		x: dirty.width - current.i,
		y: -dirty.height / 2,
		width: 20,
		height: dirty.height * 2,
	});
	painter.restore();
}

module.exports = { init, update, render };

