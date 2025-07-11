"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LifePointCenterComponent = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class LifePointCenterComponent {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsLifePointCenterComponent(t, e) {
    return (e || new LifePointCenterComponent()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsLifePointCenterComponent(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new LifePointCenterComponent()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  disabled() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  static startLifePointCenterComponent(t) {
    t.startObject(1);
  }
  static addDisabled(t, e) {
    t.addFieldInt8(0, +e, 0);
  }
  static endLifePointCenterComponent(t) {
    return t.endObject();
  }
  static createLifePointCenterComponent(t, e) {
    LifePointCenterComponent.startLifePointCenterComponent(t);
    LifePointCenterComponent.addDisabled(t, e);
    return LifePointCenterComponent.endLifePointCenterComponent(t);
  }
}
exports.LifePointCenterComponent = LifePointCenterComponent;
//# sourceMappingURL=life-point-center-component.js.map