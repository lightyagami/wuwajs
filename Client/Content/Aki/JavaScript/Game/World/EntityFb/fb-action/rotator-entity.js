"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RotatorEntity = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const union_target_entity_js_1 = require("../fb-action/union-target-entity.js");
class RotatorEntity {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsRotatorEntity(t, i) {
    return (i || new RotatorEntity()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsRotatorEntity(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new RotatorEntity()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  entityType() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return union_target_entity_js_1.UnionTargetEntity.NONE;
    }
  }
  entity(t) {
    var i = this.bb.__offset(this.bb_pos, 6);
    if (i) {
      return this.bb.__union(t, this.bb_pos + i);
    } else {
      return undefined;
    }
  }
  static startRotatorEntity(t) {
    t.startObject(2);
  }
  static addEntityType(t, i) {
    t.addFieldInt8(0, i, union_target_entity_js_1.UnionTargetEntity.NONE);
  }
  static addEntity(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static endRotatorEntity(t) {
    return t.endObject();
  }
  static createRotatorEntity(t, i, r) {
    RotatorEntity.startRotatorEntity(t);
    RotatorEntity.addEntityType(t, i);
    RotatorEntity.addEntity(t, r);
    return RotatorEntity.endRotatorEntity(t);
  }
}
exports.RotatorEntity = RotatorEntity;
//# sourceMappingURL=rotator-entity.js.map