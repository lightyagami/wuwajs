"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HollowCylinderTriggerShape = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const vector_info_js_1 = require("../fb-var/vector-info.js");
class HollowCylinderTriggerShape {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsHollowCylinderTriggerShape(t, i) {
    return (i || new HollowCylinderTriggerShape()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsHollowCylinderTriggerShape(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new HollowCylinderTriggerShape()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    if (i) {
      return this.bb.__string(this.bb_pos + i, t);
    } else {
      return undefined;
    }
  }
  center(t) {
    var i = this.bb.__offset(this.bb_pos, 6);
    if (i) {
      return (t || new vector_info_js_1.VectorInfo()).__init(this.bb.__indirect(this.bb_pos + i), this.bb);
    } else {
      return undefined;
    }
  }
  radius() {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  height() {
    var t = this.bb.__offset(this.bb_pos, 10);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  innerRadius() {
    var t = this.bb.__offset(this.bb_pos, 12);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startHollowCylinderTriggerShape(t) {
    t.startObject(5);
  }
  static addType(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addCenter(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static addRadius(t, i) {
    t.addFieldInt32(2, i, 0);
  }
  static addHeight(t, i) {
    t.addFieldInt32(3, i, 0);
  }
  static addInnerRadius(t, i) {
    t.addFieldInt32(4, i, 0);
  }
  static endHollowCylinderTriggerShape(t) {
    return t.endObject();
  }
}
exports.HollowCylinderTriggerShape = HollowCylinderTriggerShape;
//# sourceMappingURL=hollow-cylinder-trigger-shape.js.map