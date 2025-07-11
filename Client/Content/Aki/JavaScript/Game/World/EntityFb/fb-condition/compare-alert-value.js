"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CompareAlertValue = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const union_compared_alert_value_js_1 = require("../fb-condition/union-compared-alert-value.js");
class CompareAlertValue {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, t) {
    this.bb_pos = e;
    this.bb = t;
    return this;
  }
  static getRootAsCompareAlertValue(e, t) {
    return (t || new CompareAlertValue()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsCompareAlertValue(e, t) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new CompareAlertValue()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  type(e) {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.__string(this.bb_pos + t, e);
    } else {
      return undefined;
    }
  }
  areaId() {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return this.bb.readInt32(this.bb_pos + e);
    } else {
      return 0;
    }
  }
  compareType(e) {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return this.bb.__string(this.bb_pos + t, e);
    } else {
      return undefined;
    }
  }
  compareValueType() {
    var e = this.bb.__offset(this.bb_pos, 10);
    if (e) {
      return this.bb.readUint8(this.bb_pos + e);
    } else {
      return union_compared_alert_value_js_1.UnionComparedAlertValue.NONE;
    }
  }
  compareValue(e) {
    var t = this.bb.__offset(this.bb_pos, 12);
    if (t) {
      return this.bb.__union(e, this.bb_pos + t);
    } else {
      return undefined;
    }
  }
  static startCompareAlertValue(e) {
    e.startObject(5);
  }
  static addType(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static addAreaId(e, t) {
    e.addFieldInt32(1, t, 0);
  }
  static addCompareType(e, t) {
    e.addFieldOffset(2, t, 0);
  }
  static addCompareValueType(e, t) {
    e.addFieldInt8(3, t, union_compared_alert_value_js_1.UnionComparedAlertValue.NONE);
  }
  static addCompareValue(e, t) {
    e.addFieldOffset(4, t, 0);
  }
  static endCompareAlertValue(e) {
    return e.endObject();
  }
  static createCompareAlertValue(e, t, r, a, s, i) {
    CompareAlertValue.startCompareAlertValue(e);
    CompareAlertValue.addType(e, t);
    CompareAlertValue.addAreaId(e, r);
    CompareAlertValue.addCompareType(e, a);
    CompareAlertValue.addCompareValueType(e, s);
    CompareAlertValue.addCompareValue(e, i);
    return CompareAlertValue.endCompareAlertValue(e);
  }
}
exports.CompareAlertValue = CompareAlertValue;
//# sourceMappingURL=compare-alert-value.js.map