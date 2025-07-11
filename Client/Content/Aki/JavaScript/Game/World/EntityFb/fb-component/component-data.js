"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ComponentData = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const component_item_js_1 = require("../fb-component/component-item.js");
class ComponentData {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsComponentData(t, e) {
    return (e || new ComponentData()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsComponentData(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new ComponentData()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  components(t, e) {
    var n = this.bb.__offset(this.bb_pos, 4);
    if (n) {
      return (e || new component_item_js_1.ComponentItem()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + n) + t * 4), this.bb);
    } else {
      return undefined;
    }
  }
  componentsLength() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startComponentData(t) {
    t.startObject(1);
  }
  static addComponents(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static createComponentsVector(e, n) {
    e.startVector(4, n.length, 4);
    for (let t = n.length - 1; t >= 0; t--) {
      e.addOffset(n[t]);
    }
    return e.endVector();
  }
  static startComponentsVector(t, e) {
    t.startVector(4, e, 4);
  }
  static endComponentData(t) {
    return t.endObject();
  }
  static finishComponentDataBuffer(t, e) {
    t.finish(e);
  }
  static finishSizePrefixedComponentDataBuffer(t, e) {
    t.finish(e, undefined, true);
  }
  static createComponentData(t, e) {
    ComponentData.startComponentData(t);
    ComponentData.addComponents(t, e);
    return ComponentData.endComponentData(t);
  }
}
exports.ComponentData = ComponentData;
//# sourceMappingURL=component-data.js.map