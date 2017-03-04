//(function(){
	'use strict';
	
	var maxdistance = { x: 40, y: 40, z: 3};		//40 meter x en y as, 3 meter hoog
	
	//Startcoordinaten
	var positie = { 
		xPos: Math.random() * maxdistance.x,
		yPos: Math.random() * maxdistance.y,
		zPos: Math.random() * maxdistance.z
	};

	var richting = { x: 1, y: Math.random(), z: 0};	//Beweegt aan volle snelheid horizontaal,
													//aan random snelheid verticaal
	
	var snelheid = 1.4;								//snelheid in meter per seconde

	console.log("Startcoordinaten: ", positie);

	function move() {
		positie.xPos += richting.x * snelheid;
		positie.yPos += richting.y * snelheid;
		positie.zPos += richting.z * snelheid;
		
		checkBoundaries();
		rapporteer();								//dit blijft uiteraard niet staan
	}

	function rapporteer(){
		console.log(positie); //return JSON.stringify(positie, null, 4)
	}

	function checkBoundaries(){
		if((positie.xPos + richting.x * snelheid) > maxdistance.x) {
			richting.x *= -1;
		}

		if((positie.yPos + richting.y * snelheid) > maxdistance.y) {
			richting.y *= -1;
		}

		if((positie.zPos + richting.z * snelheid) > maxdistance.z) {
			richting.z *= -1;
		}
	}

	var activeer = setInterval(move, 1000);
	//clearInterval(activeer);

//})();