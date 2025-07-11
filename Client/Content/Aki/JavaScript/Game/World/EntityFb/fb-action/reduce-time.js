"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ReduceTime = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const union_var_ref_js_1 = require("../fb-var/union-var-ref.js");
class ReduceTime {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, t) {
    this.bb_pos = e;
    this.bb = t;
    return this;
  }
  static getRootAsReduceTime(e, t) {
    return (t || new ReduceTime()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsReduceTime(e, t) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new ReduceTime()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  type(e) {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.__string(this.bb_pos + t, e);
    } else {
      return undefined;
    }
  }
  time() {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return this.bb.readInt32(this.bb_pos + e);
    } else {
      return 0;
    }
  }
  varForTimeType() {
    var e = this.bb.__offset(this.bb_pos, 8);
    if (e) {
      return this.bb.readUint8(this.bb_pos + e);
    } else {
      return union_var_ref_js_1.UnionVarRef.NONE;
    }
  }
  varForTime(e) {
    var t = this.bb.__offset(this.bb_pos, 10);
    if (t) {
      return this.bb.__union(e, this.bb_pos + t);
    } else {
      return undefined;
    }
  }
  static startReduceTime(e) {
    e.startObject(4);
  }
  static addType(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static addTime(e, t) {
    e.addFieldInt32(1, t, 0);
  }
  static addVarForTimeType(e, t) {
    e.addFieldInt8(2, t, union_var_ref_js_1.UnionVarRef.NONE);
  }
  static addVarForTime(e, t) {
    e.addFieldOffset(3, t, 0);
  }
  static endReduceTime(e) {
    return e.endObject();
  }
  static createReduceTime(e, t, i, r, s) {
    ReduceTime.startReduceTime(e);
    ReduceTime.addType(e, t);
    ReduceTime.addTime(e, i);
    ReduceTime.addVarForTimeType(e, r);
    ReduceTime.addVarForTime(e, s);
    return ReduceTime.endReduceTime(e);
  }
}
exports.ReduceTime = ReduceTime;
//# sourceMappingURL=reduce-time.js.map