// "sunset"
let anim = 0;
const rings = [
	[160, "red"],
	[140, "orange"],
	[120, "yellow"],
];

function init(screen) {
	// init
}

function update(screen, mouse) {
	anim += 0.01;
}

function render(colors, painter, dirty) {
	const center = { x: dirty.width / 2, y: dirty.height / 2 };
	painter.setColor(colors.darkblue);
	painter.fillRect(dirty);
	for(let i = 0; i < rings.length; i++) {
		const ring = rings[i];
		painter.setColor(colors[ring[1]]);
		painter.arc(center, ring[0] + 20 * Math.sin(anim + i / 10), 0, Math.PI * 2);
		painter.fill();
	}
}

module.exports = { init, update, render };
