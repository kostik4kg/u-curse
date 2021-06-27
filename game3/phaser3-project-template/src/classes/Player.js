const DIRECTION = Object.freeze({BACKWARD: -1, NONE: 0, FORWARD: 1});
const TURN = Object.freeze({ LEFT: -1, NONE: 0, RIGHT: 1 });
const SPEED = 10;
const ACCELERATION = 0.5;

export default class Player {
  constructor(scene, map, config) {
    this.scene = scene;
    this.map = map;
    console.log('config ', config);
    const position = this.map.getPlayerPosition(config.position);
    this.car = this.scene.matter.add.sprite(position.x, position.y, 'objectsCar', config.sprite);
    this.car.setFixedRotation(true);
    this._velosity = 0;

    this.checkpoint = 0;
  }
  get direction() {
    let direction = DIRECTION.NONE;

    if ( this.scene.cursors.up.isDown) {
      direction = DIRECTION.FORWARD;
    }
    else if (this.scene.cursors.down.isDown) {
      direction = DIRECTION.BACKWARD;
    }

    return direction;
  }
  get turn() {
    let turn = TURN.NONE;

    if (this.scene.cursors.left.isDown) {
      turn = TURN.LEFT;
    }
    else if (this.scene.cursors.right.isDown) {
      turn = TURN.RIGHT;
    }

    return turn;
  }
  get angle() {
    return this.car.angle + this.turn * SPEED / 2.5;
  }
  get velocity() {
    const speed = Math.abs(this._velosity);
    const max = this.getMaxSpeed();

    if (this.direction && speed < max) {
      this._velosity += ACCELERATION * Math.sign(this.direction);
    } else if ((this.direction && speed > max) || (!this.direction && speed > 0)) {
      this._velosity -= ACCELERATION * Math.sign(this._velosity);
    }
    return this._velosity;
  }
  getVelocityFromAngle() {
    const vec2 = new Phaser.Math.Vector2();
    return vec2.setToPolar(this.car.rotation - Math.PI/2, this.velocity);
  }
  getMaxSpeed() {
    return SPEED * this.map.getTileFriction(this.car);
  }
  slide() {
    this.car.angle += Phaser.Math.Between(-5, 5);
  }
  move() {
    const velocity = this.getVelocityFromAngle();

    this.car.setVelocity(velocity.x, velocity.y);

    this.car.setAngle(this.angle);

    this.checkPosition();
  }
  checkPosition() {
    const checkpoint = this.map.getCheckpoint(this.car);
    if(checkpoint) {
      this.onCheckpoint(checkpoint);
    }
  }
  onCheckpoint(checkpoint) {
    if (checkpoint === 1 && this.checkpoint === this.map.checkpoints.length) {
      // завершить круг 
      this.checkpoint = 1;
      this.car.emit('lap');
    } else if (checkpoint ===this. checkpoint + 1) {
      ++this.checkpoint;
    }
  }
}