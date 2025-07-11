"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SetNumberVar = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const union_var_js_1 = require("../fb-action/union-var.js");
class SetNumberVar {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsSetNumberVar(t, e) {
    return (e || new SetNumberVar()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsSetNumberVar(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new SetNumberVar()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  name(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  valueType() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return union_var_js_1.UnionVar.NONE;
    }
  }
  value(t) {
    var e = this.bb.__offset(this.bb_pos, 8);
    if (e) {
      return this.bb.__union(t, this.bb_pos + e);
    } else {
      return undefined;
    }
  }
  static startSetNumberVar(t) {
    t.startObject(3);
  }
  static addName(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addValueType(t, e) {
    t.addFieldInt8(1, e, union_var_js_1.UnionVar.NONE);
  }
  static addValue(t, e) {
    t.addFieldOffset(2, e, 0);
  }
  static endSetNumberVar(t) {
    return t.endObject();
  }
  static createSetNumberVar(t, e, r, a) {
    SetNumberVar.startSetNumberVar(t);
    SetNumberVar.addName(t, e);
    SetNumberVar.addValueType(t, r);
    SetNumberVar.addValue(t, a);
    return SetNumberVar.endSetNumberVar(t);
  }
}
exports.SetNumberVar = SetNumberVar;
//# sourceMappingURL=set-number-var.js.map