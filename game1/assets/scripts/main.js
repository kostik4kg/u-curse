let scene = new GameScene();

let config = {
  type: Phaser.AUTO,
  width:1280,
  height:720,
  levelConf: { lev1: { rows: 2, cols: 5, cards: [1, 2, 3, 4, 5] }, lev2: { rows: 2, cols: 4, cards: [1, 2, 3, 4] }},
  rows: 2,
  cols: 5,
  cards: [1, 2, 3, 4, 5],
  timeout: 30,
  scene: scene,
};

let game = new Phaser.Game(config);