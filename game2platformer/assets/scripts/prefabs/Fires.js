class Fires extends Phaser.Physics.Arcade.Group {
  constructor(scene) {
    super(scene.physics.world, scene);
    this.scene = scene;
  }
  createFire(data) {
    let fire = this.getFirstDead();
    if(!fire) {
      fire = Fire.generate(this.scene, data);
      this.add(fire);
    } else {
      fire.reset(data.x, data.y);
    }
    fire.move();
  }
}