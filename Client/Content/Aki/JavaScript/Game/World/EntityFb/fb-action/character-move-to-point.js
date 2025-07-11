"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CharacterMoveToPoint = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const union_target_entity_js_1 = require("../fb-action/union-target-entity.js");
const vector_info_js_1 = require("../fb-var/vector-info.js");
class CharacterMoveToPoint {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsCharacterMoveToPoint(t, e) {
    return (e || new CharacterMoveToPoint()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsCharacterMoveToPoint(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new CharacterMoveToPoint()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  targetType() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return union_target_entity_js_1.UnionTargetEntity.NONE;
    }
  }
  target(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return this.bb.__union(t, this.bb_pos + e);
    } else {
      return undefined;
    }
  }
  pos(t) {
    var e = this.bb.__offset(this.bb_pos, 8);
    if (e) {
      return (t || new vector_info_js_1.VectorInfo()).__init(this.bb.__indirect(this.bb_pos + e), this.bb);
    } else {
      return undefined;
    }
  }
  moveType(t) {
    var e = this.bb.__offset(this.bb_pos, 10);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  static startCharacterMoveToPoint(t) {
    t.startObject(4);
  }
  static addTargetType(t, e) {
    t.addFieldInt8(0, e, union_target_entity_js_1.UnionTargetEntity.NONE);
  }
  static addTarget(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static addPos(t, e) {
    t.addFieldOffset(2, e, 0);
  }
  static addMoveType(t, e) {
    t.addFieldOffset(3, e, 0);
  }
  static endCharacterMoveToPoint(t) {
    return t.endObject();
  }
}
exports.CharacterMoveToPoint = CharacterMoveToPoint;
//# sourceMappingURL=character-move-to-point.js.map