"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AllPlayerType = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class AllPlayerType {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, t) {
    this.bb_pos = e;
    this.bb = t;
    return this;
  }
  static getRootAsAllPlayerType(e, t) {
    return (t || new AllPlayerType()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsAllPlayerType(e, t) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new AllPlayerType()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  type(e) {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.__string(this.bb_pos + t, e);
    } else {
      return undefined;
    }
  }
  static startAllPlayerType(e) {
    e.startObject(1);
  }
  static addType(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static endAllPlayerType(e) {
    return e.endObject();
  }
  static createAllPlayerType(e, t) {
    AllPlayerType.startAllPlayerType(e);
    AllPlayerType.addType(e, t);
    return AllPlayerType.endAllPlayerType(e);
  }
}
exports.AllPlayerType = AllPlayerType;
//# sourceMappingURL=all-player-type.js.map