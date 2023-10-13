var upPressed = false;
var downPressed = false;
var leftPressed = false;
var rightPressed = false;
var lastPressed = false;
var spacebarPressed = false;  
var countDodgeScore = 0;
var countHitScore = 0;

function keyup(event) {
	var player = document.getElementById('player');
	if (event.keyCode == 37) {
		leftPressed = false;
		lastPressed = 'left';
	}
	if (event.keyCode == 39) {
		rightPressed = false;
		lastPressed = 'right';
	}
	if (event.keyCode == 38) {
		upPressed = false;
		lastPressed = 'up';
	}
	if (event.keyCode == 40) {
		downPressed = false;
		lastPressed = 'down';
	}

	if (event.keyCode == 32){
		spacebarPressed = false;
	}
	
	player.className = 'character stand ' + lastPressed;
}


function move() {
	var player = document.getElementById('player');
	var positionLeft = player.offsetLeft;
	var positionTop = player.offsetTop;
	if (downPressed) {
		var newTop = positionTop+1;
		var element = document.elementFromPoint(player.offsetLeft, newTop+32);
		if (element.classList.contains('sky') == false) {
			player.style.top = newTop + 'px';	
		}

		if (leftPressed == false) {
			if (rightPressed == false) {
				player.className = 'character walk down';
			}
		}
	}

		if (upPressed) {
		var newTop = positionTop-1;
		var element = document.elementFromPoint(0, newTop);
		if (element.classList.contains('sky') == false) {
			player.style.top = newTop + 'px';	
		}
		
		if (leftPressed == false) {
			if (rightPressed == false) {
				player.className = 'character walk up';
			}
		}
	}

	if (leftPressed) {
		var newLeft = positionLeft-1;
		var element = document.elementFromPoint(newLeft, player.offsetTop);
		if (element.classList.contains('sky') == false) {
			player.style.left = newLeft + 'px';	
		}
		
		player.className = 'character walk left';
	}

	if (rightPressed) {
		var newLeft = positionLeft+1;
		var element = document.elementFromPoint(newLeft+32, player.offsetTop);
		if (element.classList.contains('sky') == false) {
			player.style.left = newLeft + 'px';		
		}

		player.className = 'character walk right';
	}
}


function keydown(event) {
	if (event.keyCode == 37) {
		leftPressed = true;
	}
	if (event.keyCode == 39) {
		rightPressed = true;
	}
	if (event.keyCode == 38) {
		upPressed = true;
	}
	if (event.keyCode == 40) {
		downPressed = true;
	}
	if (event.keyCode == 32){
		spacebarPressed = true;
	}
}


function myLoadFunction() {
	timeout = setInterval(move, 10);
	document.addEventListener('keydown', keydown);
	document.addEventListener('keyup', keyup);
	rocketInterv = setInterval(showRocket , 1250);
	launchInterv = setInterval(launchRocket , 30);
	showWeap = setInterval(showWeapon , 10);
	fireArr = setInterval(shootArrow , 10);
	showArr = setInterval(showArrow , 500);
}




//This function is to show/display the bomb in random left positions.

function showRocket(){
	var randNum = Math.ceil(Math.random()* 10);
	var sky = document.getElementsByClassName('sky')[0];
	var rocket = document.createElement("div");
	rocket.className = 'bomb';
	sky.appendChild(rocket);
	rocket.style.top = 10 + 'px';
	rocket.style.left = (randNum * 110) + 'px';
	rocket.className = 'bomb';
}




//This function is to launch the bomb straight down and some of them at different angle.

