"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SearchTargetCfg = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const entity_angle_weight_js_1 = require("../fb-component/entity-angle-weight.js");
const entity_category_weight_js_1 = require("../fb-component/entity-category-weight.js");
class SearchTargetCfg {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsSearchTargetCfg(t, e) {
    return (e || new SearchTargetCfg()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsSearchTargetCfg(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new SearchTargetCfg()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  angleWeight(t, e) {
    var r = this.bb.__offset(this.bb_pos, 4);
    if (r) {
      return (e || new entity_angle_weight_js_1.EntityAngleWeight()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + r) + t * 4), this.bb);
    } else {
      return undefined;
    }
  }
  angleWeightLength() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  lockConditions(t, e) {
    var r = this.bb.__offset(this.bb_pos, 6);
    if (r) {
      return (e || new entity_category_weight_js_1.EntityCategoryWeight()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + r) + t * 4), this.bb);
    } else {
      return undefined;
    }
  }
  lockConditionsLength() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  ignoreDistanceWeight() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  static startSearchTargetCfg(t) {
    t.startObject(3);
  }
  static addAngleWeight(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static createAngleWeightVector(e, r) {
    e.startVector(4, r.length, 4);
    for (let t = r.length - 1; t >= 0; t--) {
      e.addOffset(r[t]);
    }
    return e.endVector();
  }
  static startAngleWeightVector(t, e) {
    t.startVector(4, e, 4);
  }
  static addLockConditions(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static createLockConditionsVector(e, r) {
    e.startVector(4, r.length, 4);
    for (let t = r.length - 1; t >= 0; t--) {
      e.addOffset(r[t]);
    }
    return e.endVector();
  }
  static startLockConditionsVector(t, e) {
    t.startVector(4, e, 4);
  }
  static addIgnoreDistanceWeight(t, e) {
    t.addFieldInt8(2, +e, 0);
  }
  static endSearchTargetCfg(t) {
    return t.endObject();
  }
  static createSearchTargetCfg(t, e, r, i) {
    SearchTargetCfg.startSearchTargetCfg(t);
    SearchTargetCfg.addAngleWeight(t, e);
    SearchTargetCfg.addLockConditions(t, r);
    SearchTargetCfg.addIgnoreDistanceWeight(t, i);
    return SearchTargetCfg.endSearchTargetCfg(t);
  }
}
exports.SearchTargetCfg = SearchTargetCfg;
//# sourceMappingURL=search-target-cfg.js.map