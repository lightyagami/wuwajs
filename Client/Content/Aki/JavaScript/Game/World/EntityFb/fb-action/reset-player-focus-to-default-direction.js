"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ResetPlayerFocusToDefaultDirection = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class ResetPlayerFocusToDefaultDirection {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, t) {
    this.bb_pos = e;
    this.bb = t;
    return this;
  }
  static getRootAsResetPlayerFocusToDefaultDirection(e, t) {
    return (t || new ResetPlayerFocusToDefaultDirection()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsResetPlayerFocusToDefaultDirection(e, t) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new ResetPlayerFocusToDefaultDirection()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  type(e) {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.__string(this.bb_pos + t, e);
    } else {
      return undefined;
    }
  }
  static startResetPlayerFocusToDefaultDirection(e) {
    e.startObject(1);
  }
  static addType(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static endResetPlayerFocusToDefaultDirection(e) {
    return e.endObject();
  }
  static createResetPlayerFocusToDefaultDirection(e, t) {
    ResetPlayerFocusToDefaultDirection.startResetPlayerFocusToDefaultDirection(e);
    ResetPlayerFocusToDefaultDirection.addType(e, t);
    return ResetPlayerFocusToDefaultDirection.endResetPlayerFocusToDefaultDirection(e);
  }
}
exports.ResetPlayerFocusToDefaultDirection = ResetPlayerFocusToDefaultDirection;
//# sourceMappingURL=reset-player-focus-to-default-direction.js.map