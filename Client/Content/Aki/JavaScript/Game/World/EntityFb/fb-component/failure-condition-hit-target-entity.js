"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FailureConditionHitTargetEntity = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class FailureConditionHitTargetEntity {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsFailureConditionHitTargetEntity(t, i) {
    return (i || new FailureConditionHitTargetEntity()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsFailureConditionHitTargetEntity(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new FailureConditionHitTargetEntity()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    if (i) {
      return this.bb.__string(this.bb_pos + i, t);
    } else {
      return undefined;
    }
  }
  entityIds(t) {
    var i = this.bb.__offset(this.bb_pos, 6);
    if (i) {
      return this.bb.readInt32(this.bb.__vector(this.bb_pos + i) + t * 4);
    } else {
      return 0;
    }
  }
  entityIdsLength() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  entityIdsArray() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return new Int32Array(this.bb.bytes().buffer, this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + t), this.bb.__vector_len(this.bb_pos + t));
    } else {
      return undefined;
    }
  }
  static startFailureConditionHitTargetEntity(t) {
    t.startObject(2);
  }
  static addType(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addEntityIds(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static createEntityIdsVector(i, r) {
    i.startVector(4, r.length, 4);
    for (let t = r.length - 1; t >= 0; t--) {
      i.addInt32(r[t]);
    }
    return i.endVector();
  }
  static startEntityIdsVector(t, i) {
    t.startVector(4, i, 4);
  }
  static endFailureConditionHitTargetEntity(t) {
    return t.endObject();
  }
  static createFailureConditionHitTargetEntity(t, i, r) {
    FailureConditionHitTargetEntity.startFailureConditionHitTargetEntity(t);
    FailureConditionHitTargetEntity.addType(t, i);
    FailureConditionHitTargetEntity.addEntityIds(t, r);
    return FailureConditionHitTargetEntity.endFailureConditionHitTargetEntity(t);
  }
}
exports.FailureConditionHitTargetEntity = FailureConditionHitTargetEntity;
//# sourceMappingURL=failure-condition-hit-target-entity.js.map