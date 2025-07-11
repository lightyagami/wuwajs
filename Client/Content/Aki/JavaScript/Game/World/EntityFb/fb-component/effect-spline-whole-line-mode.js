"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EffectSplineWholeLineMode = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class EffectSplineWholeLineMode {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, t) {
    this.bb_pos = e;
    this.bb = t;
    return this;
  }
  static getRootAsEffectSplineWholeLineMode(e, t) {
    return (t || new EffectSplineWholeLineMode()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsEffectSplineWholeLineMode(e, t) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new EffectSplineWholeLineMode()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  type(e) {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.__string(this.bb_pos + t, e);
    } else {
      return undefined;
    }
  }
  static startEffectSplineWholeLineMode(e) {
    e.startObject(1);
  }
  static addType(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static endEffectSplineWholeLineMode(e) {
    return e.endObject();
  }
  static createEffectSplineWholeLineMode(e, t) {
    EffectSplineWholeLineMode.startEffectSplineWholeLineMode(e);
    EffectSplineWholeLineMode.addType(e, t);
    return EffectSplineWholeLineMode.endEffectSplineWholeLineMode(e);
  }
}
exports.EffectSplineWholeLineMode = EffectSplineWholeLineMode;
//# sourceMappingURL=effect-spline-whole-line-mode.js.map