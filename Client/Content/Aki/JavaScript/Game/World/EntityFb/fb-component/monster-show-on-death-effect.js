"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MonsterShowOnDeathEffect = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class MonsterShowOnDeathEffect {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsMonsterShowOnDeathEffect(t, e) {
    return (e || new MonsterShowOnDeathEffect()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsMonsterShowOnDeathEffect(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new MonsterShowOnDeathEffect()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  effectId() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startMonsterShowOnDeathEffect(t) {
    t.startObject(2);
  }
  static addType(t, e) {
    t.addFieldInt8(0, e, 0);
  }
  static addEffectId(t, e) {
    t.addFieldInt32(1, e, 0);
  }
  static endMonsterShowOnDeathEffect(t) {
    return t.endObject();
  }
  static createMonsterShowOnDeathEffect(t, e, s) {
    MonsterShowOnDeathEffect.startMonsterShowOnDeathEffect(t);
    MonsterShowOnDeathEffect.addType(t, e);
    MonsterShowOnDeathEffect.addEffectId(t, s);
    return MonsterShowOnDeathEffect.endMonsterShowOnDeathEffect(t);
  }
}
exports.MonsterShowOnDeathEffect = MonsterShowOnDeathEffect;
//# sourceMappingURL=monster-show-on-death-effect.js.map