"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HitBulletTypePlayerAttack = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class HitBulletTypePlayerAttack {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsHitBulletTypePlayerAttack(t, e) {
    return (e || new HitBulletTypePlayerAttack()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsHitBulletTypePlayerAttack(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new HitBulletTypePlayerAttack()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  static startHitBulletTypePlayerAttack(t) {
    t.startObject(1);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static endHitBulletTypePlayerAttack(t) {
    return t.endObject();
  }
  static createHitBulletTypePlayerAttack(t, e) {
    HitBulletTypePlayerAttack.startHitBulletTypePlayerAttack(t);
    HitBulletTypePlayerAttack.addType(t, e);
    return HitBulletTypePlayerAttack.endHitBulletTypePlayerAttack(t);
  }
}
exports.HitBulletTypePlayerAttack = HitBulletTypePlayerAttack;
//# sourceMappingURL=hit-bullet-type-player-attack.js.map