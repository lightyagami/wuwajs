"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AwakeEntity = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const union_awake_pos_option_js_1 = require("../fb-action/union-awake-pos-option.js");
class AwakeEntity {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsAwakeEntity(t, i) {
    return (i || new AwakeEntity()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsAwakeEntity(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new AwakeEntity()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  positionType() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return union_awake_pos_option_js_1.UnionAwakePosOption.NONE;
    }
  }
  position(t) {
    var i = this.bb.__offset(this.bb_pos, 6);
    if (i) {
      return this.bb.__union(t, this.bb_pos + i);
    } else {
      return undefined;
    }
  }
  isSnap() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  entityIds(t) {
    var i = this.bb.__offset(this.bb_pos, 10);
    if (i) {
      return this.bb.readInt32(this.bb.__vector(this.bb_pos + i) + t * 4);
    } else {
      return 0;
    }
  }
  entityIdsLength() {
    var t = this.bb.__offset(this.bb_pos, 10);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  entityIdsArray() {
    var t = this.bb.__offset(this.bb_pos, 10);
    if (t) {
      return new Int32Array(this.bb.bytes().buffer, this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + t), this.bb.__vector_len(this.bb_pos + t));
    } else {
      return undefined;
    }
  }
  static startAwakeEntity(t) {
    t.startObject(4);
  }
  static addPositionType(t, i) {
    t.addFieldInt8(0, i, union_awake_pos_option_js_1.UnionAwakePosOption.NONE);
  }
  static addPosition(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static addIsSnap(t, i) {
    t.addFieldInt8(2, +i, 0);
  }
  static addEntityIds(t, i) {
    t.addFieldOffset(3, i, 0);
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
  static endAwakeEntity(t) {
    return t.endObject();
  }
  static createAwakeEntity(t, i, s, e, n) {
    AwakeEntity.startAwakeEntity(t);
    AwakeEntity.addPositionType(t, i);
    AwakeEntity.addPosition(t, s);
    AwakeEntity.addIsSnap(t, e);
    AwakeEntity.addEntityIds(t, n);
    return AwakeEntity.endAwakeEntity(t);
  }
}
exports.AwakeEntity = AwakeEntity;
//# sourceMappingURL=awake-entity.js.map