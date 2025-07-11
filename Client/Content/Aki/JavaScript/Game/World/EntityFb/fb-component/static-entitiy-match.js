"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StaticEntitiyMatch = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const entity_category_js_1 = require("../fb-component/entity-category.js");
class StaticEntitiyMatch {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsStaticEntitiyMatch(t, i) {
    return (i || new StaticEntitiyMatch()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsStaticEntitiyMatch(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new StaticEntitiyMatch()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  category(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    if (i) {
      return (t || new entity_category_js_1.EntityCategory()).__init(this.bb.__indirect(this.bb_pos + i), this.bb);
    } else {
      return undefined;
    }
  }
  categoryType(t) {
    var i = this.bb.__offset(this.bb_pos, 6);
    if (i) {
      return this.bb.__string(this.bb_pos + i, t);
    } else {
      return undefined;
    }
  }
  static startStaticEntitiyMatch(t) {
    t.startObject(2);
  }
  static addCategory(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addCategoryType(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static endStaticEntitiyMatch(t) {
    return t.endObject();
  }
  static createStaticEntitiyMatch(t, i, a) {
    StaticEntitiyMatch.startStaticEntitiyMatch(t);
    StaticEntitiyMatch.addCategory(t, i);
    StaticEntitiyMatch.addCategoryType(t, a);
    return StaticEntitiyMatch.endStaticEntitiyMatch(t);
  }
}
exports.StaticEntitiyMatch = StaticEntitiyMatch;
//# sourceMappingURL=static-entitiy-match.js.map