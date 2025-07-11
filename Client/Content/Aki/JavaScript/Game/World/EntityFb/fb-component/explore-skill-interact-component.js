"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExploreSkillInteractComponent = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const ignores_collision_cfg_js_1 = require("../fb-component/ignores-collision-cfg.js");
const union_explore_skill_interact_option_js_1 = require("../fb-component/union-explore-skill-interact-option.js");
const union_explore_skill_search_target_cfg_js_1 = require("../fb-component/union-explore-skill-search-target-cfg.js");
class ExploreSkillInteractComponent {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsExploreSkillInteractComponent(t, i) {
    return (i || new ExploreSkillInteractComponent()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsExploreSkillInteractComponent(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new ExploreSkillInteractComponent()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  disabled() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  exploreSkillUiResource(t) {
    var i = this.bb.__offset(this.bb_pos, 6);
    if (i) {
      return this.bb.__string(this.bb_pos + i, t);
    } else {
      return undefined;
    }
  }
  optionType() {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return union_explore_skill_interact_option_js_1.UnionExploreSkillInteractOption.NONE;
    }
  }
  option(t) {
    var i = this.bb.__offset(this.bb_pos, 10);
    if (i) {
      return this.bb.__union(t, this.bb_pos + i);
    } else {
      return undefined;
    }
  }
  playerStateRestritionId() {
    var t = this.bb.__offset(this.bb_pos, 12);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  matchRoleOptionType(t) {
    var i = this.bb.__offset(this.bb_pos, 14);
    if (i) {
      return this.bb.readUint8(this.bb.__vector(this.bb_pos + i) + t);
    } else {
      return 0;
    }
  }
  matchRoleOptionTypeLength() {
    var t = this.bb.__offset(this.bb_pos, 14);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  matchRoleOptionTypeArray() {
    var t = this.bb.__offset(this.bb_pos, 14);
    if (t) {
      return new Uint8Array(this.bb.bytes().buffer, this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + t), this.bb.__vector_len(this.bb_pos + t));
    } else {
      return undefined;
    }
  }
  matchRoleOption(t, i) {
    var e = this.bb.__offset(this.bb_pos, 16);
    if (e) {
      return this.bb.__union(i, this.bb.__vector(this.bb_pos + e) + t * 4);
    } else {
      return undefined;
    }
  }
  matchRoleOptionLength() {
    var t = this.bb.__offset(this.bb_pos, 16);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  searchTargetCfgType() {
    var t = this.bb.__offset(this.bb_pos, 18);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return union_explore_skill_search_target_cfg_js_1.UnionExploreSkillSearchTargetCfg.NONE;
    }
  }
  searchTargetCfg(t) {
    var i = this.bb.__offset(this.bb_pos, 20);
    if (i) {
      return this.bb.__union(t, this.bb_pos + i);
    } else {
      return undefined;
    }
  }
  ignoresCollisionCfg(t) {
    var i = this.bb.__offset(this.bb_pos, 22);
    if (i) {
      return (t || new ignores_collision_cfg_js_1.IgnoresCollisionCfg()).__init(this.bb.__indirect(this.bb_pos + i), this.bb);
    } else {
      return undefined;
    }
  }
  static startExploreSkillInteractComponent(t) {
    t.startObject(10);
  }
  static addDisabled(t, i) {
    t.addFieldInt8(0, +i, 0);
  }
  static addExploreSkillUiResource(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static addOptionType(t, i) {
    t.addFieldInt8(2, i, union_explore_skill_interact_option_js_1.UnionExploreSkillInteractOption.NONE);
  }
  static addOption(t, i) {
    t.addFieldOffset(3, i, 0);
  }
  static addPlayerStateRestritionId(t, i) {
    t.addFieldInt32(4, i, 0);
  }
  static addMatchRoleOptionType(t, i) {
    t.addFieldOffset(5, i, 0);
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
    t.addFieldOffset(6, i, 0);
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
  static addSearchTargetCfgType(t, i) {
    t.addFieldInt8(7, i, union_explore_skill_search_target_cfg_js_1.UnionExploreSkillSearchTargetCfg.NONE);
  }
  static addSearchTargetCfg(t, i) {
    t.addFieldOffset(8, i, 0);
  }
  static addIgnoresCollisionCfg(t, i) {
    t.addFieldOffset(9, i, 0);
  }
  static endExploreSkillInteractComponent(t) {
    return t.endObject();
  }
}
exports.ExploreSkillInteractComponent = ExploreSkillInteractComponent;
//# sourceMappingURL=explore-skill-interact-component.js.map