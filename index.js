// animated wallpaper by zestylemonade
const gui = require("gui");
const { argv } = process;
const options = { duration: 1000 * 60 * 5};

// parse args
for(let i = 2; i < argv.length; i++) {
	if(argv[i] === "-h") {
		console.log("paperclips");
		console.log("");
		console.log("-h\tshow this help");
		console.log("-s\tstarting scene");
		console.log("-d\tscene duration (s)");
		console.log("-D\tscene duration (ms)");
		process.exit(0);
	} else if(argv[i] === "-s") {
		options.scene = argv[++i];
		i++;
	} if(argv[i] === "-d" || argv[i] === "-D") {
		options.duration = parseInt(argv[i + 1], 10);
		if(options.duration < 0) throw "duration cant be negative";
		if(!isFinite(options.duration)) throw "duration cant be infinite";
		if(isNaN(options.duration)) throw "duration cant be... what is this?";
		if(argv[i] === "-d") options.duration *= 1000;
		i += 2;
	}
}

// constants
const screen = gui.screen.getPrimaryDisplay().bounds;
const fill = { ...screen, x: 0, y: 0 };
const colors = {
	grey: "#4C566A",
	darkgrey: "#3B4252",
	white: "#ECEFF4",
	red: "#BF616A",
	orange: "#D08770",
	yellow: "#EBCB8B",
	darkblue: "#2E3440",
	blue1: "#88C0D0",
	blue2: "#81A1C1",
	blue3: "#5E81AC",
	lightgreen: "#8FBCBB",
};

// generate the main window
const window = gui.Window.create({ frame: false });
const container = gui.Container.create();
const canvas = gui.Canvas.create(fill, 1);
const painter = canvas.getPainter();
window.setContentView(container);
window.setContentSize(fill);
window.setBounds(fill);
window.setTitle("paperclips");
window.activate();
window.onFocus = () => window.deactivate();
process.title = "paperclips";

// animation
const mouse = { x: -999, y: -999 };
const scenes = ["snow", "ocean", "sunset", "grid"].map(i => require(`./paper/${i}.js`))
let scene = require(`./paper/${options.scene || "snow"}.js`);
scene.init(screen);

container.onDraw = (_, p) => p.drawCanvas(canvas, fill);
container.onMouseMove = (_, { positionInWindow: pos }) => {
	mouse.x = pos.x;
	mouse.y = pos.y;
};
container.onMouseLeave = () => {
	mouse.x = -999;
	mouse.y = -999;
};

setInterval(() => {
	scene.update(screen, mouse);
	scene.render(colors, painter, screen);
	container.schedulePaint();
}, 1000 / 30);
setInterval(() => {
	const next = scenes[Math.floor(Math.random() * scenes.length)];
	if(scene === next) return;
	scene = next;
	scene.init(screen);
}, options.duration);

// escape gc
global.window = window;
