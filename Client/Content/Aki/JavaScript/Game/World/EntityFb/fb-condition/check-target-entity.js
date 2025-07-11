"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CheckTargetEntity = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const union_target_entity_js_1 = require("../fb-condition/union-target-entity.js");
class CheckTargetEntity {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsCheckTargetEntity(t, e) {
    return (e || new CheckTargetEntity()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsCheckTargetEntity(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new CheckTargetEntity()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  targetEntityType() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return union_target_entity_js_1.UnionTargetEntity.NONE;
    }
  }
  targetEntity(t) {
    var e = this.bb.__offset(this.bb_pos, 8);
    if (e) {
      return this.bb.__union(t, this.bb_pos + e);
    } else {
      return undefined;
    }
  }
  static startCheckTargetEntity(t) {
    t.startObject(3);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addTargetEntityType(t, e) {
    t.addFieldInt8(1, e, union_target_entity_js_1.UnionTargetEntity.NONE);
  }
  static addTargetEntity(t, e) {
    t.addFieldOffset(2, e, 0);
  }
  static endCheckTargetEntity(t) {
    return t.endObject();
  }
  static createCheckTargetEntity(t, e, i, r) {
    CheckTargetEntity.startCheckTargetEntity(t);
    CheckTargetEntity.addType(t, e);
    CheckTargetEntity.addTargetEntityType(t, i);
    CheckTargetEntity.addTargetEntity(t, r);
    return CheckTargetEntity.endCheckTargetEntity(t);
  }
}
exports.CheckTargetEntity = CheckTargetEntity;
//# sourceMappingURL=check-target-entity.js.map