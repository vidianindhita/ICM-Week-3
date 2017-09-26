let xBackground; // pattern x
let yBackground; // pattern y
let angle = 0.0; // map the color
let wayang; // create sprite wayang
let newWayang; // create sprite wayang
let gunungan; // create sprite gunungan left
let gunungan2; // create sprite gunungan right
let direction = 90; // spin direction for gunungan left
let direction2 = 90; // spin direaction for gunungan right
let hueValue = 40;
let ascending = true; 

function preload() {
  soundFormats('mp3', 'ogg');
  mySound = loadSound('sound/wayang.mp3');
}

function setup() { 
  mySound.setVolume(0.5);
  mySound.play();

  // create canvas
  createCanvas(windowWidth, windowHeight);

  // create gunungan as a sprite
  gunungan = createSprite(width/5, height/1.5, 50, 50);
  gunungan.addAnimation("floating", "images/fansmall.png", "images/fansmall-2.png");
  gunungan.rotateToDirection = false;

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
  console.log(frameRate());

  // background light
  var sinval = sin(angle);
  var black = map(sinval, -1, 1, 0, 255);

  // draw backgroung
  background(black);

  // change background light angle
  angle += 0.05;

  // change spin direction for gunungan
  direction += 4; // left
  direction2 -= 3; // right
  
  // create background repetition
  //stroke(251, 175, 33);
  //fill(251, 175, 33, 40);
  colorMode(HSB, 100);

  stroke(40, 40, 55);
  fill(hueValue, 40, 55, 40);
  colorMode(RGB);

  if (ascending == true) {
    hueValue+=1;
  } 

  if (ascending == false) {
    hueValue-=1;
  }

  if (hueValue > 100) {
    ascending = false;
  }

  if (hueValue < 40 ) {
    ascending = true;
  } 

  for(yBackground = height-30; yBackground > 0; yBackground -= 30) {
    for(xBackground = 0; xBackground < width+40; xBackground += 30) { 
    	ellipse (xBackground, yBackground, 70, 70);
  		ellipse (xBackground, yBackground, 50, 50);
  		ellipse (xBackground, yBackground, 30, 30);
 		}
	}

  // spin gunungan
  gunungan.setSpeed(3, direction); // left
  gunungan2.setSpeed(3, direction2); // right

  // change wayang sprite by mouse
  // if mouse is to the left
  if(mouseX < newWayang.position.x - 10) {
    newWayang.changeAnimation("moving");
    newWayang.mirrorX(1); //flip horizontally
    newWayang.velocity.x = - 2; //negative x velocity: move left
  }
  else if(mouseX > newWayang.position.x + 10) {
   newWayang.changeAnimation("moving");
   newWayang.mirrorX(-1); //unflip 
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
  
  /* up and down keys to change the scale
  note that scaling the image quality deteriorates
  and scaling to a negative value flips the image */
  if(keyIsDown(UP_ARROW))
    newWayang.scale += 0.05;
  if(keyIsDown(DOWN_ARROW))
    newWayang.scale -= 0.05;

  /* keyboard input to control the gunungan */
  if(keyDown("a"))
    gunungan.scale += 0.01;
  if(keyDown("s"))
    gunungan.scale -= 0.01;
  if(keyDown("k"))
    gunungan2.scale += 0.01;
  if(keyDown("l"))
    gunungan2.scale -= 0.01;
    
  /* draw the sprite */
  drawSprites(wayang);
  
}