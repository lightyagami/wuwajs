"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RaceStrategy = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const condition_group_js_1 = require("../fb-condition/condition-group.js");
class RaceStrategy {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsRaceStrategy(t, i) {
    return (i || new RaceStrategy()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsRaceStrategy(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new RaceStrategy()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    if (i) {
      return this.bb.__string(this.bb_pos + i, t);
    } else {
      return undefined;
    }
  }
  condition(t) {
    var i = this.bb.__offset(this.bb_pos, 6);
    if (i) {
      return (t || new condition_group_js_1.ConditionGroup()).__init(this.bb.__indirect(this.bb_pos + i), this.bb);
    } else {
      return undefined;
    }
  }
  splineEntityId() {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  commonConfig(t) {
    var i = this.bb.__offset(this.bb_pos, 10);
    if (i) {
      return this.bb.__string(this.bb_pos + i, t);
    } else {
      return undefined;
    }
  }
  static startRaceStrategy(t) {
    t.startObject(4);
  }
  static addType(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addCondition(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static addSplineEntityId(t, i) {
    t.addFieldInt32(2, i, 0);
  }
  static addCommonConfig(t, i) {
    t.addFieldOffset(3, i, 0);
  }
  static endRaceStrategy(t) {
    return t.endObject();
  }
}
exports.RaceStrategy = RaceStrategy;
//# sourceMappingURL=race-strategy.js.map