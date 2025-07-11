"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StopGuestCartethyia = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class StopGuestCartethyia {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsStopGuestCartethyia(t, e) {
    return (e || new StopGuestCartethyia()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsStopGuestCartethyia(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new StopGuestCartethyia()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  static startStopGuestCartethyia(t) {
    t.startObject(1);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static endStopGuestCartethyia(t) {
    return t.endObject();
  }
  static createStopGuestCartethyia(t, e) {
    StopGuestCartethyia.startStopGuestCartethyia(t);
    StopGuestCartethyia.addType(t, e);
    return StopGuestCartethyia.endStopGuestCartethyia(t);
  }
}
exports.StopGuestCartethyia = StopGuestCartethyia;
//# sourceMappingURL=stop-guest-cartethyia.js.map