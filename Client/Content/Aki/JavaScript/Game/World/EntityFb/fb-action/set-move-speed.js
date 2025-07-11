"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SetMoveSpeed = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class SetMoveSpeed {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, t) {
    this.bb_pos = e;
    this.bb = t;
    return this;
  }
  static getRootAsSetMoveSpeed(e, t) {
    return (t || new SetMoveSpeed()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsSetMoveSpeed(e, t) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new SetMoveSpeed()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  speed() {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.readFloat32(this.bb_pos + e);
    } else {
      return 0;
    }
  }
  static startSetMoveSpeed(e) {
    e.startObject(1);
  }
  static addSpeed(e, t) {
    e.addFieldFloat32(0, t, 0);
  }
  static endSetMoveSpeed(e) {
    return e.endObject();
  }
  static createSetMoveSpeed(e, t) {
    SetMoveSpeed.startSetMoveSpeed(e);
    SetMoveSpeed.addSpeed(e, t);
    return SetMoveSpeed.endSetMoveSpeed(e);
  }
}
exports.SetMoveSpeed = SetMoveSpeed;
//# sourceMappingURL=set-move-speed.js.map