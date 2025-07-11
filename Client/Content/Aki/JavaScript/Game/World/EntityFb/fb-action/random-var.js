"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RandomVar = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const union_var_ref_js_1 = require("../fb-var/union-var-ref.js");
class RandomVar {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, r) {
    this.bb_pos = t;
    this.bb = r;
    return this;
  }
  static getRootAsRandomVar(t, r) {
    return (r || new RandomVar()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsRandomVar(t, r) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (r || new RandomVar()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  leftVarType() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return union_var_ref_js_1.UnionVarRef.NONE;
    }
  }
  leftVar(t) {
    var r = this.bb.__offset(this.bb_pos, 6);
    if (r) {
      return this.bb.__union(t, this.bb_pos + r);
    } else {
      return undefined;
    }
  }
  rightVarType() {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return union_var_ref_js_1.UnionVarRef.NONE;
    }
  }
  rightVar(t) {
    var r = this.bb.__offset(this.bb_pos, 10);
    if (r) {
      return this.bb.__union(t, this.bb_pos + r);
    } else {
      return undefined;
    }
  }
  resultType() {
    var t = this.bb.__offset(this.bb_pos, 12);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return union_var_ref_js_1.UnionVarRef.NONE;
    }
  }
  result(t) {
    var r = this.bb.__offset(this.bb_pos, 14);
    if (r) {
      return this.bb.__union(t, this.bb_pos + r);
    } else {
      return undefined;
    }
  }
  static startRandomVar(t) {
    t.startObject(6);
  }
  static addLeftVarType(t, r) {
    t.addFieldInt8(0, r, union_var_ref_js_1.UnionVarRef.NONE);
  }
  static addLeftVar(t, r) {
    t.addFieldOffset(1, r, 0);
  }
  static addRightVarType(t, r) {
    t.addFieldInt8(2, r, union_var_ref_js_1.UnionVarRef.NONE);
  }
  static addRightVar(t, r) {
    t.addFieldOffset(3, r, 0);
  }
  static addResultType(t, r) {
    t.addFieldInt8(4, r, union_var_ref_js_1.UnionVarRef.NONE);
  }
  static addResult(t, r) {
    t.addFieldOffset(5, r, 0);
  }
  static endRandomVar(t) {
    return t.endObject();
  }
  static createRandomVar(t, r, a, s, i, e, n) {
    RandomVar.startRandomVar(t);
    RandomVar.addLeftVarType(t, r);
    RandomVar.addLeftVar(t, a);
    RandomVar.addRightVarType(t, s);
    RandomVar.addRightVar(t, i);
    RandomVar.addResultType(t, e);
    RandomVar.addResult(t, n);
    return RandomVar.endRandomVar(t);
  }
}
exports.RandomVar = RandomVar;
//# sourceMappingURL=random-var.js.map