"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StandControl = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class StandControl {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, r) {
    this.bb_pos = t;
    this.bb = r;
    return this;
  }
  static getRootAsStandControl(t, r) {
    return (r || new StandControl()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsStandControl(t, r) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (r || new StandControl()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var r = this.bb.__offset(this.bb_pos, 4);
    if (r) {
      return this.bb.__string(this.bb_pos + r, t);
    } else {
      return undefined;
    }
  }
  static startStandControl(t) {
    t.startObject(1);
  }
  static addType(t, r) {
    t.addFieldOffset(0, r, 0);
  }
  static endStandControl(t) {
    return t.endObject();
  }
  static createStandControl(t, r) {
    StandControl.startStandControl(t);
    StandControl.addType(t, r);
    return StandControl.endStandControl(t);
  }
}
exports.StandControl = StandControl;
//# sourceMappingURL=stand-control.js.map