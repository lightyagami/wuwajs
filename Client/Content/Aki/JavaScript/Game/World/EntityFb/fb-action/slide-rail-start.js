"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SlideRailStart = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class SlideRailStart {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsSlideRailStart(t, i) {
    return (i || new SlideRailStart()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsSlideRailStart(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new SlideRailStart()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  railEntityId() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startSlideRailStart(t) {
    t.startObject(1);
  }
  static addRailEntityId(t, i) {
    t.addFieldInt32(0, i, 0);
  }
  static endSlideRailStart(t) {
    return t.endObject();
  }
  static createSlideRailStart(t, i) {
    SlideRailStart.startSlideRailStart(t);
    SlideRailStart.addRailEntityId(t, i);
    return SlideRailStart.endSlideRailStart(t);
  }
}
exports.SlideRailStart = SlideRailStart;
//# sourceMappingURL=slide-rail-start.js.map