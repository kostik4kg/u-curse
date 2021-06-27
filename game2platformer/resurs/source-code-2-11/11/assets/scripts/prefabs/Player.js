class Player extends Enemy {
    constructor(scene) {
        super(scene, 150, config.height / 2, 'dragon', 'dragon1');
    }
    init() {
        super.init();
        this.velocity = 500;
        this.fires = new Fires(this.scene);

        this.timer = this.scene.time.addEvent({
            delay: 500,
            loop: true,
            callback: this.fire,
            callbackScope: this
        });
    }
    fire() {
        this.fires.createFire(this);
    }
    move() {
        this.body.setVelocity(0);

        if (this.scene.cursors.left.isDown) {
            this.body.setVelocityX(-this.velocity);
        } else if (this.scene.cursors.right.isDown) {
            this.body.setVelocityX(this.velocity);
        }

        if (this.scene.cursors.up.isDown) {
            this.body.setVelocityY(-this.velocity);
        } else if (this.scene.cursors.down.isDown) {
            this.body.setVelocityY(this.velocity);
        }
    }
}