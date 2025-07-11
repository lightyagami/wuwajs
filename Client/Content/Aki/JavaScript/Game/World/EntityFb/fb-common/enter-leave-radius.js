"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EnterLeaveRadius = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class EnterLeaveRadius {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, t) {
    this.bb_pos = e;
    this.bb = t;
    return this;
  }
  static getRootAsEnterLeaveRadius(e, t) {
    return (t || new EnterLeaveRadius()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsEnterLeaveRadius(e, t) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new EnterLeaveRadius()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  enterRadius() {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.readInt32(this.bb_pos + e);
    } else {
      return 0;
    }
  }
  leaveRadius() {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return this.bb.readInt32(this.bb_pos + e);
    } else {
      return 0;
    }
  }
  static startEnterLeaveRadius(e) {
    e.startObject(2);
  }
  static addEnterRadius(e, t) {
    e.addFieldInt32(0, t, 0);
  }
  static addLeaveRadius(e, t) {
    e.addFieldInt32(1, t, 0);
  }
  static endEnterLeaveRadius(e) {
    return e.endObject();
  }
  static createEnterLeaveRadius(e, t, s) {
    EnterLeaveRadius.startEnterLeaveRadius(e);
    EnterLeaveRadius.addEnterRadius(e, t);
    EnterLeaveRadius.addLeaveRadius(e, s);
    return EnterLeaveRadius.endEnterLeaveRadius(e);
  }
}
exports.EnterLeaveRadius = EnterLeaveRadius;
//# sourceMappingURL=enter-leave-radius.js.map