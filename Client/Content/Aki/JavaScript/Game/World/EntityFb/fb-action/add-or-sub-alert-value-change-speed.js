"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AddOrSubAlertValueChangeSpeed = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class AddOrSubAlertValueChangeSpeed {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, t) {
    this.bb_pos = e;
    this.bb = t;
    return this;
  }
  static getRootAsAddOrSubAlertValueChangeSpeed(e, t) {
    return (t || new AddOrSubAlertValueChangeSpeed()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsAddOrSubAlertValueChangeSpeed(e, t) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new AddOrSubAlertValueChangeSpeed()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  type() {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.readUint8(this.bb_pos + e);
    } else {
      return 0;
    }
  }
  deltaValue() {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return this.bb.readFloat32(this.bb_pos + e);
    } else {
      return 0;
    }
  }
  static startAddOrSubAlertValueChangeSpeed(e) {
    e.startObject(2);
  }
  static addType(e, t) {
    e.addFieldInt8(0, t, 0);
  }
  static addDeltaValue(e, t) {
    e.addFieldFloat32(1, t, 0);
  }
  static endAddOrSubAlertValueChangeSpeed(e) {
    return e.endObject();
  }
  static createAddOrSubAlertValueChangeSpeed(e, t, r) {
    AddOrSubAlertValueChangeSpeed.startAddOrSubAlertValueChangeSpeed(e);
    AddOrSubAlertValueChangeSpeed.addType(e, t);
    AddOrSubAlertValueChangeSpeed.addDeltaValue(e, r);
    return AddOrSubAlertValueChangeSpeed.endAddOrSubAlertValueChangeSpeed(e);
  }
}
exports.AddOrSubAlertValueChangeSpeed = AddOrSubAlertValueChangeSpeed;
//# sourceMappingURL=add-or-sub-alert-value-change-speed.js.map