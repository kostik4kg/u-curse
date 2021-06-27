class Enemies extends Phaser.Physics.Arcade.Group {
  constructor(scene) {
    super(scene.physics.world, scene);
    this.scene = scene;
    this.count = 0;
    this.countMax = 3;
    this.countKilled = 0;
    this.fires = new Fires(this.scene);
    this.timer = this.scene.time.addEvent({
        delay: 1000,
        callback: this.tick,
        callbackScope: this,
        loop: true,
      });
  }
  tick() {
    if (this.count < this.countMax) {
      this.createEnemy();
    }else {
      this.timer.remove();
    }
  }
  onEnemyKilled() {
    ++this.countKilled;
    if (this.countKilled >= this.countMax) {
      this.scene.events.emit('enemies-killed', this.onComplete, this);
    }
  }
  createEnemy() {
    let enemy = this.getFirstDead();
    if(!enemy) {
      enemy = Enemy.generate(this.scene, this.fires);
      enemy.on('killed', this.onEnemyKilled, this);
      this.add(enemy);
    } else {
      enemy.reset();
    }
    enemy.move();
    this.count++;
  }
}