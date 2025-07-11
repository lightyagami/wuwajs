"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SetTime = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const union_var_ref_js_1 = require("../fb-var/union-var-ref.js");
class SetTime {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsSetTime(t, e) {
    return (e || new SetTime()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsSetTime(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new SetTime()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
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
    var e = this.bb.__offset(this.bb_pos, 10);
    if (e) {
      return this.bb.__union(t, this.bb_pos + e);
    } else {
      return undefined;
    }
  }
  static startSetTime(t) {
    t.startObject(4);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addTime(t, e) {
    t.addFieldInt32(1, e, 0);
  }
  static addVarForTimeType(t, e) {
    t.addFieldInt8(2, e, union_var_ref_js_1.UnionVarRef.NONE);
  }
  static addVarForTime(t, e) {
    t.addFieldOffset(3, e, 0);
  }
  static endSetTime(t) {
    return t.endObject();
  }
  static createSetTime(t, e, i, r, s) {
    SetTime.startSetTime(t);
    SetTime.addType(t, e);
    SetTime.addTime(t, i);
    SetTime.addVarForTimeType(t, r);
    SetTime.addVarForTime(t, s);
    return SetTime.endSetTime(t);
  }
}
exports.SetTime = SetTime;
//# sourceMappingURL=set-time.js.map