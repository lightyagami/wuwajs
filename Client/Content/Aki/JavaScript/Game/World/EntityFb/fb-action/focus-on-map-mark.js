"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FocusOnMapMark = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class FocusOnMapMark {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, s) {
    this.bb_pos = t;
    this.bb = s;
    return this;
  }
  static getRootAsFocusOnMapMark(t, s) {
    return (s || new FocusOnMapMark()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsFocusOnMapMark(t, s) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (s || new FocusOnMapMark()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var s = this.bb.__offset(this.bb_pos, 4);
    if (s) {
      return this.bb.__string(this.bb_pos + s, t);
    } else {
      return undefined;
    }
  }
  static startFocusOnMapMark(t) {
    t.startObject(1);
  }
  static addType(t, s) {
    t.addFieldOffset(0, s, 0);
  }
  static endFocusOnMapMark(t) {
    return t.endObject();
  }
  static createFocusOnMapMark(t, s) {
    FocusOnMapMark.startFocusOnMapMark(t);
    FocusOnMapMark.addType(t, s);
    return FocusOnMapMark.endFocusOnMapMark(t);
  }
}
exports.FocusOnMapMark = FocusOnMapMark;
//# sourceMappingURL=focus-on-map-mark.js.map