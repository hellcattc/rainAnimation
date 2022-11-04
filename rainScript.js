var canvas = document.getElementById("myCanvas");
canvas.style.width = this.window.innerWidth;
canvas.style.height = this.window.innerHeight;
var ctx = canvas.getContext("2d")

var randDistr;
var speedDistr;
var rains = [];

class raindrop {
    constructor(randNum, speed, color) {
        this.speed = speed; this.randNum = randNum; this.y = 1; this.color = color;
        ctx.beginPath();
        ctx.rect(this.randNum, this.y, 2, 10)
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();  
    }
    
    get height() {
        return this.y
    }

    drop() {
        this.y += this.speed
        ctx.beginPath();
        ctx.rect(this.randNum, this.y, 1, 10)
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
        ctx.clearRect(this.randNum, this.y - 21, 2, 10)
    }
    
    dropToRiver(level){ 
        ctx.beginPath();
        ctx.rect(this.randNum, this.y+10, 1, 10)
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }
}

class river {
    constructor(color) {
        this.color = color;
        this.level = canvas.height - 30;
        this.raindropCount = 0
        ctx.beginPath();
        ctx.rect(0, this.level, canvas.width, 30);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath(); 
    }

    get currentLevel() {
        return this.level;
    }

    filling() {
        this.raindropCount = this.raindropCount + 1
        if (this.raindropCount == 3000) { 
            this.level = this.level - 1;
            ctx.beginPath();
            ctx.rect(0, this.level, canvas.width, 1);
            ctx.fillStyle = "#0000ff";
            ctx.fill();
            ctx.closePath(); 
            this.raindropCount = 0
        }
    }
}

var myWater = new river("#0000ff");

function rainDraw() {
    randDistr = Math.trunc((Math.random())*canvas.width); 
    speedDistr = Math.random() + 5

    let x = new raindrop(randDistr, speedDistr, "#0000ff");
    
    rains.push(x);
    
    if (myWater.currentLevel > 0) {
        for (let i = 0; i < rains.length; i++) {
            
            if (rains[i].height >= myWater.currentLevel) {
                myWater.filling()
                rains[i].dropToRiver(myWater.currentLevel)
            }
            
            else {rains[i].drop()}
        }
    }
}

setInterval(rainDraw, 10)
