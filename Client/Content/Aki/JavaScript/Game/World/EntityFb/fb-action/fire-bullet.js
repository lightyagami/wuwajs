"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FireBullet = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const union_fire_bullet_js_1 = require("../fb-action/union-fire-bullet.js");
class FireBullet {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsFireBullet(t, e) {
    return (e || new FireBullet()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsFireBullet(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new FireBullet()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  typeType() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return union_fire_bullet_js_1.UnionFireBullet.NONE;
    }
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return this.bb.__union(t, this.bb_pos + e);
    } else {
      return undefined;
    }
  }
  static startFireBullet(t) {
    t.startObject(2);
  }
  static addTypeType(t, e) {
    t.addFieldInt8(0, e, union_fire_bullet_js_1.UnionFireBullet.NONE);
  }
  static addType(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static endFireBullet(t) {
    return t.endObject();
  }
  static createFireBullet(t, e, i) {
    FireBullet.startFireBullet(t);
    FireBullet.addTypeType(t, e);
    FireBullet.addType(t, i);
    return FireBullet.endFireBullet(t);
  }
}
exports.FireBullet = FireBullet;
//# sourceMappingURL=fire-bullet.js.map