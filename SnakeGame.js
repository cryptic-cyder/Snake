const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

class snake{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
}

//document.write(canvas.width);
var speed = 5;
//let is type of variable declaration 
//more at https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let
var tileCount = 20;
var tileSize = canvas.width / tileCount - 2;
var headX = 10;
var headY = 10;

var snakeParts = []; //document.write(snakeParts.length);
var tailLength = 2;//variable of length for tail.Initially it is 2

var xVelocity = 0;
var yVelocity = 0;

var appleX = 5;
var appleY = 5;

var score = 0; 

let randomcolor = 'white';

drawGame();//calling the game loop function for first time

function snakeAppleCollision(){
    ///function for checking the collision
    if(headX == appleX && headY == appleY){
        appleX = Math.floor(Math.random()*tileCount); 
        appleY = Math.floor(Math.random()*tileCount);
        tailLength = tailLength + 1; 
        //let colors = ['red','green','yellow','white'];
        //randomcolor = colors[Math.floor(Math.random() * colors.length)];
        //if collision occurs taillength increases for creating a new block
        score = score + 10;
    }
}

function drawApple(){
    ctx.fillStyle = 'red';
    ctx.fillRect(appleX*tileCount,appleY*tileCount,tileSize,tileSize);
 }

function drawScore(){
    ctx.fillStyle = 'white';
    ctx.font = "15px Verdana";
    ctx.fillText("Score : "+score,300,15);
}

//Game loop
function drawGame(){
    changeSnakePosition();

    var result = isGameOver();
    if(result){
        return;//if result is ture the code won't run below functions from here & game will end...
    }

    clearScreen();
    snakeAppleCollision();
    drawApple();
    drawSnake();
    drawScore();
    var increaseSpeed = score/50;//document.write(increaseSpeed);
    setTimeout(drawGame,1000/(speed+increaseSpeed));
    //For every 50 score increase the increaseSpeed will increase by 1 & function will
    //be called more fast than before
    //if speed variable increased then drawGame() will call faster 
}

function isGameOver(){
   
    if(xVelocity===0 && yVelocity===0){
        return false;//technically set the value false for starting the game.bcz at first
        //there is only head block.So without this declaration it will be Game over initially...
    }
   
    var marker = false;
   //if hits wall
   if(headX<0){//left wall
       marker = true;
   }
   if(headX>=(canvas.width/tileCount)){//Bcz headX will multiply by tileCount later
      //right wall 
      marker = true;
   }
   if(headY<0){//upper wall
       marker = true;
   }
   if(headY>=canvas.height/tileCount){//downward wall
       marker = true;
   }
   for(var i=0;i<snakeParts.length;i++){
       var blockparts = snakeParts[i];
       if(headX===blockparts.x && headY===blockparts.y){
           marker = true;
           break;
       }
   }
   if(marker){
       ctx.fillStyle = 'white';
       ctx.font = "50px Verdana";
       ctx.fillText("Game Over!",canvas.width/6,canvas.height/2);
   }
   return marker;
}

function clearScreen(){
   //function for clearing the screen everytime drawGame() is called
   ctx.fillStyle = 'black';//fill the shape with black 
   ctx.fillRect(0,0,canvas.width,canvas.height);
   //create reactangle with(x,y,width,height).here width and height is ==  to the height 
   // & weight of the canvas 
}

function drawSnake(){
    
    ctx.fillStyle = 'skyblue';//document.write(snakeParts.length);
    for(var i=0; i<snakeParts.length; i++){
        var part = snakeParts[i];
        ctx.fillRect(part.x*tileCount,part.y*tileCount,tileSize,tileSize);
    } 
    snakeParts.push(new snake(headX,headY));
    if(snakeParts.length > tailLength){
        snakeParts.shift();//The arr.shift() method removes the first element of the array thus 
        //reducing the size of the original array by 1.
    }
    
    ctx.fillStyle = 'yellow';
    ctx.fillRect(headX*tileCount,headY*tileCount,tileSize,tileSize); 
    //document.write(tileSize+" "+tileSize+"    ");
}


function changeSnakePosition(){
    headX = headX + xVelocity;//document.write(headX);//10-0
    headY = headY + yVelocity;//document.write(headY);
}
document.body.addEventListener('keydown',key);
function key(event){
    //When a key is pressed then this keyDown() function is activated...
    //up
    if(event.keyCode == 38){
        if(yVelocity==1)//Function for protest of returning direct reverse(down to up) 
          return;
        //Until, we press any key yVelocity is 0 and headY doesnot increase and decrease and 
        //headY*tilecount doesnot increases or decreases.But when we press up key yVelocity 
        //becomes -1.so after every timeout ms later value of headY decreases by 1 and 
        //headY*tilecount decreses and the object moves to up.according to the coordinate  
        yVelocity = -1;
        xVelocity = 0;
    }
    //down
    if(event.keyCode == 40){
        if(yVelocity==-1)//Function for protest of returning direct reverse(up to down)
        return;
        //if down key is pressed then yVelocity becomes 1 and headY increases by 1. thats why 
        //headY*tilecount increases and it moves down according to the coordinate
        yVelocity = 1;
        xVelocity = 0;
    }
    //right
    if(event.keyCode == 39){
        if(xVelocity==-1)//Function for protest of returning direct reverse(left to right)
           return;
        //if right key is pressed then xVelocity becomes 1 and headX increases by 1. thats why 
        //headX*tilecount increases and it moves right according to the coordinate
        yVelocity = 0;
        xVelocity = 1;
    }
    if(event.keyCode == 37){
        if(xVelocity==1)//Function for protest of returning direct reverse(right to left)
           return;
        //if down key is pressed then xVelocity becomes -1 and headX decreases by 1. thats why 
        //headX*tilecount decreases and it moves left according to the coordinate
        yVelocity = 0;
        xVelocity = -1;
    }
    
}

