"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CompareVar = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const union_var_ref_js_1 = require("../fb-var/union-var-ref.js");
class CompareVar {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(r, t) {
    this.bb_pos = r;
    this.bb = t;
    return this;
  }
  static getRootAsCompareVar(r, t) {
    return (t || new CompareVar()).__init(r.readInt32(r.position()) + r.position(), r);
  }
  static getSizePrefixedRootAsCompareVar(r, t) {
    r.setPosition(r.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new CompareVar()).__init(r.readInt32(r.position()) + r.position(), r);
  }
  type(r) {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.__string(this.bb_pos + t, r);
    } else {
      return undefined;
    }
  }
  compare(r) {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.__string(this.bb_pos + t, r);
    } else {
      return undefined;
    }
  }
  var1Type() {
    var r = this.bb.__offset(this.bb_pos, 8);
    if (r) {
      return this.bb.readUint8(this.bb_pos + r);
    } else {
      return union_var_ref_js_1.UnionVarRef.NONE;
    }
  }
  var1(r) {
    var t = this.bb.__offset(this.bb_pos, 10);
    if (t) {
      return this.bb.__union(r, this.bb_pos + t);
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
  static startCompareVar(r) {
    r.startObject(6);
  }
  static addType(r, t) {
    r.addFieldOffset(0, t, 0);
  }
  static addCompare(r, t) {
    r.addFieldOffset(1, t, 0);
  }
  static addVar1Type(r, t) {
    r.addFieldInt8(2, t, union_var_ref_js_1.UnionVarRef.NONE);
  }
  static addVar1(r, t) {
    r.addFieldOffset(3, t, 0);
  }
  static addVar2Type(r, t) {
    r.addFieldInt8(4, t, union_var_ref_js_1.UnionVarRef.NONE);
  }
  static addVar2(r, t) {
    r.addFieldOffset(5, t, 0);
  }
  static endCompareVar(r) {
    return r.endObject();
  }
  static createCompareVar(r, t, a, e, s, i, o) {
    CompareVar.startCompareVar(r);
    CompareVar.addType(r, t);
    CompareVar.addCompare(r, a);
    CompareVar.addVar1Type(r, e);
    CompareVar.addVar1(r, s);
    CompareVar.addVar2Type(r, i);
    CompareVar.addVar2(r, o);
    return CompareVar.endCompareVar(r);
  }
}
exports.CompareVar = CompareVar;
//# sourceMappingURL=compare-var.js.map