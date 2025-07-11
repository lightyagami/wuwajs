"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EffectSpline = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const common_spline_point_js_1 = require("../fb-component/common-spline-point.js");
const union_effect_spline_create_option_js_1 = require("../fb-component/union-effect-spline-create-option.js");
class EffectSpline {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsEffectSpline(t, e) {
    return (e || new EffectSpline()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsEffectSpline(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new EffectSpline()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  effect(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  createOptionType() {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return union_effect_spline_create_option_js_1.UnionEffectSplineCreateOption.NONE;
    }
  }
  createOption(t) {
    var e = this.bb.__offset(this.bb_pos, 10);
    if (e) {
      return this.bb.__union(t, this.bb_pos + e);
    } else {
      return undefined;
    }
  }
  points(t, e) {
    var i = this.bb.__offset(this.bb_pos, 12);
    if (i) {
      return (e || new common_spline_point_js_1.CommonSplinePoint()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + i) + t * 4), this.bb);
    } else {
      return undefined;
    }
  }
  pointsLength() {
    var t = this.bb.__offset(this.bb_pos, 12);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startEffectSpline(t) {
    t.startObject(5);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addEffect(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static addCreateOptionType(t, e) {
    t.addFieldInt8(2, e, union_effect_spline_create_option_js_1.UnionEffectSplineCreateOption.NONE);
  }
  static addCreateOption(t, e) {
    t.addFieldOffset(3, e, 0);
  }
  static addPoints(t, e) {
    t.addFieldOffset(4, e, 0);
  }
  static createPointsVector(e, i) {
    e.startVector(4, i.length, 4);
    for (let t = i.length - 1; t >= 0; t--) {
      e.addOffset(i[t]);
    }
    return e.endVector();
  }
  static startPointsVector(t, e) {
    t.startVector(4, e, 4);
  }
  static endEffectSpline(t) {
    return t.endObject();
  }
  static createEffectSpline(t, e, i, s, n, r) {
    EffectSpline.startEffectSpline(t);
    EffectSpline.addType(t, e);
    EffectSpline.addEffect(t, i);
    EffectSpline.addCreateOptionType(t, s);
    EffectSpline.addCreateOption(t, n);
    EffectSpline.addPoints(t, r);
    return EffectSpline.endEffectSpline(t);
  }
}
exports.EffectSpline = EffectSpline;
//# sourceMappingURL=effect-spline.js.map