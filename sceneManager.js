class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.score = 0;
        this.x = 0;
        // this.score = 0;
        this.gameOver = false;

        // this.title = true;
        // this.credits = false;
        this.level = null;

        this.menuSelect = {
            credits: false
        }

        this.loadLevel();
    };

    loadLevel() {
        gameEngine.addEntity(new mouseStuff(gameEngine));
	    gameEngine.addEntity(new beaker());
    }

    clearEntities() {
        this.game.entities.forEach(function (entity) {
            entity.removeFromWorld = true;
        });
    };

    updateAudio() {
        var mute = document.getElementById("mute").checked;
        var volume = document.getElementById("volume").value;

        ASSET_MANAGER.muteAudio(mute);
        ASSET_MANAGER.adjustVolume(volume);

    };

    update() {

        // Gamepad control of debug
        if (this.game.gamepad != null && this.game.gamepad.buttons[8].pressed && this.menuButtonTimer > this.menuButtonCooldown) {
            if (document.getElementById("debug").checked) {
                document.getElementById("debug").checked = false;
            } else {
                document.getElementById("debug").checked = true;
            }
        }

        // Gamepad control of debug
        if (this.game.gamepad != null && this.game.gamepad.buttons[9].pressed && this.menuButtonTimer > this.menuButtonCooldown) {
            if (document.getElementById("mute").checked) {
                document.getElementById("mute").checked = false;
            } else {
                document.getElementById("mute").checked = true;
            }
        }

        // Gamepad control of volume slider
        if (this.game.gamepad != null && Math.abs(this.game.gamepad.axes[2]) > 0.3 && this.menuButtonTimer > this.menuButtonCooldown) {
            if (this.game.gamepad.axes[2] > 0.3) {
                document.getElementById("volume").value = parseFloat(document.getElementById("volume").value, 10) + 0.05;
            } 
            if (this.game.gamepad.axes[2] < -0.3) {
                document.getElementById("volume").value -= 0.05;
            }
        } 

        // this.updateAudio();
        PARAMS.DEBUG = document.getElementById("debug").checked;

        if (this.gameOver) {

            this.clearEntities();
            this.loadLevel();
            // this.game.addEntity(new TransitionScreen(this.game, levelOne, x, y, true));
        }

    };

    draw(ctx) {
        ctx.font = "40px serif";
        ctx.fillStyle = "Black";
        ctx.fillText("Score:", 50, 50);
        ctx.font = "50px serif";
        ctx.textAlign = "center";
        ctx.fillText((this.game.score + ""), 300, 50);
        
        // ctx.fillText("x" + (this.coins < 10 ? "0" : "") + this.coins, 6.5 * PARAMS.BLOCKWIDTH, 1.5 * PARAMS.BLOCKWIDTH);
        // ctx.fillText("WORLD", 9 * PARAMS.BLOCKWIDTH, 1 * PARAMS.BLOCKWIDTH);
        // ctx.fillText("TIME", 12.5 * PARAMS.BLOCKWIDTH, 1 * PARAMS.BLOCKWIDTH);
        // ctx.fillText(this.time, 13 * PARAMS.BLOCKWIDTH, 1.5 * PARAMS.BLOCKWIDTH);

        if (this.title && !this.credits) { // Title Screen
            
        } else if (this.title && this.credits) { // Credits Screen 
            
        }

        if (PARAMS.DEBUG) {
            
        }
    };
};