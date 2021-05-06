var dog, happyDog;
var database, foodS, foodStock;
var dogimage;
var fedPet,addFood;
var fedTime, lastFed
 var foodObject;


function preload()
{
	dogimage=loadImage("images/dogImg.png")
  happyDog=loadImage("images/dogImg1.png")
}

function setup() {
	createCanvas(1000, 400);
  database=firebase.database();
    dog=createSprite(800,200,10,10);
    dog.addImage(dogimage);
    dog.scale=0.2;

 foodObject=new Food();
  foodStock=database.ref("food");
  foodStock.on("value",readStock);


fedPet=createButton("fedPet");
fedPet.position(700,95);
fedPet.mousePressed(feedDog);

addFood=createButton("addFood");
addFood.position(800,95);
addFood.mousePressed(addFoods)


}


function draw() {  
background(46,139,87);
  foodObject.display();

fedTime=database.ref("feedTime");
fedTime.on("value",function(data){
lastFed=data.val();
})

fill(255,255,254);
textSize(15);
if(lastFed>=12){
  text("last feed:"+lastFed%12+"PM",350,30);
}else if(lastFed==0){
  text("last feed:12AM",350,30);
}else{
  text("last feed:"+lastFed+"AM",350,30); 
}
  

drawSprites();

}



function readStock(data){
    foodS=data.val();
    foodObject.updatefoodStock(foodS);
}


function addFoods(){
  foodS++;
  database.ref('/').update({
    food:foodS
  })
}

function feedDog(){
  dog.addImage(happyDog);

  if(foodObject.getFoodStock()<=0){
    foodObject.updatefoodStock(0);
  }else{
    foodObject.updatefoodStock(foodObject.getFoodStock()-1);
    }
    database.ref('/').update({
      food:foodObject.getFoodStock(),
      feedTime:hour()
    })
}