var srv,srvImg
var zom,zomImg
var bullet,bulletImg;
var bulletG;
var RUN = 1;
var PLAY = 2;
var LOSE = 3;
var END = 0;
var gameState = PLAY;
var zombG ;
var ground,grndImg;
var score,health;
var inf,infImg;
var gameOver,gameOverImg,restart,restartImg;
var food,foodImg;
function preload()
{
  srvImg = loadAnimation("s1.png","s2.png","s3.png");
  zomImg = loadAnimation("z1.png","z2.png");
  grndImg = loadImage ("ground.jpg");
  infImg = loadImage ("alert.png");
  bulletImg = loadImage("bullet.png");
  gameOverImg = loadAnimation("infected.png","infected.png","gameover.png","gameover.png",);
  restartImg = loadImage("restart.png");
  foodImg = loadImage("food.png")

}

function setup() {
  createCanvas(800, 800);
  ground= createSprite (400,400,800,1600);
  ground.addImage (grndImg);
  ground.scale = 1.3;
 
  ground.y = ground.height/2;
srv = createSprite(400,700,40,60);
srv.addAnimation("running",srvImg)
srv.debug = true;

score = 0;
health = 300;

bulletG=createGroup();
zombG=createGroup();
zombG1=createGroup();

inf = createSprite(700,100,30,30)
inf.addImage(infImg);
inf.scale = 0.3;
inf.visible = false;

gameOver = createSprite(400,400);
gameOver.addAnimation("gameover",gameOverImg);
gameOver.scale = 1;
gameOver.visible = false;

restart = createSprite(400,200);
restart.scale = 0.3
restart.addImage(restartImg);
restart.visible = false;

food = createSprite(40,40,30,30);
food.addImage(foodImg);
food.scale = 0.2
}



function draw() {
  ground.velocityY = 2;
  if(ground.y > 800){
    ground.y = ground.height/2
  }
  if (keyWentDown("space")&& gameState === PLAY){

    shoot();
  }
  if( keyWentDown(LEFT_ARROW)){
srv.x = srv.x-40
  }
  if(keyWentDown(RIGHT_ARROW)){
    srv.x = srv.x+40
  }
  
  if(zombG.isTouching(srv)){
    inf.visible = true;
    gameState = LOSE 
  }
  if(zombG1.isTouching(srv)){
    inf.visible = true;
    
    gameState = LOSE
  }
  if(gameState === LOSE){
   
    health = health - 1;
    gameState = PLAY 
  }
  if(!zombG1.isTouching(srv)){

    inf.visible = false;
  }
  
  background(grndImg);
  
  if (bulletG.isTouching(zombG)){
//gameState = RUN;
zombG.destroyEach()
score = score + 1
      
    bulletG.destroyEach();
  }
  if (bulletG.isTouching(zombG1)){
    //gameState = RUN;
    zombG1.destroyEach()
    score = score + 2
          
        bulletG.destroyEach();
      }
      if(health <= 0 && gameState === PLAY ){
        gameState = END 
        zombG1.destroyEach()
        zombG.destroyEach()
        srv.visible = false
      }
      if(gameState === END){
        gameOver.visible = true;
        restart.visible = true;
        zombG1.destroyEach()
        zombG.destroyEach()
        srv.visible = false
        ground.velocityY = 0;
        bulletG.destroyEach();
      }
      if(gameState === PLAY){


 
  zombie();
  zombie1();

if(mousePressedOver(food)){
  health = score + health;
  score = 0
}
}
if(mousePressedOver(restart)){
  reset();
  
}

  drawSprites();
  fill("green");
  textSize(20)
  text("Food:"+score,200,40);
  fill("red");
  text("Health:"+health+"/300",400,40)

}

function shoot(){

  bullet=createSprite(400,700,10,10);
  bullet.addImage(bulletImg);
  bullet.scale = 0.1;
  bullet.x = srv.x;
  bullet.y = srv.y;
  bullet.velocityY = -30;
  bullet.lifeTime = 200;
  bulletG.add(bullet);
}
function zombie(){
  if(frameCount %100 === 0){
    zom = createSprite(random(200,650),20,40,60);
zom.addAnimation("running",zomImg)
zom.scale=0.5;
zom.debug = true;
    zom.velocityY = 4;
zombG.add(zom);

  }
}

function zombie1(){
  if(frameCount %160 === 0){
    zom = createSprite(random(200,650),20,40,60);
zom.addAnimation("running",zomImg)
zom.scale=0.5;
zom.debug = true;
    zom.velocityY = 6;
    zom.tint= "red"
zombG1.add(zom);

  }
  
}

function reset(){
  gameState = PLAY 
  score = 0
  health = 300
  gameOver.visible = false;
  restart.visible = false;
  srv.visible = true;
}