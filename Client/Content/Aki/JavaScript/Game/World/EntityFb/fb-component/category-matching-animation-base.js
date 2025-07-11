"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CategoryMatchingAnimationBase = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const vector_info_js_1 = require("../fb-var/vector-info.js");
class CategoryMatchingAnimationBase {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsCategoryMatchingAnimationBase(t, i) {
    return (i || new CategoryMatchingAnimationBase()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsCategoryMatchingAnimationBase(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new CategoryMatchingAnimationBase()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  matchPos(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    if (i) {
      return (t || new vector_info_js_1.VectorInfo()).__init(this.bb.__indirect(this.bb_pos + i), this.bb);
    } else {
      return undefined;
    }
  }
  matchRot(t) {
    var i = this.bb.__offset(this.bb_pos, 6);
    if (i) {
      return (t || new vector_info_js_1.VectorInfo()).__init(this.bb.__indirect(this.bb_pos + i), this.bb);
    } else {
      return undefined;
    }
  }
  matchReferenceKey(t) {
    var i = this.bb.__offset(this.bb_pos, 8);
    if (i) {
      return this.bb.__string(this.bb_pos + i, t);
    } else {
      return undefined;
    }
  }
  static startCategoryMatchingAnimationBase(t) {
    t.startObject(3);
  }
  static addMatchPos(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addMatchRot(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static addMatchReferenceKey(t, i) {
    t.addFieldOffset(2, i, 0);
  }
  static endCategoryMatchingAnimationBase(t) {
    return t.endObject();
  }
}
exports.CategoryMatchingAnimationBase = CategoryMatchingAnimationBase;
//# sourceMappingURL=category-matching-animation-base.js.map