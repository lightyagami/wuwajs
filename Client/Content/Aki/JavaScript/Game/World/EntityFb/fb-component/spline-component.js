"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SplineComponent = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const union_spline_option_js_1 = require("../fb-component/union-spline-option.js");
class SplineComponent {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, n) {
    this.bb_pos = t;
    this.bb = n;
    return this;
  }
  static getRootAsSplineComponent(t, n) {
    return (n || new SplineComponent()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsSplineComponent(t, n) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (n || new SplineComponent()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  disabled() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  optionType() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return union_spline_option_js_1.UnionSplineOption.NONE;
    }
  }
  option(t) {
    var n = this.bb.__offset(this.bb_pos, 8);
    if (n) {
      return this.bb.__union(t, this.bb_pos + n);
    } else {
      return undefined;
    }
  }
  static startSplineComponent(t) {
    t.startObject(3);
  }
  static addDisabled(t, n) {
    t.addFieldInt8(0, +n, 0);
  }
  static addOptionType(t, n) {
    t.addFieldInt8(1, n, union_spline_option_js_1.UnionSplineOption.NONE);
  }
  static addOption(t, n) {
    t.addFieldOffset(2, n, 0);
  }
  static endSplineComponent(t) {
    return t.endObject();
  }
  static createSplineComponent(t, n, e, i) {
    SplineComponent.startSplineComponent(t);
    SplineComponent.addDisabled(t, n);
    SplineComponent.addOptionType(t, e);
    SplineComponent.addOption(t, i);
    return SplineComponent.endSplineComponent(t);
  }
}
exports.SplineComponent = SplineComponent;
//# sourceMappingURL=spline-component.js.map