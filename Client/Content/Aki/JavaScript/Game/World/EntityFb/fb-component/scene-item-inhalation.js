"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SceneItemInhalation = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class SceneItemInhalation {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsSceneItemInhalation(t, e) {
    return (e || new SceneItemInhalation()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsSceneItemInhalation(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new SceneItemInhalation()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  static startSceneItemInhalation(t) {
    t.startObject(1);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static endSceneItemInhalation(t) {
    return t.endObject();
  }
  static createSceneItemInhalation(t, e) {
    SceneItemInhalation.startSceneItemInhalation(t);
    SceneItemInhalation.addType(t, e);
    return SceneItemInhalation.endSceneItemInhalation(t);
  }
}
exports.SceneItemInhalation = SceneItemInhalation;
//# sourceMappingURL=scene-item-inhalation.js.map