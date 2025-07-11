"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PulseDeviceFoundation = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class PulseDeviceFoundation {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, t) {
    this.bb_pos = e;
    this.bb = t;
    return this;
  }
  static getRootAsPulseDeviceFoundation(e, t) {
    return (t || new PulseDeviceFoundation()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsPulseDeviceFoundation(e, t) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new PulseDeviceFoundation()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  type(e) {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.__string(this.bb_pos + t, e);
    } else {
      return undefined;
    }
  }
  static startPulseDeviceFoundation(e) {
    e.startObject(1);
  }
  static addType(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static endPulseDeviceFoundation(e) {
    return e.endObject();
  }
  static createPulseDeviceFoundation(e, t) {
    PulseDeviceFoundation.startPulseDeviceFoundation(e);
    PulseDeviceFoundation.addType(e, t);
    return PulseDeviceFoundation.endPulseDeviceFoundation(e);
  }
}
exports.PulseDeviceFoundation = PulseDeviceFoundation;
//# sourceMappingURL=pulse-device-foundation.js.map