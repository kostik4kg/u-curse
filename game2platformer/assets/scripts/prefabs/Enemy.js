class Enemy extends MovableObject {
  static generateAttributes() {
    const x = config.width + 100;
    const y = Phaser.Math.Between(100, config.height - 100);
    const id = Phaser.Math.Between(1, 4);
    return {x, y, id};
  }
  static generate(scene, fires) {
    const data = Enemy.generateAttributes();
    return new Enemy({scene,
      fires,
      x: data.x, y:data.y, texture:'enemy',
      frame: `enemy${data.id}`,
      velocity: -250,
      bullet: {delay: 1000, texture: 'bullet', velocity: -500}});
  }
  init(data) {
    super.init(data);
    this.setOrigin(0, 0.5);
    this.fires = data.fires || new Fires(this.scene);
    this.timer = this.scene.time.addEvent({
      delay: data.bullet.delay,
      callback: this.fire,
      callbackScope: this,
      loop: true,
    });

    this.bullet = data.bullet;
  }
  fire() {
    this.fires.createFire(this);
  }
  reset() {
    const data = Enemy.generateAttributes();
    super.reset(data.x, data.y);
    this.setFrame(`enemy${data.id}`);
  }
  isDead() {
    return this.x < -this.width;
  }
}