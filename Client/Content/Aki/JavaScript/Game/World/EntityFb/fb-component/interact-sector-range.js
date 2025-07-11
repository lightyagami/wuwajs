"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InteractSectorRange = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class InteractSectorRange {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsInteractSectorRange(t, e) {
    return (e || new InteractSectorRange()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsInteractSectorRange(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new InteractSectorRange()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  begin() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.readFloat32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  end() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.readFloat32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startInteractSectorRange(t) {
    t.startObject(2);
  }
  static addBegin(t, e) {
    t.addFieldFloat32(0, e, 0);
  }
  static addEnd(t, e) {
    t.addFieldFloat32(1, e, 0);
  }
  static endInteractSectorRange(t) {
    return t.endObject();
  }
  static createInteractSectorRange(t, e, r) {
    InteractSectorRange.startInteractSectorRange(t);
    InteractSectorRange.addBegin(t, e);
    InteractSectorRange.addEnd(t, r);
    return InteractSectorRange.endInteractSectorRange(t);
  }
}
exports.InteractSectorRange = InteractSectorRange;
//# sourceMappingURL=interact-sector-range.js.map