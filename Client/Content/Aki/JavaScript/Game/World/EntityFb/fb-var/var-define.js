"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VarDefine = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const union_var_config_js_1 = require("../fb-var/union-var-config.js");
class VarDefine {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsVarDefine(t, e) {
    return (e || new VarDefine()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsVarDefine(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new VarDefine()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  name(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  valueType() {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return union_var_config_js_1.UnionVarConfig.NONE;
    }
  }
  value(t) {
    var e = this.bb.__offset(this.bb_pos, 10);
    if (e) {
      return this.bb.__union(t, this.bb_pos + e);
    } else {
      return undefined;
    }
  }
  access() {
    var t = this.bb.__offset(this.bb_pos, 12);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  isIgnoreOnRollBack() {
    var t = this.bb.__offset(this.bb_pos, 14);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  isClient() {
    var t = this.bb.__offset(this.bb_pos, 16);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  static startVarDefine(t) {
    t.startObject(7);
  }
  static addName(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addType(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static addValueType(t, e) {
    t.addFieldInt8(2, e, union_var_config_js_1.UnionVarConfig.NONE);
  }
  static addValue(t, e) {
    t.addFieldOffset(3, e, 0);
  }
  static addAccess(t, e) {
    t.addFieldInt8(4, e, 0);
  }
  static addIsIgnoreOnRollBack(t, e) {
    t.addFieldInt8(5, +e, 0);
  }
  static addIsClient(t, e) {
    t.addFieldInt8(6, +e, 0);
  }
  static endVarDefine(t) {
    return t.endObject();
  }
  static createVarDefine(t, e, i, s, r, a, n, f) {
    VarDefine.startVarDefine(t);
    VarDefine.addName(t, e);
    VarDefine.addType(t, i);
    VarDefine.addValueType(t, s);
    VarDefine.addValue(t, r);
    VarDefine.addAccess(t, a);
    VarDefine.addIsIgnoreOnRollBack(t, n);
    VarDefine.addIsClient(t, f);
    return VarDefine.endVarDefine(t);
  }
}
exports.VarDefine = VarDefine;
//# sourceMappingURL=var-define.js.map