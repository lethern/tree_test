
window.MASTER = {};

; (function () {

	MASTER.errorHandle_print_console = 1;

	MASTER.errorHandle = function (errorMsg, url, lineNumber, col, Obj) {
		var msg = '';
		var user_msg = 'Error';
		try {
			var res = MASTER.printErrorMsg(errorMsg, url, lineNumber, col, Obj);
			if (res.msg) msg = res.msg;
			if (res.user_msg) user_msg = res.user_msg;
		} catch (e) { }

		var alert_done = false;
		try {
			if (MASTER.errorHandle_print_console) {
				if (CONSOLE) {
					CONSOLE.write(msg, CONSOLE.ERROR);
				}
			}

			// if(dev)
				alert(msg);
				alert_done = true;
			//}

			//if (!alert_done && (
			//	(errorMsg && errorMsg._show_error) ||
			//	(errorMsg && errorMsg.error && errorMsg.error._show_error))) {
			//	alert(user_msg);
			//}

		} catch (e) { }
	};


	MASTER.printErrorMsg = function (errorMsg, url, lineNumber, col, Obj) {
		// webmethod
//		{
//			if (errorMsg.ExceptionType)
//				return MASTER.printErrorMsg_webmethod(errorMsg);
//			if (errorMsg.error && errorMsg.error.ExceptionType)
//				return MASTER.printErrorMsg_webmethod(errorMsg.error);
//			if (errorMsg._web_ex)
//				return MASTER.printErrorMsg_webmethod(errorMsg._web_ex);
//			if (errorMsg.error && errorMsg.error._web_ex)
//				return MASTER.printErrorMsg_webmethod(errorMsg.error._web_ex);
//		}

//		var error_obj = null;
//		var secondary = null;
//		if (errorMsg.error && errorMsg.error._exception) {
//			error_obj = errorMsg.error._exception;
//			secondary = errorMsg.error;
//		}
//		if (errorMsg._exception) error_obj = errorMsg._exception;
//		if (errorMsg.get_errorObject) error_obj = errorMsg;
//		if (errorMsg.stack) error_obj = errorMsg;

		var msg = '';

		msg = MASTER.printErrorMsg_default(errorMsg, url, lineNumber, col, Obj);

//		if (!error_obj) {
//			msg = MASTER.printErrorMsg_default(errorMsg, url, lineNumber, col, Obj);
//		} else {
//			if (error_obj.stack) {
//				msg += MASTER.printErrorMsg_js(error_obj);
//			} else {
//				if (error_obj.get_errorObject) {
//					msg += MASTER.printErrorMsg_serv(error_obj);
//				}
//			}
//		}
//
//		if (secondary) {
//			if (msg.length > 800) msg = msg.substr(0, 800) + '...';
//			msg += '\n' + MASTER.printErrorMsg_js(secondary);
//		}
//
//		if (errorMsg._context) msg += '\n ' + JSON.stringify(errorMsg._context);
//		if (error_obj && error_obj._context) msg += '\n ' + JSON.stringify(error_obj._context);

		var user_msg = 'Error';
//		if (errorMsg._user_msg) user_msg = errorMsg._user_msg;
//		else if (error_obj && error_obj._user_msg) user_msg = error_obj._user_msg;

		return { msg: msg, user_msg: user_msg };
	};


	MASTER.printErrorMsg_default = function (error_obj, url, lineNumber, col, Obj) {
		var msg = '';
		if (error_obj.error) {
			if (error_obj.error._client) {
				msg += 'JS throw: ';
			} else {
				msg += 'Error: ';
			}
			msg += error_obj.error.toString();
		} else {
			msg += 'Error: ' + error_obj;
		}

		msg += url ? ', Script: ' + url : '';
		msg += lineNumber ? ', Line: ' + lineNumber : '';
		msg += col ? ', Column: ' + col : '';
		msg += Obj ? ', StackTrace: ' + Obj : '';

		msg += UTILS.isDefined(error_obj._myError) ? ' : ' + error_obj._myError : '';
		msg += UTILS.isDefined(error_obj.filename) ? ', File: ' + error_obj.filename : '';
		msg += UTILS.isDefined(error_obj.lineno) ? ', Line: ' + error_obj.lineno : '';
		return msg;
	};

	window.addEventListener('error', MASTER.errorHandle);

})();
