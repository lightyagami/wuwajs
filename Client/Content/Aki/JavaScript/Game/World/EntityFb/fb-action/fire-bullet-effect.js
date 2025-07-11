"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FireBulletEffect = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class FireBulletEffect {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsFireBulletEffect(t, e) {
    return (e || new FireBulletEffect()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsFireBulletEffect(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new FireBulletEffect()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  x() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  y() {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  z() {
    var t = this.bb.__offset(this.bb_pos, 10);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startFireBulletEffect(t) {
    t.startObject(4);
  }
  static addId(t, e) {
    t.addFieldInt32(0, e, 0);
  }
  static addX(t, e) {
    t.addFieldInt32(1, e, 0);
  }
  static addY(t, e) {
    t.addFieldInt32(2, e, 0);
  }
  static addZ(t, e) {
    t.addFieldInt32(3, e, 0);
  }
  static endFireBulletEffect(t) {
    return t.endObject();
  }
  static createFireBulletEffect(t, e, i, r, s) {
    FireBulletEffect.startFireBulletEffect(t);
    FireBulletEffect.addId(t, e);
    FireBulletEffect.addX(t, i);
    FireBulletEffect.addY(t, r);
    FireBulletEffect.addZ(t, s);
    return FireBulletEffect.endFireBulletEffect(t);
  }
}
exports.FireBulletEffect = FireBulletEffect;
//# sourceMappingURL=fire-bullet-effect.js.map