

function onLoad() {

	CONSOLE.init_defaults();

	test_elem = document.createTextNode('test');
	document.getElementById('main_div').appendChild(test_elem);

	let stage = new Kinetic.Stage({
		container: 'render_div',
		width: 900,
		height: 0,
	});
	let layer = new Kinetic.Layer();
};

window.addEventListener('load', onLoad);