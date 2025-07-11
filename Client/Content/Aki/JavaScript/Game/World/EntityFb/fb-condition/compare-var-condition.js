"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CompareVarCondition = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const union_var_ref_js_1 = require("../fb-var/union-var-ref.js");
class CompareVarCondition {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(r, t) {
    this.bb_pos = r;
    this.bb = t;
    return this;
  }
  static getRootAsCompareVarCondition(r, t) {
    return (t || new CompareVarCondition()).__init(r.readInt32(r.position()) + r.position(), r);
  }
  static getSizePrefixedRootAsCompareVarCondition(r, t) {
    r.setPosition(r.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new CompareVarCondition()).__init(r.readInt32(r.position()) + r.position(), r);
  }
  type(r) {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.__string(this.bb_pos + t, r);
    } else {
      return undefined;
    }
  }
  var1Type() {
    var r = this.bb.__offset(this.bb_pos, 6);
    if (r) {
      return this.bb.readUint8(this.bb_pos + r);
    } else {
      return union_var_ref_js_1.UnionVarRef.NONE;
    }
  }
  var1(r) {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return this.bb.__union(r, this.bb_pos + t);
    } else {
      return undefined;
    }
  }
  compare(r) {
    var t = this.bb.__offset(this.bb_pos, 10);
    if (t) {
      return this.bb.__string(this.bb_pos + t, r);
    } else {
      return undefined;
    }
  }
  var2Type() {
    var r = this.bb.__offset(this.bb_pos, 12);
    if (r) {
      return this.bb.readUint8(this.bb_pos + r);
    } else {
      return union_var_ref_js_1.UnionVarRef.NONE;
    }
  }
  var2(r) {
    var t = this.bb.__offset(this.bb_pos, 14);
    if (t) {
      return this.bb.__union(r, this.bb_pos + t);
    } else {
      return undefined;
    }
  }
  static startCompareVarCondition(r) {
    r.startObject(6);
  }
  static addType(r, t) {
    r.addFieldOffset(0, t, 0);
  }
  static addVar1Type(r, t) {
    r.addFieldInt8(1, t, union_var_ref_js_1.UnionVarRef.NONE);
  }
  static addVar1(r, t) {
    r.addFieldOffset(2, t, 0);
  }
  static addCompare(r, t) {
    r.addFieldOffset(3, t, 0);
  }
  static addVar2Type(r, t) {
    r.addFieldInt8(4, t, union_var_ref_js_1.UnionVarRef.NONE);
  }
  static addVar2(r, t) {
    r.addFieldOffset(5, t, 0);
  }
  static endCompareVarCondition(r) {
    return r.endObject();
  }
  static createCompareVarCondition(r, t, i, a, o, e, n) {
    CompareVarCondition.startCompareVarCondition(r);
    CompareVarCondition.addType(r, t);
    CompareVarCondition.addVar1Type(r, i);
    CompareVarCondition.addVar1(r, a);
    CompareVarCondition.addCompare(r, o);
    CompareVarCondition.addVar2Type(r, e);
    CompareVarCondition.addVar2(r, n);
    return CompareVarCondition.endCompareVarCondition(r);
  }
}
exports.CompareVarCondition = CompareVarCondition;
//# sourceMappingURL=compare-var-condition.js.map