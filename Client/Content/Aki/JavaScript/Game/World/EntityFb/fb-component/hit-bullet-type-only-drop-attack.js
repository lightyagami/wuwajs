"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HitBulletTypeOnlyDropAttack = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class HitBulletTypeOnlyDropAttack {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsHitBulletTypeOnlyDropAttack(t, e) {
    return (e || new HitBulletTypeOnlyDropAttack()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsHitBulletTypeOnlyDropAttack(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new HitBulletTypeOnlyDropAttack()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  static startHitBulletTypeOnlyDropAttack(t) {
    t.startObject(1);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static endHitBulletTypeOnlyDropAttack(t) {
    return t.endObject();
  }
  static createHitBulletTypeOnlyDropAttack(t, e) {
    HitBulletTypeOnlyDropAttack.startHitBulletTypeOnlyDropAttack(t);
    HitBulletTypeOnlyDropAttack.addType(t, e);
    return HitBulletTypeOnlyDropAttack.endHitBulletTypeOnlyDropAttack(t);
  }
}
exports.HitBulletTypeOnlyDropAttack = HitBulletTypeOnlyDropAttack;
//# sourceMappingURL=hit-bullet-type-only-drop-attack.js.map