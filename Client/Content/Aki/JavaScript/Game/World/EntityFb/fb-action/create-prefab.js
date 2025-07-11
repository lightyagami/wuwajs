"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreatePrefab = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const union_prefab_config_js_1 = require("../fb-action/union-prefab-config.js");
const union_var_ref_js_1 = require("../fb-var/union-var-ref.js");
class CreatePrefab {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, t) {
    this.bb_pos = e;
    this.bb = t;
    return this;
  }
  static getRootAsCreatePrefab(e, t) {
    return (t || new CreatePrefab()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsCreatePrefab(e, t) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new CreatePrefab()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  posEntityId() {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.readInt32(this.bb_pos + e);
    } else {
      return 0;
    }
  }
  configType() {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return this.bb.readUint8(this.bb_pos + e);
    } else {
      return union_prefab_config_js_1.UnionPrefabConfig.NONE;
    }
  }
  config(e) {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return this.bb.__union(e, this.bb_pos + t);
    } else {
      return undefined;
    }
  }
  varNameType() {
    var e = this.bb.__offset(this.bb_pos, 10);
    if (e) {
      return this.bb.readUint8(this.bb_pos + e);
    } else {
      return union_var_ref_js_1.UnionVarRef.NONE;
    }
  }
  varName(e) {
    var t = this.bb.__offset(this.bb_pos, 12);
    if (t) {
      return this.bb.__union(e, this.bb_pos + t);
    } else {
      return undefined;
    }
  }
  static startCreatePrefab(e) {
    e.startObject(5);
  }
  static addPosEntityId(e, t) {
    e.addFieldInt32(0, t, 0);
  }
  static addConfigType(e, t) {
    e.addFieldInt8(1, t, union_prefab_config_js_1.UnionPrefabConfig.NONE);
  }
  static addConfig(e, t) {
    e.addFieldOffset(2, t, 0);
  }
  static addVarNameType(e, t) {
    e.addFieldInt8(3, t, union_var_ref_js_1.UnionVarRef.NONE);
  }
  static addVarName(e, t) {
    e.addFieldOffset(4, t, 0);
  }
  static endCreatePrefab(e) {
    return e.endObject();
  }
  static createCreatePrefab(e, t, r, a, i, s) {
    CreatePrefab.startCreatePrefab(e);
    CreatePrefab.addPosEntityId(e, t);
    CreatePrefab.addConfigType(e, r);
    CreatePrefab.addConfig(e, a);
    CreatePrefab.addVarNameType(e, i);
    CreatePrefab.addVarName(e, s);
    return CreatePrefab.endCreatePrefab(e);
  }
}
exports.CreatePrefab = CreatePrefab;
//# sourceMappingURL=create-prefab.js.map