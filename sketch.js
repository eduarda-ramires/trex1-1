  //declarar variaveis
  var END = 0;

  var trex, trex_running, trex_stoped;
  var ground, groundImage;
  var gameover, gameoverImage;
  var nuvem, nuvemImage;
  var arvore, arvoreImage4, arvoreImage5, arvoreImage6;

  var pontos = 0;

  var state = 1;
  var numeroAleatorio;
  var checkSom, morreuSom, pularSom;
  var restart, restartImage;


  var arvoreGrupo;
  var nuvensGrupo;


function preload() {

  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  trex_stoped = loadAnimation("trex_collided.png");
  groundImage = loadImage("ground2.png");
  nuvemImage = loadImage("cloud.png");
  arvoreImage4 = loadImage("obstacle4.png");
  arvoreImage5 = loadImage("obstacle5.png");
  arvoreImage6 = loadImage("obstacle6.png");
  gameoverImage = loadImage("gameOver.png");
  checkSom = loadSound("checkpoint.mp3");
  morreuSom = loadSound("die.mp3");
  pularSom = loadSound("jump.mp3");
  restartImage = loadImage("RESTART.png"); 

}

function setup() {
  //Alterar largura e altura do jogo
  createCanvas(windowWidth, windowWidth/3);
  arvoreGrupo = new Group();
  nuvensGrupo = new Group();

  //alterar posição do trex
  trex = createSprite(50, height*4/5);
  trex.addAnimation("correndo", trex_running);
  trex.addAnimation("trexmorreu" ,trex_stoped);
  trex.scale = height/500;
  //alterar tamanho do fundo
  ground = createSprite(width/2,height*4/5,width,2);
  ground.addImage("fundinho", groundImage);
  ground.velocityX = -5;
  //alterar tamanho e posição game over e restart
  gameover = createSprite(width/2,height/2-50);
  gameover.addImage("fimdejogo", gameoverImage);
  gameover.scale = 0.5;
  gameover.visible = false;
  
  restart = createSprite(width/2,height/2);
  restart.addImage("restart", restartImage);
  restart.scale = 0.5;
  restart.visible = false;
}

function draw() {

  background("white");

  if (state == 1) {

    text("Pontos: " + pontos, 20, 20);
    pontos = pontos + 1;
    if(pontos%100==0){
      checkSom.play();
    }
    //pular quando tela tocada
    if (touches.length>0||(keyDown("space") && trex.y > 150)) {
      trex.velocityY = -10;
      pularSom.play();
      
      //zerar matriz de toque
      touches=[];
    }else {
      trex.velocityY = trex.velocityY + 0.5;
    }


    if (arvoreGrupo.isTouching(trex)) {
      morreuSom.play();
      state = 0;
    }


    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }
    trex.collide(ground);

    spawnNuvem();
    spawnArvore();

  }

  if (state == 0) {
   
    trex.changeAnimation("trexmorreu", trex_stoped);
    ground.velocityX = 0;
    trex.velocityY = 0;
    arvoreGrupo.setVelocityXEach(0);
    nuvensGrupo.setVelocityXEach(0);
    gameover.visible = true;
    restart.visible = true;
    arvoreGrupo.setLifetimeEach(-1);
    nuvensGrupo.setLifetimeEach(-1);
    //Verifica se houve novo toque na tela
    if(touches.length>0||mousePressedOver(restart)){
      //zerar matriz de toque
      touches=[];
      
      pontos = 0;
      state = 1;
      trex.changeAnimation("correndo", trex_running);
      checkSom.play();
      gameover.visible = false;
      restart.visible = false;
      arvoreGrupo.destroyEach();
      nuvensGrupo.destroyEach();

    }


  }
  drawSprites();
}

function spawnNuvem() {
  if (frameCount % 60 == 0) { //a cada tempo executar
    tempoNuvem = Math.round(random(60, 300));
    nuvem = createSprite(width+20,Math.round(random(20, height/2.5)));
    nuvensGrupo.add(nuvem);
    nuvem.addImage(nuvemImage);
    nuvem.velocityX = -2;
    nuvem.lifetime = 600;

  }
}

function spawnArvore() {

  if (frameCount % 100 == 0) {


    numeroAleatorio = Math.round(random(4, 6));
    arvore = createSprite(width+20,height*3.8/5);
    arvoreGrupo.add(arvore);
    
    arvore.velocityX = -(3 +pontos/1000);
    arvore.scale = 0.7;
    arvore.lifetime = 500;

    switch (numeroAleatorio) {
      case 4:
        arvore.addImage(arvoreImage4);
        break;
      case 5:
        arvore.addImage(arvoreImage5);
        break;
      case 6:
        arvore.addImage(arvoreImage6);
        break;
      default:
        console.log("Numero invalido!");
    }

  }
}




