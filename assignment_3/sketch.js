var x; // pattern x
var y; // pattern y
var angle = 0.0; // map the color
var img; // create sprite
//var createSprite;

function setup() { 
  createCanvas(windowWidth, windowHeight);

  //create a sprite and add the 3 animations
  img = createSprite(400, 150, 100, 50);
  
  //label, first frame, last frame
  //the addAnimation method returns the added animation
  //that can be store in a temporary variable to change parameters
  var myAnimation = img.addAnimation("floating", "images/move2.png", "images/move3.png");
  //offX and offY is the distance of animation from the center of the sprite
  //in this case since the animations have different heights i want to adjust
  //the vertical offset to make the transition between floating and moving look better
  myAnimation.offY = 18;
  
  img.addAnimation("moving", "images/move2.png", "images/move3.png");
  
  img.addAnimation("spinning", "images/move3.png", "images/move2.png");
} 

function draw() { 
  var sinval = sin(angle);
  var black = map(sinval, -1, 1, 0, 255);

  background(black);

  angle += 0.05;
  
  stroke(251, 175, 33);
  fill(251, 175, 33, 40);
  
  for(y = height-30; y > 0; y -= 30) {
  	
    for(x = 0; x < width+40; x += 30) { 
    	ellipse (x, y, 70, 70);
  		ellipse (x, y, 50, 50);
  		ellipse (x, y, 30, 30);
    
 		}

	}

  //if mouse is to the left
  if(mouseX < img.position.x - 10) {
    img.changeAnimation("moving");
    //flip horizontally
    img.mirrorX(1);
    //negative x velocity: move left
    img.velocity.x = - 2;
  }
  else if(mouseX > img.position.x + 10) {
   img.changeAnimation("moving");
    //unflip 
    img.mirrorX(-1);
   img.velocity.x = 2;
  }
  else {
    //if close to the mouse, don't move
    img.changeAnimation("floating");
    img.velocity.x = 0;
  }
  
  if(mouseIsPressed) {
    //the rotation is not part of the spinning animation
    img.rotation -= 10;
    img.changeAnimation("spinning");
  }
  else
    img.rotation = 0;
  
  //up and down keys to change the scale
  //note that scaling the image quality deteriorates
  //and scaling to a negative value flips the image
  if(keyIsDown(UP_ARROW))
    img.scale += 0.05;
  if(keyIsDown(DOWN_ARROW))
    img.scale -= 0.05;
  
  //draw the sprite
  drawSprites();
  
}