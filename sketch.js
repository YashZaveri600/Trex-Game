var trex, treximg;
var ground, groundimg;
var invisibleground;
var cloud, cloudimg;
var obstacle, obstacleimg;
var obstacleimg2;
var obstacleimg3;
var obstacleimg4;
var obstacleimg5;
var obstacleimg6;
var obstacleGroup;
var cloudGroup;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var trexcollided, treximg;
var count = 0;
var gameover, gameoverimg;
var restart, restartimg;

function preload() {

  treximg = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  groundimg = loadImage("ground2.png");
  cloudimg = loadImage("cloud.png");
  obstacleimg = loadImage("obstacle1.png");
  obstacleimg2 = loadImage("obstacle2.png");
  obstacleimg3 = loadImage("obstacle3.png");
  obstacleimg4 = loadImage("obstacle4.png");
  obstacleimg5 = loadImage("obstacle5.png");
  obstacleimg6 = loadImage("obstacle6.png");
  trexcollidedimg = loadImage("trex_collided.png");
  gameoverimg = loadImage("gameOver.png");
  restartimg = loadImage("restart.png");
}

function setup() {
  createCanvas(600, 200);
  trex = createSprite(50, 165, 10, 10);
  trex.addAnimation("trex", treximg);
  trex.scale = 0.5;
  ground = createSprite(300, 185, 10, 10);
  ground.addImage("ground", groundimg)
  invisibleground = createSprite(300, 190, 600, 5);
  invisibleground.visible = false;
  cloudGroup = new Group();
  gameover = createSprite(300, 100);
  gameover.addImage("gameover", gameoverimg);
  gameover.scale = 0.7;
  gameover.visible = false;
  restart = createSprite(300, 150);
  restart.addImage("restart", restartimg);
  restart.scale = 0.7
  restart.visible = false;
  obstacleGroup = new Group();
}

function draw() {
  background(255);
  text("Score: " + count, 400, 50);
  text(mouseX + ";" + mouseY, mouseX, mouseY);
  drawSprites();
  trex.collide(invisibleground);
  if (gameState === PLAY) {
    count = count + Math.round(getFrameRate() / 60);
    ground.velocityX = -5
    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }
    if (keyDown("space") && trex.y >= 164) {
      trex.velocityY = -12

    }


    console.log(trex.y);
    trex.velocityY = trex.velocityY + 0.8;
    spawnClouds();
    spawnObstacles();
    if (obstacleGroup.isTouching(trex)) {
      gameState = END;
    }
  } else if (gameState === END) {
    ground.velocityX = 0;
    trex.velocityY = 0;
    obstacleGroup.setVelocityXEach(0);
    cloudGroup.setVelocityXEach(0);
    trex.addAnimation("trexcollided", trexcollidedimg);
    trex.changeAnimation("trexcollided", trexcollidedimg);
    obstacleGroup.setLifetimeEach(-1);
    cloudGroup.setLifetimeEach(-1);
    gameover.visible = true;
    restart.visible = true;

  }
  if (mousePressedOver(restart)) {
    reset();
  }
}

  function reset() {
    gameState = PLAY;
    gameover.visible = false;
    restart.visible = false;
    obstacleGroup.destroyEach();
    cloudGroup.destroyEach();
    trex.changeAnimation("trex");
    count = 0;
  }

  function spawnClouds() {
    if (frameCount % 100 === 0) {
      var cloud = createSprite(600, 100, 40, 10);
      cloud.y = random(80, 120);
      cloud.velocityX = -3;
      cloud.addImage("cloud", cloudimg);
      cloud.scale = 0.8;
      cloud.lifetime = 200;
      cloudGroup.add(cloud);

    }

  }

  function spawnObstacles() {
    if (frameCount % 100 === 0) {
      var obstacle = createSprite(600, 165, 10, 10)
      obstacle.velocityX = -3;
      var rand = Math.round(random(1, 6));
      switch (rand) {
        case 1:
          obstacle.addImage("obstacle1", obstacleimg);
          break;
        case 2:
          obstacle.addImage("obstacle2", obstacleimg2);
          break;
        case 3:
          obstacle.addImage("obstacle3", obstacleimg3);
          break;
        case 4:
          obstacle.addImage("obstacle4", obstacleimg4);
          break;
        case 5:
          obstacle.addImage("obstacle5", obstacleimg5);
          break;
        case 6:
          obstacle.addImage("obstacle6", obstacleimg6);
          break;
        default:
          break
      }
      obstacle.scale = 0.6;
      obstacle.lifetime = 200;
      obstacleGroup.add(obstacle);
    }
  }