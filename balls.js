class ball{
    constructor(game, x, y, r) {
        Object.assign(this, { game, x, y, r});

        this.velocity = {x:0, y:0};

    }

    update(){
        this.physics();
        this.updateBC();
        this.updateLastBC();
        this.collide();
    };

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        ctx.stroke(); 
    };

    updateBC() {
        this.BC = new BoundingCircle(this.x,this.y,this.r);
    }
    updateLastBC() {
        this.lastBC = this.BC;
    }

    collide() {
        var that = this;
        this.game.entities.forEach(function (entity) {
            
            if(entity instanceof beaker){
                // console.log(that.lastBC.bottom + " " + entity.BB.bottom);
            }

            if(entity.BB && that.BC.collide(entity.BB)) {
                if(that.velocity.y > 0) { //if falling
                    if((entity instanceof beaker)//landing
                    && (that.lastBC.bottom >= entity.BB.bottom)) { 
                        that.y = entity.BB.bottom - that.r;
                        // that.y = entity.BB.top - that.r * 2;
                        that.velocity.y === 0;
                        // if(that.state == 4) that.state = 0;
                        that.updateBC();
                    }
                    //land on enemy
                }
                //
            }
        });
    }

    physics() {
        const TICK = this.game.clockTick;

        const FALL_ACC = 50;

        this.velocity.y += FALL_ACC * TICK;

        this.x += this.velocity.x * TICK * 2;
        this.y += this.velocity.y * TICK * 2;
    }
}