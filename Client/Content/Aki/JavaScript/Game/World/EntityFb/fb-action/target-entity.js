"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TargetEntity = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class TargetEntity {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsTargetEntity(t, e) {
    return (e || new TargetEntity()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsTargetEntity(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new TargetEntity()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  entityId() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startTargetEntity(t) {
    t.startObject(2);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addEntityId(t, e) {
    t.addFieldInt32(1, e, 0);
  }
  static endTargetEntity(t) {
    return t.endObject();
  }
  static createTargetEntity(t, e, i) {
    TargetEntity.startTargetEntity(t);
    TargetEntity.addType(t, e);
    TargetEntity.addEntityId(t, i);
    return TargetEntity.endTargetEntity(t);
  }
}
exports.TargetEntity = TargetEntity;
//# sourceMappingURL=target-entity.js.map