define(function () {
    'use strict';

    var scrollIntervalId,
        isBrowser = typeof window !== "undefined" && window.document,
        isPageLoaded = !isBrowser,
        doc = isBrowser ? document : null,
        readyCalls = [],defaultHandler;
	defaultHandler=function(obj){
		console.log(obj);	
	};

	function browserError(callback) {
		defaultHandler=callback;
    }

    function eventHandler(event){
		//alert("attchevent");
        var errorObj={
			filename:event.filename,
			lineno:event.lineno,
			colno:event.colno,
			stack:event.error.stack,
			messages:event.error.message,
			location:location.href
		}
		defaultHandler.call(this,errorObj);
        event.preventDefault();
		event.stopPropagation();
        return false;
    }
    if (isBrowser) {
		if (window.attachEvent) {
			window.attachEvent("error", eventHandler);
        } else {
        	window.addEventListener('error',eventHandler,false);
        }
    }

    browserError.version = '0.0.1';
    return browserError;
});
