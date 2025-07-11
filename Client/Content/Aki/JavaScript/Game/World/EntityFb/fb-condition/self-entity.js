"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SelfEntity = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class SelfEntity {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsSelfEntity(t, e) {
    return (e || new SelfEntity()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsSelfEntity(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new SelfEntity()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  static startSelfEntity(t) {
    t.startObject(1);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static endSelfEntity(t) {
    return t.endObject();
  }
  static createSelfEntity(t, e) {
    SelfEntity.startSelfEntity(t);
    SelfEntity.addType(t, e);
    return SelfEntity.endSelfEntity(t);
  }
}
exports.SelfEntity = SelfEntity;
//# sourceMappingURL=self-entity.js.map