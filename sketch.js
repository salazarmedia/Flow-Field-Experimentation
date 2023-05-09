let increment = 0.1;
let scale = 20;
let cols, rows;

let zoffset = 0;

let fr;

let particles = [];

let flowfield = [];

function setup() {
  createCanvas(200, 200);
  frameRate(60);
  cols = floor(width / scale);
  rows = floor(height / scale);
  fr = createP('');

  flowfield = new Array(cols * rows);

  for (let i = 0; i < 100; i++) {
    particles[i] = new Particle(0);    
  }
}

function draw() {
  background(255);
  let yoffset = 0;
  for (let y = 0; y < height; y++) {
    let xoffset = 0;
    for (let x = 0; x < width; x++) {
      let index = x + y * cols;
      let angle = noise(xoffset, yoffset, zoffset) * TWO_PI * 4;
      let r = noise(xoffset, yoffset) * 255;
      let v = p5.Vector.fromAngle(angle);
      v.setMag(1);
      flowfield[index] = v;
            xoffset += increment;

          fill(r);
          stroke(0, 50);

          // DRAW VECTORS
          // push();
          // translate(x * scale, y * scale);
          // rotate(v.heading()); 
          // strokeWeight(1);
          // line(0, 0, scale, 0);
          // pop();
    } 
    yoffset += increment;

    // FLOW FIELD VECTORS TIME VARIANT
    zoffset += 0.0001;
  }
  
  for (let i = 0; i < particles.length; i++) {
    particles[i].follow(flowfield);
    particles[i].update();
    particles[i].show();  
    particles[i].edges();  
  }

  fr.html(floor(frameRate()));
}
