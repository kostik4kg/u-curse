import Phaser from 'phaser';
import BootScene from './scripts/scenes/BootScene';
import PreloadScene from './scripts/scenes/PreloadScene';
import GameScene from './scripts/scenes/GameScene';
import StartScene from './scripts/scenes/StartScene';

const config = {
    type: Phaser.AUTO,
    width: 1280,
    height: 720,
    //backgroundColor: 0x00ff00,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'matter',
        matter: {
            debug: true,
            gravity: {x: 0, y: 0}
        },
    },
    scene: [BootScene, PreloadScene, StartScene, GameScene]
};

const game = new Phaser.Game(config);
