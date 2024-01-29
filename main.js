const gameEngine = new GameEngine();

const ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.downloadAll(() => {
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");

	gameEngine.init(ctx);

	PARAMS.LEFTWALL = 50;
	PARAMS.RIGHTWALL = 450;
	PARAMS.FLOOR = 550;
	// gameEngine.addEntity(new ball(gameEngine, 250, 30, 20));
	gameEngine.addEntity(new ball(gameEngine, 260, 500, 20));
	gameEngine.addEntity(new ball(gameEngine, 250, 400, 20));
	gameEngine.addEntity(new beaker());

	gameEngine.start();
});
