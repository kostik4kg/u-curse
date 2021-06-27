import Client from '../../classes/Client';

export default class StartScene extends Phaser.Scene {
  constructor() {
    super('Start');
  }
  preload() {
    this.add.image(0, 0, 'bg').setOrigin(0);
  }
  create() {
    this.createBtn();
    this.setEventStart();
  }
  createBtn() {
    this.onePlayerBtn = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY - 50, 'one player', { fontFamily: 'Arial', fontSize: '46px', fill: '#FAFAD2' })
      .setOrigin(0.5)  
      .setInteractive();

    this.twoPlayerBtn = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY + 50, 'two player', { fontFamily: 'Arial', fontSize: '46px' })
      .setOrigin(0.5)
      .setInteractive();
  }
  setEventStart() {
    this.onePlayerBtn.on('pointerdown', this.startGame, this);
    this.twoPlayerBtn.on('pointerdown', this.requestGame, this);
  }
  startGame() {
    this.scene.start('Game', {client: this.client});
  }
  requestGame() {
    // инициализировать клиент
    this.client = new Client(); 
    // отправить запрос на сервер
    this.client.init();
    //  по факту получения противника начать игру
    this.client.on('game', this.startGame, this);
  }
}