"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ToggleScanSplineEffect = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class ToggleScanSplineEffect {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, t) {
    this.bb_pos = e;
    this.bb = t;
    return this;
  }
  static getRootAsToggleScanSplineEffect(e, t) {
    return (t || new ToggleScanSplineEffect()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsToggleScanSplineEffect(e, t) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new ToggleScanSplineEffect()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  type(e) {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.__string(this.bb_pos + t, e);
    } else {
      return undefined;
    }
  }
  static startToggleScanSplineEffect(e) {
    e.startObject(1);
  }
  static addType(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static endToggleScanSplineEffect(e) {
    return e.endObject();
  }
  static createToggleScanSplineEffect(e, t) {
    ToggleScanSplineEffect.startToggleScanSplineEffect(e);
    ToggleScanSplineEffect.addType(e, t);
    return ToggleScanSplineEffect.endToggleScanSplineEffect(e);
  }
}
exports.ToggleScanSplineEffect = ToggleScanSplineEffect;
//# sourceMappingURL=toggle-scan-spline-effect.js.map