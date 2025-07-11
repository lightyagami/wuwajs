"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelAISpline = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const level_aispline_point_js_1 = require("../fb-component/level-aispline-point.js");
const union_level_ai_cycle_option_js_1 = require("../fb-component/union-level-ai-cycle-option.js");
class LevelAISpline {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, t) {
    this.bb_pos = e;
    this.bb = t;
    return this;
  }
  static getRootAsLevelAISpline(e, t) {
    return (t || new LevelAISpline()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsLevelAISpline(e, t) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new LevelAISpline()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  type(e) {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.__string(this.bb_pos + t, e);
    } else {
      return undefined;
    }
  }
  entityId() {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return this.bb.readInt32(this.bb_pos + e);
    } else {
      return 0;
    }
  }
  cycleOptionType() {
    var e = this.bb.__offset(this.bb_pos, 8);
    if (e) {
      return this.bb.readUint8(this.bb_pos + e);
    } else {
      return union_level_ai_cycle_option_js_1.UnionLevelAiCycleOption.NONE;
    }
  }
  cycleOption(e) {
    var t = this.bb.__offset(this.bb_pos, 10);
    if (t) {
      return this.bb.__union(e, this.bb_pos + t);
    } else {
      return undefined;
    }
  }
  usePathFinding() {
    var e = this.bb.__offset(this.bb_pos, 12);
    return !!e && !!this.bb.readInt8(this.bb_pos + e);
  }
  isPassEveryKeyPoint() {
    var e = this.bb.__offset(this.bb_pos, 14);
    return !!e && !!this.bb.readInt8(this.bb_pos + e);
  }
  points(e, t) {
    var i = this.bb.__offset(this.bb_pos, 16);
    if (i) {
      return (t || new level_aispline_point_js_1.LevelAISplinePoint()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + i) + e * 4), this.bb);
    } else {
      return undefined;
    }
  }
  pointsLength() {
    var e = this.bb.__offset(this.bb_pos, 16);
    if (e) {
      return this.bb.__vector_len(this.bb_pos + e);
    } else {
      return 0;
    }
  }
  static startLevelAISpline(e) {
    e.startObject(7);
  }
  static addType(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static addEntityId(e, t) {
    e.addFieldInt32(1, t, 0);
  }
  static addCycleOptionType(e, t) {
    e.addFieldInt8(2, t, union_level_ai_cycle_option_js_1.UnionLevelAiCycleOption.NONE);
  }
  static addCycleOption(e, t) {
    e.addFieldOffset(3, t, 0);
  }
  static addUsePathFinding(e, t) {
    e.addFieldInt8(4, +t, 0);
  }
  static addIsPassEveryKeyPoint(e, t) {
    e.addFieldInt8(5, +t, 0);
  }
  static addPoints(e, t) {
    e.addFieldOffset(6, t, 0);
  }
  static createPointsVector(t, i) {
    t.startVector(4, i.length, 4);
    for (let e = i.length - 1; e >= 0; e--) {
      t.addOffset(i[e]);
    }
    return t.endVector();
  }
  static startPointsVector(e, t) {
    e.startVector(4, t, 4);
  }
  static endLevelAISpline(e) {
    return e.endObject();
  }
  static createLevelAISpline(e, t, i, s, n, l, r, a) {
    LevelAISpline.startLevelAISpline(e);
    LevelAISpline.addType(e, t);
    LevelAISpline.addEntityId(e, i);
    LevelAISpline.addCycleOptionType(e, s);
    LevelAISpline.addCycleOption(e, n);
    LevelAISpline.addUsePathFinding(e, l);
    LevelAISpline.addIsPassEveryKeyPoint(e, r);
    LevelAISpline.addPoints(e, a);
    return LevelAISpline.endLevelAISpline(e);
  }
}
exports.LevelAISpline = LevelAISpline;
//# sourceMappingURL=level-aispline.js.map