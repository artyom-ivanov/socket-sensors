console.log('Im main');
var socket = io();
socket.on('data', function(msg){
	if (Object.keys(msg).length > 0)
  	document.querySelector("#debug").innerText = JSON.stringify(msg);
  console.log(msg);
});