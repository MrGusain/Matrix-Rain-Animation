var symbol;
var symbolSize = 15;
var streams = [];

function setup() {
  createCanvas(
    window.innerWidth,
    window.innerHeight
  );
  background(0);

  var x = 0;
  for(var i = 0;i<= width/symbolSize;i++){
  	var y = random(-1000,0);
  	var stream = new Stream();
  	stream.generateSymbols(x,y);

  	streams.push(stream);
  	x += symbolSize;
  }
  textSize(symbolSize);
}


function draw()
{
	background(0,150);
	streams.forEach(function(stream){
		stream.render();
	});
}



// symbol class definition
function Symbol(x,y,speed,first) {

	this.first = first;
	this.x = x;
	this.y = y;
	this.value;
	this.speed = speed;
	this.switchInterval = round(random(2,20));


	this.setToRandomSymbol = function() {
			if(frameCount % this.switchInterval == 0)
			{
				this.value = String.fromCharCode(0x30A0 + round(random(0,96)));
			}
	}


	this.rain = function() {
		this.y += this.speed;
		if(this.y > height) {
		this.y = 0;
		}
	}

}



//stream class defined
function Stream() {
	this.symbols = [];
	this.totalSymbols = round(random(5,30));
	this.speed = round(random(5,10));


	this.generateSymbols = function(x,y) {
		var first = round(random(0,6)) == 1;
		for(var i=0; i <= this.totalSymbols ; i++) {
			symbol = new Symbol(x,y,this.speed,first);
			symbol.setToRandomSymbol();
			this.symbols.push(symbol);
			y -= symbolSize;
			first = false;
		}
	}


	this.render = function() {
		this.symbols.forEach(function (symbol) {

				if(symbol.first)
				{
					fill(180,255,200);
				}
				else{
					fill(0,230,70);
				}
				text(symbol.value,symbol.x,symbol.y);
				symbol.rain();
				symbol.setToRandomSymbol();	
		});
	}
}
