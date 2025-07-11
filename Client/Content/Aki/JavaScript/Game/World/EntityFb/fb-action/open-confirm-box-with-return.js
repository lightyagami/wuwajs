"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OpenConfirmBoxWithReturn = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const union_var_ref_js_1 = require("../fb-var/union-var-ref.js");
class OpenConfirmBoxWithReturn {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, r) {
    this.bb_pos = t;
    this.bb = r;
    return this;
  }
  static getRootAsOpenConfirmBoxWithReturn(t, r) {
    return (r || new OpenConfirmBoxWithReturn()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsOpenConfirmBoxWithReturn(t, r) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (r || new OpenConfirmBoxWithReturn()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var r = this.bb.__offset(this.bb_pos, 4);
    if (r) {
      return this.bb.__string(this.bb_pos + r, t);
    } else {
      return undefined;
    }
  }
  id() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  returnVarType() {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return union_var_ref_js_1.UnionVarRef.NONE;
    }
  }
  returnVar(t) {
    var r = this.bb.__offset(this.bb_pos, 10);
    if (r) {
      return this.bb.__union(t, this.bb_pos + r);
    } else {
      return undefined;
    }
  }
  static startOpenConfirmBoxWithReturn(t) {
    t.startObject(4);
  }
  static addType(t, r) {
    t.addFieldOffset(0, r, 0);
  }
  static addId(t, r) {
    t.addFieldInt32(1, r, 0);
  }
  static addReturnVarType(t, r) {
    t.addFieldInt8(2, r, union_var_ref_js_1.UnionVarRef.NONE);
  }
  static addReturnVar(t, r) {
    t.addFieldOffset(3, r, 0);
  }
  static endOpenConfirmBoxWithReturn(t) {
    return t.endObject();
  }
  static createOpenConfirmBoxWithReturn(t, r, e, i, n) {
    OpenConfirmBoxWithReturn.startOpenConfirmBoxWithReturn(t);
    OpenConfirmBoxWithReturn.addType(t, r);
    OpenConfirmBoxWithReturn.addId(t, e);
    OpenConfirmBoxWithReturn.addReturnVarType(t, i);
    OpenConfirmBoxWithReturn.addReturnVar(t, n);
    return OpenConfirmBoxWithReturn.endOpenConfirmBoxWithReturn(t);
  }
}
exports.OpenConfirmBoxWithReturn = OpenConfirmBoxWithReturn;
//# sourceMappingURL=open-confirm-box-with-return.js.map