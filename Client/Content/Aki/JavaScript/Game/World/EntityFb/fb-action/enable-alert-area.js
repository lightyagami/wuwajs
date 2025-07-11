"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EnableAlertArea = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const union_disable_alert_condition_js_1 = require("../fb-action/union-disable-alert-condition.js");
class EnableAlertArea {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsEnableAlertArea(t, e) {
    return (e || new EnableAlertArea()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsEnableAlertArea(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new EnableAlertArea()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  areaId() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  isEnable() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  autoDisableConditionType() {
    var t = this.bb.__offset(this.bb_pos, 10);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return union_disable_alert_condition_js_1.UnionDisableAlertCondition.NONE;
    }
  }
  autoDisableCondition(t) {
    var e = this.bb.__offset(this.bb_pos, 12);
    if (e) {
      return this.bb.__union(t, this.bb_pos + e);
    } else {
      return undefined;
    }
  }
  static startEnableAlertArea(t) {
    t.startObject(5);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addAreaId(t, e) {
    t.addFieldInt32(1, e, 0);
  }
  static addIsEnable(t, e) {
    t.addFieldInt8(2, +e, 0);
  }
  static addAutoDisableConditionType(t, e) {
    t.addFieldInt8(3, e, union_disable_alert_condition_js_1.UnionDisableAlertCondition.NONE);
  }
  static addAutoDisableCondition(t, e) {
    t.addFieldOffset(4, e, 0);
  }
  static endEnableAlertArea(t) {
    return t.endObject();
  }
  static createEnableAlertArea(t, e, a, r, i, s) {
    EnableAlertArea.startEnableAlertArea(t);
    EnableAlertArea.addType(t, e);
    EnableAlertArea.addAreaId(t, a);
    EnableAlertArea.addIsEnable(t, r);
    EnableAlertArea.addAutoDisableConditionType(t, i);
    EnableAlertArea.addAutoDisableCondition(t, s);
    return EnableAlertArea.endEnableAlertArea(t);
  }
}
exports.EnableAlertArea = EnableAlertArea;
//# sourceMappingURL=enable-alert-area.js.map