"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LowViewDistance = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class LowViewDistance {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsLowViewDistance(t, e) {
    return (e || new LowViewDistance()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsLowViewDistance(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new LowViewDistance()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  static startLowViewDistance(t) {
    t.startObject(1);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static endLowViewDistance(t) {
    return t.endObject();
  }
  static createLowViewDistance(t, e) {
    LowViewDistance.startLowViewDistance(t);
    LowViewDistance.addType(t, e);
    return LowViewDistance.endLowViewDistance(t);
  }
}
exports.LowViewDistance = LowViewDistance;
//# sourceMappingURL=low-view-distance.js.map