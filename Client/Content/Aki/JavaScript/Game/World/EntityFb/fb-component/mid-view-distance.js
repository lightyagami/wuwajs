"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MidViewDistance = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class MidViewDistance {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(i, t) {
    this.bb_pos = i;
    this.bb = t;
    return this;
  }
  static getRootAsMidViewDistance(i, t) {
    return (t || new MidViewDistance()).__init(i.readInt32(i.position()) + i.position(), i);
  }
  static getSizePrefixedRootAsMidViewDistance(i, t) {
    i.setPosition(i.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new MidViewDistance()).__init(i.readInt32(i.position()) + i.position(), i);
  }
  type(i) {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.__string(this.bb_pos + t, i);
    } else {
      return undefined;
    }
  }
  static startMidViewDistance(i) {
    i.startObject(1);
  }
  static addType(i, t) {
    i.addFieldOffset(0, t, 0);
  }
  static endMidViewDistance(i) {
    return i.endObject();
  }
  static createMidViewDistance(i, t) {
    MidViewDistance.startMidViewDistance(i);
    MidViewDistance.addType(i, t);
    return MidViewDistance.endMidViewDistance(i);
  }
}
exports.MidViewDistance = MidViewDistance;
//# sourceMappingURL=mid-view-distance.js.map