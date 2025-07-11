"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CustomAlertValueChangeSpeed = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class CustomAlertValueChangeSpeed {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, t) {
    this.bb_pos = e;
    this.bb = t;
    return this;
  }
  static getRootAsCustomAlertValueChangeSpeed(e, t) {
    return (t || new CustomAlertValueChangeSpeed()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsCustomAlertValueChangeSpeed(e, t) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new CustomAlertValueChangeSpeed()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  type() {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.readUint8(this.bb_pos + e);
    } else {
      return 0;
    }
  }
  customValue() {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return this.bb.readFloat32(this.bb_pos + e);
    } else {
      return 0;
    }
  }
  static startCustomAlertValueChangeSpeed(e) {
    e.startObject(2);
  }
  static addType(e, t) {
    e.addFieldInt8(0, t, 0);
  }
  static addCustomValue(e, t) {
    e.addFieldFloat32(1, t, 0);
  }
  static endCustomAlertValueChangeSpeed(e) {
    return e.endObject();
  }
  static createCustomAlertValueChangeSpeed(e, t, s) {
    CustomAlertValueChangeSpeed.startCustomAlertValueChangeSpeed(e);
    CustomAlertValueChangeSpeed.addType(e, t);
    CustomAlertValueChangeSpeed.addCustomValue(e, s);
    return CustomAlertValueChangeSpeed.endCustomAlertValueChangeSpeed(e);
  }
}
exports.CustomAlertValueChangeSpeed = CustomAlertValueChangeSpeed;
//# sourceMappingURL=custom-alert-value-change-speed.js.map