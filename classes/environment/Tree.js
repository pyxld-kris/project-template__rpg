import EnvironmentObject from "./EnvironmentObject.js";

export default class Tree extends EnvironmentObject {
  constructor(scene, x, y) {
    super(scene, x, y, "tree", true);
  }

  destroy() {
    super.destroy();
  }
}
