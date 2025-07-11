"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LockEntity = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class LockEntity {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsLockEntity(t, i) {
    return (i || new LockEntity()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsLockEntity(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new LockEntity()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  entityIds(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    if (i) {
      return this.bb.readInt32(this.bb.__vector(this.bb_pos + i) + t * 4);
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
  static startLockEntity(t) {
    t.startObject(1);
  }
  static addEntityIds(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static createEntityIdsVector(i, s) {
    i.startVector(4, s.length, 4);
    for (let t = s.length - 1; t >= 0; t--) {
      i.addInt32(s[t]);
    }
    return i.endVector();
  }
  static startEntityIdsVector(t, i) {
    t.startVector(4, i, 4);
  }
  static endLockEntity(t) {
    return t.endObject();
  }
  static createLockEntity(t, i) {
    LockEntity.startLockEntity(t);
    LockEntity.addEntityIds(t, i);
    return LockEntity.endLockEntity(t);
  }
}
exports.LockEntity = LockEntity;
//# sourceMappingURL=lock-entity.js.map