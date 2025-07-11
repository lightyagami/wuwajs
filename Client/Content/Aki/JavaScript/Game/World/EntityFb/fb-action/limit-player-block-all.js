"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LimitPlayerBlockAll = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class LimitPlayerBlockAll {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, l) {
    this.bb_pos = t;
    this.bb = l;
    return this;
  }
  static getRootAsLimitPlayerBlockAll(t, l) {
    return (l || new LimitPlayerBlockAll()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsLimitPlayerBlockAll(t, l) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (l || new LimitPlayerBlockAll()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var l = this.bb.__offset(this.bb_pos, 4);
    if (l) {
      return this.bb.__string(this.bb_pos + l, t);
    } else {
      return undefined;
    }
  }
  static startLimitPlayerBlockAll(t) {
    t.startObject(1);
  }
  static addType(t, l) {
    t.addFieldOffset(0, l, 0);
  }
  static endLimitPlayerBlockAll(t) {
    return t.endObject();
  }
  static createLimitPlayerBlockAll(t, l) {
    LimitPlayerBlockAll.startLimitPlayerBlockAll(t);
    LimitPlayerBlockAll.addType(t, l);
    return LimitPlayerBlockAll.endLimitPlayerBlockAll(t);
  }
}
exports.LimitPlayerBlockAll = LimitPlayerBlockAll;
//# sourceMappingURL=limit-player-block-all.js.map