"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CheckAlertAreaEnabled = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class CheckAlertAreaEnabled {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, t) {
    this.bb_pos = e;
    this.bb = t;
    return this;
  }
  static getRootAsCheckAlertAreaEnabled(e, t) {
    return (t || new CheckAlertAreaEnabled()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsCheckAlertAreaEnabled(e, t) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new CheckAlertAreaEnabled()).__init(e.readInt32(e.position()) + e.position(), e);
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
  static startCheckAlertAreaEnabled(e) {
    e.startObject(2);
  }
  static addType(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static addAreaId(e, t) {
    e.addFieldInt32(1, t, 0);
  }
  static endCheckAlertAreaEnabled(e) {
    return e.endObject();
  }
  static createCheckAlertAreaEnabled(e, t, r) {
    CheckAlertAreaEnabled.startCheckAlertAreaEnabled(e);
    CheckAlertAreaEnabled.addType(e, t);
    CheckAlertAreaEnabled.addAreaId(e, r);
    return CheckAlertAreaEnabled.endCheckAlertAreaEnabled(e);
  }
}
exports.CheckAlertAreaEnabled = CheckAlertAreaEnabled;
//# sourceMappingURL=check-alert-area-enabled.js.map