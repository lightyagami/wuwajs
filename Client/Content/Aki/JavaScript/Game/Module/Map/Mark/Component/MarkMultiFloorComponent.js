"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MarkMultiFloorComponent = undefined;
const MapComponent_1 = require("../../Base/MapComponent");
class MarkMultiFloorComponent extends MapComponent_1.MapComponent {
  get ComponentType() {
    return 17;
  }
  set IsSelectThisFloor(e) {
    this.PropertyMap.set(0, e);
  }
  get IsSelectThisFloor() {
    return this.PropertyMap.tryGet(0, false);
  }
}
exports.MarkMultiFloorComponent = MarkMultiFloorComponent;
//# sourceMappingURL=MarkMultiFloorComponent.js.map