function launchRocket(){
	var rockets = document.getElementsByClassName('bomb');
	for (var i = 0; rockets.length>i; i++){
		var rocket = rockets[i];
		var launch = parseInt(rocket.style.top);
		var launchLeft = parseInt(rocket.offsetLeft);
		rocket.style.top = launch + 1 + 'px';
		var player = document.getElementById('player');
		playerLeftPosn = parseInt(player.offsetLeft);

		if(i == 10){
			if (launchLeft < playerLeftPosn){
			rocket.style.left = launchLeft + 1 + 'px';
			}
		}
		
		if (launchLeft > 800){
			rocket.style.left = launchLeft - 1 + 'px';
		}

		if((parseInt(rocket.offsetTop) == 10)){
			if (launchLeft < 100 && launchLeft > 700){
			rocket.style.top = launch + 1 + 'px';
			}
		}
		var player = document.getElementById('player');
		var playerTop = parseInt(player.offsetTop);
		var playerLeft = parseInt(player.offsetLeft);
		


		//to detect the collision between player and bomb.

		if (parseInt(rocket.style.top) == playerTop) {
			if(parseInt(rocket.style.left) >= playerLeft - 70 && parseInt(rocket.style.left) <= playerLeft + 70){
				rocket.className = 'explosion';
				if(rocket.className == 'explosion'){
					player.className = 'character hit left';



					//for blinking the player when got hit by bomb.

					setTimeout(function(){player.style.opacity = 0.3;},100);
					setTimeout(function(){player.style.opacity =   1;} , 200);
					setTimeout(function(){player.style.opacity = 0.3;} , 300);
					setTimeout(function(){player.style.opacity =   1;} , 400);
					setTimeout(function(){player.style.opacity = 0.3;} , 500);
					setTimeout(function(){player.style.opacity =   1;} , 600);
					setTimeout(function(){player.style.opacity = 0.3;} , 700);
					setTimeout(function(){player.style.opacity =   1;} , 800);

					//for losing life when got hit.

					var healthCont = document.getElementsByTagName('ul')[0];
					var health = document.getElementsByTagName('li');
					healthCont.removeChild(health[0]);
				}

				/*when player loses all lives, it dies, bomb stops and
				scores are shown along with restart button.*/

				if (health[0] == undefined){
					player.className = 'character stand dead head body';

					if (player.className == 'character stand dead head body'){
						var restart = document.getElementsByClassName('start')[0];
						restart.style.display = 'block';
						restart.firstChild.nodeValue = 'GAME OVER';
						setTimeout(function(){restart.firstChild.nodeValue = 'PLAY AGAIN ?'}, 2000);
						restart.addEventListener('click' , restartGame);
						clearInterval(rocketInterv);
						clearInterval(launchInterv);
						clearInterval(timeout);
						clearInterval(fireArr);
						document.removeEventListener('keydown', keydown);
						document.removeEventListener('keyup', keyup);
						scoreCount();
					}
				}
			}
		}

		//to explode the bomb at the top position of player which may be random as player moves up and down.

		if (rocket.style.top == playerTop + 'px'){
			rocket.className = 'explosion';
			if (rocket.className == 'explosion'){
				setTimeout(function() {
						var body = document.getElementsByClassName('sky')[0];
						var explodedbomb = document.getElementsByClassName('explosion');
						for (var i = 0; i < explodedbomb.length; i++){
							body.removeChild(explodedbomb[i]);
							countDodgeScore += 1; 
						}
				}, 500);
			}	
		}
	}
}



//This function is to show weapon when spacebar is pressed.

function showWeapon(){
	var player = document.getElementById('player');

	if (spacebarPressed == true){
		player.className = 'character stand up fire';		
	}
}
	


//This function is to show arrow and stop player from moving for 0.5 seconds when spacebar is pressed.

function showArrow(){
	var sky = document.getElementsByClassName('sky')[0];
		if (spacebarPressed == true){
		var arrow = document.createElement('div');
		sky.appendChild(arrow);
		arrow.className = 'arrow up';
		var playerTop = player.offsetTop;
		var playerLeft = player.offsetLeft;
		arrow.style.top = playerTop + 'px';
		arrow.style.left = playerLeft + 'px';
	}
}




//This function is to shoot arrow towards horizon.

function shootArrow() {
	var ammunation = document.getElementsByClassName('arrow');
	for (var i = 0; ammunation.length > i; i++) {
		var arrow = ammunation[i];
		var arrowTopPosn = parseInt(arrow.style.top);
		arrow.style.top = arrowTopPosn - 1 + 'px';
	}
	arrowHitRocket();
}




//This function is to explode the rocket and hide the arrow when both overlaps with each other.

