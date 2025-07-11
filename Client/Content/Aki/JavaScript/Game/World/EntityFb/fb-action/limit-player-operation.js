"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LimitPlayerOperation = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const union_limit_play_operation_js_1 = require("../fb-action/union-limit-play-operation.js");
class LimitPlayerOperation {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsLimitPlayerOperation(t, i) {
    return (i || new LimitPlayerOperation()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsLimitPlayerOperation(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new LimitPlayerOperation()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  typeType() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return union_limit_play_operation_js_1.UnionLimitPlayOperation.NONE;
    }
  }
  type(t) {
    var i = this.bb.__offset(this.bb_pos, 6);
    if (i) {
      return this.bb.__union(t, this.bb_pos + i);
    } else {
      return undefined;
    }
  }
  static startLimitPlayerOperation(t) {
    t.startObject(2);
  }
  static addTypeType(t, i) {
    t.addFieldInt8(0, i, union_limit_play_operation_js_1.UnionLimitPlayOperation.NONE);
  }
  static addType(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static endLimitPlayerOperation(t) {
    return t.endObject();
  }
  static createLimitPlayerOperation(t, i, e) {
    LimitPlayerOperation.startLimitPlayerOperation(t);
    LimitPlayerOperation.addTypeType(t, i);
    LimitPlayerOperation.addType(t, e);
    return LimitPlayerOperation.endLimitPlayerOperation(t);
  }
}
exports.LimitPlayerOperation = LimitPlayerOperation;
//# sourceMappingURL=limit-player-operation.js.map