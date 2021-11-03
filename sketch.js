var trex, trex_correndo, pontas, nuvem, Cacto, pontuação, trex_colidiu, Cabo, seta, pulo, CheckPoint, morte;
var solo,imagemdosolo, soloinvisivel, imagemNuvem, cacto1, cacto2, cacto3, cacto4, cacto5, cacto6, gameover, setinha
var grupoCactos, grupoNuvens;
var estadodojogo = "JOGAR";

function preload (){
  //loadAnimation/loadImage = carrega todas as imagens/animações 
  trex_correndo = loadAnimation ("trex1.png", "trex3.png", "trex4.png");
  trex_colidiu = loadAnimation("trex_collided.png")
  imagemdosolo = loadImage ( "ground2.png");
  imagemNuvem = loadImage ("cloud.png");
  cacto1 = loadImage ("obstacle1.png");
  cacto2 = loadImage ("obstacle2.png");
  cacto3 = loadImage ("obstacle3.png");
  cacto4 = loadImage ("obstacle4.png");
  cacto5 = loadImage ("obstacle5.png");
  cacto6 = loadImage ("obstacle6.png");
  gameover = loadImage("gameOver.png");
  setinha = loadImage("Sem título.png");
  pulo = loadSound("jump.mp3");
  CheckPoint = loadSound("checkPoint.mp3");
  morte = loadSound("die.mp3");
}

function setup(){ //Padrões de configuração do jogo!
  createCanvas(600,200);
  
  //criar um sprite do trex
  trex = createSprite(50,160,20,50);  
  // addAnimation adiciona a animação no Sprite!
  trex.addAnimation ("running", trex_correndo); 
  trex.addAnimation ("colidiu", trex_colidiu);
  // pontas = createEdgeSprites (); // Beiradas! 
  trex.scale = 0.5; //scala e posição
  
  //SOLO
  solo = createSprite(300,190,600,20); 
  solo.addImage ("ground1", imagemdosolo)
  
  //solo invisível:
  soloinvisivel = createSprite(300,200,600,10); 
  soloinvisivel.visible = false; 
  
  grupoCactos = new Group();
  grupoNuvens = new Group();
  
  trex.setCollider("circle",0,0,35)
  Cabo = createSprite(300,80,10,10);
  Cabo.addImage(gameover);
  Cabo.visible = false;
  
  seta = createSprite(300,130,10,10);
  seta.addImage(setinha);
  seta.scale = 0.3;
  seta.visible = false;
}
 
pontuação = 0
function draw(){

  background ("white");
  text("pontuação: " + pontuação, 500, 20)
 
  
  if (estadodojogo === "JOGAR"){
     solo.velocityX = -(3 + pontuação/100);
     pontuação = pontuação + Math.round(frameCount / 200);
    if(pontuação%100 === 0 && pontuação>0){
     //CheckPoint.play(); 
    }
    //SOLO:
  if(solo.x<0) {
    solo.x=solo.width/2;  //width === largura;
  }
    //trex pulando
  if(keyDown("space") && trex.y >=170) {    
    trex.velocityY = -15;
    pulo.play();
  }
  trex.velocityY = trex.velocityY + 0.8; //"gravidade";
    geracactos();
   geranuvens();
    if (trex.isTouching(grupoCactos)){
      estadodojogo = "ENCERRAR"
      morte.play();
    }
  }else if(estadodojogo === "ENCERRAR"){
     solo.velocityX = 0;
    grupoCactos.setVelocityXEach(0);
    grupoNuvens.setVelocityXEach(0);
    grupoCactos.setLifetimeEach(-1);
    grupoNuvens.setLifetimeEach(-1);
    trex.changeAnimation("colidiu", trex_colidiu);
    Cabo.visible = true;
    seta.visible = true;
    if (mousePressedOver(seta)){
     reiniciar();
  }
  }
  
  
 
  
  trex.collide (soloinvisivel ); // quicando nas beiras
 
  
 

  drawSprites();
  
}


function  geranuvens() {
  if (frameCount % 60 === 0){
  nuvem = createSprite (600,100,40,10);
    nuvem.addImage (imagemNuvem)
  nuvem.velocityX = -5;
    nuvem.y = Math.round (random(40, 100))
    nuvem.scale = 0.8
    nuvem.depth = trex.depth
    trex.depth = trex.depth + 1;
    
    
    nuvem.lifetime = 125;
    grupoNuvens.add(nuvem);
  }
}

function geracactos() {
  if (frameCount % 120 === 0){
    Cacto = createSprite(600, 180, 10, 10)
    Cacto.velocityX = -(3 + pontuação/100)
var cactorandom = Math.round(random(1,6))
    switch(cactorandom){
      case 1: Cacto.addImage(cacto1)
        break;
        case 2: Cacto.addImage(cacto2)
        break;
        case 3: Cacto.addImage(cacto3)
        break;
        case 4: Cacto.addImage(cacto4)
        break;
        case 5: Cacto.addImage(cacto5)
        break;
        case 6: Cacto.addImage(cacto6)
        break;
        default: break
    }
        Cacto.scale = 0.5
        Cacto.lifetime = 310
        
        grupoCactos.add(Cacto);
  }
}
function reiniciar(){
estadodojogo = "JOGAR"
  grupoCactos.destroyEach();
  grupoNuvens.destroyEach();
 trex.changeAnimation("running", trex_correndo);
  Cabo.visible = false
  seta.visible = false
  pontuação = 0
}






