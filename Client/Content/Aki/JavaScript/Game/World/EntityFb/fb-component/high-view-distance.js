"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HighViewDistance = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class HighViewDistance {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(i, t) {
    this.bb_pos = i;
    this.bb = t;
    return this;
  }
  static getRootAsHighViewDistance(i, t) {
    return (t || new HighViewDistance()).__init(i.readInt32(i.position()) + i.position(), i);
  }
  static getSizePrefixedRootAsHighViewDistance(i, t) {
    i.setPosition(i.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new HighViewDistance()).__init(i.readInt32(i.position()) + i.position(), i);
  }
  type(i) {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.__string(this.bb_pos + t, i);
    } else {
      return undefined;
    }
  }
  static startHighViewDistance(i) {
    i.startObject(1);
  }
  static addType(i, t) {
    i.addFieldOffset(0, t, 0);
  }
  static endHighViewDistance(i) {
    return i.endObject();
  }
  static createHighViewDistance(i, t) {
    HighViewDistance.startHighViewDistance(i);
    HighViewDistance.addType(i, t);
    return HighViewDistance.endHighViewDistance(i);
  }
}
exports.HighViewDistance = HighViewDistance;
//# sourceMappingURL=high-view-distance.js.map