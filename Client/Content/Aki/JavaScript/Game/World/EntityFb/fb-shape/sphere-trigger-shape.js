"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SphereTriggerShape = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const vector_info_js_1 = require("../fb-var/vector-info.js");
class SphereTriggerShape {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, t) {
    this.bb_pos = e;
    this.bb = t;
    return this;
  }
  static getRootAsSphereTriggerShape(e, t) {
    return (t || new SphereTriggerShape()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsSphereTriggerShape(e, t) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new SphereTriggerShape()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  type(e) {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.__string(this.bb_pos + t, e);
    } else {
      return undefined;
    }
  }
  center(e) {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return (e || new vector_info_js_1.VectorInfo()).__init(this.bb.__indirect(this.bb_pos + t), this.bb);
    } else {
      return undefined;
    }
  }
  radius() {
    var e = this.bb.__offset(this.bb_pos, 8);
    if (e) {
      return this.bb.readInt32(this.bb_pos + e);
    } else {
      return 0;
    }
  }
  static startSphereTriggerShape(e) {
    e.startObject(3);
  }
  static addType(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static addCenter(e, t) {
    e.addFieldOffset(1, t, 0);
  }
  static addRadius(e, t) {
    e.addFieldInt32(2, t, 0);
  }
  static endSphereTriggerShape(e) {
    return e.endObject();
  }
}
exports.SphereTriggerShape = SphereTriggerShape;
//# sourceMappingURL=sphere-trigger-shape.js.map