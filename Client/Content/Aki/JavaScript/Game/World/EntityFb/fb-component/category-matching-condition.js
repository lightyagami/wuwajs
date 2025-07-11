"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CategoryMatchingCondition = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const dynamic_entity_match_js_1 = require("../fb-component/dynamic-entity-match.js");
class CategoryMatchingCondition {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsCategoryMatchingCondition(t, i) {
    return (i || new CategoryMatchingCondition()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsCategoryMatchingCondition(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new CategoryMatchingCondition()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  entityMatch(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    if (i) {
      return (t || new dynamic_entity_match_js_1.DynamicEntityMatch()).__init(this.bb.__indirect(this.bb_pos + i), this.bb);
    } else {
      return undefined;
    }
  }
  selfState(t) {
    var i = this.bb.__offset(this.bb_pos, 6);
    if (i) {
      return this.bb.__string(this.bb_pos + i, t);
    } else {
      return undefined;
    }
  }
  static startCategoryMatchingCondition(t) {
    t.startObject(2);
  }
  static addEntityMatch(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addSelfState(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static endCategoryMatchingCondition(t) {
    return t.endObject();
  }
  static createCategoryMatchingCondition(t, i, n) {
    CategoryMatchingCondition.startCategoryMatchingCondition(t);
    CategoryMatchingCondition.addEntityMatch(t, i);
    CategoryMatchingCondition.addSelfState(t, n);
    return CategoryMatchingCondition.endCategoryMatchingCondition(t);
  }
}
exports.CategoryMatchingCondition = CategoryMatchingCondition;
//# sourceMappingURL=category-matching-condition.js.map