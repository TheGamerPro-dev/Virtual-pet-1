var Sheru, SheruImg, Sheru_SittingImg;
var database;
var foodS, foodStock;

function preload()
{
  SheruImg = loadImage("images/dogImg1.png");
  Sheru_SittingImg = loadImage("images/dogImg.png");
}

function setup() {
  database = firebase.database();
	createCanvas(500, 500);
  Sheru = createSprite(250,250);
  Sheru.scale=0.3;
  Sheru.addImage(Sheru_SittingImg);
  foodStock = database.ref('Food');
  foodStock.on("value", readStock);
}

function draw() {  
  background("green");
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    Sheru.addImage(SheruImg);
  }
  drawSprites();
}

function readStock(data){
  foodS=data.val();
}

function writeStock(x){

    if(x<=0){
      x=0;
    } else {
      x=x-1;
    }

    database.ref('/').update({
      Food:x
    })
}