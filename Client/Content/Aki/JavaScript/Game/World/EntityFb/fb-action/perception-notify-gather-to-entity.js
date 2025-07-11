"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PerceptionNotifyGatherToEntity = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class PerceptionNotifyGatherToEntity {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsPerceptionNotifyGatherToEntity(t, e) {
    return (e || new PerceptionNotifyGatherToEntity()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsPerceptionNotifyGatherToEntity(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new PerceptionNotifyGatherToEntity()).__init(t.readInt32(t.position()) + t.position(), t);
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
  static startPerceptionNotifyGatherToEntity(t) {
    t.startObject(2);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addEntityId(t, e) {
    t.addFieldInt32(1, e, 0);
  }
  static endPerceptionNotifyGatherToEntity(t) {
    return t.endObject();
  }
  static createPerceptionNotifyGatherToEntity(t, e, i) {
    PerceptionNotifyGatherToEntity.startPerceptionNotifyGatherToEntity(t);
    PerceptionNotifyGatherToEntity.addType(t, e);
    PerceptionNotifyGatherToEntity.addEntityId(t, i);
    return PerceptionNotifyGatherToEntity.endPerceptionNotifyGatherToEntity(t);
  }
}
exports.PerceptionNotifyGatherToEntity = PerceptionNotifyGatherToEntity;
//# sourceMappingURL=perception-notify-gather-to-entity.js.map