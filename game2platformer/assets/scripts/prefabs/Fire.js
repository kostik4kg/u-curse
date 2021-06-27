class Fire extends MovableObject {
  static generate(scene, sourse) {
    const data = {
      scene,
      x: sourse.x,
      y: sourse.y,
      texture: sourse.bullet.texture,
      velocity: sourse.bullet.velocity,
    };
    return new Fire(data);
  }
  isDead() {
    return (this.x < -this.width || this.x > config.width);
  }
}