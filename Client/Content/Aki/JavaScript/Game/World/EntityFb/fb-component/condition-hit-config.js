"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConditionHitConfig = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const condition_group_js_1 = require("../fb-condition/condition-group.js");
class ConditionHitConfig {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(i, t) {
    this.bb_pos = i;
    this.bb = t;
    return this;
  }
  static getRootAsConditionHitConfig(i, t) {
    return (t || new ConditionHitConfig()).__init(i.readInt32(i.position()) + i.position(), i);
  }
  static getSizePrefixedRootAsConditionHitConfig(i, t) {
    i.setPosition(i.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new ConditionHitConfig()).__init(i.readInt32(i.position()) + i.position(), i);
  }
  conditions(i) {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return (i || new condition_group_js_1.ConditionGroup()).__init(this.bb.__indirect(this.bb_pos + t), this.bb);
    } else {
      return undefined;
    }
  }
  state(i) {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.__string(this.bb_pos + t, i);
    } else {
      return undefined;
    }
  }
  static startConditionHitConfig(i) {
    i.startObject(2);
  }
  static addConditions(i, t) {
    i.addFieldOffset(0, t, 0);
  }
  static addState(i, t) {
    i.addFieldOffset(1, t, 0);
  }
  static endConditionHitConfig(i) {
    return i.endObject();
  }
  static createConditionHitConfig(i, t, o) {
    ConditionHitConfig.startConditionHitConfig(i);
    ConditionHitConfig.addConditions(i, t);
    ConditionHitConfig.addState(i, o);
    return ConditionHitConfig.endConditionHitConfig(i);
  }
}
exports.ConditionHitConfig = ConditionHitConfig;
//# sourceMappingURL=condition-hit-config.js.map