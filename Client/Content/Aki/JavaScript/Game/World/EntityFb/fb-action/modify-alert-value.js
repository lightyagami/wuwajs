"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ModifyAlertValue = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const union_alert_value_change_speed_js_1 = require("../fb-action/union-alert-value-change-speed.js");
const union_set_alert_value_type_js_1 = require("../fb-action/union-set-alert-value-type.js");
class ModifyAlertValue {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, t) {
    this.bb_pos = e;
    this.bb = t;
    return this;
  }
  static getRootAsModifyAlertValue(e, t) {
    return (t || new ModifyAlertValue()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsModifyAlertValue(e, t) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new ModifyAlertValue()).__init(e.readInt32(e.position()) + e.position(), e);
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
  setTypeType() {
    var e = this.bb.__offset(this.bb_pos, 8);
    if (e) {
      return this.bb.readUint8(this.bb_pos + e);
    } else {
      return union_set_alert_value_type_js_1.UnionSetAlertValueType.NONE;
    }
  }
  setType(e) {
    var t = this.bb.__offset(this.bb_pos, 10);
    if (t) {
      return this.bb.__union(e, this.bb_pos + t);
    } else {
      return undefined;
    }
  }
  changeSpeedType() {
    var e = this.bb.__offset(this.bb_pos, 12);
    if (e) {
      return this.bb.readUint8(this.bb_pos + e);
    } else {
      return union_alert_value_change_speed_js_1.UnionAlertValueChangeSpeed.NONE;
    }
  }
  changeSpeed(e) {
    var t = this.bb.__offset(this.bb_pos, 14);
    if (t) {
      return this.bb.__union(e, this.bb_pos + t);
    } else {
      return undefined;
    }
  }
  static startModifyAlertValue(e) {
    e.startObject(6);
  }
  static addType(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static addAreaId(e, t) {
    e.addFieldInt32(1, t, 0);
  }
  static addSetTypeType(e, t) {
    e.addFieldInt8(2, t, union_set_alert_value_type_js_1.UnionSetAlertValueType.NONE);
  }
  static addSetType(e, t) {
    e.addFieldOffset(3, t, 0);
  }
  static addChangeSpeedType(e, t) {
    e.addFieldInt8(4, t, union_alert_value_change_speed_js_1.UnionAlertValueChangeSpeed.NONE);
  }
  static addChangeSpeed(e, t) {
    e.addFieldOffset(5, t, 0);
  }
  static endModifyAlertValue(e) {
    return e.endObject();
  }
  static createModifyAlertValue(e, t, i, a, s, r, l) {
    ModifyAlertValue.startModifyAlertValue(e);
    ModifyAlertValue.addType(e, t);
    ModifyAlertValue.addAreaId(e, i);
    ModifyAlertValue.addSetTypeType(e, a);
    ModifyAlertValue.addSetType(e, s);
    ModifyAlertValue.addChangeSpeedType(e, r);
    ModifyAlertValue.addChangeSpeed(e, l);
    return ModifyAlertValue.endModifyAlertValue(e);
  }
}
exports.ModifyAlertValue = ModifyAlertValue;
//# sourceMappingURL=modify-alert-value.js.map