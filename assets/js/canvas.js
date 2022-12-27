var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');

canvas.height = '720';
canvas.width = window.innerWidth;

// Rectangle
// c.fillStyle = "#08fdd8";
// c.fillRect(50, 50, 50, 50);

// // Line
// c.beginPath();
// c.moveTo(52, 200);
// c.lineTo(102, 40);
// c.strokeStyle = "red"
// c.stroke();


var skills = ['Javascript', 'NodeJs', 'ExpressJs', 'SailsJs', 'SocketIO', 'Ruby', 'Ruby', 'React', 'React', 'Postgres', 'Mysql', 'OracleSQL', 'Docker', 'Kubernetes', 'Azure', 'Azure', 'Jenkins', 'Elasticsearch', 'Redis', 'Memcached']
// Arc
c.strokeStyle = '#08fdd8'
// c.arc(75, 75, 30, 0, Math.PI * 2, false);
// c.stroke();

function Circle(x, y, dx, dy, radius) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;

  this.draw = function () {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.stroke();
  }

  this.update = function () {
    this.draw();
    if (this.x + this.radius > window.innerWidth || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }
    if (this.y + this.radius > 720 || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }

    this.x += this.dx;
    this.y += this.dy;
  }

}



var circlesArray = [];

for (var i = 0; i < skills.length; i++) {
  var radius = 30;
  var x = Math.random() * (window.innerWidth - radius * 2) + radius;
  var y = Math.random() * (720 - radius * 2) + radius;
  var dx = Math.random() * 2;
  var dy = Math.random() * 2;

  circlesArray.push(new Circle(x, y, dx, dy, radius));
}

function animate() {
  requestAnimationFrame(animate);

  c.clearRect(0, 0, window.innerWidth, 720);
  // circle.update();

  for (var i = 0; i < circlesArray.length; i++) {
    circlesArray[i].update();
  }
}

animate(); 