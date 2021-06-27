import Phaser from 'phaser';
import LoadingBar from '../../classes/loadingBar';
import tilesetPng from '../../assets/spritesheet_tiles2small.png';
import tilemapJson from '../../assets/tiledmap.json';
import objectPng from '../../assets/objectsprite.png';
import objectJson from '../../assets/objectsprite.json';
import objectCarPng from '../../assets/objectCar.png';
import objectCarJson from '../../assets/objectCar.json';

export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super('Preload');
  }
  preload() {
    this.add.image(0, 0, 'bg').setOrigin(0);
    const lodingBar = new LoadingBar(this);
    this.load.spritesheet('tileset', tilesetPng, {frameWidth: 64, frameHeight: 64});
    this.load.tilemapTiledJSON('tilemap', tilemapJson);

    this.load.atlas('objects', objectPng, objectJson);
    this.load.atlas('objectsCar', objectCarPng, objectCarJson);
  }
  create() {
    this.scene.start('Start'); 
  }
}