var maxdistance = {x: 40, y: 40, z: 3}; // meter

function Tag(color, speed) {
  this.color = color;
  this.position = {
    x: Math.random() * maxdistance.x,
    y: Math.random() * maxdistance.y,
    z: Math.random() * maxdistance.z
  };
  var x = 1 - Math.random() * 2;
  var y = Math.random() > 0.5 ? Math.sqrt(1.0 - x * x) : -Math.sqrt(1.0 - x * x);
  this.direction = { // moet eenheidsvector zijn
    x: x,
    y: y,
    z: 0
  };
  this.speed = speed;
}

Tag.prototype.moveInDirection = function(dir, val) {
  if (!dir || !/^[x-z]+$/.test(dir)) {
    return;
  }
  if (!val) {
    this.position[dir] += this.direction[dir] * this.speed;
  } else {
    this.position[dir] += val;
  }
  if (this.position[dir] > maxdistance[dir]) {
    this.direction[dir] *= -1;
    this.moveInDirection(dir, maxdistance[dir] - this.position[dir]);
  }
  if (this.position[dir] < 0) {
    this.direction[dir] *= -1;
    this.moveInDirection(dir, -this.position[dir]);
  }
};

Tag.prototype.move = function() {
  this.moveInDirection("x");
  this.moveInDirection("y");
  this.moveInDirection("z");
};

function Manager(tags, speed, interval, factor) {
  this.tags = [];
  this.interval = interval;
  for (var i = 0; i < tags; i++) {
    var r = Math.floor(Math.random() * 255);
    var g = Math.floor(Math.random() * 255);
    var b = Math.floor(Math.random() * 255);
    var rand = speed * factor;
    var adjusted_speed = speed + (rand / 2) - (Math.random() * rand); // randomly +/- factor speed
    adjusted_speed *= interval / 1000; // take interval into account
    this.tags.push(new Tag("rgb(" + r + "," + g + "," + b + ")", adjusted_speed));
  }
}

Manager.prototype.update = function() {
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, 10 * maxdistance.x, 10 * maxdistance.y);
  this.tags.forEach(function(tag) {
    tag.move();
    ctx.fillStyle = tag.color;
    var x = (maxdistance.x - tag.position.x) * 10;
    var y = tag.position.y * 10;
    ctx.fillRect(x - 2, y - 2, 4, 4);
  });

};

Manager.prototype.start = function() {
  setInterval(this.update.bind(this), this.interval);
};

var mgr = new Manager(
  20, // amount of tags
  1, // speed in meter / s
  10, // interval time in ms
  10 // +/- random factor on speed
);
mgr.start();

//init
document.getElementById("text").innerHTML =
  "Genereert data in (x, y, z) coördinaten in een omgeving van " +
  maxdistance.x + "x" + maxdistance.y + " (" + maxdistance.x * maxdistance.y + "m²)";
var canvas = document.getElementById('canvas');
canvas.width = 10 * maxdistance.x;
canvas.height = 10 * maxdistance.y;
