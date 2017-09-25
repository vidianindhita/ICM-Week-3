let xBackground; // pattern x
let yBackground; // pattern y
let x;
let y;
let angle = 0.0; // map the color
let wayang; // create sprite
let newWayang;
let gunungan;
let gununganImg;
let gunungan2;
let direction = 90;

function setup() { 

  // create canvas
  createCanvas(windowWidth, windowHeight);

  // create gunungan as a sprite
  gunungan = createSprite(width/5, height/1.5, 50, 50);
  gunungan.addAnimation("floating", "images/fansmall.png", "images/fansmall-2.png");

  // create gunungan2 as a sprite
  gunungan2 = createSprite(width/1.25, height/1.5, 50, 50);
  gunungan2.addAnimation("floating", "images/fansmall.png", "images/fansmall-3.png");

  // create wayang sprite
  newWayang = createSprite(400, height/1.5, 100, 50);
  newWayang.addAnimation("floating", "images/move2.png", "images/move3.png");
  newWayang.offY = 18;
  newWayang.addAnimation("moving", "images/move2.png", "images/move3.png");
  newWayang.addAnimation("spinning", "images/move3.png", "images/move2.png");
} 

function draw() { 
  var sinval = sin(angle);
  var black = map(sinval, -1, 1, 0, 255);

  background(black);

  angle += 0.05;

  direction += 2;
  
  stroke(251, 175, 33);
  fill(251, 175, 33, 40);
  
  for(yBackground = height-30; yBackground > 0; yBackground -= 30) {
    for(xBackground = 0; xBackground < width+40; xBackground += 30) { 
    	ellipse (xBackground, yBackground, 70, 70);
  		ellipse (xBackground, yBackground, 50, 50);
  		ellipse (xBackground, yBackground, 30, 30);
 		}
	}

  gunungan.setSpeed(3, direction);

  //if mouse is to the left
  if(mouseX < newWayang.position.x - 10) {
    newWayang.changeAnimation("moving");
    //flip horizontally
    newWayang.mirrorX(1);
    //negative x velocity: move left
    newWayang.velocity.x = - 2;
  }
  else if(mouseX > newWayang.position.x + 10) {
   newWayang.changeAnimation("moving");
    //unflip 
    newWayang.mirrorX(-1);
   newWayang.velocity.x = 2;
  }
  else {
    //if close to the mouse, don't move
    newWayang.changeAnimation("floating");
    newWayang.velocity.x = 0;
  }
  
  if(mouseIsPressed) {
    //the rotation is not part of the spinning animation
    newWayang.rotation -= 10;
    newWayang.changeAnimation("spinning");
  }
  else
    newWayang.rotation = 0;
  
  //up and down keys to change the scale
  //note that scaling the image quality deteriorates
  //and scaling to a negative value flips the image
  if(keyIsDown(UP_ARROW))
    newWayang.scale += 0.05;
  if(keyIsDown(DOWN_ARROW))
    newWayang.scale -= 0.05;

  if(keyDown("a"))
    gunungan.scale += 0.01;
  if(keyDown("s"))
    gunungan.scale -= 0.01;
  if(keyDown("k"))
    gunungan2.scale += 0.01;
  if(keyDown("l"))
    gunungan2.scale -= 0.01;
    
  //draw the sprite
  drawSprites(wayang);
  
}