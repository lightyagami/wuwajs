"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DestroyEntity = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class DestroyEntity {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, s) {
    this.bb_pos = t;
    this.bb = s;
    return this;
  }
  static getRootAsDestroyEntity(t, s) {
    return (s || new DestroyEntity()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsDestroyEntity(t, s) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (s || new DestroyEntity()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  entityIds(t) {
    var s = this.bb.__offset(this.bb_pos, 4);
    if (s) {
      return this.bb.readInt32(this.bb.__vector(this.bb_pos + s) + t * 4);
    } else {
      return 0;
    }
  }
  entityIdsLength() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  entityIdsArray() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return new Int32Array(this.bb.bytes().buffer, this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + t), this.bb.__vector_len(this.bb_pos + t));
    } else {
      return undefined;
    }
  }
  delayDestroy() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  static startDestroyEntity(t) {
    t.startObject(2);
  }
  static addEntityIds(t, s) {
    t.addFieldOffset(0, s, 0);
  }
  static createEntityIdsVector(s, i) {
    s.startVector(4, i.length, 4);
    for (let t = i.length - 1; t >= 0; t--) {
      s.addInt32(i[t]);
    }
    return s.endVector();
  }
  static startEntityIdsVector(t, s) {
    t.startVector(4, s, 4);
  }
  static addDelayDestroy(t, s) {
    t.addFieldInt8(1, +s, 0);
  }
  static endDestroyEntity(t) {
    return t.endObject();
  }
  static createDestroyEntity(t, s, i) {
    DestroyEntity.startDestroyEntity(t);
    DestroyEntity.addEntityIds(t, s);
    DestroyEntity.addDelayDestroy(t, i);
    return DestroyEntity.endDestroyEntity(t);
  }
}
exports.DestroyEntity = DestroyEntity;
//# sourceMappingURL=destroy-entity.js.map