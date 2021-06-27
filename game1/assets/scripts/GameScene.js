class GameScene extends Phaser.Scene{
  constructor() {
    super('Game');
  }
  preload () {
    // загрузить фон
    this.load.image('bg', './assets/sprites/background.png');
    this.load.image('card', './assets/sprites/card.png');
    this.load.image('card1', './assets/sprites/card1.png');
    this.load.image('card2', './assets/sprites/card2.png');
    this.load.image('card3', './assets/sprites/card3.png');
    this.load.image('card4', './assets/sprites/card4.png');
    this.load.image('card5', './assets/sprites/card5.png');
    
    this.load.audio('theme', './assets/sounds/theme.mp3');
    this.load.audio('card', './assets/sounds/card.mp3');
    this.load.audio('timeout', './assets/sounds/timeout.mp3');
    this.load.audio('complete', './assets/sounds/complete.mp3');
    this.load.audio('success', './assets/sounds/success.mp3');
  };
  onTimerTick () {
    this.timeoutText.setText(`time:${this.timeout}`)
    if(this.timeout <= 0) {
      this.timer.paused = true;
      this.sounds.timeout.play();
      this.restart();
    }
    else {
      --this.timeout;
    }
  }
  createTimer () {
    this.timer = this.time.addEvent({
      delay: 1000,
      callback: this.onTimerTick,
      callbackScope: this,
      loop: true,
    });
  }
  createSound() {
    this.sounds = {
      card: this.sound.add('card'),
      theme: this.sound.add('theme'),
      timeout: this.sound.add('timeout'),
      complete: this.sound.add('complete'),
      success: this.sound.add('success'),
    };
    // this.sounds.theme.play({ volume: 0.1 });
  }
  create () {
    this.timeout = config.timeout;
    this.createSound();
    this.createTimer();
    this.createBackground();
    this.createText();
    this.createCard();
    this.start();
  };
  createText() {
    this.timeoutText = this.add.text(10, 330, '', { font: '36px Curse-Casual',  fill: '#ffffff'})
  }
  restart() {
    let count = 0;
    let onCardMoveComplete = () => {
      ++count;
      if(count >= this.cards.length) {
        this.start();
      }
    };
    // когда все карты улетели 
    this.cards.forEach(card => {
      card.move({
        x: this.sys.game.config.width + card.width,
        y: this.sys.game.config.height + card.height,
        delay: card.position.delay,
        callback: onCardMoveComplete,
      });
    });
  }
  start () {
    this.timeout = config.timeout;
    this.openedCard = null;
    this.openedCardCount = 0;
    this.timer.paused = false;
    this.initCards(config.levelConf.lev1);
    this.showCards();
  }
  initCards(lev) {
    let positions = this.getCardPositions(lev);
    this.cards.forEach(card => {
      card.init(positions.pop())
    })
  }
  createBackground() {
    // вывести фон
    // this.add.sprite(config.width / 2, config.height / 2, 'bg');
    let bg = this.add.sprite(0, 0, 'bg').setOrigin(0, 0);

  }
  showCards() {
    this.cards.forEach(card => {
      // сдой карт по умолчанию 0
      // console.log(card.depth);
      card.move({
        x: card.position.x,
        y: card.position.y,
        delay: card.position.delay,
      });
    })
  }
  createCard() {
    this.cards = [];
    
    for (let value of config.cards) {
      for (let i = 0; i< 2; i++) {
        this.cards.push(new Card(this,value));
      }
    }

    this.input.on('gameobjectdown', this.onCardClick, this);
  }
  onCardClick(pointer, card) {
    if (card.opened) {
      return false;
    }
    this.sounds.card.play();
    if (this.openedCard) {
      // есть открытая карта
      if (this.openedCard.value === card.value) {
        // save image
        this.sounds.success.play();
        this.openedCard = null;
        ++this.openedCardCount;
      } else {
        // close precard
        this.openedCard.close();
        this.openedCard = card;
      };
    } else {
      // нет открытой карты
      this.openedCard = card;
    }
    card.open(() => {
      if (this.openedCardCount === this.cards.length / 2) {
        this.sounds.complete.play();
        this.start();
      }
    });
  }
  getCardPositions (lev) {
    let position = [];
    let cardTexture = this.textures.get('card').getSourceImage();
    let cardWidth = cardTexture.width + 4;
    let cardHeight = cardTexture.height + 4;
    let offsetX = 140 + cardWidth / 2;
    let offsetY = 50 + cardHeight / 2;
    let id = 10;

    for (let row = 0; row < lev.rows; row++) {
      for (let col = 0; col < lev.cols; col++) {
        --id
        position.push({
          delay: id * 100,
          x: offsetX + col * cardWidth,
          y: offsetY + row * cardHeight,
        })
      }
    }
    return Phaser.Utils.Array.Shuffle(position);
  }
}
