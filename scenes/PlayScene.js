import Phaser from "phaser";

import Character from "../classes/Character.js";

export default class PlayScene extends Phaser.Scene {
  constructor() {
    super("PlayScene");
  }

  create() {
    // Start UIScene, which will layer on top of PlayScene
    this.scene.run("UIScene");

    let halfGameWidth = this.game.config.width / 2;
    let halfGameHeight = this.game.config.height / 2;

    // Set the physics world size
    this.physics.world.setBounds(0, 0, 1000, 1000);

    // Create background, and do really simple animation
    this.background = this.add
      .sprite(halfGameWidth, this.game.config.height, "background")
      .setOrigin(0.5, 1);

    // Create the character
    this.character = new Character(
      this,
      this.game.config.width / 2,
      this.game.config.height - this.game.config.height / 8,
      40,
      40
    );

    this.camera = this.cameras.main;
    this.camera.setBounds(
      0,
      0,
      this.physics.world.bounds.width,
      this.physics.world.bounds.height
    );
    this.camera.startFollow(this.character);
  }

  update(time, delta) {}

  destroy() {
    clearTimeout(this.backgroundAnimInterval);
    super.destroy();
  }
}
