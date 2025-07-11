"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CurveControlComponent = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const union_curve_control_config_js_1 = require("../fb-component/union-curve-control-config.js");
class CurveControlComponent {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(o, t) {
    this.bb_pos = o;
    this.bb = t;
    return this;
  }
  static getRootAsCurveControlComponent(o, t) {
    return (t || new CurveControlComponent()).__init(o.readInt32(o.position()) + o.position(), o);
  }
  static getSizePrefixedRootAsCurveControlComponent(o, t) {
    o.setPosition(o.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new CurveControlComponent()).__init(o.readInt32(o.position()) + o.position(), o);
  }
  disabled() {
    var o = this.bb.__offset(this.bb_pos, 4);
    return !!o && !!this.bb.readInt8(this.bb_pos + o);
  }
  curveControlConfigType() {
    var o = this.bb.__offset(this.bb_pos, 6);
    if (o) {
      return this.bb.readUint8(this.bb_pos + o);
    } else {
      return union_curve_control_config_js_1.UnionCurveControlConfig.NONE;
    }
  }
  curveControlConfig(o) {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return this.bb.__union(o, this.bb_pos + t);
    } else {
      return undefined;
    }
  }
  static startCurveControlComponent(o) {
    o.startObject(3);
  }
  static addDisabled(o, t) {
    o.addFieldInt8(0, +t, 0);
  }
  static addCurveControlConfigType(o, t) {
    o.addFieldInt8(1, t, union_curve_control_config_js_1.UnionCurveControlConfig.NONE);
  }
  static addCurveControlConfig(o, t) {
    o.addFieldOffset(2, t, 0);
  }
  static endCurveControlComponent(o) {
    return o.endObject();
  }
  static createCurveControlComponent(o, t, n, r) {
    CurveControlComponent.startCurveControlComponent(o);
    CurveControlComponent.addDisabled(o, t);
    CurveControlComponent.addCurveControlConfigType(o, n);
    CurveControlComponent.addCurveControlConfig(o, r);
    return CurveControlComponent.endCurveControlComponent(o);
  }
}
exports.CurveControlComponent = CurveControlComponent;
//# sourceMappingURL=curve-control-component.js.map