// "snowstorm"
const flakes = [];

const map = [
	"grey", "grey", "grey", "grey",
	"grey", "grey", "grey", "grey",
	"grey", "grey", "grey", "grey",
	"darkgrey", "white", "blue1", "blue2",
];

function init(screen) {
	while(flakes.length) flakes.pop();
	for(let i = 0; i < 300; i++) {
		flakes.push({
			x: Math.random() * screen.width,
			y: Math.random() * screen.height,
			vx: Math.random() * 6 + 2,
			vy: Math.random() * 6 + 2,
			size: Math.floor(Math.random() * 3) + 3,
			color: map[Math.floor(Math.random() * map.length)],
		});
	}
}

function update(screen) {
	for(let i of flakes) {
		i.x += i.vx;
		i.y += i.vy;
		if(i.x > screen.width) i.x = -i.size;
		if(i.y > screen.height) i.y = -i.size;
	}
}

function render(colors, painter, dirty) {
	painter.setColor(colors.darkblue);
	painter.fillRect(dirty);
	for(let i of flakes) {
		painter.setColor(colors[i.color]);
		painter.arc(i, i.size, 0, Math.PI * 2);
		painter.fill();
	}
}

module.exports = { init, update, render };
