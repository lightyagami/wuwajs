"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConstVarRef = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const union_var_config_js_1 = require("../fb-var/union-var-config.js");
class ConstVarRef {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, s) {
    this.bb_pos = t;
    this.bb = s;
    return this;
  }
  static getRootAsConstVarRef(t, s) {
    return (s || new ConstVarRef()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsConstVarRef(t, s) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (s || new ConstVarRef()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var s = this.bb.__offset(this.bb_pos, 4);
    if (s) {
      return this.bb.__string(this.bb_pos + s, t);
    } else {
      return undefined;
    }
  }
  source(t) {
    var s = this.bb.__offset(this.bb_pos, 6);
    if (s) {
      return this.bb.__string(this.bb_pos + s, t);
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
    var s = this.bb.__offset(this.bb_pos, 10);
    if (s) {
      return this.bb.__union(t, this.bb_pos + s);
    } else {
      return undefined;
    }
  }
  static startConstVarRef(t) {
    t.startObject(4);
  }
  static addType(t, s) {
    t.addFieldOffset(0, s, 0);
  }
  static addSource(t, s) {
    t.addFieldOffset(1, s, 0);
  }
  static addValueType(t, s) {
    t.addFieldInt8(2, s, union_var_config_js_1.UnionVarConfig.NONE);
  }
  static addValue(t, s) {
    t.addFieldOffset(3, s, 0);
  }
  static endConstVarRef(t) {
    return t.endObject();
  }
  static createConstVarRef(t, s, e, r, i) {
    ConstVarRef.startConstVarRef(t);
    ConstVarRef.addType(t, s);
    ConstVarRef.addSource(t, e);
    ConstVarRef.addValueType(t, r);
    ConstVarRef.addValue(t, i);
    return ConstVarRef.endConstVarRef(t);
  }
}
exports.ConstVarRef = ConstVarRef;
//# sourceMappingURL=const-var-ref.js.map