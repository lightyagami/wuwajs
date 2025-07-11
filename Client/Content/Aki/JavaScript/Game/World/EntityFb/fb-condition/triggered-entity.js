"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TriggeredEntity = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class TriggeredEntity {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsTriggeredEntity(t, e) {
    return (e || new TriggeredEntity()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsTriggeredEntity(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new TriggeredEntity()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  static startTriggeredEntity(t) {
    t.startObject(1);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static endTriggeredEntity(t) {
    return t.endObject();
  }
  static createTriggeredEntity(t, e) {
    TriggeredEntity.startTriggeredEntity(t);
    TriggeredEntity.addType(t, e);
    return TriggeredEntity.endTriggeredEntity(t);
  }
}
exports.TriggeredEntity = TriggeredEntity;
//# sourceMappingURL=triggered-entity.js.map