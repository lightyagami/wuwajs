"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ControlTrackingSelf = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class ControlTrackingSelf {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, r) {
    this.bb_pos = t;
    this.bb = r;
    return this;
  }
  static getRootAsControlTrackingSelf(t, r) {
    return (r || new ControlTrackingSelf()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsControlTrackingSelf(t, r) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (r || new ControlTrackingSelf()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var r = this.bb.__offset(this.bb_pos, 4);
    if (r) {
      return this.bb.__string(this.bb_pos + r, t);
    } else {
      return undefined;
    }
  }
  static startControlTrackingSelf(t) {
    t.startObject(1);
  }
  static addType(t, r) {
    t.addFieldOffset(0, r, 0);
  }
  static endControlTrackingSelf(t) {
    return t.endObject();
  }
  static createControlTrackingSelf(t, r) {
    ControlTrackingSelf.startControlTrackingSelf(t);
    ControlTrackingSelf.addType(t, r);
    return ControlTrackingSelf.endControlTrackingSelf(t);
  }
}
exports.ControlTrackingSelf = ControlTrackingSelf;
//# sourceMappingURL=control-tracking-self.js.map