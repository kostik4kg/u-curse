export default class StatsPanel {
  constructor(scene, stats) {
    this.scene = scene;
    this.stats = stats;
    this.create();
  }
  create() {
    this.lapsPanel = this.scene.add.text(10, 10, `laps ${this.stats.lap}/${this.stats.laps}`, { fontFamily: 'Arial', fontSize: 24, color: '#ff0000' }).setScrollFactor(0);
    this.timePanel = this.scene.add.text(10, 30, `time ${this.stats.time}`, { fontFamily: 'Arial', fontSize: 24, color: '#ffff00' }).setScrollFactor(0);
    this.timeLapPanel = this.scene.add.text(10, 50, `time - laps ${this.stats.timeLap}`, { fontFamily: 'Arial', fontSize: 24, color: '#ffff00' }).setScrollFactor(0);
    this.bestTimePanel = this.scene.add.text(10, 70, `best time lap ${this.stats.timeBestLap}`, { fontFamily: 'Arial', fontSize: 24, color: '#ff0000' }).setScrollFactor(0);
  }
  render() {
    this.lapsPanel.setText(`laps ${this.stats.lap}/${this.stats.laps}`);
    this.timePanel.setText(`time ${this.stats.time.toFixed(2)}`);
    this.timeLapPanel.setText(`time - laps ${this.stats.timeLap.toFixed(2)}`);
    this.bestTimePanel.setText(`best time lap ${this.stats.timeBestLap.toFixed(2)}`);
  }
}