

function onLoad() {

	CONSOLE.init_defaults();

	CONSOLE.write('Tree init', CONSOLE.INFO);

	test_elem = document.createTextNode('test');
	document.getElementById('main_div').appendChild(test_elem);

	let stage = new Kinetic.Stage({
		container: 'render_div',
		
		width: 900,
		height: 500,
	});
	let layer = new Kinetic.Layer({
		x: 10,
		y: 50,
	});
	stage.add(layer);

	let x = 100;
	let y = 100;

	var rect = new Kinetic.Rect({
		'x': x,
		'y': y,
		'width': 100,
		'height': 50,
		'fill': '#440',//class_color[system.class],
		'stroke': '#ccc',
		'strokeWidth': 2,
	});
	layer.add(rect);
};

window.addEventListener('load', onLoad);