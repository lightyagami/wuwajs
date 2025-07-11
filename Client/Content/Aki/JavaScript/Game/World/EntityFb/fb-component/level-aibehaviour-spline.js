"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelAIBehaviourSpline = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class LevelAIBehaviourSpline {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, i) {
    this.bb_pos = e;
    this.bb = i;
    return this;
  }
  static getRootAsLevelAIBehaviourSpline(e, i) {
    return (i || new LevelAIBehaviourSpline()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsLevelAIBehaviourSpline(e, i) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new LevelAIBehaviourSpline()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  type(e) {
    var i = this.bb.__offset(this.bb_pos, 4);
    if (i) {
      return this.bb.__string(this.bb_pos + i, e);
    } else {
      return undefined;
    }
  }
  splineEntityId() {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return this.bb.readInt32(this.bb_pos + e);
    } else {
      return 0;
    }
  }
  static startLevelAIBehaviourSpline(e) {
    e.startObject(2);
  }
  static addType(e, i) {
    e.addFieldOffset(0, i, 0);
  }
  static addSplineEntityId(e, i) {
    e.addFieldInt32(1, i, 0);
  }
  static endLevelAIBehaviourSpline(e) {
    return e.endObject();
  }
  static createLevelAIBehaviourSpline(e, i, t) {
    LevelAIBehaviourSpline.startLevelAIBehaviourSpline(e);
    LevelAIBehaviourSpline.addType(e, i);
    LevelAIBehaviourSpline.addSplineEntityId(e, t);
    return LevelAIBehaviourSpline.endLevelAIBehaviourSpline(e);
  }
}
exports.LevelAIBehaviourSpline = LevelAIBehaviourSpline;
//# sourceMappingURL=level-aibehaviour-spline.js.map