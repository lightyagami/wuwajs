"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpawnEntity = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const transform_js_1 = require("../fb-action/transform.js");
const union_var_ref_js_1 = require("../fb-var/union-var-ref.js");
class SpawnEntity {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, s) {
    this.bb_pos = t;
    this.bb = s;
    return this;
  }
  static getRootAsSpawnEntity(t, s) {
    return (s || new SpawnEntity()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsSpawnEntity(t, s) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (s || new SpawnEntity()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  entityDataId() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  transform(t) {
    var s = this.bb.__offset(this.bb_pos, 6);
    if (s) {
      return (t || new transform_js_1.Transform()).__init(this.bb.__indirect(this.bb_pos + s), this.bb);
    } else {
      return undefined;
    }
  }
  saveType() {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return union_var_ref_js_1.UnionVarRef.NONE;
    }
  }
  save(t) {
    var s = this.bb.__offset(this.bb_pos, 10);
    if (s) {
      return this.bb.__union(t, this.bb_pos + s);
    } else {
      return undefined;
    }
  }
  static startSpawnEntity(t) {
    t.startObject(4);
  }
  static addEntityDataId(t, s) {
    t.addFieldInt32(0, s, 0);
  }
  static addTransform(t, s) {
    t.addFieldOffset(1, s, 0);
  }
  static addSaveType(t, s) {
    t.addFieldInt8(2, s, union_var_ref_js_1.UnionVarRef.NONE);
  }
  static addSave(t, s) {
    t.addFieldOffset(3, s, 0);
  }
  static endSpawnEntity(t) {
    return t.endObject();
  }
}
exports.SpawnEntity = SpawnEntity;
//# sourceMappingURL=spawn-entity.js.map