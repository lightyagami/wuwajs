"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EffectSplineEquidistantPointMode = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class EffectSplineEquidistantPointMode {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsEffectSplineEquidistantPointMode(t, i) {
    return (i || new EffectSplineEquidistantPointMode()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsEffectSplineEquidistantPointMode(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new EffectSplineEquidistantPointMode()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    if (i) {
      return this.bb.__string(this.bb_pos + i, t);
    } else {
      return undefined;
    }
  }
  space() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startEffectSplineEquidistantPointMode(t) {
    t.startObject(2);
  }
  static addType(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addSpace(t, i) {
    t.addFieldInt32(1, i, 0);
  }
  static endEffectSplineEquidistantPointMode(t) {
    return t.endObject();
  }
  static createEffectSplineEquidistantPointMode(t, i, e) {
    EffectSplineEquidistantPointMode.startEffectSplineEquidistantPointMode(t);
    EffectSplineEquidistantPointMode.addType(t, i);
    EffectSplineEquidistantPointMode.addSpace(t, e);
    return EffectSplineEquidistantPointMode.endEffectSplineEquidistantPointMode(t);
  }
}
exports.EffectSplineEquidistantPointMode = EffectSplineEquidistantPointMode;
//# sourceMappingURL=effect-spline-equidistant-point-mode.js.map