setInterval(function() {
	console.log(Math.random());
	throw(new Error("testing"));
}, 1000);