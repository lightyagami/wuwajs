"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HitComponent = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const aim_part_js_1 = require("../fb-component/aim-part.js");
const hit_time_scale_ratio_js_1 = require("../fb-component/hit-time-scale-ratio.js");
const union_hit_bullet_type_js_1 = require("../fb-component/union-hit-bullet-type.js");
class HitComponent {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsHitComponent(t, i) {
    return (i || new HitComponent()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsHitComponent(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new HitComponent()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  disabled() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  hitBulletType() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return union_hit_bullet_type_js_1.UnionHitBulletType.NONE;
    }
  }
  hitBullet(t) {
    var i = this.bb.__offset(this.bb_pos, 8);
    if (i) {
      return this.bb.__union(t, this.bb_pos + i);
    } else {
      return undefined;
    }
  }
  attackerHitTimeScaleRatio(t) {
    var i = this.bb.__offset(this.bb_pos, 10);
    if (i) {
      return (t || new hit_time_scale_ratio_js_1.HitTimeScaleRatio()).__init(this.bb.__indirect(this.bb_pos + i), this.bb);
    } else {
      return undefined;
    }
  }
  victimHitTimeScaleRatio(t) {
    var i = this.bb.__offset(this.bb_pos, 12);
    if (i) {
      return (t || new hit_time_scale_ratio_js_1.HitTimeScaleRatio()).__init(this.bb.__indirect(this.bb_pos + i), this.bb);
    } else {
      return undefined;
    }
  }
  aimParts(t, i) {
    var e = this.bb.__offset(this.bb_pos, 14);
    if (e) {
      return (i || new aim_part_js_1.AimPart()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + e) + t * 4), this.bb);
    } else {
      return undefined;
    }
  }
  aimPartsLength() {
    var t = this.bb.__offset(this.bb_pos, 14);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startHitComponent(t) {
    t.startObject(6);
  }
  static addDisabled(t, i) {
    t.addFieldInt8(0, +i, 0);
  }
  static addHitBulletType(t, i) {
    t.addFieldInt8(1, i, union_hit_bullet_type_js_1.UnionHitBulletType.NONE);
  }
  static addHitBullet(t, i) {
    t.addFieldOffset(2, i, 0);
  }
  static addAttackerHitTimeScaleRatio(t, i) {
    t.addFieldOffset(3, i, 0);
  }
  static addVictimHitTimeScaleRatio(t, i) {
    t.addFieldOffset(4, i, 0);
  }
  static addAimParts(t, i) {
    t.addFieldOffset(5, i, 0);
  }
  static createAimPartsVector(i, e) {
    i.startVector(4, e.length, 4);
    for (let t = e.length - 1; t >= 0; t--) {
      i.addOffset(e[t]);
    }
    return i.endVector();
  }
  static startAimPartsVector(t, i) {
    t.startVector(4, i, 4);
  }
  static endHitComponent(t) {
    return t.endObject();
  }
}
exports.HitComponent = HitComponent;
//# sourceMappingURL=hit-component.js.map