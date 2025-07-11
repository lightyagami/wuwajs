"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CheckSystemFunction = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class CheckSystemFunction {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsCheckSystemFunction(t, e) {
    return (e || new CheckSystemFunction()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsCheckSystemFunction(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new CheckSystemFunction()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  systemId() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  compare(t) {
    var e = this.bb.__offset(this.bb_pos, 8);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  static startCheckSystemFunction(t) {
    t.startObject(3);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addSystemId(t, e) {
    t.addFieldInt32(1, e, 0);
  }
  static addCompare(t, e) {
    t.addFieldOffset(2, e, 0);
  }
  static endCheckSystemFunction(t) {
    return t.endObject();
  }
  static createCheckSystemFunction(t, e, s, i) {
    CheckSystemFunction.startCheckSystemFunction(t);
    CheckSystemFunction.addType(t, e);
    CheckSystemFunction.addSystemId(t, s);
    CheckSystemFunction.addCompare(t, i);
    return CheckSystemFunction.endCheckSystemFunction(t);
  }
}
exports.CheckSystemFunction = CheckSystemFunction;
//# sourceMappingURL=check-system-function.js.map