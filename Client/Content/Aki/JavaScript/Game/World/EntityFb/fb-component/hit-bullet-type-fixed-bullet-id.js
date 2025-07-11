"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HitBulletTypeFixedBulletId = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class HitBulletTypeFixedBulletId {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsHitBulletTypeFixedBulletId(t, e) {
    return (e || new HitBulletTypeFixedBulletId()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsHitBulletTypeFixedBulletId(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new HitBulletTypeFixedBulletId()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  bulletId(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return this.bb.readInt64(this.bb.__vector(this.bb_pos + e) + t * 8);
    } else {
      return BigInt(0);
    }
  }
  bulletIdLength() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  playerAttack() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  static startHitBulletTypeFixedBulletId(t) {
    t.startObject(3);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addBulletId(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static createBulletIdVector(e, l) {
    e.startVector(8, l.length, 8);
    for (let t = l.length - 1; t >= 0; t--) {
      e.addInt64(l[t]);
    }
    return e.endVector();
  }
  static startBulletIdVector(t, e) {
    t.startVector(8, e, 8);
  }
  static addPlayerAttack(t, e) {
    t.addFieldInt8(2, +e, 0);
  }
  static endHitBulletTypeFixedBulletId(t) {
    return t.endObject();
  }
  static createHitBulletTypeFixedBulletId(t, e, l, i) {
    HitBulletTypeFixedBulletId.startHitBulletTypeFixedBulletId(t);
    HitBulletTypeFixedBulletId.addType(t, e);
    HitBulletTypeFixedBulletId.addBulletId(t, l);
    HitBulletTypeFixedBulletId.addPlayerAttack(t, i);
    return HitBulletTypeFixedBulletId.endHitBulletTypeFixedBulletId(t);
  }
}
exports.HitBulletTypeFixedBulletId = HitBulletTypeFixedBulletId;
//# sourceMappingURL=hit-bullet-type-fixed-bullet-id.js.map