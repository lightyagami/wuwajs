"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LimitPlayerMove = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class LimitPlayerMove {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsLimitPlayerMove(t, e) {
    return (e || new LimitPlayerMove()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsLimitPlayerMove(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new LimitPlayerMove()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  isOnlyForward() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  static startLimitPlayerMove(t) {
    t.startObject(2);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addIsOnlyForward(t, e) {
    t.addFieldInt8(1, +e, 0);
  }
  static endLimitPlayerMove(t) {
    return t.endObject();
  }
  static createLimitPlayerMove(t, e, i) {
    LimitPlayerMove.startLimitPlayerMove(t);
    LimitPlayerMove.addType(t, e);
    LimitPlayerMove.addIsOnlyForward(t, i);
    return LimitPlayerMove.endLimitPlayerMove(t);
  }
}
exports.LimitPlayerMove = LimitPlayerMove;
//# sourceMappingURL=limit-player-move.js.map