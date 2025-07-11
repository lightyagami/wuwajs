"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConditionHitConfigWithBullet = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const union_hit_bullet_type_js_1 = require("../fb-component/union-hit-bullet-type.js");
const condition_group_js_1 = require("../fb-condition/condition-group.js");
class ConditionHitConfigWithBullet {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsConditionHitConfigWithBullet(t, i) {
    return (i || new ConditionHitConfigWithBullet()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsConditionHitConfigWithBullet(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new ConditionHitConfigWithBullet()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  conditions(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    if (i) {
      return (t || new condition_group_js_1.ConditionGroup()).__init(this.bb.__indirect(this.bb_pos + i), this.bb);
    } else {
      return undefined;
    }
  }
  state(t) {
    var i = this.bb.__offset(this.bb_pos, 6);
    if (i) {
      return this.bb.__string(this.bb_pos + i, t);
    } else {
      return undefined;
    }
  }
  hitBulletsType() {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return union_hit_bullet_type_js_1.UnionHitBulletType.NONE;
    }
  }
  hitBullets(t) {
    var i = this.bb.__offset(this.bb_pos, 10);
    if (i) {
      return this.bb.__union(t, this.bb_pos + i);
    } else {
      return undefined;
    }
  }
  static startConditionHitConfigWithBullet(t) {
    t.startObject(4);
  }
  static addConditions(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addState(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static addHitBulletsType(t, i) {
    t.addFieldInt8(2, i, union_hit_bullet_type_js_1.UnionHitBulletType.NONE);
  }
  static addHitBullets(t, i) {
    t.addFieldOffset(3, i, 0);
  }
  static endConditionHitConfigWithBullet(t) {
    return t.endObject();
  }
  static createConditionHitConfigWithBullet(t, i, n, o, e) {
    ConditionHitConfigWithBullet.startConditionHitConfigWithBullet(t);
    ConditionHitConfigWithBullet.addConditions(t, i);
    ConditionHitConfigWithBullet.addState(t, n);
    ConditionHitConfigWithBullet.addHitBulletsType(t, o);
    ConditionHitConfigWithBullet.addHitBullets(t, e);
    return ConditionHitConfigWithBullet.endConditionHitConfigWithBullet(t);
  }
}
exports.ConditionHitConfigWithBullet = ConditionHitConfigWithBullet;
//# sourceMappingURL=condition-hit-config-with-bullet.js.map