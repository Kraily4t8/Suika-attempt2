class ball{
    constructor(game, x, y, r) {
        Object.assign(this, { game, x, y, r});
        this.spritesheet;
        this.removeFromWorld = false;
        this.velocity = {x:0, y:0};
        this.friction = 1;
        this.state;
        this.size = 10; //radius will be correlated with size
        this.sizeArray = [10,20,40,80,160]; //all sizes
        this.defineFruit();
    }

    defineFruit() {
        this.state = this.r / 10;
        switch(this.r) {
            case 10: this.spritesheet = ASSET_MANAGER.getAsset("cherry.png");
                break;
            case 20: this.spritesheet = ASSET_MANAGER.getAsset("cranberry.png");
                break;
            default:this.spritesheet = ASSET_MANAGER.getAsset("cherry.png");
        }
    }

    alignFruit(ctx) {
        let xStart = 1;
        let yStart = 1;
        let width = 1;
        let height = 1;
        let scale = 1;
        switch(this.r) {
            case 10:
                // xStart = 96;
                // yStart = 200;
                // width = 150;
                // height = 150;
                ctx.drawImage(this.spritesheet, this.x - 23, this.y - 36, 50, 50);
                break;
            case 20:
                ctx.drawImage(this.spritesheet, this.x - 25, this.y - 25, 50, 50);
                break;
            default:
                ctx.drawImage(this.spritesheet, this.x - 25, this.y - 25, 50, 50);
        }
        // ctx.drawImage(this.spritesheet, 
        //     xStart + width, yStart, //source from sheet 
        //     width, height,
        //     -(this.x  + width * scale),this.y,
        //     width * scale, 
        //     height * scale);
        // ctx.drawImage(this.sprite, 96, 100, 200, 200, this.x - 10,this.y - 10, 30 * 1, 30 * 1);
        // if(this.r == 20) ctx.drawImage(this.sprite, this.x - 25, this.y - 25, 50, 50);
    }
    update(){
        this.physics();
        // this.updateBC();
        // this.updateLastBC();
        this.collisionHandling();
    };

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        // ctx.drawImage(this.spritesheet, this.x - 25, this.y - 25, 50, 50);
        this.alignFruit(ctx);
        ctx.stroke(); 
    };

    updateBC() {
        
    }

    updateLastBC() {
        
    }

    getMomentum() {
        let velx = this.velocity.x
        let vely = this.velocity.y
        return this.r * Math.sqrt(velx * velx + vely * vely)
    }

    collisionHandling() {
        this.friction = 1;
        
        if(this.collideLeft()) {
            this.velocity.x = -this.velocity.x * this.friction / 2;
            this.x = PARAMS.LEFTWALL + this.r;
        }

        if(this.collideRight()) {
            this.velocity.x = -this.velocity.x * this.friction / 2;
            this.x = PARAMS.RIGHTWALL - this.r;
        }

        if (this.collideBottom()) {
            this.velocity.y = -this.velocity.y * this.friction / 2;
            // this.velocity.x = -this.velocity.x * this.friction / 2;
            this.y = PARAMS.FLOOR - this.r;
        }

        // collision with other circles
        for (var i = 0; i < this.game.entities.length; i++) {
            var ent = this.game.entities[i];
            if (ent != this && this.collide(ent)) {
                
                // push away from each other
                var dist = getDistance(this, ent);
                var delta = this.r + ent.r - dist;
                var difX = (this.x - ent.x) / dist;
                var difY = (this.y - ent.y) / dist;

                this.x += difX * delta / 2;
                this.y += difY * delta / 2;
                ent.x -= difX * delta / 2;
                ent.y -= difY * delta / 2;

                // swap velocities
                var temp = { x: this.velocity.x, y: this.velocity.y };
                this.velocity.x = ent.velocity.x * this.friction * .99;
                // this.velocity.y = ent.velocity.y * this.friction;
                this.velocity.y *= 0.99;
                ent.velocity.x = temp.x * this.friction * .99;
                // ent.velocity.y = temp.y * this.friction;
                ent.velocity.y *= 0.99;

            }
            if(ent != this && this.collide(ent) && ent.r == this.r) {
                console.log(this.r + " " + ent.r);
                let xPos = (this.x + ent.x) /2;
                let yPos = (this.y + ent.y) /2;
                this.removeFromWorld = true;
                ent.removeFromWorld = true;
                this.game.addEntity(new ball(this.game,xPos,yPos,(this.state + 1) * 10));
            }
        }
    }

    physics() {
        const TICK = this.game.clockTick;
        const fall_ac = 10;
        
        this.velocity.y += fall_ac * TICK;
        //falling
        this.y += this.velocity.y;
        this.x += this.velocity.x;
    }

    delete() {
        delete this;
    }

    collide(other) {
        return getDistance(this, other) < this.r + other.r;
    }

    collideOutOfBounds() {
        //left bounds
        //right bounds
        return (this.x < 30 && this.y > 80) || (this.y > 470 && this.y > 80);  
    }

    collideLeft() {
        return ((this.x - this.r) < PARAMS.LEFTWALL) && this.y > 80;
    }

    collideRight() {
        return ((this.x + this.r) > PARAMS.RIGHTWALL) && this.y > 80;
    }

    collideBottom() {
        // console.log((this.y + this.r) + " " + PARAMS.FLOOR);
        return (this.y + this.r) > PARAMS.FLOOR;
    };
}