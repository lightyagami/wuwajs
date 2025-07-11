"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FanInteractByHit = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class FanInteractByHit {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsFanInteractByHit(t, e) {
    return (e || new FanInteractByHit()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsFanInteractByHit(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new FanInteractByHit()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  static startFanInteractByHit(t) {
    t.startObject(1);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static endFanInteractByHit(t) {
    return t.endObject();
  }
  static createFanInteractByHit(t, e) {
    FanInteractByHit.startFanInteractByHit(t);
    FanInteractByHit.addType(t, e);
    return FanInteractByHit.endFanInteractByHit(t);
  }
}
exports.FanInteractByHit = FanInteractByHit;
//# sourceMappingURL=fan-interact-by-hit.js.map