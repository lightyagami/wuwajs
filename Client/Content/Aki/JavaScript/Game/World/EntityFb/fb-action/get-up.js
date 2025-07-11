"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GetUp = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class GetUp {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsGetUp(t, e) {
    return (e || new GetUp()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsGetUp(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new GetUp()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  static startGetUp(t) {
    t.startObject(1);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static endGetUp(t) {
    return t.endObject();
  }
  static createGetUp(t, e) {
    GetUp.startGetUp(t);
    GetUp.addType(t, e);
    return GetUp.endGetUp(t);
  }
}
exports.GetUp = GetUp;
//# sourceMappingURL=get-up.js.map