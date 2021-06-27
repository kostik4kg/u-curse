const GRASS_FRICTION = 0.3;
const ROAD_FRICTION = {
  road: 1,
  ground: 0.5,
  sand: 0.4
}

export default class Map {
  constructor(scene) {
    this.scene = scene;
    this.init();
    this.create();
  }
  init() {
    this.tilemap = this.scene.make.tilemap({key: 'tilemap'});
    this.tileset = this.tilemap.addTilesetImage('tilemap', 'tileset', 64, 64, 0,0);
  }
  create() {
    this.createLayers();
    this.createCollisions();
    //this.getPlayerPosition();
    this.createCheckpoint();
    this.createOils();
  }
  createCheckpoint() {
    this.checkpoints = [];

    this.tilemap.findObject('checkpoints' , checkpoint => {
      let rectangle = new Phaser.Geom.Rectangle (checkpoint.x, checkpoint.y, checkpoint.width, checkpoint.height);
      rectangle.index = checkpoint.properties.find(property => property.name === 'value').value;
      this.checkpoints.push(rectangle);
    })
  }
  createOils() {
    this.tilemap.findObject('oils', oil => {
      const sprite = this.scene.matter.add.sprite(oil.x, oil.y , 'objects', oil.name);
      sprite.setStatic(true);
      sprite.setSensor(true);
    });
  }
  createLayers() {
    // создать слои из тайлмапа
    this.tilemap.createLayer('grass', this.tileset);
    this.tilemap.createLayer('road', this.tileset);
    this.tilemap.createLayer('sand', this.tileset);
    this.tilemap.createLayer('ground', this.tileset);
  }
  createCollisions() {
    this.tilemap.findObject('collisions', collision => {
      const sprite = this.scene.matter.add.sprite(collision.x + collision.width / 2, collision.y - collision.height / 2, 'objects', collision.name);
      sprite.setStatic(true);
      sprite.setAngle(collision.rotation);

      if (collision.name === 'tribune_full' || collision.name === 'tribune_empty') {
        sprite.x = collision.x - (collision.width / 4);
        sprite.y = collision.y - (collision.height);
      }
    });
  }
  getPlayerPosition(positionName) {
    // найти обьект из тайлмапа
    return this.tilemap.findObject(positionName, position => {
      return position.name === positionName;
    }, this);
  }
  getTileFriction(car) {
    for (let road in ROAD_FRICTION) {
      // пересечение игрока и тайла
      let tile = this.tilemap.getTileAtWorldXY(car.x, car.y, false, this.scene.cameras.main, road);
      if (tile) {
        return ROAD_FRICTION[road];
      }
    }
    return GRASS_FRICTION; 
  }
  getCheckpoint(car) {
    const checkpoint = this.checkpoints.find(checkpoint => checkpoint.contains(car.x, car.y));
    return checkpoint ? parseInt(checkpoint.index) : false;
  }
}