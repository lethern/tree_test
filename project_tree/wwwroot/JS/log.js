
// CONSOLE
; (function () {

	window.CONSOLE = {};

	CONSOLE.DEBUG = 1;
	CONSOLE.INFO = 2;
	CONSOLE.WARN = 3;
	CONSOLE.ERROR = 4;

	CONSOLE.init_defaults = function(){
		CONSOLE.set_enabled(1);
		CONSOLE.ALLOW_DEBUG = true;
		CONSOLE.write('Start', CONSOLE.INFO);

		let helperDiv = document.getElementById('consoleHelperDiv');
		if (helperDiv) helperDiv.addEventListener('click', CONSOLE.close_XClick);
	};

	CONSOLE.close_XClick = function () {
		var div = CONSOLE.consoleDiv;
		div.classList.toggle('_show');
		div.scrollTop = div.scrollHeight;
	};


	var consoleEnabled = -1;
	CONSOLE.consoleDiv = null;
	CONSOLE.active = 0;
	CONSOLE.ALLOW_DEBUG = true;

	var _queue = [];
	var toRender = [];
	var bolded = [];


	CONSOLE.severityToString = function (s) {
		switch (s) {
			case CONSOLE.DEBUG: return '[DEBUG] ';
			case CONSOLE.INFO: return '[INFO] ';
			case CONSOLE.WARN: return '[WARN] ';
			case CONSOLE.ERROR: return '[ERROR] ';
			default: return '?[' + s + ']';
		}
	};

	CONSOLE.set_enabled = function (_bool) {
		consoleEnabled = _bool?1:0;
	};

	CONSOLE.write = function (text, severity) {
		try {
			if (consoleEnabled == 0) return;

			if (consoleEnabled == -1) {
				if (_queue.length > 20) return;
				_queue.push({ text: text, severity: severity });
				return;
			}

			if (!CONSOLE.active) {
				CONSOLE.consoleDiv = document.getElementById('consoleDiv');

				document.getElementById('consoleHelperDiv').classList.add('_show');
				CONSOLE.active = 1;

				for (var i = 0; i < _queue.length; ++i) {
					var _text = _queue[i].text;
					var _severity = _queue[i].severity;
					CONSOLE.write(_text, _severity);
				}
				_queue = [];
			}

			write_impl(text, severity);

		} catch (e) { consoleEnabled = 0; }
	};

	function write_impl(text, severity) {

		if (severity) {
			if (severity == CONSOLE.DEBUG && !CONSOLE.ALLOW_DEBUG) return;

			text = CONSOLE.severityToString(severity) + text;
		}

		var textDOM = document.createElement('div');
		textDOM.textContent = text;

		if (severity == CONSOLE.ERROR) textDOM.classList.add('consoleError');
		if (severity == CONSOLE.WARN) textDOM.classList.add('consoleWarn');
		if (severity == CONSOLE.DEBUG) textDOM.classList.add('consoleDebug');

		textDOM.classList.add('_bold');

		toRender.push(textDOM);

		if (!CONSOLE.timer)
			CONSOLE.timer = setTimeout(render, 100);
	};

	CONSOLE.flush = function () {
		render();
	};

	function render() {
		var div = CONSOLE.consoleDiv;

		for (var i = 0, len = bolded.length; i < len; ++i) {
			bolded[i].classList.remove('_bold');
		}
		bolded = [];

		for (var i = 0, len = toRender.length; i < len; ++i) {
			var el = toRender[i];
			div.appendChild(el);
			bolded.push(el);
		}
		toRender = [];
		
		if (div.children.length > 200) {
			var to_remove = div.children.length - 170;
			while (to_remove--)
				div.removeChild(div.firstChild);
		}

		div.scrollTop = div.scrollHeight;
		CONSOLE.timer = null;
	};

})();
