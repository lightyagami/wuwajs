"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BvbWaitForGameBeginData = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class BvbWaitForGameBeginData {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, a) {
    this.bb_pos = t;
    this.bb = a;
    return this;
  }
  static getRootAsBvbWaitForGameBeginData(t, a) {
    return (a || new BvbWaitForGameBeginData()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsBvbWaitForGameBeginData(t, a) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (a || new BvbWaitForGameBeginData()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var a = this.bb.__offset(this.bb_pos, 4);
    if (a) {
      return this.bb.__string(this.bb_pos + a, t);
    } else {
      return undefined;
    }
  }
  static startBvbWaitForGameBeginData(t) {
    t.startObject(1);
  }
  static addType(t, a) {
    t.addFieldOffset(0, a, 0);
  }
  static endBvbWaitForGameBeginData(t) {
    return t.endObject();
  }
  static createBvbWaitForGameBeginData(t, a) {
    BvbWaitForGameBeginData.startBvbWaitForGameBeginData(t);
    BvbWaitForGameBeginData.addType(t, a);
    return BvbWaitForGameBeginData.endBvbWaitForGameBeginData(t);
  }
}
exports.BvbWaitForGameBeginData = BvbWaitForGameBeginData;
//# sourceMappingURL=bvb-wait-for-game-begin-data.js.map