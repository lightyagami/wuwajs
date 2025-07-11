"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DestroyPrefab = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const union_var_ref_js_1 = require("../fb-var/union-var-ref.js");
class DestroyPrefab {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(r, e) {
    this.bb_pos = r;
    this.bb = e;
    return this;
  }
  static getRootAsDestroyPrefab(r, e) {
    return (e || new DestroyPrefab()).__init(r.readInt32(r.position()) + r.position(), r);
  }
  static getSizePrefixedRootAsDestroyPrefab(r, e) {
    r.setPosition(r.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new DestroyPrefab()).__init(r.readInt32(r.position()) + r.position(), r);
  }
  varNameType() {
    var r = this.bb.__offset(this.bb_pos, 4);
    if (r) {
      return this.bb.readUint8(this.bb_pos + r);
    } else {
      return union_var_ref_js_1.UnionVarRef.NONE;
    }
  }
  varName(r) {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return this.bb.__union(r, this.bb_pos + e);
    } else {
      return undefined;
    }
  }
  static startDestroyPrefab(r) {
    r.startObject(2);
  }
  static addVarNameType(r, e) {
    r.addFieldInt8(0, e, union_var_ref_js_1.UnionVarRef.NONE);
  }
  static addVarName(r, e) {
    r.addFieldOffset(1, e, 0);
  }
  static endDestroyPrefab(r) {
    return r.endObject();
  }
  static createDestroyPrefab(r, e, t) {
    DestroyPrefab.startDestroyPrefab(r);
    DestroyPrefab.addVarNameType(r, e);
    DestroyPrefab.addVarName(r, t);
    return DestroyPrefab.endDestroyPrefab(r);
  }
}
exports.DestroyPrefab = DestroyPrefab;
//# sourceMappingURL=destroy-prefab.js.map