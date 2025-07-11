"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CategoryMatchingSucceedBase = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const entity_state_js_1 = require("../fb-component/entity-state.js");
class CategoryMatchingSucceedBase {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsCategoryMatchingSucceedBase(t, e) {
    return (e || new CategoryMatchingSucceedBase()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsCategoryMatchingSucceedBase(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new CategoryMatchingSucceedBase()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  isSilent() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  isDestroy() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  syncAdsorbatePerformance() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  changeSelfState(t) {
    var e = this.bb.__offset(this.bb_pos, 10);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  changeSelfStateAfterDischarged(t) {
    var e = this.bb.__offset(this.bb_pos, 12);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  changeItemState(t) {
    var e = this.bb.__offset(this.bb_pos, 14);
    if (e) {
      return (t || new entity_state_js_1.EntityState()).__init(this.bb.__indirect(this.bb_pos + e), this.bb);
    } else {
      return undefined;
    }
  }
  changeItemStateAfterDischarged(t) {
    var e = this.bb.__offset(this.bb_pos, 16);
    if (e) {
      return (t || new entity_state_js_1.EntityState()).__init(this.bb.__indirect(this.bb_pos + e), this.bb);
    } else {
      return undefined;
    }
  }
  static startCategoryMatchingSucceedBase(t) {
    t.startObject(7);
  }
  static addIsSilent(t, e) {
    t.addFieldInt8(0, +e, 0);
  }
  static addIsDestroy(t, e) {
    t.addFieldInt8(1, +e, 0);
  }
  static addSyncAdsorbatePerformance(t, e) {
    t.addFieldInt8(2, +e, 0);
  }
  static addChangeSelfState(t, e) {
    t.addFieldOffset(3, e, 0);
  }
  static addChangeSelfStateAfterDischarged(t, e) {
    t.addFieldOffset(4, e, 0);
  }
  static addChangeItemState(t, e) {
    t.addFieldOffset(5, e, 0);
  }
  static addChangeItemStateAfterDischarged(t, e) {
    t.addFieldOffset(6, e, 0);
  }
  static endCategoryMatchingSucceedBase(t) {
    return t.endObject();
  }
}
exports.CategoryMatchingSucceedBase = CategoryMatchingSucceedBase;
//# sourceMappingURL=category-matching-succeed-base.js.map