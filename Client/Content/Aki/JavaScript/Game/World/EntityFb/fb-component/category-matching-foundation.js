"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CategoryMatchingFoundation = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const category_matching_config_js_1 = require("../fb-component/category-matching-config.js");
class CategoryMatchingFoundation {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsCategoryMatchingFoundation(t, i) {
    return (i || new CategoryMatchingFoundation()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsCategoryMatchingFoundation(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new CategoryMatchingFoundation()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    if (i) {
      return this.bb.__string(this.bb_pos + i, t);
    } else {
      return undefined;
    }
  }
  initMatchEntity() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  matchingConfigs(t, i) {
    var n = this.bb.__offset(this.bb_pos, 8);
    if (n) {
      return (i || new category_matching_config_js_1.CategoryMatchingConfig()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + n) + t * 4), this.bb);
    } else {
      return undefined;
    }
  }
  matchingConfigsLength() {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startCategoryMatchingFoundation(t) {
    t.startObject(3);
  }
  static addType(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addInitMatchEntity(t, i) {
    t.addFieldInt32(1, i, 0);
  }
  static addMatchingConfigs(t, i) {
    t.addFieldOffset(2, i, 0);
  }
  static createMatchingConfigsVector(i, n) {
    i.startVector(4, n.length, 4);
    for (let t = n.length - 1; t >= 0; t--) {
      i.addOffset(n[t]);
    }
    return i.endVector();
  }
  static startMatchingConfigsVector(t, i) {
    t.startVector(4, i, 4);
  }
  static endCategoryMatchingFoundation(t) {
    return t.endObject();
  }
  static createCategoryMatchingFoundation(t, i, n, a) {
    CategoryMatchingFoundation.startCategoryMatchingFoundation(t);
    CategoryMatchingFoundation.addType(t, i);
    CategoryMatchingFoundation.addInitMatchEntity(t, n);
    CategoryMatchingFoundation.addMatchingConfigs(t, a);
    return CategoryMatchingFoundation.endCategoryMatchingFoundation(t);
  }
}
exports.CategoryMatchingFoundation = CategoryMatchingFoundation;
//# sourceMappingURL=category-matching-foundation.js.map