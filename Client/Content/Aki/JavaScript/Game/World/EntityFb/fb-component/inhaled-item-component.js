"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InhaledItemComponent = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const inhaled_performance_js_1 = require("../fb-component/inhaled-performance.js");
const union_inhaled_per_result_type_js_1 = require("../fb-component/union-inhaled-per-result-type.js");
class InhaledItemComponent {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, t) {
    this.bb_pos = e;
    this.bb = t;
    return this;
  }
  static getRootAsInhaledItemComponent(e, t) {
    return (t || new InhaledItemComponent()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsInhaledItemComponent(e, t) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new InhaledItemComponent()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  disabled() {
    var e = this.bb.__offset(this.bb_pos, 4);
    return !!e && !!this.bb.readInt8(this.bb_pos + e);
  }
  inhaledStrength() {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return this.bb.readInt32(this.bb_pos + e);
    } else {
      return 0;
    }
  }
  inhaledInterruptionRecoveryTime() {
    var e = this.bb.__offset(this.bb_pos, 8);
    if (e) {
      return this.bb.readInt32(this.bb_pos + e);
    } else {
      return 0;
    }
  }
  inhaledPerformance(e) {
    var t = this.bb.__offset(this.bb_pos, 10);
    if (t) {
      return (e || new inhaled_performance_js_1.InhaledPerformance()).__init(this.bb.__indirect(this.bb_pos + t), this.bb);
    } else {
      return undefined;
    }
  }
  inhaledPerResultType() {
    var e = this.bb.__offset(this.bb_pos, 12);
    if (e) {
      return this.bb.readUint8(this.bb_pos + e);
    } else {
      return union_inhaled_per_result_type_js_1.UnionInhaledPerResultType.NONE;
    }
  }
  inhaledPerResult(e) {
    var t = this.bb.__offset(this.bb_pos, 14);
    if (t) {
      return this.bb.__union(e, this.bb_pos + t);
    } else {
      return undefined;
    }
  }
  static startInhaledItemComponent(e) {
    e.startObject(6);
  }
  static addDisabled(e, t) {
    e.addFieldInt8(0, +t, 0);
  }
  static addInhaledStrength(e, t) {
    e.addFieldInt32(1, t, 0);
  }
  static addInhaledInterruptionRecoveryTime(e, t) {
    e.addFieldInt32(2, t, 0);
  }
  static addInhaledPerformance(e, t) {
    e.addFieldOffset(3, t, 0);
  }
  static addInhaledPerResultType(e, t) {
    e.addFieldInt8(4, t, union_inhaled_per_result_type_js_1.UnionInhaledPerResultType.NONE);
  }
  static addInhaledPerResult(e, t) {
    e.addFieldOffset(5, t, 0);
  }
  static endInhaledItemComponent(e) {
    return e.endObject();
  }
}
exports.InhaledItemComponent = InhaledItemComponent;
//# sourceMappingURL=inhaled-item-component.js.map