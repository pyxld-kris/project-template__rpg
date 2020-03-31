import Phaser from "phaser";

export default class Character extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "character");
    this.scene = scene;

    // Add to rendering engine
    scene.add.existing(this).setOrigin(0.5, 1);
    // Add to physics engine
    scene.physics.add.existing(this, false); // second parameter is isStatic

    // Fix the hitbox of this physics object
    const width = this.width;
    const height = this.height;
    this
      //.setSize(width - 4, parseInt(height / 2, 0))
      //.setOffset(2, height / 2)
      .setCircle(width / 2 - 4, 4, height / 2 + 1)
      // Use function chaining to set other physical properties
      .setCollideWorldBounds(true)
      .setMaxVelocity(300, 300)
      .setDrag(1000)
      .setBounce(0, 0)
      .setFriction(0);

    // Keep this image visually correct
    this.setDepth(this.y);

    // Create the animations we need from the player spritesheet
    const anims = scene.anims;
    anims.create({
      key: "character-front",
      frames: anims.generateFrameNumbers("character", { start: 0, end: 0 }),
      frameRate: 3,
      repeat: -1
    });
    anims.create({
      key: "character-back",
      frames: anims.generateFrameNumbers("character", { start: 1, end: 1 }),
      frameRate: 12,
      repeat: -1
    });
    anims.create({
      key: "character-side",
      frames: anims.generateFrameNumbers("character", { start: 2, end: 2 }),
      frameRate: 12,
      repeat: -1
    });
    this.anims.play("character-front", true); // default starting anim

    // Track the arrow keys & OPQA
    const {
      LEFT,
      RIGHT,
      UP,
      DOWN,
      W,
      A,
      S,
      D
    } = Phaser.Input.Keyboard.KeyCodes;
    this.keys = scene.input.keyboard.addKeys({
      left: LEFT,
      right: RIGHT,
      up: UP,
      down: DOWN,
      w: W,
      a: A,
      s: S,
      d: D
    });
  }

  destroy() {
    super.destroy();
  }
}
