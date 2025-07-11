"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RenjuStrategy = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const condition_group_js_1 = require("../fb-condition/condition-group.js");
class RenjuStrategy {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsRenjuStrategy(t, i) {
    return (i || new RenjuStrategy()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsRenjuStrategy(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new RenjuStrategy()).__init(t.readInt32(t.position()) + t.position(), t);
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
  chessboard() {
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
  static startRenjuStrategy(t) {
    t.startObject(4);
  }
  static addType(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addCondition(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static addChessboard(t, i) {
    t.addFieldInt32(2, i, 0);
  }
  static addCommonConfig(t, i) {
    t.addFieldOffset(3, i, 0);
  }
  static endRenjuStrategy(t) {
    return t.endObject();
  }
}
exports.RenjuStrategy = RenjuStrategy;
//# sourceMappingURL=renju-strategy.js.map