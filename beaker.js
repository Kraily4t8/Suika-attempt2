class beaker {
    constructor(game, x, y, w, h) {
        Object.assign(this, { game, x, y, w, h});
        this.BB = new BoundingBox(this.x, this.y, this.w, this.h);
    }

    update(){

    };

    draw(ctx) {
        console.log("draw");
        ctx.strokeRect(this.x, this.y, this.w, this.h);
    };
}