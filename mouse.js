class mouseStuff {
    constructor(game) {
        Object.assign(this, { game});
        this.x = 0;
        this.sizeArray = [10,20,30,40]; //all starting sizes
        this.currentSize;
        this.nextSize;
        this.initialRandom();
    }
    
    initialRandom() {
        this.currentSize = this.sizeArray[randomInt(this.sizeArray.length)];
        this.nextSize = this.sizeArray[randomInt(this.sizeArray.length)];
    }

    nextRandom() {
        this.currentSize = this.nextSize;
        this.nextSize = this.sizeArray[randomInt(this.sizeArray.length - 1)]
    }

    update() {
        if(this.game.mouse) this.x = this.game.mouse.x;
        if(this.game.click) {
            // console.log(randomInt(this.sizeArray.length));
            if(this.x > 50 && this.x < 450) this.game.addEntity(new ball(this.game,this.x,50,this.currentSize))
            this.nextRandom();
            this.game.click = false;
        }
    }

    draw(ctx) {
        // console.log(this.game.mouse);
        if(this.game.mouse) {
            if(this.x > 50 && this.x < 450) ctx.strokeRect(this.game.mouse.x, 50, 50, 20)
        } else {
            //grayed out
        }
    }
}