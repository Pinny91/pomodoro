var leTime = 1500;//60* 25min = 1500
var leBreak = 60;

var hoogte = 0;
var min, sec;
var timerRunning = false, breakRunning = false;
var saveTime, saveTimeBr;
var interval, intervalBr;

$(document).ready(function() {
	plus = $('#plus');
	min = $('#min');
	time = $('#time');
	timeBox = $('#timeCir');
	
	plusBreak = $('#plusBreak');
	minBreak = $('#minBreak');
	
	plus.on('click', function() {
		leTime += 60;
		convertTime(leTime);
	});	
	
	min.on('click', function() {
		leTime -= 60;
		if(leTime < 60) leTime += 60;
		convertTime(leTime);
	});
	
	time.on('click', function() {
		if(timerRunning === false && breakRunning === false) {
			saveTime = leTime;
			saveTimeBr = leBreak;
			interval = setInterval(timer, 1000);
			timerRunning = true;
		} else {
			leTime = saveTime;
			leBreak = saveTimeBr;
			hoogte = 0;
			$("#vulling").css("height", hoogte + 'px');
			convertTime(leTime);
			convertTimeBreak(leBreak);
			clearTimeout(interval);
			timerRunning = false;
			breakRunning = false;
			
		}
		if(breakRunning) {
			clearTimeout(intervalBreak);
		}
	});
	
	plusBreak.on('click', function() {
		leBreak += 60;
		convertTimeBreak(leBreak);
	});	
	
	minBreak.on('click', function() {
		leBreak -= 60;
		if(leBreak < 0) leBreak += 60;
		convertTimeBreak(leBreak);
	});
	
});	

function timer() {
	leTime--;
	if(leTime < 0){
		PlaySound();
		clearTimeout(interval);
		leTime = saveTime;
		convertTime(leTime);
		intervalBr = setInterval(timerBreak, 1000);
		breakRunning = true;
		hoogte = 0;
		$("#vulling").css("height", hoogte + 'px');
	} else {
		convertTime(leTime);
		hoogte = (1 - (leTime / saveTime) )* 192;
		$("#vulling").css("height", hoogte + 'px');
	}
}
function convertTime(tijd) {
	time = $('#time');
	
	min = ('0' + Math.floor(tijd/60)).slice(-2);
	sec = ('0' + tijd%60).slice(-2);
	time.html(min + ':' + sec);
}

function timerBreak() {
	leBreak--;
	if(leBreak < 0){
		clearTimeout(intervalBr);
		leBreak = saveTimeBr;
		convertTimeBreak(leBreak);
		interval = setInterval(timer, 1000);
		breakRunning = false;
		
	} else convertTimeBreak(leBreak);
}
function convertTimeBreak(tijd) {
	timeBreak = $('#timeBreak');
	
	min = ('0' + Math.floor(tijd/60)).slice(-2);
	sec = ('0' + tijd%60).slice(-2);
	timeBreak.html(min + ':' + sec);
}

function PlaySound() {
  var sound = document.getElementById('sound1');
  sound.volume = 0.1;
  sound.play();
}
