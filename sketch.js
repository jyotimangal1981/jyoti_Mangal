
var oceanImg,ocean;
var coinImg,coin,coinGroup;
var climberImg,climber,climberGroup;
var frog,frogImg;
var gameState="play";
var score=0;

function preload(){
  oceanImg=loadImage("water.jpg");
  coinImg=loadImage("coin.png");
  climberImg=loadImage("seaweed.png");
  frogImg=loadImage("frog.png");
}

function setup(){
createCanvas(580,450);
ocean=createSprite(300,300);
ocean.addImage("ocean",oceanImg);

frog=createSprite(200,200,50,50);
frog.scale=0.1;
frog.addImage("frog",frogImg);

//create coin group and climber group
coinGroup=new Group();
climberGroup=new Group();

}

function draw(){
  background(0);
  drawSprites();
  ocean.velocityY=2;

  // infinite background
  if(ocean.y>300)
  {
    ocean.y=150;
  }
  if(gameState=="play"){
    if (keyDown("Left_Arrow"))
     {
      frog.x=frog.x-3;
     }
    if(keyDown("Right_Arrow"))
    {
      frog.x=frog.x+3;
    }
    if(keyDown("SPACE"))
    {
      frog.velocityY=-4;
    }
     else{
       frog.velocityY=4;
     }
     if(climberGroup.isTouching(frog))
     {
       frog.velocityY=0;
     }
     
    //spawnClimber();
     spawnCoin();
     if(coinGroup.isTouching(frog))
     {
       coinGroup.destroyEach();
       score=score+1;
     }
     if(frog.y>480)
      {
        fill("red");
        textSize(50);
        text("Game Over",100,150);

        gameState=end;

      }

      if (gameState=="end")
      {
        coinGroup.destroyEach();
        climbersGroup.destroyEach();
        frog.destroyEach();
      }
     drawSprites();
      textSize(20);
      fill("blue");
      text("Score"+ score,350,30);
  }

}
  //create the coin and climber in the same function

  function spawnCoin()
  {
    if(frameCount % 80==0)
    {
      //make x position of the coin same as x position of climber

      

      var climber=createSprite(Math.round(random(50,250)),45,10,10)
      climber.addImage("climber",climberImg);
      climber.scale=0.4;

      climber.velocityY=5;
      climber.lifetime=200;
      climberGroup.add(climber);

      var coin=createSprite(climber.x,10,10,10)
      coin.addImage("coin",coinImg);
      coin.scale=0.10;

      coin.velocityY=5;
      coinlifetime=200;
      coinGroup.add(coin);

    }
  }