function arrowHitRocket() {
	var ammunation = document.getElementsByClassName('arrow');
	for (var i = 0; i < ammunation.length; i++) {
		var arrow = ammunation[i];
		var arrowTopPosn = parseInt(arrow.offsetTop);
		var arrowLeftPosn = parseInt(arrow.offsetLeft);
		var rockets = document.getElementsByClassName('bomb');
		for (var j = 0; j < rockets.length; j++) {
			var rocket = rockets[j];
			rocketTopPosn = parseInt(rocket.offsetTop);
			rocketLeftPosn = parseInt(rocket.offsetLeft);
			if (rocketTopPosn >= arrowTopPosn) {
				if (rocketLeftPosn >= (arrowLeftPosn - 12) & rocketLeftPosn <= (arrowLeftPosn + 12)) {
					rocket.className = 'explosion';
					var sky = document.getElementsByClassName('sky')[0];
					sky.removeChild(arrow);
					if (rocket.className == 'explosion') {
						countHitScore += 1;
						
						setTimeout(function () {
							var body = document.getElementsByClassName('sky')[0];
							var explodedbomb = document.getElementsByClassName('explosion');
							for (var i = 0; i < explodedbomb.length; i++) {
								body.removeChild(explodedbomb[i]);
							}
						}, 500);
					}
				}
			}
		}

		// for removing the arrow that projects towards the top of the screen.
		if (arrowTopPosn == 10) {
			var body = document.getElementsByClassName('sky')[0];
			body.removeChild(arrow);
		}
	}
}




//This function is to start the countdown when start button is pressed.

function timerStart(){

	var elmt = document.getElementsByClassName('start');
	timer = setTimeout(function(){elmt[0].firstChild.nodeValue = "3";} , 50);
	timer = setTimeout(function(){elmt[0].firstChild.nodeValue = "2";} , 1050);
	timer = setTimeout(function(){elmt[0].firstChild.nodeValue = "1";} , 2050);
	timer = setTimeout(function(){elmt[0].firstChild.nodeValue = "GO";} , 3050);
	timer = setTimeout(function(){elmt[0].style.display = 'none';}, 4050);
	timer = setTimeout(inputYourName , 4050);
}



//This function is to call the function timerStart(); after clicking start button.

function myClckFunc(){
	var button = document.getElementsByClassName('start');
	button[0].addEventListener('click' , timerStart);
}



//This function is to restart the game (reload the page).

// (Nestfy , 2017).

function restartGame(){
	location.reload();
}



//This function is to input and submit the player's name.


function inputYourName(){
	var div = document.createElement('div');
	div.className = 'myText';
	var sky = document.getElementsByClassName('sky')[0];
	var textNode = document.createTextNode('Enter Your Name');
	sky.appendChild(div);
	div.appendChild(textNode);

	var input = document.createElement('input');
	sky.appendChild(input);
	input.className = 'myInput';
	
	var btn = document.createElement('button');
	var ok = document.createTextNode('OK');
	btn.appendChild(ok);
	sky.appendChild(btn);
	btn.className = 'myButton';
	btn.addEventListener('click' , removeAll);
	document.addEventListener('keydown' , pressEnter);
}




//This function is to hide all the elements that were created in inputYourName(); function.

function removeAll(){
	var btn = document.getElementsByClassName('myButton')[0];
	var input = document.getElementsByClassName('myInput')[0];
	var text = document.getElementsByClassName('myText')[0];
	input.style.display = 'none';
	btn.style.display = 'none';
	text.style.display = 'none';
	myLoadFunction();
}



/*This function is to hide all the elements that were created in inputYourName(); function
 by pressing 'Enter' button.*/

function pressEnter(event){
	if (event.keyCode == 13){
		removeAll();
	}
}



/*This function is to display the player's hit and dodge score along with
their name.*/

function scoreCount(){
	var input = document.getElementsByClassName('myInput')[0];
	var sky = document.getElementsByClassName('sky')[0];
	var userName = input.value;
	window.localStorage.setItem('user', userName); // (dcode , 2018).
	var div = document.createElement('div');
	sky.appendChild(div);
	div.className = 'myName';
	var head = document.createTextNode(localStorage.getItem('user')+"'s" + ' scoreboard');
	div.appendChild(head);
	var paragraph1 = document.createElement('p');
	var paragraph2 = document.createElement('p');
	div.appendChild(paragraph1);
	div.appendChild(paragraph2);
	paragraph1.className = 'myScore';
	paragraph2.className = 'myScore';
	var pr1 = document.createTextNode('dodge score' + ' : ' + countDodgeScore);
	var pr2 = document.createTextNode('hit score' + ' : ' + countHitScore);
	paragraph1.appendChild(pr1);
	paragraph2.appendChild(pr2);
	var rocketVar = document.getElementsByClassName('bomb');
	for (var i = 0; i < rocketVar.length; i++){
		var rocketsVar = rocketVar[i];
		rocketsVar.style.display = 'none';
	}
}


document.addEventListener('DOMContentLoaded' , myClckFunc);
