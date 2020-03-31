import EnvironmentObject from "./EnvironmentObject.js";

export default class Building extends EnvironmentObject {
  constructor(scene, x, y) {
    super(scene, x, y, "building-outer", true, -10);
  }

  destroy() {
    super.destroy();
  }
}
