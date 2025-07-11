"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DoCalculate = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const union_var_js_1 = require("../fb-action/union-var.js");
class DoCalculate {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, a) {
    this.bb_pos = t;
    this.bb = a;
    return this;
  }
  static getRootAsDoCalculate(t, a) {
    return (a || new DoCalculate()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsDoCalculate(t, a) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (a || new DoCalculate()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  var1Type() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return union_var_js_1.UnionVar.NONE;
    }
  }
  var1(t) {
    var a = this.bb.__offset(this.bb_pos, 6);
    if (a) {
      return this.bb.__union(t, this.bb_pos + a);
    } else {
      return undefined;
    }
  }
  op(t) {
    var a = this.bb.__offset(this.bb_pos, 8);
    if (a) {
      return this.bb.__string(this.bb_pos + a, t);
    } else {
      return undefined;
    }
  }
  var2Type() {
    var t = this.bb.__offset(this.bb_pos, 10);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return union_var_js_1.UnionVar.NONE;
    }
  }
  var2(t) {
    var a = this.bb.__offset(this.bb_pos, 12);
    if (a) {
      return this.bb.__union(t, this.bb_pos + a);
    } else {
      return undefined;
    }
  }
  result(t) {
    var a = this.bb.__offset(this.bb_pos, 14);
    if (a) {
      return this.bb.__string(this.bb_pos + a, t);
    } else {
      return undefined;
    }
  }
  static startDoCalculate(t) {
    t.startObject(6);
  }
  static addVar1Type(t, a) {
    t.addFieldInt8(0, a, union_var_js_1.UnionVar.NONE);
  }
  static addVar1(t, a) {
    t.addFieldOffset(1, a, 0);
  }
  static addOp(t, a) {
    t.addFieldOffset(2, a, 0);
  }
  static addVar2Type(t, a) {
    t.addFieldInt8(3, a, union_var_js_1.UnionVar.NONE);
  }
  static addVar2(t, a) {
    t.addFieldOffset(4, a, 0);
  }
  static addResult(t, a) {
    t.addFieldOffset(5, a, 0);
  }
  static endDoCalculate(t) {
    return t.endObject();
  }
  static createDoCalculate(t, a, s, i, e, r, u) {
    DoCalculate.startDoCalculate(t);
    DoCalculate.addVar1Type(t, a);
    DoCalculate.addVar1(t, s);
    DoCalculate.addOp(t, i);
    DoCalculate.addVar2Type(t, e);
    DoCalculate.addVar2(t, r);
    DoCalculate.addResult(t, u);
    return DoCalculate.endDoCalculate(t);
  }
}
exports.DoCalculate = DoCalculate;
//# sourceMappingURL=do-calculate.js.map