class GameScene extends Phaser.Scene {
    constructor() {
        super('Game');
    }
    init() {
        this.cursors = this.input.keyboard.createCursorKeys();
    }
    create() {
        this.createBackground();
        this.player = new Player(this);
        this.enemy = new Enemy(this, config.width - 150, config.height / 2, 'enemy', 'enemy1');
    }
    update() {
        this.player.move();
        this.enemy.move();
        this.bg.tilePositionX += 0.5;
    }
    createBackground() {
        this.bg = this.add.tileSprite(0, 0, config.width, config.height, 'bg').setOrigin(0);
    }
}