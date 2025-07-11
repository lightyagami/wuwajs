"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Condition = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const union_var_js_1 = require("../fb-action/union-var.js");
class Condition {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsCondition(t, i) {
    return (i || new Condition()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsCondition(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new Condition()).__init(t.readInt32(t.position()) + t.position(), t);
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
    var i = this.bb.__offset(this.bb_pos, 6);
    if (i) {
      return this.bb.__union(t, this.bb_pos + i);
    } else {
      return undefined;
    }
  }
  var2Type() {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return union_var_js_1.UnionVar.NONE;
    }
  }
  var2(t) {
    var i = this.bb.__offset(this.bb_pos, 10);
    if (i) {
      return this.bb.__union(t, this.bb_pos + i);
    } else {
      return undefined;
    }
  }
  compare(t) {
    var i = this.bb.__offset(this.bb_pos, 12);
    if (i) {
      return this.bb.__string(this.bb_pos + i, t);
    } else {
      return undefined;
    }
  }
  static startCondition(t) {
    t.startObject(5);
  }
  static addVar1Type(t, i) {
    t.addFieldInt8(0, i, union_var_js_1.UnionVar.NONE);
  }
  static addVar1(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static addVar2Type(t, i) {
    t.addFieldInt8(2, i, union_var_js_1.UnionVar.NONE);
  }
  static addVar2(t, i) {
    t.addFieldOffset(3, i, 0);
  }
  static addCompare(t, i) {
    t.addFieldOffset(4, i, 0);
  }
  static endCondition(t) {
    return t.endObject();
  }
  static createCondition(t, i, n, s, r, o) {
    Condition.startCondition(t);
    Condition.addVar1Type(t, i);
    Condition.addVar1(t, n);
    Condition.addVar2Type(t, s);
    Condition.addVar2(t, r);
    Condition.addCompare(t, o);
    return Condition.endCondition(t);
  }
}
exports.Condition = Condition;
//# sourceMappingURL=condition.js.map