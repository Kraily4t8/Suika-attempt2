class ball{
    constructor(game, x, y, r) {
        Object.assign(this, { game, x, y, r});
        this.spritesheet;
        this.removeFromWorld = false;
        this.velocity = {x:0, y:0};
        this.friction = 1;
        
        this.size = 10; //radius will be correlated with size
        this.sizeArray = PARAMS.SIZEARRAY;//all sizes
        this.scoreArray = [100,200,300,500,800,1000,3000,5000,10000];
        this.state = this.sizeArray.indexOf(this.r);
        this.defineFruit();
    }

    defineFruit() {
        // console.log("state" + this.state);
        // crashes, put all fruit in one asset
         switch(this.state) {
            case 0: this.spritesheet = ASSET_MANAGER.getAsset("cherry.png");
                break;
            case 1: this.spritesheet = ASSET_MANAGER.getAsset("cranberry.png");
                break;
            case 2: this.spritesheet = ASSET_MANAGER.getAsset("blueberry.png");
                break;
            case 3: this.spritesheet = ASSET_MANAGER.getAsset("blackberry.png");
                break;
            case 4: this.spritesheet = ASSET_MANAGER.getAsset("strawberry.png");
                break;
            case 5: this.spritesheet = ASSET_MANAGER.getAsset("pomegranate.png");
                break;
            case 6: this.spritesheet = ASSET_MANAGER.getAsset("cantaloupe.png");
                break;
            case 7: this.spritesheet = ASSET_MANAGER.getAsset("coconut half meat.png");
                break;
            case 8: this.spritesheet = ASSET_MANAGER.getAsset("watermelon.png");
                break;
        }
    }

    alignFruit(ctx) {
        let xStart = 1;
        let yStart = 1;
        let width = 1;
        let height = 1;
        let scale = 1;
        ctx.drawImage(this.spritesheet, this.x - 23, this.y - 36, 50, 50);
        // switch(this.state) {
            // case 1: ctx.drawImage(this.spritesheet, this.x - 23, this.y - 36, 50, 50);
            //     break;
            // case 2: ctx.drawImage(this.spritesheet, this.x - 25, this.y - 25, 50, 50);
            //     break;
            // case 3: ctx.drawImage(this.spritesheet, this.x - 25, this.y - 25, 50, 50);
            //     break;
            // case 4: ctx.drawImage(this.spritesheet, this.x - 25, this.y - 25, 50, 50);
            //     break;
            // case 5: ctx.drawImage(this.spritesheet, this.x - 25, this.y - 25, 50, 50);
            //     break;
            // case 6: ctx.drawImage(this.spritesheet, this.x - 25, this.y - 25, 50, 50);
            //     break;
            // case 7: ctx.drawImage(this.spritesheet, this.x - 25, this.y - 25, 50, 50);
            //     break;
            // case 8: ctx.drawImage(this.spritesheet, this.x - 25, this.y - 25, 50, 50);
            //     break;
            // case 9: ctx.drawImage(this.spritesheet, this.x - 25, this.y - 25, 50, 50);
            //     break;
            // default:
                
        // }
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

    score(componentState) {
        if(componentState < this.scoreArray.length) {
            this.game.score += this.scoreArray[componentState];
        } else  {
            this.game.score += this.scoreArray[this.scoreArray.length - 1] * 1.5;
        }
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
            this.velocity.y = -this.velocity.y * this.friction / 4;
            // this.velocity.x = -this.velocity.x * this.friction / 2;
            this.y = PARAMS.FLOOR - this.r;
        }

        // collision with other circles
        for (var i = 0; i < this.game.entities.length; i++) {
            var ent = this.game.entities[i];
            if(ent != this) {
                if(this.collide(ent) && ent.r == this.r) {
                    console.log(this.r + " " + ent.r);
                    
                    let xPos = (this.x + ent.x) /2;
                    let yPos = (this.y + ent.y) /2;
                    this.game.addEntity(new ball(this.game,xPos,yPos,(this.state + 1) * 10));
                    this.score(this.state);
                    this.removeFromWorld = true;
                    ent.removeFromWorld = true;
                } else if (this.collide(ent)) {
                    // push away from each other
                    var dist = getDistance(this, ent);
                    var delta = this.r + ent.r - dist;
                    var difX = (this.x - ent.x) / dist;
                    var difY = (this.y - ent.y) / dist;
    
                    this.x += difX * delta / 2;
                    this.y += difY * delta / 2;
                    ent.x -= difX * delta / 2;
                    ent.y -= difY * delta / 2;
    
                    //turn vertical velocity to other x velocity if generally above or below
                    if(false) { //this.y > ent.y || this.y < ent.y
                        console.log("swap");
                        let direction = this.x - ent.y;
                        if(direction == 0) {
                            switch(Math.floor(Math.random() * 2)) {
                                case 0:
                                    direction = -1;
                                case 1:
                                    direction = 1;
                            }
                        } else {
                            if(direction > 0)  {
                                direction = 1;
                            } else {
                                direction = -1
                            }
                        }

                        var temp = { x: this.velocity.x, y: this.velocity.y };
                        this.velocity.x = ent.velocity.y * this.friction * .99 * direction;
                        // this.velocity.y = ent.velocity.x * this.friction * .99;
                        this.velocity.y *= 0.5;
                        ent.velocity.x = temp.y * this.friction * .99 * direction * -1;
                        ent.velocity.y *= 0.5;
                        // ent.velocity.y = temp.x * this.friction * .99;    
                    } else {
                        // swap velocities
                        var temp = { x: this.velocity.x, y: this.velocity.y };
                        let momDiff = this.getMomentum - ent.getMomentum
                        let thisMult = 1;
                        let entMult = 1;
                        if(momDiff > 0)  {
                            thisMult = momDiff;
                        }
                        this.velocity.x = ent.velocity.x * this.friction * .99 * thisMult;
                        if(this.velocity.x < 10) this.velocity.x*=2;
                        // this.velocity.y = ent.velocity.y * this.friction;
                        this.velocity.y *= 0.99;
                        ent.velocity.x = temp.x * this.friction * .99 * 1/thisMult;
                        if(ent.velocity.x < 10) ent.velocity.x*=2;
                        // ent.velocity.y = temp.y * this.friction;
                        ent.velocity.y *= 0.99;
                    }
                }
            }
        }
    }

    physics() {
        const TICK = this.game.clockTick;
        const fall_ac = 5;
        
        this.velocity.y += fall_ac * TICK;
        //falling
        this.y += this.velocity.y;
        this.x += this.velocity.x;
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