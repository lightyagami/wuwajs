"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RangeAdsorptionFoundation = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const adsorption_matching_animation_js_1 = require("../fb-component/adsorption-matching-animation.js");
const category_matching_animation_js_1 = require("../fb-component/category-matching-animation.js");
const category_matching_condition_js_1 = require("../fb-component/category-matching-condition.js");
const category_matching_succeed_js_1 = require("../fb-component/category-matching-succeed.js");
class RangeAdsorptionFoundation {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsRangeAdsorptionFoundation(t, i) {
    return (i || new RangeAdsorptionFoundation()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsRangeAdsorptionFoundation(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new RangeAdsorptionFoundation()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    if (i) {
      return this.bb.__string(this.bb_pos + i, t);
    } else {
      return undefined;
    }
  }
  condition(t) {
    var i = this.bb.__offset(this.bb_pos, 6);
    if (i) {
      return (t || new category_matching_condition_js_1.CategoryMatchingCondition()).__init(this.bb.__indirect(this.bb_pos + i), this.bb);
    } else {
      return undefined;
    }
  }
  animation(t) {
    var i = this.bb.__offset(this.bb_pos, 8);
    if (i) {
      return (t || new adsorption_matching_animation_js_1.AdsorptionMatchingAnimation()).__init(this.bb.__indirect(this.bb_pos + i), this.bb);
    } else {
      return undefined;
    }
  }
  categoryAnimation(t) {
    var i = this.bb.__offset(this.bb_pos, 10);
    if (i) {
      return (t || new category_matching_animation_js_1.CategoryMatchingAnimation()).__init(this.bb.__indirect(this.bb_pos + i), this.bb);
    } else {
      return undefined;
    }
  }
  callback(t) {
    var i = this.bb.__offset(this.bb_pos, 12);
    if (i) {
      return (t || new category_matching_succeed_js_1.CategoryMatchingSucceed()).__init(this.bb.__indirect(this.bb_pos + i), this.bb);
    } else {
      return undefined;
    }
  }
  static startRangeAdsorptionFoundation(t) {
    t.startObject(5);
  }
  static addType(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addCondition(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static addAnimation(t, i) {
    t.addFieldOffset(2, i, 0);
  }
  static addCategoryAnimation(t, i) {
    t.addFieldOffset(3, i, 0);
  }
  static addCallback(t, i) {
    t.addFieldOffset(4, i, 0);
  }
  static endRangeAdsorptionFoundation(t) {
    return t.endObject();
  }
}
exports.RangeAdsorptionFoundation = RangeAdsorptionFoundation;
//# sourceMappingURL=range-adsorption-foundation.js.map