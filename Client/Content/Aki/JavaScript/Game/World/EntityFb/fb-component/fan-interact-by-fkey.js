"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FanInteractByFKey = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class FanInteractByFKey {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsFanInteractByFKey(t, e) {
    return (e || new FanInteractByFKey()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsFanInteractByFKey(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new FanInteractByFKey()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  tidInteractOptionText(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  static startFanInteractByFKey(t) {
    t.startObject(2);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addTidInteractOptionText(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static endFanInteractByFKey(t) {
    return t.endObject();
  }
  static createFanInteractByFKey(t, e, a) {
    FanInteractByFKey.startFanInteractByFKey(t);
    FanInteractByFKey.addType(t, e);
    FanInteractByFKey.addTidInteractOptionText(t, a);
    return FanInteractByFKey.endFanInteractByFKey(t);
  }
}
exports.FanInteractByFKey = FanInteractByFKey;
//# sourceMappingURL=fan-interact-by-fkey.js.map