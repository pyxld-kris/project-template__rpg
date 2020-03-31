import Phaser from "phaser";

import Player from "../classes/actor/Player.js";
import NPC from "../classes/actor/NPC.js";
import Building from "../classes/environment/Building.js";
import Tree from "../classes/environment/Tree.js";
import TreeTrunk from "../classes/environment/TreeTrunk.js";
import Rock from "../classes/environment/Rock.js";
import Grass from "../classes/environment/Grass.js";

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
    this.physics.world.setBounds(0, 0, 200, 300);

    // Create background, and do really simple animation
    this.background = this.add
      .sprite(halfGameWidth, this.game.config.height, "background")
      .setOrigin(0.5, 0.5);

    // Create the character
    this.character = new Player(
      this,
      this.game.config.width / 2,
      this.game.config.height - this.game.config.height / 8,
      40,
      90
    );

    this.npcs = [new NPC(this, 100, 100), new NPC(this, 200, 200)];

    // Create environment objects
    const worldWidth = this.physics.world.bounds.width;
    const worldHeight = this.physics.world.bounds.height;

    // Create main building
    this.buildings = [new Building(this, 70, 80)];

    // Create 10 randomly positioned trees
    this.trees = [];
    for (let i = 0; i < 10; i++) {
      let treeX = parseInt(Math.random() * worldWidth, 0);
      let treeY = parseInt(Math.random() * worldHeight, 0);
      this.trees.push(new Tree(this, treeX, treeY));
    }

    // Create 10 randomly positionedtree trunks
    this.treeTrunks = [];
    for (let i = 0; i < 20; i++) {
      let treeTrunkX = parseInt(Math.random() * worldWidth, 0);
      let treeTrunkY = parseInt(Math.random() * worldHeight, 0);
      this.treeTrunks.push(new TreeTrunk(this, treeTrunkX, treeTrunkY));
    }

    // Create 20 randomly positioned rocks
    this.rocks = [];
    for (let i = 0; i < 20; i++) {
      let rockX = parseInt(Math.random() * worldWidth, 0);
      let rockY = parseInt(Math.random() * worldHeight, 0);
      this.rocks.push(new Rock(this, rockX, rockY));
    }

    // Create 20 randomly positioned grass
    this.grass = [];
    for (let i = 0; i < 20; i++) {
      let grassX = parseInt(Math.random() * worldWidth, 0);
      let grassY = parseInt(Math.random() * worldHeight, 0);
      this.grass.push(new Grass(this, grassX, grassY));
    }

    this.camera = this.cameras.main;
    this.camera.setBounds(
      0,
      0,
      this.physics.world.bounds.width,
      this.physics.world.bounds.height
    );
    this.camera.startFollow(this.character, false, 0.05, 0.05);
  }

  update(time, delta) {}

  destroy() {
    clearTimeout(this.backgroundAnimInterval);
    super.destroy();
  }
}
