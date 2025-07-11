"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EnableSubLevelTransitionWithSceneCapture = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class EnableSubLevelTransitionWithSceneCapture {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, t) {
    this.bb_pos = e;
    this.bb = t;
    return this;
  }
  static getRootAsEnableSubLevelTransitionWithSceneCapture(e, t) {
    return (t || new EnableSubLevelTransitionWithSceneCapture()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsEnableSubLevelTransitionWithSceneCapture(e, t) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new EnableSubLevelTransitionWithSceneCapture()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  type(e) {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.__string(this.bb_pos + t, e);
    } else {
      return undefined;
    }
  }
  sceneCaptureEffect(e) {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.__string(this.bb_pos + t, e);
    } else {
      return undefined;
    }
  }
  screenEffect(e) {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return this.bb.__string(this.bb_pos + t, e);
    } else {
      return undefined;
    }
  }
  screenEffectLoop(e) {
    var t = this.bb.__offset(this.bb_pos, 10);
    if (t) {
      return this.bb.__string(this.bb_pos + t, e);
    } else {
      return undefined;
    }
  }
  static startEnableSubLevelTransitionWithSceneCapture(e) {
    e.startObject(4);
  }
  static addType(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static addSceneCaptureEffect(e, t) {
    e.addFieldOffset(1, t, 0);
  }
  static addScreenEffect(e, t) {
    e.addFieldOffset(2, t, 0);
  }
  static addScreenEffectLoop(e, t) {
    e.addFieldOffset(3, t, 0);
  }
  static endEnableSubLevelTransitionWithSceneCapture(e) {
    return e.endObject();
  }
  static createEnableSubLevelTransitionWithSceneCapture(e, t, i, n, r) {
    EnableSubLevelTransitionWithSceneCapture.startEnableSubLevelTransitionWithSceneCapture(e);
    EnableSubLevelTransitionWithSceneCapture.addType(e, t);
    EnableSubLevelTransitionWithSceneCapture.addSceneCaptureEffect(e, i);
    EnableSubLevelTransitionWithSceneCapture.addScreenEffect(e, n);
    EnableSubLevelTransitionWithSceneCapture.addScreenEffectLoop(e, r);
    return EnableSubLevelTransitionWithSceneCapture.endEnableSubLevelTransitionWithSceneCapture(e);
  }
}
exports.EnableSubLevelTransitionWithSceneCapture = EnableSubLevelTransitionWithSceneCapture;
//# sourceMappingURL=enable-sub-level-transition-with-scene-capture.js.map