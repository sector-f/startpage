var box = document.getElementById("search box");
var urlPattern = new RegExp("^(https?://)?[^ ]+[.][^ ]+([.][^ ]+)*(/[^ ]+)?$");

function search() {
	console.log("Googling \"" + box.value + "\"");
	console.log("Encoded query: \n" + encodeURIComponent(box.value));
	document.location.href = "https://www.google.com/search?q=" + encodeURIComponent(box.value);
}

function nav(address) {
	// if the address starts with "https?|ftp ://"
	if (new RegExp("^(?:(?:https?|ftp):\/\/).*").test(address)) {
		document.location.href = address;
	} else {
		document.location.href = "http://" + address;
	}
}

function searchKeyPress(e) {
	e = e || window.event;
	if (e.keyCode == 13) {
		parseCom(box.value);
	}
}

function parseCom(com) {
	if (com.startsWith("4c")==true) {
		// go to given board
		if (new RegExp("^4c .*$").test(com)) {
			var sargs = com.split(" ");
			nav("http://boards.4chan.org/" + sargs.pop());
		}
		// if just "4c" then go to 4chan.org
		else if (new RegExp("^4c$").test(com)) {
			nav("http://4chan.org");
		}
		else {
			search();
		}
	}
	else if (new RegExp("^gmail$").test(com)) {
		nav("http://mail.google.com");
	}
	// if it's a url, go to it
	else if (urlPattern.test(com)) {
		nav(com);
	}
	// for everything else, do a google search
	else {
		search();
	}
}
