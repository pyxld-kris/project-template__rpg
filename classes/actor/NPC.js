import Phaser from "phaser";
import Character from "./Character.js";

export default class NPC extends Character {
  constructor(scene, x, y) {
    super(scene, x, y, "npc");
    this.scene = scene;

    this.setFriction(0).setDrag(0);

    // Create the animations we need from the player spritesheet
    const anims = scene.anims;
    anims.create({
      key: "npc-front",
      frames: anims.generateFrameNumbers("npc", { start: 0, end: 0 }),
      frameRate: 3,
      repeat: -1
    });
    anims.create({
      key: "npc-back",
      frames: anims.generateFrameNumbers("npc", { start: 1, end: 1 }),
      frameRate: 12,
      repeat: -1
    });
    anims.create({
      key: "npc-side",
      frames: anims.generateFrameNumbers("npc", { start: 2, end: 2 }),
      frameRate: 12,
      repeat: -1
    });
    this.anims.play("npc-front", true); // default starting anim

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

    // hook into the scene's update function
    this.scene.events.on("update", this.update, this);
  }

  update(time, delta) {
    if (parseInt(time) % 10 === 0) {
      console.log("do move npc");
      // every 1 second
      let rand = Math.random();
      if (rand < 0.1) {
        this.setVelocityY(-50);
        this.anims.play("npc-back", true);
      } else if (rand < 0.2) {
        this.setVelocityY(50);
        this.anims.play("npc-front", true);
      } else if (rand < 0.3) {
        this.setVelocityX(-50);
        this.anims.play("npc-side", true);
        this.setFlipX(true);
      } else if (rand < 0.4) {
        this.setVelocityX(50);
        this.anims.play("npc-side", true);
        this.setFlipX(false);
      } else {
        this.setVelocity(0);
      }
    }

    // Keep this image visually correct
    this.setDepth(this.y);
  }

  destroy() {
    if (this.scene)
      // sometimes scene is undefined when in the process of restarting?
      this.scene.events.off("update", this.update, this);
    super.destroy();
  }
}
