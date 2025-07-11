"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CloseGlobalTimeScale = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class CloseGlobalTimeScale {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, l) {
    this.bb_pos = e;
    this.bb = l;
    return this;
  }
  static getRootAsCloseGlobalTimeScale(e, l) {
    return (l || new CloseGlobalTimeScale()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsCloseGlobalTimeScale(e, l) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (l || new CloseGlobalTimeScale()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  type(e) {
    var l = this.bb.__offset(this.bb_pos, 4);
    if (l) {
      return this.bb.__string(this.bb_pos + l, e);
    } else {
      return undefined;
    }
  }
  static startCloseGlobalTimeScale(e) {
    e.startObject(1);
  }
  static addType(e, l) {
    e.addFieldOffset(0, l, 0);
  }
  static endCloseGlobalTimeScale(e) {
    return e.endObject();
  }
  static createCloseGlobalTimeScale(e, l) {
    CloseGlobalTimeScale.startCloseGlobalTimeScale(e);
    CloseGlobalTimeScale.addType(e, l);
    return CloseGlobalTimeScale.endCloseGlobalTimeScale(e);
  }
}
exports.CloseGlobalTimeScale = CloseGlobalTimeScale;
//# sourceMappingURL=close-global-time-scale.js.map