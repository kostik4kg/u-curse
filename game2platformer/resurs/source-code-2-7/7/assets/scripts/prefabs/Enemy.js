class Enemy extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        this.init();
    }
    init() {
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.body.enable = true;
        this.velocity = -250;
    }
    move() {
        this.body.setVelocityX(this.velocity);
    }
}