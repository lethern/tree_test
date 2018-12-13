
window.UTILS = {};

; (function () {

	UTILS.isDefined = function (obj) {
		// UTILS.isDefined ( obj.field1 )  --correct
		// UTILS.isDefined ( obj )  --incorrect
		return typeof obj !== 'undefined';
	};

})();
