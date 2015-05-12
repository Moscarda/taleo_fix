// ==UserScript==
// @name        Taleo Fix
// @namespace   https://github.com/raphaelh/taleo_fix
// @description Taleo Fix Links
// @include     http://*.taleo.net/*
// @include     https://*.taleo.net/*
// @version     1
// @grant       none
// ==/UserScript==

function replaceLinks() {
	var rows = document.getElementsByClassName("titlelink");
	var url = window.location.href.substring(0, window.location.href.lastIndexOf("/") + 1) + "jobdetail.ftl";

	for (var i = 0; i < rows.length; i++) {
		rows[i].childNodes[0].href = url + "?job=" + rows[i].parentNode.parentNode.parentNode.parentNode.parentNode.id;
	}
}

if (typeof unsafeWindow.ftlPager_processResponse === 'function') {
	var _ftlPager_processResponse = unsafeWindow.ftlPager_processResponse;
	unsafeWindow.ftlPager_processResponse = function(f, b) {
		_ftlPager_processResponse(f, b);
		replaceLinks();
	};
}

if (typeof unsafeWindow.requisition_restoreDatesValues === 'function') {
	var _requisition_restoreDatesValues = unsafeWindow.requisition_restoreDatesValues;
	unsafeWindow.requisition_restoreDatesValues = function(d, b) {
		_requisition_restoreDatesValues(d, b);
		replaceLinks();
	};
}
