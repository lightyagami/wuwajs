"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EntityCategoryWeight = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const static_entitiy_match_js_1 = require("../fb-component/static-entitiy-match.js");
class EntityCategoryWeight {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsEntityCategoryWeight(t, i) {
    return (i || new EntityCategoryWeight()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsEntityCategoryWeight(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new EntityCategoryWeight()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  entitiyMatch(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    if (i) {
      return (t || new static_entitiy_match_js_1.StaticEntitiyMatch()).__init(this.bb.__indirect(this.bb_pos + i), this.bb);
    } else {
      return undefined;
    }
  }
  weight() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startEntityCategoryWeight(t) {
    t.startObject(2);
  }
  static addEntitiyMatch(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addWeight(t, i) {
    t.addFieldInt32(1, i, 0);
  }
  static endEntityCategoryWeight(t) {
    return t.endObject();
  }
  static createEntityCategoryWeight(t, i, e) {
    EntityCategoryWeight.startEntityCategoryWeight(t);
    EntityCategoryWeight.addEntitiyMatch(t, i);
    EntityCategoryWeight.addWeight(t, e);
    return EntityCategoryWeight.endEntityCategoryWeight(t);
  }
}
exports.EntityCategoryWeight = EntityCategoryWeight;
//# sourceMappingURL=entity-category-weight.js.map