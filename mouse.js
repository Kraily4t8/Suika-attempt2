class mouseStuff {
    constructor(game) {
        Object.assign(this, { game});
        this.x = 0;
        this.sizeArray = PARAMS.SIZEARRAY; //all sizes
        this.sizeLimit = 4; //last possible starting size
        this.cooldown = 0.5;
        this.chaos = false;
        this.elapsedTime = this.cooldown;
        this.currentSize;
        this.nextSize;
        this.initialRandom();
    }
    
    initialRandom() {
        // this.currentSize = this.sizeArray[0];
        // this.nextSize = this.sizeArray[0];
        this.currentSize = this.sizeArray[randomInt(this.sizeLimit)];
        this.nextSize = this.sizeArray[randomInt(this.sizeLimit)];
    }

    weightedRandom() {
        
    }

    nextRandom() {
        this.currentSize = this.nextSize;
        this.nextSize = this.sizeArray[randomInt(this.sizeArray.length - 1)]
    }

    update() {
        this.elapsedTime +=this.game.clockTick;

        if(this.game.mouse) this.x = this.game.mouse.x;
        if(this.game.click) {
            this.game.click = false;
            if(this.elapsedTime >= this.cooldown) {
                if(this.x > PARAMS.LEFTWALL && this.x < PARAMS.RIGHTWALL) this.game.addEntity(new ball(this.game,this.x, PARAMS.BEAKERTOP,this.currentSize))
                this.nextRandom();
                this.elapsedTime = 0;
                if(this.chaos) {
                    for (let i = 0; i < 4; i++) {
                        let x = (randomInt(10) - 5) * 50;
                        this.game.addEntity(new ball(this.game,this.x + x, PARAMS.BEAKERTOP,this.sizeArray[randomInt(this.sizeArray.length - 1)]));   
                    }
                }
            }
        }
    }

    draw(ctx) {
        // console.log(this.elapsedTime);
        // console.log(this.game.mouse);
        if(this.game.mouse) {
            if(this.x > PARAMS.LEFTWALL && this.x < PARAMS.RIGHTWALL) {
                ctx.strokeRect(this.game.mouse.x, PARAMS.BEAKERTOP - 20, 80, 20)
                ctx.font = "15px serif";
                ctx.fillStyle = "Black";
                ctx.textAlign = "left";
                if((this.cooldown - this.elapsedTime) <= 0) {
                    ctx.fillText("CD:" + 0 + "", this.game.mouse.x + 5, 100 - 5);
                } else {
                    let num = this.cooldown - this.elapsedTime;
                    ctx.fillText("CD:" + (Math.round(num * 100) / 100) + "", this.game.mouse.x + 5, 100 -5);
                }
                
            }
        } else {
            //grayed out
        }
    }
}