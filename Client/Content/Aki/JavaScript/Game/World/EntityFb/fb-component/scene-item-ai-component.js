"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SceneItemAiComponent = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const union_scene_item_ai_type_js_1 = require("../fb-component/union-scene-item-ai-type.js");
class SceneItemAiComponent {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, t) {
    this.bb_pos = e;
    this.bb = t;
    return this;
  }
  static getRootAsSceneItemAiComponent(e, t) {
    return (t || new SceneItemAiComponent()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsSceneItemAiComponent(e, t) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new SceneItemAiComponent()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  disabled() {
    var e = this.bb.__offset(this.bb_pos, 4);
    return !!e && !!this.bb.readInt8(this.bb_pos + e);
  }
  aiConfigType() {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return this.bb.readUint8(this.bb_pos + e);
    } else {
      return union_scene_item_ai_type_js_1.UnionSceneItemAiType.NONE;
    }
  }
  aiConfig(e) {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return this.bb.__union(e, this.bb_pos + t);
    } else {
      return undefined;
    }
  }
  static startSceneItemAiComponent(e) {
    e.startObject(3);
  }
  static addDisabled(e, t) {
    e.addFieldInt8(0, +t, 0);
  }
  static addAiConfigType(e, t) {
    e.addFieldInt8(1, t, union_scene_item_ai_type_js_1.UnionSceneItemAiType.NONE);
  }
  static addAiConfig(e, t) {
    e.addFieldOffset(2, t, 0);
  }
  static endSceneItemAiComponent(e) {
    return e.endObject();
  }
  static createSceneItemAiComponent(e, t, n, i) {
    SceneItemAiComponent.startSceneItemAiComponent(e);
    SceneItemAiComponent.addDisabled(e, t);
    SceneItemAiComponent.addAiConfigType(e, n);
    SceneItemAiComponent.addAiConfig(e, i);
    return SceneItemAiComponent.endSceneItemAiComponent(e);
  }
}
exports.SceneItemAiComponent = SceneItemAiComponent;
//# sourceMappingURL=scene-item-ai-component.js.map