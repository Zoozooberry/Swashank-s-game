var bg,playerImage,traps, player;

var obsGroup;
var score = 0;

var gameState = "play";
function preload()
{
  bg=loadImage("backgroundtemple.jpeg")
  playerImage=loadAnimation("player-1.png","player-2.png","player-3.png","player-4.png","player-5.png","player-6.png","player-7.png","player-8.png")
  playerimg = loadAnimation("player-1.png");
  trap1=loadImage("shuriken1.png")
  trap2=loadImage("boulder.png")
  trap3=loadImage("spike.png")
  trap4=loadImage("cactus.png")
}

function setup()
{

  createCanvas(600,400);

  bg1 = createSprite(300,200,600,400);
  bg1.addImage(bg);
  bg1.velocityX = -3;
  bg1.scale = 1.7;
  
  player = createSprite(200,300,30,30);
  player.addAnimation("player",playerImage);
  player.addAnimation("play",playerimg);
  player.scale=0.4;
  player.setCollider("rectangle", 0,0,200,300);
  //player.debug = true

  ground=createSprite(300,320,600,10);
  ground.visible=false

  obsGroup = createGroup();

}

function draw()
{
  background(0);

  if(gameState == "play")
  {
    bg1.addImage(bg);
    bg1.velocityX = -3;
    
    if(bg1.x < 80 )
    {
      bg1.x = bg1.width/2;
    }

    score += Math.round((frameRate()/60));


  
    if(keyDown("space") && player.y >= 230) 
    {
      player.velocityY = -14;
    }
    console.log(score)
    spawnObstacles();

    if(player.isTouching(obsGroup))
    {
      gameState = "end";
    }

    if(score == 1500)
    {
      gameState = "won";
    }
  }

  if(gameState == "end")
  {
    bg1.velocityX = 0;
    obsGroup.setVelocityXEach(0);
    obsGroup.setLifetimeEach(-1);
    player.changeAnimation("play", playerimg);

    if(keyDown("r"))
    {
      reset();
    }
  }

  
  player.velocityY = player.velocityY + 0.5;
  player.collide(ground);

  

  drawSprites();

  

  if(gameState == "won")
  {
    background(0);
    textSize(35);
    fill("pink");
    stroke("white");
    strokeWeight(1);
    text(" You Won..! ", 200, 250);


    if(keyDown("r"))
    {
      reset();
    }
    
  }

  textSize(15);
  fill("white");
  stroke("white");
  strokeWeight(1);
  text(" R - restart when over ", 70, 350);

  textSize(15);
  fill("white");
  stroke("white");
  strokeWeight(1);
  text(" Reach 1500 to win! ", 450, 350);
  

  textSize(25);
  fill("black");
  stroke("white");
  strokeWeight(2);
  text(" Distance covered : " + score, 190, 40);

}

function reset()
{
  gameState = "play";
  player.changeAnimation("player",playerImage);
  score = 0;
  obsGroup.destroyEach();
}
function spawnObstacles(){
  if (frameCount % 120 === 0){
    var obstacle=createSprite(600,300,50,50)
    obstacle.velocityX=-5;
    obstacle.scale=0.2;
    //obstacle.debug = true

    var r =Math.round(random(1,4));

    switch(r)
    {
      case 1:obstacle.addImage(trap1)
      obstacle.scale=0.2
      break;
      case 2:obstacle.addImage(trap2)
      break;
      case 3:obstacle.addImage(trap3)
      obstacle.scale=0.2
      break;
      case 4:obstacle.addImage(trap4)
      break;
      default:break
    }

    obsGroup.add(obstacle);
    
  }
}

