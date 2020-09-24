var END=0;
var PLAY=1
var gamestate=PLAY;
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score=0;
var ground;


function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
 monkey=createSprite(80,315,20,20);
 monkey.addAnimation("running",monkey_running);
 monkey.scale=0.1;
  
 ground=createSprite(400,350,900,10);
 ground.velocityX=-4;
 
  score=0;
 
 foodGroup=createGroup();
 obstacleGroup=createGroup();
  
}


function draw() {
background("light_blue");
 text("score:"+score,200,100); 
if (ground.x < 0){
 ground.x =  ground.width/2;
}
  if(keyDown("space") && monkey.y >= 314) {
      monkey.velocityY = -8.5;
    }
  
  monkey.velocityY=monkey.velocityY+0.2;
  
  monkey.collide(ground);
  
  
  if(monkey.isTouching(obstacleGroup)){
   gamestate=END; 
  }
if(gamestate===PLAY){
  banana();
  survivalTime();
  obstacles();
  if(monkey.isTouching(foodGroup)){
  foodGroup.destroyEach();   
  text(score=score+1,200,100);
  }
} 
  if(gamestate===END){
    monkey.velocityY=0;
    foodGroup.setVelocityXEach(0)
    obstacleGroup.setVelocityXEach(0)
    ground.velocityX=0;
  }
  drawSprites();  
}
function banana(){
if(frameCount % 80 === 0){
var banana=createSprite(300,120,10,10)
banana.y=Math.round(random(120,200));
banana.addImage(bananaImage);
banana.velocityX=-3;
banana.scale=0.1 ;
banana.lifetime=-1;
foodGroup.add(banana);
}
}
function survivalTime(){
  var survivalTime=0;
  
 
  stroke("black");
  textSize(20);
  fill("black")
  survivalTime=Math.ceil(frameCount/frameRate())
  text("survivalTime:"+survivalTime,100,50);
}
function obstacles(){
 if(frameCount %300===0){
 var obstacles=createSprite(310,315,20,20);
 obstacles.addImage(obstacleImage);
 obstacles.scale=0.2;
 obstacles.lifetime=-1;
 obstacles.velocityX=-4;
 obstacleGroup.add(obstacles);
 } 
}