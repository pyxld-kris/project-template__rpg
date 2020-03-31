import EnvironmentObject from "./EnvironmentObject.js";

export default class Rock extends EnvironmentObject {
  constructor(scene, x, y) {
    super(scene, x, y, "rock", false);
  }

  destroy() {
    super.destroy();
  }
}
