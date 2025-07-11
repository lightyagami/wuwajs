"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AddTime = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const union_var_ref_js_1 = require("../fb-var/union-var-ref.js");
class AddTime {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsAddTime(t, i) {
    return (i || new AddTime()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsAddTime(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new AddTime()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    if (i) {
      return this.bb.__string(this.bb_pos + i, t);
    } else {
      return undefined;
    }
  }
  time() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  varForTimeType() {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return union_var_ref_js_1.UnionVarRef.NONE;
    }
  }
  varForTime(t) {
    var i = this.bb.__offset(this.bb_pos, 10);
    if (i) {
      return this.bb.__union(t, this.bb_pos + i);
    } else {
      return undefined;
    }
  }
  static startAddTime(t) {
    t.startObject(4);
  }
  static addType(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addTime(t, i) {
    t.addFieldInt32(1, i, 0);
  }
  static addVarForTimeType(t, i) {
    t.addFieldInt8(2, i, union_var_ref_js_1.UnionVarRef.NONE);
  }
  static addVarForTime(t, i) {
    t.addFieldOffset(3, i, 0);
  }
  static endAddTime(t) {
    return t.endObject();
  }
  static createAddTime(t, i, e, r, s) {
    AddTime.startAddTime(t);
    AddTime.addType(t, i);
    AddTime.addTime(t, e);
    AddTime.addVarForTimeType(t, r);
    AddTime.addVarForTime(t, s);
    return AddTime.endAddTime(t);
  }
}
exports.AddTime = AddTime;
//# sourceMappingURL=add-time.js.map