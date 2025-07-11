"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GrabComponent = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const vector_info_js_1 = require("../fb-var/vector-info.js");
class GrabComponent {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, s) {
    this.bb_pos = t;
    this.bb = s;
    return this;
  }
  static getRootAsGrabComponent(t, s) {
    return (s || new GrabComponent()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsGrabComponent(t, s) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (s || new GrabComponent()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  disabled() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  grabPos(t) {
    var s = this.bb.__offset(this.bb_pos, 6);
    if (s) {
      return (t || new vector_info_js_1.VectorInfo()).__init(this.bb.__indirect(this.bb_pos + s), this.bb);
    } else {
      return undefined;
    }
  }
  throwPow() {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  throwHight() {
    var t = this.bb.__offset(this.bb_pos, 10);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startGrabComponent(t) {
    t.startObject(4);
  }
  static addDisabled(t, s) {
    t.addFieldInt8(0, +s, 0);
  }
  static addGrabPos(t, s) {
    t.addFieldOffset(1, s, 0);
  }
  static addThrowPow(t, s) {
    t.addFieldInt32(2, s, 0);
  }
  static addThrowHight(t, s) {
    t.addFieldInt32(3, s, 0);
  }
  static endGrabComponent(t) {
    return t.endObject();
  }
}
exports.GrabComponent = GrabComponent;
//# sourceMappingURL=grab-component.js.map