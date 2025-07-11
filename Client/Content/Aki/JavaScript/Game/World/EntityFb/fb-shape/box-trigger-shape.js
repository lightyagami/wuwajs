"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BoxTriggerShape = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const vector_info_js_1 = require("../fb-var/vector-info.js");
class BoxTriggerShape {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsBoxTriggerShape(t, e) {
    return (e || new BoxTriggerShape()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsBoxTriggerShape(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new BoxTriggerShape()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  center(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return (t || new vector_info_js_1.VectorInfo()).__init(this.bb.__indirect(this.bb_pos + e), this.bb);
    } else {
      return undefined;
    }
  }
  size(t) {
    var e = this.bb.__offset(this.bb_pos, 8);
    if (e) {
      return (t || new vector_info_js_1.VectorInfo()).__init(this.bb.__indirect(this.bb_pos + e), this.bb);
    } else {
      return undefined;
    }
  }
  rotator(t) {
    var e = this.bb.__offset(this.bb_pos, 10);
    if (e) {
      return (t || new vector_info_js_1.VectorInfo()).__init(this.bb.__indirect(this.bb_pos + e), this.bb);
    } else {
      return undefined;
    }
  }
  static startBoxTriggerShape(t) {
    t.startObject(4);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addCenter(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static addSize(t, e) {
    t.addFieldOffset(2, e, 0);
  }
  static addRotator(t, e) {
    t.addFieldOffset(3, e, 0);
  }
  static endBoxTriggerShape(t) {
    return t.endObject();
  }
}
exports.BoxTriggerShape = BoxTriggerShape;
//# sourceMappingURL=box-trigger-shape.js.map