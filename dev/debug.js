var	ansi		= require("ansi"),
	cursor		= ansi(process.stdout),
	usage		= require("usage"),
	spawn		= require("child_process").spawn;

var debug_process;
var debug_process_exited;
var stdout = [], stderr = [];
function launchDebugProcess()
{
	stdout = [];
	stderr = [];
	debug_process_exited = false;
	debug_process = spawn("node", ["/var/node/app.js"]);
	debug_process.stdout.on("data", function(data) {
		stdout = stdout.concat(data.toString().split(/\r?\n/));
		if(stdout[stdout.length-1].length==0)
		{
			stdout.pop();
		}
		var i = stdout.length - (process.stdout.getWindowSize()[1]-1 - 4);
		while(i-->0)
		{
			stdout.shift();
		}
		drawScreen();
	});
	debug_process.stderr.on("data", function(data) {
		stderr = stderr.concat(data.toString().split(/\r?\n/));
		if(stderr[stderr.length-1].length==0)
		{
			stderr.pop();
		}
		var i = stderr.length - (process.stderr.getWindowSize()[1]-1 - 4);
		while(i-->0)
		{
			stderr.shift();
		}
		drawScreen();
	});
	debug_process.on("exit", function(code, signal) {
		drawScreen();
		debug_process_exited = true;
	});
	drawScreen();
}

function lf()
{
	return "\n";
}
function clear()
{
	cursor.write(Array.apply(null, Array(process.stdout.getWindowSize()[1])).map(lf).join('')).eraseData(2).goto(1,1);
}
function drawScreen()
{
	var x=process.stdout.getWindowSize()[0], y=process.stdout.getWindowSize()[1];
	var hx=Math.ceil(x/2);
	var i;
	
	clear();
	
	cursor.yellow()
		.bold()
		.underline()
		.write("Debugging Node Servers")
	.reset();
	
	
	var cpu = cpu_usage.toFixed(3);
	var mem = (memory_usage/1048576).toFixed(2);
	var uptime_min = Math.floor(process.uptime()/60);
	var uptime_sec = Math.floor(process.uptime()%60);
	cursor.goto(1,2)
		.cyan()
		.bold()
		.write("CPU: ").write(cpu).write("     ")
		.write("Memory: ").write(mem+" MB").write("     ")
		.write("Uptime: ").write(uptime_min+":"+(uptime_sec<10?"0":"")+uptime_sec)
	.reset();
	
	cursor.goto(1,3)
		.green()
		.bold()
		.write("Out")
	.reset();
	
	for(i=3;i<=y-1;i++)
	{
		cursor.goto(hx-1,i).write("|");
	}
	
	cursor.goto(hx,3)
		.red()
		.bold()
		.write("Error")
	.reset();
	
	var l = stdout.length;
	for(i=0;i<l;i++)
	{
		cursor.goto(1,i+4).write(stdout[i].substring(0,hx-2));
	}
	l = stderr.length;
	for(i=0;i<l;i++)
	{
		cursor.goto(hx,i+4).write(stderr[i].substring(0,hx-2));
	}
	
	var msg = "Press ENTER key to respawn debug process...";
	if(debug_process_exited)
	{
		msg = "PROCESS STOPPED: " + msg;
		cursor.goto(x-msg.length,1).red().bold();
	} else {
		cursor.goto(x-msg.length,1).grey();
	}
	cursor.write(msg).reset();
	
	
	cursor.goto(1,y-1);
}

var cpu_usage=0, memory_usage=0;
setInterval(function() {
	usage.lookup(process.pid, function(err, res) {
		cpu_usage = res.cpu;
		memory_usage = res.memory;
	});
}, 100);

var relaunchTimeout;
process.stdin.on("data", function(data) {
	try {
		debug_process.kill("SIGKILL");
	} catch(e) {
	}
	clearTimeout(relaunchTimeout);
	relaunchTimeout = setTimeout(launchDebugProcess, 250);
});
process.stdout.on("resize", function() {
	drawScreen();
});
process.on("exit", function() {
	debug_process_exited = false;
	drawScreen();
	try {
		debug_process.kill("SIGKILL");
	} catch(e) {
	}
});

setInterval(drawScreen, 1000);
launchDebugProcess();