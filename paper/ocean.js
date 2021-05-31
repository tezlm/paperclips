// "ocean"
let anim = 0;
const waves = [
	[400, "lightgreen"],
	[350, "blue1"],
	[300, "blue2"],
	[250, "blue3"],
];

function init(screen) {
	// init
}

function update(screen, mouse) {
	anim += 0.04;
}

function render(colors, painter, dirty) {
	painter.setColor(colors.darkblue);
	painter.fillRect(dirty);
	for(let i = 0; i < waves.length; i++) {
		const wave = waves[i];
		const top = dirty.height - wave[0];
		const third = dirty.width / 3;
		painter.setColor(colors[wave[1]]);
		painter.moveTo({ x: 0, y: dirty.height });
		painter.lineTo({ x: 0, y: top });
		painter.bezierCurveTo(
			{ x: third, y: top + 20 * Math.sin(anim + i) },
			{ x: dirty.width - third, y: top + 20 * Math.cos(anim + i) },
			{ x: dirty.width, y: top },
		);
		painter.lineTo({ x: dirty.width, y: dirty.height });
		painter.fill();
	}
}

module.exports = { init, update, render };
