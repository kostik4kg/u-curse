class Boom extends Phaser.GameObjects.Sprite {
  constructor(data) {
    super(data.scene, data.x, data.y, 'boom', 'boom1');
    this.scene.add.existing(this);

    const frames = this.scene.anims.generateFrameNames('boom', {
      prefix: 'boom',
      start: 1,
      end: 4,
    });
    // создать аним
    this.scene.anims.create({
      key: 'daboo',
      frames: frames,
      frameRate: 20,
      repeat: 0,
    });
    // запустить ее
    this.play('daboo');

    this.on('animationcomplete', () =>  {
      this.destroy();
    })
  }
  static generate(scene, x, y) {
    return new Boom({scene, x, y});
  }
}