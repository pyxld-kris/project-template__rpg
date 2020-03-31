import EnvironmentObject from "./EnvironmentObject.js";

export default class TreeTrunk extends EnvironmentObject {
  constructor(scene, x, y) {
    super(scene, x, y, "tree-trunk", true);
  }

  destroy() {
    super.destroy();
  }
}
