"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ResetPlayerFocusToFixedDirection = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const vector_info_js_1 = require("../fb-var/vector-info.js");
class ResetPlayerFocusToFixedDirection {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, t) {
    this.bb_pos = e;
    this.bb = t;
    return this;
  }
  static getRootAsResetPlayerFocusToFixedDirection(e, t) {
    return (t || new ResetPlayerFocusToFixedDirection()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsResetPlayerFocusToFixedDirection(e, t) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new ResetPlayerFocusToFixedDirection()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  type(e) {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.__string(this.bb_pos + t, e);
    } else {
      return undefined;
    }
  }
  direction(e) {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return (e || new vector_info_js_1.VectorInfo()).__init(this.bb.__indirect(this.bb_pos + t), this.bb);
    } else {
      return undefined;
    }
  }
  static startResetPlayerFocusToFixedDirection(e) {
    e.startObject(2);
  }
  static addType(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static addDirection(e, t) {
    e.addFieldOffset(1, t, 0);
  }
  static endResetPlayerFocusToFixedDirection(e) {
    return e.endObject();
  }
}
exports.ResetPlayerFocusToFixedDirection = ResetPlayerFocusToFixedDirection;
//# sourceMappingURL=reset-player-focus-to-fixed-direction.js.map