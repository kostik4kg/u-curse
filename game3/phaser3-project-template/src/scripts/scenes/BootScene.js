import Phaser from 'phaser';
import bgPng from '../../assets/bg.png';

export default class BootScene extends Phaser.Scene {
  constructor() {
    super('Boot');
  }
  preload() {
    this.load.image('bg', bgPng)
    console.log('bootscene preload');
  }
  create() {
    console.log('bootscene create');
    this.scene.start('Preload');
  }
}