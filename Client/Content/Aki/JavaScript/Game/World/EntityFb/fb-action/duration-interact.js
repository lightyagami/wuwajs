"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DurationInteract = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class DurationInteract {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, r) {
    this.bb_pos = t;
    this.bb = r;
    return this;
  }
  static getRootAsDurationInteract(t, r) {
    return (r || new DurationInteract()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsDurationInteract(t, r) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (r || new DurationInteract()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  duration() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.readFloat32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startDurationInteract(t) {
    t.startObject(1);
  }
  static addDuration(t, r) {
    t.addFieldFloat32(0, r, 0);
  }
  static endDurationInteract(t) {
    return t.endObject();
  }
  static createDurationInteract(t, r) {
    DurationInteract.startDurationInteract(t);
    DurationInteract.addDuration(t, r);
    return DurationInteract.endDurationInteract(t);
  }
}
exports.DurationInteract = DurationInteract;
//# sourceMappingURL=duration-interact.js.map