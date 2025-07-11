"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DestructibleItem = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const action_info_js_1 = require("../fb-action/action-info.js");
const aim_part_js_1 = require("../fb-component/aim-part.js");
const durability_state_config_js_1 = require("../fb-component/durability-state-config.js");
const durability_worn_js_1 = require("../fb-component/durability-worn.js");
const element_damage_js_1 = require("../fb-component/element-damage.js");
const hit_time_scale_ratio_js_1 = require("../fb-component/hit-time-scale-ratio.js");
const skill_damage_js_1 = require("../fb-component/skill-damage.js");
const union_hit_bullet_type_js_1 = require("../fb-component/union-hit-bullet-type.js");
const weapon_damage_js_1 = require("../fb-component/weapon-damage.js");
const vector_info_js_1 = require("../fb-var/vector-info.js");
class DestructibleItem {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsDestructibleItem(t, i) {
    return (i || new DestructibleItem()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsDestructibleItem(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new DestructibleItem()).__init(t.readInt32(t.position()) + t.position(), t);
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
  durabilityId() {
    var t = this.bb.__offset(this.bb_pos, 16);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  durability() {
    var t = this.bb.__offset(this.bb_pos, 18);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  durabilityWorn(t) {
    var i = this.bb.__offset(this.bb_pos, 20);
    if (i) {
      return (t || new durability_worn_js_1.DurabilityWorn()).__init(this.bb.__indirect(this.bb_pos + i), this.bb);
    } else {
      return undefined;
    }
  }
  durabilityStateConfig(t) {
    var i = this.bb.__offset(this.bb_pos, 22);
    if (i) {
      return (t || new durability_state_config_js_1.DurabilityStateConfig()).__init(this.bb.__indirect(this.bb_pos + i), this.bb);
    } else {
      return undefined;
    }
  }
  hitPoint(t) {
    var i = this.bb.__offset(this.bb_pos, 24);
    if (i) {
      return (t || new vector_info_js_1.VectorInfo()).__init(this.bb.__indirect(this.bb_pos + i), this.bb);
    } else {
      return undefined;
    }
  }
  destructionActions(t, i) {
    var e = this.bb.__offset(this.bb_pos, 26);
    if (e) {
      return (i || new action_info_js_1.ActionInfo()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + e) + t * 4), this.bb);
    } else {
      return undefined;
    }
  }
  destructionActionsLength() {
    var t = this.bb.__offset(this.bb_pos, 26);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  skillDamage(t) {
    var i = this.bb.__offset(this.bb_pos, 28);
    if (i) {
      return (t || new skill_damage_js_1.SkillDamage()).__init(this.bb.__indirect(this.bb_pos + i), this.bb);
    } else {
      return undefined;
    }
  }
  elementDamage(t) {
    var i = this.bb.__offset(this.bb_pos, 30);
    if (i) {
      return (t || new element_damage_js_1.ElementDamage()).__init(this.bb.__indirect(this.bb_pos + i), this.bb);
    } else {
      return undefined;
    }
  }
  weaponDamage(t) {
    var i = this.bb.__offset(this.bb_pos, 32);
    if (i) {
      return (t || new weapon_damage_js_1.WeaponDamage()).__init(this.bb.__indirect(this.bb_pos + i), this.bb);
    } else {
      return undefined;
    }
  }
  matchRoleOptionType(t) {
    var i = this.bb.__offset(this.bb_pos, 34);
    if (i) {
      return this.bb.readUint8(this.bb.__vector(this.bb_pos + i) + t);
    } else {
      return 0;
    }
  }
  matchRoleOptionTypeLength() {
    var t = this.bb.__offset(this.bb_pos, 34);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  matchRoleOptionTypeArray() {
    var t = this.bb.__offset(this.bb_pos, 34);
    if (t) {
      return new Uint8Array(this.bb.bytes().buffer, this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + t), this.bb.__vector_len(this.bb_pos + t));
    } else {
      return undefined;
    }
  }
  matchRoleOption(t, i) {
    var e = this.bb.__offset(this.bb_pos, 36);
    if (e) {
      return this.bb.__union(i, this.bb.__vector(this.bb_pos + e) + t * 4);
    } else {
      return undefined;
    }
  }
  matchRoleOptionLength() {
    var t = this.bb.__offset(this.bb_pos, 36);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startDestructibleItem(t) {
    t.startObject(17);
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
  static addDurabilityId(t, i) {
    t.addFieldInt32(6, i, 0);
  }
  static addDurability(t, i) {
    t.addFieldInt32(7, i, 0);
  }
  static addDurabilityWorn(t, i) {
    t.addFieldOffset(8, i, 0);
  }
  static addDurabilityStateConfig(t, i) {
    t.addFieldOffset(9, i, 0);
  }
  static addHitPoint(t, i) {
    t.addFieldOffset(10, i, 0);
  }
  static addDestructionActions(t, i) {
    t.addFieldOffset(11, i, 0);
  }
  static createDestructionActionsVector(i, e) {
    i.startVector(4, e.length, 4);
    for (let t = e.length - 1; t >= 0; t--) {
      i.addOffset(e[t]);
    }
    return i.endVector();
  }
  static startDestructionActionsVector(t, i) {
    t.startVector(4, i, 4);
  }
  static addSkillDamage(t, i) {
    t.addFieldOffset(12, i, 0);
  }
  static addElementDamage(t, i) {
    t.addFieldOffset(13, i, 0);
  }
  static addWeaponDamage(t, i) {
    t.addFieldOffset(14, i, 0);
  }
  static addMatchRoleOptionType(t, i) {
    t.addFieldOffset(15, i, 0);
  }
  static createMatchRoleOptionTypeVector(i, e) {
    i.startVector(1, e.length, 1);
    for (let t = e.length - 1; t >= 0; t--) {
      i.addInt8(e[t]);
    }
    return i.endVector();
  }
  static startMatchRoleOptionTypeVector(t, i) {
    t.startVector(1, i, 1);
  }
  static addMatchRoleOption(t, i) {
    t.addFieldOffset(16, i, 0);
  }
  static createMatchRoleOptionVector(i, e) {
    i.startVector(4, e.length, 4);
    for (let t = e.length - 1; t >= 0; t--) {
      i.addOffset(e[t]);
    }
    return i.endVector();
  }
  static startMatchRoleOptionVector(t, i) {
    t.startVector(4, i, 4);
  }
  static endDestructibleItem(t) {
    return t.endObject();
  }
}
exports.DestructibleItem = DestructibleItem;
//# sourceMappingURL=destructible-item.js.map