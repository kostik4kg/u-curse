class StartScene extends Phaser.Scene {
  constructor() {
    super('Start');
  }
  create (data) {
    this.createBackground();
    if (data.score !== undefined) {
      this.createStats(data);
    }
    this.createText();
    this.pointerEvent();
  }
  createStats(data) {
    this.add.graphics()
      .fillStyle('0x000000', 0.5)
      .fillRoundedRect(config.width / 2 - 200, config.height / 2 - 200, 400, 400);
  
    const textTitle = data.completed ? 'level completed' : 'Game Over';
    const textScore = `Score ${data.score}`;
    const textStyle = { fontFamily: 'Curse-Casual', fontSize: 40, color: '#00ff00' };

    this.add.text(config.width / 2, 250, textTitle, textStyle).setOrigin(0.5);
    this.add.text(config.width / 2, 350, textScore, textStyle).setOrigin(0.5);
  };
  pointerEvent () {
    this.input.on('pointerdown', () => {
      this.scene.start('Game');
    })
  }
  createText() {
    let startText = this.add.text(this.sys.canvas.width / 2, this.sys.canvas.height / 2 + 130, 'Tap to start', { fontFamily: 'Curse-Casual', fontSize: 42, color: '#ffffff' }).setOrigin(0.5);

  }
  createBackground () {
    this.add.image(0, 0, 'bg').setOrigin(0);
  }
}