class beaker {
    constructor(spritesheet) {
        // Object.assign(this, {spritesheet});
    }

    update() {
    }

    draw(ctx) {
        // ctx.strokeRect(100, 100, 400, 480);
        ctx.strokeRect(PARAMS.LEFTWALL, PARAMS.BEAKERTOP, PARAMS.RIGHTWALL - PARAMS.LEFTWALL, PARAMS.FLOOR - PARAMS.BEAKERTOP);
        // ctx.strokeRect(PARAMS.LEFTWALL - 20, 0, PARAMS.RIGHTWALL - PARAMS.LEFTWALL + 40, PARAMS.BEAKERTOP);
        ctx.strokeRect(150, 0, 300, 80);
        ctx.strokeRect(0, 0, 100, 600);
        ctx.strokeRect(PARAMS.RIGHTWALL, 0, 100, 100);
    }
}