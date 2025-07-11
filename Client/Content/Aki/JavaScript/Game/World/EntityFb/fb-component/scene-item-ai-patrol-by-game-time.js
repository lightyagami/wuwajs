"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SceneItemAiPatrolByGameTime = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class SceneItemAiPatrolByGameTime {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, t) {
    this.bb_pos = e;
    this.bb = t;
    return this;
  }
  static getRootAsSceneItemAiPatrolByGameTime(e, t) {
    return (t || new SceneItemAiPatrolByGameTime()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsSceneItemAiPatrolByGameTime(e, t) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new SceneItemAiPatrolByGameTime()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  type(e) {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.__string(this.bb_pos + t, e);
    } else {
      return undefined;
    }
  }
  spline() {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return this.bb.readInt32(this.bb_pos + e);
    } else {
      return 0;
    }
  }
  static startSceneItemAiPatrolByGameTime(e) {
    e.startObject(2);
  }
  static addType(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static addSpline(e, t) {
    e.addFieldInt32(1, t, 0);
  }
  static endSceneItemAiPatrolByGameTime(e) {
    return e.endObject();
  }
  static createSceneItemAiPatrolByGameTime(e, t, i) {
    SceneItemAiPatrolByGameTime.startSceneItemAiPatrolByGameTime(e);
    SceneItemAiPatrolByGameTime.addType(e, t);
    SceneItemAiPatrolByGameTime.addSpline(e, i);
    return SceneItemAiPatrolByGameTime.endSceneItemAiPatrolByGameTime(e);
  }
}
exports.SceneItemAiPatrolByGameTime = SceneItemAiPatrolByGameTime;
//# sourceMappingURL=scene-item-ai-patrol-by-game-time.js.map