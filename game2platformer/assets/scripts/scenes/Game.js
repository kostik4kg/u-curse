class Game extends Phaser.Scene {
  constructor() {
    super('Game');
  }
  init() {
    this.cursors = this.input.keyboard.createCursorKeys();
    this.score = 0;
  }
  create() {
    this.createSound();
    this.createBacground();
    this.player = new Player(this);
    this.enemies = new Enemies(this);
    this.createCompleteEvents();
    this.addOverlap();
    this.createScore();
  }
  createSound() {
    this.audioTheme = this.sound.add('theme', { volume: 0.2, loop: true });
    this.audioBoom = this.sound.add('boomsound', { volume: 0.1 });

    this.audioTheme.play();
  }
  addOverlap() {
    this.physics.add.overlap(this.player.fires, this.enemies, this.onOverlap, undefined, this);
    this.physics.add.overlap(this.enemies.fires, this.player, this.onOverlap, undefined, this);
    this.physics.add.overlap(this.player, this.enemies, this.onOverlap, undefined, this);
  }
  createCompleteEvents() {
    this.player.once('killed', this.onComplete, this);
    this.events.once('enemies-killed', this.onComplete, this);
  }
  onComplete() {
    this.audioTheme.stop();
    this.scene.start('Start', {
      score: this.score,
      completed: this.player.active,
    });
  }
  onOverlap(sourse, target) {
    let enemy = [sourse, target].find(item => item.texture.key === 'enemy');
    if (enemy) {
      ++this.score;
      this.scoreText.setText(`score ${this.score}`);
      this.audioBoom.play();
      Boom.generate(this, enemy.x, enemy.y );

    }
   
    sourse.setAlive(false);
    target.setAlive(false);
  }
  createScore() {
    this.countPlayer = 0;
    this.scoreText = this.add.text(10, this.sys.canvas.height / 10, `score ${this.score}`, { fontFamily: 'Curse-Casual', fontSize: 24, color: '#00ff00' }).setOrigin(0);
  }
  update() {
    this.player.move();
    this.bg.tilePositionX += 0.5;
  }
  createBacground() {
    this.bg = this.add.tileSprite(0, 0, config.width, config.height, 'bg').setOrigin(0);
  }
}