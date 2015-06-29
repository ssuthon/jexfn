'use strict'
//----------------------------Ship------------------------
function Ship(x, y, bound){	
	this.x = x;
	this.y = y;
	this.radius = 8;
	this.color = 'red';
	this.velocity = 100;
	this.bound = bound;
	this.exp = 0;
};

Ship.prototype.moveTo = function(x, y, ms){	
	if(this.x > x - this.radius && this.x < x + this.radius
		&& this.y > y - this.radius && this.y < y + this.radius)
		return;

	var st = this.velocity * ms / 1000;
	var diffy = y - this.y;
	var diffx = x - this.x;
	var zeta = Math.atan(Math.abs((y - this.y)/(x - this.x)));				
	var dy = diffy < 0 ? - 1 : 1;
	var dx = diffx < 0 ? -1 : 1;				
	if(!isNaN(zeta)){
		this.x += Math.cos(zeta) * st * dx;
		this.y += Math.sin(zeta) * st * dy;	
	}	
	if(this.x > this.bound.width)
		this.x = this.bound.width;
	else if (this.x < 0)
		this.x = 0;
	if(this.y > this.bound.height)
		this.y = this.bound.height;
	else if(this.y < 0)
		this.y = 0;		
};

Ship.prototype.eat = function(food){
	food.eaten = true;
	this.exp += food.exp;
	if(this.exp > 5){
		this.radius += 1;
		this.exp = 0;
		this.velocity *= 1.01;
		console.log(this.radius);
	}
};

Ship.prototype.draw = function(context){	
	context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
    context.fillStyle = this.color;
    context.fill();
};
//----------------------------Food------------------------
function Food(x, y){
	this.x = x; 
	this.y = y; 
	this.lifetime = 8000;
	this.radius = 5;
	this.eaten = false;      	
	this.exp = 1;	
};

Food.prototype.live = function(ms){
	this.lifetime -= ms;
};

Food.prototype.isAlive = function(){
	return this.lifetime > 0 && !this.eaten; 
};

Food.prototype.draw = function(context){
	if(this.isAlive()){
    	context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
        context.fillStyle = 'blue';
        context.fill();
	}
};

//----------------------------GameEngine--------------------
function GameEngine(boundedElement){
	this.boundedElement = boundedElement;
	this.gameRunning = false;
	this.ship = new Ship(boundedElement.width/2, boundedElement.height/2, boundedElement);
	this.foods = [];
	this.targetX = 0;
	this.targetY = 0;	
};

GameEngine.prototype.start = function(){	
	console.log('game started');
	this.lastStamp = 0;
	this.gameRunning = true;
	var self = this;
	this.interval = setInterval(function(){
		var deadEnemyIndices = [];
		for(var i = 0; i < self.foods.length; i++){
			var food = self.foods[i];
			food.live(1000);
			if(!food.isAlive())
				deadEnemyIndices.push(i);
		}
		for(var i = deadEnemyIndices.length; i > 0; i--){
			self.foods.splice(deadEnemyIndices[i], 1);
		}
		self.foods.push(new Food(
			Math.floor(Math.random()*(self.boundedElement.width - 40) + 20),
			Math.floor(Math.random()*(self.boundedElement.height - 40) + 20)
		));
	}, 500);
}

GameEngine.prototype.stop = function(){
	console.log('game stopped');
	this.gameRunning = false;
	if(this.interval)
		clearInterval(this.interval);
}

GameEngine.prototype.draw = function(context){
	if(!this.gameRunning)
		return;

	var currentStamp = new Date().getTime();
	if(this.lastStamp != 0){
		var ms = currentStamp - this.lastStamp;
		this.ship.moveTo(this.targetX, this.targetY, ms);
	}		        	
    
    var eaten_foods = this.checkHits();
	for(var i = 0; i < eaten_foods.length; i++){
		this.ship.eat(eaten_foods[i]);
	}

	context.fillStyle = 'black';        
	context.fillRect(0, 0, this.boundedElement.width, this.boundedElement.height);	
	this.ship.draw(context);

    for(var i = 0; i < this.foods.length; i++){
    	this.foods[i].draw(context);
    }
  
	this.lastStamp = currentStamp;
}

GameEngine.prototype.checkHits = function(){
	var hits = []
	for(var i = 0; i < this.foods.length; i++){
		var food = this.foods[i];
		if(food.isAlive() && distance(food.x, food.y,
			this.ship.x, this.ship.y) <= this.ship.radius + food.radius){
			hits.push(food);
		}
	}
	return hits;
}

GameEngine.prototype.onMouseClick = function(x, y){

}

GameEngine.prototype.onMouseMove = function(x, y){
	this.targetX = x;
	this.targetY = y;		
}

//--------------------------utilities--------------
function distance(x1, y1, x2, y2){
	return Math.sqrt(Math.pow(y2 - y1, 2) + Math.pow(x2 - x1, 2));
}