"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HitBulletTypeAllCharacterAttack = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class HitBulletTypeAllCharacterAttack {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsHitBulletTypeAllCharacterAttack(t, e) {
    return (e || new HitBulletTypeAllCharacterAttack()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsHitBulletTypeAllCharacterAttack(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new HitBulletTypeAllCharacterAttack()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  static startHitBulletTypeAllCharacterAttack(t) {
    t.startObject(1);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static endHitBulletTypeAllCharacterAttack(t) {
    return t.endObject();
  }
  static createHitBulletTypeAllCharacterAttack(t, e) {
    HitBulletTypeAllCharacterAttack.startHitBulletTypeAllCharacterAttack(t);
    HitBulletTypeAllCharacterAttack.addType(t, e);
    return HitBulletTypeAllCharacterAttack.endHitBulletTypeAllCharacterAttack(t);
  }
}
exports.HitBulletTypeAllCharacterAttack = HitBulletTypeAllCharacterAttack;
//# sourceMappingURL=hit-bullet-type-all-character-attack.js.map