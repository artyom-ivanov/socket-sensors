console.log("Im client");
var socket = io();

document.querySelector('a.close').addEventListener("click", function(e){
	e.preventDefault();
	window.close();
});

window.addEventListener('deviceorientation', function(event) {
	const data = {
		client: document.querySelector('.h5').getAttribute('data-client'),
		data: Math.round(event.gamma)
	};
	document.querySelector('#debug').innerText = JSON.stringify(data);
	socket.emit('client', data);
});