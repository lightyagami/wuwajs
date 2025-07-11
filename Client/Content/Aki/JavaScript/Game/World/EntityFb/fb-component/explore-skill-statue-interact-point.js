"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExploreSkillStatueInteractPoint = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class ExploreSkillStatueInteractPoint {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsExploreSkillStatueInteractPoint(t, i) {
    return (i || new ExploreSkillStatueInteractPoint()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsExploreSkillStatueInteractPoint(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new ExploreSkillStatueInteractPoint()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    if (i) {
      return this.bb.__string(this.bb_pos + i, t);
    } else {
      return undefined;
    }
  }
  pullTime() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.readFloat32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  hangingPointList(t, i) {
    var e = this.bb.__offset(this.bb_pos, 8);
    if (e) {
      return this.bb.__string(this.bb.__vector(this.bb_pos + e) + t * 4, i);
    } else {
      return undefined;
    }
  }
  hangingPointListLength() {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startExploreSkillStatueInteractPoint(t) {
    t.startObject(3);
  }
  static addType(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addPullTime(t, i) {
    t.addFieldFloat32(1, i, 0);
  }
  static addHangingPointList(t, i) {
    t.addFieldOffset(2, i, 0);
  }
  static createHangingPointListVector(i, e) {
    i.startVector(4, e.length, 4);
    for (let t = e.length - 1; t >= 0; t--) {
      i.addOffset(e[t]);
    }
    return i.endVector();
  }
  static startHangingPointListVector(t, i) {
    t.startVector(4, i, 4);
  }
  static endExploreSkillStatueInteractPoint(t) {
    return t.endObject();
  }
  static createExploreSkillStatueInteractPoint(t, i, e, r) {
    ExploreSkillStatueInteractPoint.startExploreSkillStatueInteractPoint(t);
    ExploreSkillStatueInteractPoint.addType(t, i);
    ExploreSkillStatueInteractPoint.addPullTime(t, e);
    ExploreSkillStatueInteractPoint.addHangingPointList(t, r);
    return ExploreSkillStatueInteractPoint.endExploreSkillStatueInteractPoint(t);
  }
}
exports.ExploreSkillStatueInteractPoint = ExploreSkillStatueInteractPoint;
//# sourceMappingURL=explore-skill-statue-interact-point.js.map