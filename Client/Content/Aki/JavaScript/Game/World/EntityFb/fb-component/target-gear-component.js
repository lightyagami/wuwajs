"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TargetGearComponent = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const aim_part_js_1 = require("../fb-component/aim-part.js");
const hit_time_scale_ratio_js_1 = require("../fb-component/hit-time-scale-ratio.js");
const spline_move_js_1 = require("../fb-component/spline-move.js");
const union_hit_bullet_type_js_1 = require("../fb-component/union-hit-bullet-type.js");
const union_hit_logic_type_js_1 = require("../fb-component/union-hit-logic-type.js");
class TargetGearComponent {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsTargetGearComponent(t, i) {
    return (i || new TargetGearComponent()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsTargetGearComponent(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new TargetGearComponent()).__init(t.readInt32(t.position()) + t.position(), t);
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
  type(t) {
    var i = this.bb.__offset(this.bb_pos, 16);
    if (i) {
      return this.bb.__string(this.bb_pos + i, t);
    } else {
      return undefined;
    }
  }
  isCycle() {
    var t = this.bb.__offset(this.bb_pos, 18);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  cycleInterval() {
    var t = this.bb.__offset(this.bb_pos, 20);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  cycleStates(t, i) {
    var e = this.bb.__offset(this.bb_pos, 22);
    if (e) {
      return this.bb.__string(this.bb.__vector(this.bb_pos + e) + t * 4, i);
    } else {
      return undefined;
    }
  }
  cycleStatesLength() {
    var t = this.bb.__offset(this.bb_pos, 22);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  hitLogicTypeType() {
    var t = this.bb.__offset(this.bb_pos, 24);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return union_hit_logic_type_js_1.UnionHitLogicType.NONE;
    }
  }
  hitLogicType(t) {
    var i = this.bb.__offset(this.bb_pos, 26);
    if (i) {
      return this.bb.__union(t, this.bb_pos + i);
    } else {
      return undefined;
    }
  }
  patrol(t) {
    var i = this.bb.__offset(this.bb_pos, 28);
    if (i) {
      return (t || new spline_move_js_1.SplineMove()).__init(this.bb.__indirect(this.bb_pos + i), this.bb);
    } else {
      return undefined;
    }
  }
  hitCd() {
    var t = this.bb.__offset(this.bb_pos, 30);
    if (t) {
      return this.bb.readFloat32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startTargetGearComponent(t) {
    t.startObject(14);
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
  static addType(t, i) {
    t.addFieldOffset(6, i, 0);
  }
  static addIsCycle(t, i) {
    t.addFieldInt8(7, +i, 0);
  }
  static addCycleInterval(t, i) {
    t.addFieldInt32(8, i, 0);
  }
  static addCycleStates(t, i) {
    t.addFieldOffset(9, i, 0);
  }
  static createCycleStatesVector(i, e) {
    i.startVector(4, e.length, 4);
    for (let t = e.length - 1; t >= 0; t--) {
      i.addOffset(e[t]);
    }
    return i.endVector();
  }
  static startCycleStatesVector(t, i) {
    t.startVector(4, i, 4);
  }
  static addHitLogicTypeType(t, i) {
    t.addFieldInt8(10, i, union_hit_logic_type_js_1.UnionHitLogicType.NONE);
  }
  static addHitLogicType(t, i) {
    t.addFieldOffset(11, i, 0);
  }
  static addPatrol(t, i) {
    t.addFieldOffset(12, i, 0);
  }
  static addHitCd(t, i) {
    t.addFieldFloat32(13, i, 0);
  }
  static endTargetGearComponent(t) {
    return t.endObject();
  }
}
exports.TargetGearComponent = TargetGearComponent;
//# sourceMappingURL=target-gear-component.js.map