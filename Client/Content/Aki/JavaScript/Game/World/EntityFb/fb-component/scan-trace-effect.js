"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ScanTraceEffect = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class ScanTraceEffect {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsScanTraceEffect(t, e) {
    return (e || new ScanTraceEffect()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsScanTraceEffect(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new ScanTraceEffect()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  effect(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  target() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startScanTraceEffect(t) {
    t.startObject(2);
  }
  static addEffect(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addTarget(t, e) {
    t.addFieldInt32(1, e, 0);
  }
  static endScanTraceEffect(t) {
    return t.endObject();
  }
  static createScanTraceEffect(t, e, c) {
    ScanTraceEffect.startScanTraceEffect(t);
    ScanTraceEffect.addEffect(t, e);
    ScanTraceEffect.addTarget(t, c);
    return ScanTraceEffect.endScanTraceEffect(t);
  }
}
exports.ScanTraceEffect = ScanTraceEffect;
//# sourceMappingURL=scan-trace-effect.js.map