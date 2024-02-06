const gameEngine = new GameEngine();

const ASSET_MANAGER = new AssetManager();
ASSET_MANAGER.queueDownload("cherry.png");
ASSET_MANAGER.queueDownload("cranberry.png");
ASSET_MANAGER.queueDownload("blueberry.png");
ASSET_MANAGER.queueDownload("blackberry.png");
ASSET_MANAGER.queueDownload("strawberry.png");
ASSET_MANAGER.queueDownload("pomegranate.png");
ASSET_MANAGER.queueDownload("cantaloupe.png");
ASSET_MANAGER.queueDownload("coconut half meat.png");
ASSET_MANAGER.queueDownload("watermelon.png");

ASSET_MANAGER.downloadAll(() => {
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");

	gameEngine.init(ctx);
	PARAMS.DEBUG = true;
	PARAMS.LEFTWALL = 100;
	PARAMS.RIGHTWALL = 500;
	PARAMS.BEAKERTOP = 100;
	PARAMS.FLOOR = 580;
	PARAMS.SIZEARRAY = [10,20,30,40,50,60,80,100,125]; //all sizes
	// gameEngine.addEntity(new ball(gameEngine, 250, 30, 20));
	// gameEngine.addEntity(new ball(gameEngine, 260, 500, 10));
	// gameEngine.addEntity(new ball(gameEngine, 260, 500, 20));
	// gameEngine.addEntity(new ball(gameEngine, 250, 400, 20));
	gameEngine.addEntity(new SceneManager(gameEngine))
	

	gameEngine.start();
});
