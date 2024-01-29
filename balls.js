class ball{
    constructor(game, x, y, r) {
        Object.assign(this, { game, x, y, r});

        this.velocity = {x:0, y:0};
        this.friction = 1;
        this.size = 1; //radius will be correlated with size
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
        ctx.stroke(); 
    };

    updateBC() {
        
    }

    updateLastBC() {
        
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
            this.velocity.x = -this.velocity.x * this.friction / 2;
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
                this.velocity.x = ent.velocity.x * this.friction;
                this.velocity.y = ent.velocity.y * this.friction;
                ent.velocity.x = temp.x * this.friction;
                ent.velocity.y = temp.y * this.friction;

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