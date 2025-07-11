"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RangeComponent = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const union_trigger_shape_js_1 = require("../fb-shape/union-trigger-shape.js");
class RangeComponent {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsRangeComponent(t, e) {
    return (e || new RangeComponent()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsRangeComponent(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new RangeComponent()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  disabled() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  shapeType() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return union_trigger_shape_js_1.UnionTriggerShape.NONE;
    }
  }
  shape(t) {
    var e = this.bb.__offset(this.bb_pos, 8);
    if (e) {
      return this.bb.__union(t, this.bb_pos + e);
    } else {
      return undefined;
    }
  }
  extraRange() {
    var t = this.bb.__offset(this.bb_pos, 10);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startRangeComponent(t) {
    t.startObject(4);
  }
  static addDisabled(t, e) {
    t.addFieldInt8(0, +e, 0);
  }
  static addShapeType(t, e) {
    t.addFieldInt8(1, e, union_trigger_shape_js_1.UnionTriggerShape.NONE);
  }
  static addShape(t, e) {
    t.addFieldOffset(2, e, 0);
  }
  static addExtraRange(t, e) {
    t.addFieldInt32(3, e, 0);
  }
  static endRangeComponent(t) {
    return t.endObject();
  }
  static createRangeComponent(t, e, n, s, a) {
    RangeComponent.startRangeComponent(t);
    RangeComponent.addDisabled(t, e);
    RangeComponent.addShapeType(t, n);
    RangeComponent.addShape(t, s);
    RangeComponent.addExtraRange(t, a);
    return RangeComponent.endRangeComponent(t);
  }
}
exports.RangeComponent = RangeComponent;
//# sourceMappingURL=range-component.js.map