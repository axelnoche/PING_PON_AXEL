var canvas;
var ctx;
var ballX = 300;
var ballY = 300;
var ballSpeedX = 4;
var ballSpeedY = 4;
var padle1Y = 250;
var padle2Y = 250;
const padleH = 95;
var player1score  = 0;
var player2score  = 0;
const winScore = 5;
var showWinScreen = false;

function calcMousePos(evt){
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;
        var  mouseX = evt.clientX - rect.left - root.scrollLeft;
        var  mouseY = evt.clientY - rect.top - root.scrollTop;
        return{
            x:mouseX, 
            y:mouseY
        };
}

function handleClick(evt){
    if(evt.keyCode == 13){
        if(showWinScreen){
            player1score = 0;
            player2score = 0;
            showWinScreen = false;
        }
    }
}

function handledrow(evt){
    if(evt.keyCode == 13){
        canvas = document.getElementById("canvas");
        ctx = canvas.getContext("2d")
        var fps = 125;
        setInterval(function(){
            move();
            draw();
        }, 1000 / fps);
        document.addEventListener('keyDown', handleClick);
        canvas.addEventListener("mouseMove", 
        function(evt){
        var mousePos = calcMousePos(evt);
        paddle1y = mousePos.y - (paddleHeight/2);
        } );
    }
}
window.onload = function(){
    document.addEventListener('keydown', handledrow);
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    ctx.font = "100px Arial";
    ctx.fillStyle = 'skyblue';
    ctx.fillText ("presiona enter para empezar", 100,300);
}
function resetBall(){
    if(player1score>=winScore||player2score>=winScore){
        showWinScreen = true;
    }
    ballX = canvas.width/2;
    ballY = canvas.height/2;
    ballSpeedX = -ballSpeedX;

}
function compMove(){
    var padle2Ycenter = padle2Y + (padleHeight/2);
    if(padle2Ycenter < ballY - 15){
        padle2Y += 3;
    }
    else if(padle2Ycenter > ballY + 15){
        padle2Y -= 3;
    }
}
function move(){
    if(showWinScreen){
        return;
    }
    compMove();
        ballX += ballSpeedX;
        ballY += ballSpeedY;
        if(ballX > canvas.width - 19){
            if(ballY > padle2Y && ballY < padle2Y + padleHeight){
                ballSpeedY = -ballSpeedX;
                var deltay = ballY - (padle2Y + padleHeight/2);
                ballSpeedY = deltay*0.15;
            }
            else{player1score ++;
            resetBall();}
        }
    
    if((ballY < 7.5 || ballY > canvas.height - 7.5)){
        ballSpeedY =  - ballSpeedY;
    }
    if(ballX < 19.5){
        if(ballY > padle1Y && ballY < padle1Y + padleHeight){
            ballSpeedX = -ballSpeedX;
            var deltay = ballY - (padle1Y + padleHeight/2);
            ballSpeedY = deltay*0.2;
        }
        else {
            player2score ++ ;
            resetBall();
        }
    }
}
function draw(){
    colorShape(0,0,canvas.width,canvas.height,'skyblue');
    if(showWinScreen){
        ctx.font = '35px verdana';
        if(player1score >= winScore){
            ctx.fillStyle = 'black';
            ctx.fillText = ('ganaste', 230,280);
        } else if (player2score >= winScore){
            ctx.fillStyle = "black";
            ctx.fillText = ("la computadora gana", 150, 280);
        } 
        else if (player2score == player1score){
            ctx.fillStyle = "black";
            ctx.fillText = ("has empatado con la computadora", 150, 280);
        }
        ctx.fillStyle = "blue";
        ctx.fillText = ("presiona enter para seguir", 200, 350);
        return;
    }
    Net();
    colorShape(2,padle1Y,10,padleHeight,'black');
    colorShape<(canvas.width-12,padle2Y,10,padleHeight,"blue");
    ctx.fillStyle = "black";
    ctx.beginPath();
    var radius = 7.5;
    colCircle(ballX,ballY,radius,"green");
    ctx.fillStyle = "green";
    ctx.font = "30px helvetica";
    ctx.fillText(player1score,100,100);
    ctx.fillText(player2score,canvas.width-100,100);
}
function Net(){
    for(var i=0; i<canvas.height;i+=40){
        colorShape(canvas.width/2-1,i,2,20,2,"red");
    }
}
function colCircle(centerX,centerY,radius,color){
ctx.fillStyle = color;
ctx.beginPath();
ctx.arc(centerX,centerY,radius,0,2 * Math.PI,true);
ctx.fill();
}
function colorShape(posX,posY,width,height,color){
    ctx.fillStyle = color;
    ctx.fillrect(posX,posY,width,height);
}