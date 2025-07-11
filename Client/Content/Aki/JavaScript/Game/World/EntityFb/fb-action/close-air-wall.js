"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CloseAirWall = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class CloseAirWall {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsCloseAirWall(t, e) {
    return (e || new CloseAirWall()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsCloseAirWall(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new CloseAirWall()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  static startCloseAirWall(t) {
    t.startObject(1);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static endCloseAirWall(t) {
    return t.endObject();
  }
  static createCloseAirWall(t, e) {
    CloseAirWall.startCloseAirWall(t);
    CloseAirWall.addType(t, e);
    return CloseAirWall.endCloseAirWall(t);
  }
}
exports.CloseAirWall = CloseAirWall;
//# sourceMappingURL=close-air-wall.js.map