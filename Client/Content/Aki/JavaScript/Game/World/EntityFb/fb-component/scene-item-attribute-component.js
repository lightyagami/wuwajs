"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SceneItemAttributeComponent = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class SceneItemAttributeComponent {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsSceneItemAttributeComponent(t, e) {
    return (e || new SceneItemAttributeComponent()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsSceneItemAttributeComponent(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new SceneItemAttributeComponent()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  disabled() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  attributeType(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  static startSceneItemAttributeComponent(t) {
    t.startObject(2);
  }
  static addDisabled(t, e) {
    t.addFieldInt8(0, +e, 0);
  }
  static addAttributeType(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static endSceneItemAttributeComponent(t) {
    return t.endObject();
  }
  static createSceneItemAttributeComponent(t, e, n) {
    SceneItemAttributeComponent.startSceneItemAttributeComponent(t);
    SceneItemAttributeComponent.addDisabled(t, e);
    SceneItemAttributeComponent.addAttributeType(t, n);
    return SceneItemAttributeComponent.endSceneItemAttributeComponent(t);
  }
}
exports.SceneItemAttributeComponent = SceneItemAttributeComponent;
//# sourceMappingURL=scene-item-attribute-component.js.map