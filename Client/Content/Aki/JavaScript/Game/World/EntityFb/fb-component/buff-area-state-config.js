"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BuffAreaStateConfig = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const condition_group_js_1 = require("../fb-condition/condition-group.js");
class BuffAreaStateConfig {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsBuffAreaStateConfig(t, i) {
    return (i || new BuffAreaStateConfig()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsBuffAreaStateConfig(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new BuffAreaStateConfig()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  state(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    if (i) {
      return this.bb.__string(this.bb_pos + i, t);
    } else {
      return undefined;
    }
  }
  buffIds(t) {
    var i = this.bb.__offset(this.bb_pos, 6);
    if (i) {
      return this.bb.readInt64(this.bb.__vector(this.bb_pos + i) + t * 8);
    } else {
      return BigInt(0);
    }
  }
  buffIdsLength() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  condition(t) {
    var i = this.bb.__offset(this.bb_pos, 8);
    if (i) {
      return (t || new condition_group_js_1.ConditionGroup()).__init(this.bb.__indirect(this.bb_pos + i), this.bb);
    } else {
      return undefined;
    }
  }
  static startBuffAreaStateConfig(t) {
    t.startObject(3);
  }
  static addState(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addBuffIds(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static createBuffIdsVector(i, s) {
    i.startVector(8, s.length, 8);
    for (let t = s.length - 1; t >= 0; t--) {
      i.addInt64(s[t]);
    }
    return i.endVector();
  }
  static startBuffIdsVector(t, i) {
    t.startVector(8, i, 8);
  }
  static addCondition(t, i) {
    t.addFieldOffset(2, i, 0);
  }
  static endBuffAreaStateConfig(t) {
    return t.endObject();
  }
}
exports.BuffAreaStateConfig = BuffAreaStateConfig;
//# sourceMappingURL=buff-area-state-config.js.map