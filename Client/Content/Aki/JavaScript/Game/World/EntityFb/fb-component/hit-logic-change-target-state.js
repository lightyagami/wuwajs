"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HitLogicChangeTargetState = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const condition_hit_config_js_1 = require("../fb-component/condition-hit-config.js");
const condition_hit_config_with_bullet_js_1 = require("../fb-component/condition-hit-config-with-bullet.js");
class HitLogicChangeTargetState {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsHitLogicChangeTargetState(t, i) {
    return (i || new HitLogicChangeTargetState()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsHitLogicChangeTargetState(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new HitLogicChangeTargetState()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    if (i) {
      return this.bb.__string(this.bb_pos + i, t);
    } else {
      return undefined;
    }
  }
  targetBulletHitConfigs(t, i) {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return (i || new condition_hit_config_with_bullet_js_1.ConditionHitConfigWithBullet()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + e) + t * 4), this.bb);
    } else {
      return undefined;
    }
  }
  targetBulletHitConfigsLength() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  otherBulletsHitConfig(t, i) {
    var e = this.bb.__offset(this.bb_pos, 8);
    if (e) {
      return (i || new condition_hit_config_js_1.ConditionHitConfig()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + e) + t * 4), this.bb);
    } else {
      return undefined;
    }
  }
  otherBulletsHitConfigLength() {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startHitLogicChangeTargetState(t) {
    t.startObject(3);
  }
  static addType(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addTargetBulletHitConfigs(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static createTargetBulletHitConfigsVector(i, e) {
    i.startVector(4, e.length, 4);
    for (let t = e.length - 1; t >= 0; t--) {
      i.addOffset(e[t]);
    }
    return i.endVector();
  }
  static startTargetBulletHitConfigsVector(t, i) {
    t.startVector(4, i, 4);
  }
  static addOtherBulletsHitConfig(t, i) {
    t.addFieldOffset(2, i, 0);
  }
  static createOtherBulletsHitConfigVector(i, e) {
    i.startVector(4, e.length, 4);
    for (let t = e.length - 1; t >= 0; t--) {
      i.addOffset(e[t]);
    }
    return i.endVector();
  }
  static startOtherBulletsHitConfigVector(t, i) {
    t.startVector(4, i, 4);
  }
  static endHitLogicChangeTargetState(t) {
    return t.endObject();
  }
  static createHitLogicChangeTargetState(t, i, e, r) {
    HitLogicChangeTargetState.startHitLogicChangeTargetState(t);
    HitLogicChangeTargetState.addType(t, i);
    HitLogicChangeTargetState.addTargetBulletHitConfigs(t, e);
    HitLogicChangeTargetState.addOtherBulletsHitConfig(t, r);
    return HitLogicChangeTargetState.endHitLogicChangeTargetState(t);
  }
}
exports.HitLogicChangeTargetState = HitLogicChangeTargetState;
//# sourceMappingURL=hit-logic-change-target-state.js.map