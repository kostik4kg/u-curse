export default class StatsPopup {
  constructor(scene, stats) {
    this.scene = scene;
    this.stats = stats;
    this.create();
  }
  create() {
    const style = {
      fontFamily: 'Arial', fontSize: 24, fontWeight: 'bold', color: '#ffffff'
    }
    this.popup = this.scene.add.graphics()
      .setScrollFactor(0)
      .fillStyle(0x000000, 0.5)
      .fillRoundedRect(this.scene.sys.canvas.width / 2 - 150, this.scene.sys.canvas.height / 2 - 150, 300, 300);
    
    this.textTitle = this.scene.add.text(this.scene.cameras.main.centerX, this.scene.cameras.main.centerY - 75, `Level complete`, {
      fontFamily: 'Arial', fontSize: 44, fontWeight: 'bold', color: '#ffffff'
    }).setOrigin(0.5).setScrollFactor(0);
    this.textTime = this.scene.add.text(this.scene.cameras.main.centerX, this.scene.cameras.main.centerY - 25, `Time: ${this.stats.time.toFixed(2)}`, style).setOrigin(0.5).setScrollFactor(0);
    this.textBestTime = this.scene.add.text(this.scene.cameras.main.centerX, this.scene.cameras.main.centerY + 50, `Best lap: ${this.stats.timeBestLap.toFixed(2)}`, style).setOrigin(0.5).setScrollFactor(0);
    this.text = this.scene.add.text(this.scene.cameras.main.centerX, this.scene.cameras.main.centerY + 100, `Tap to contine`, style).setOrigin(0.5).setScrollFactor(0);


    this.scene.input.once('pointerdown' , () => {
      this.popup.destroy();
      this.textTitle.destroy();
      this.textTime.destroy();
      this.textBestTime.destroy();
      this.scene.scene.restart();
    });
  }
}