"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LimitPlayerAction = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class LimitPlayerAction {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsLimitPlayerAction(t, i) {
    return (i || new LimitPlayerAction()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsLimitPlayerAction(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new LimitPlayerAction()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    if (i) {
      return this.bb.__string(this.bb_pos + i, t);
    } else {
      return undefined;
    }
  }
  static startLimitPlayerAction(t) {
    t.startObject(1);
  }
  static addType(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static endLimitPlayerAction(t) {
    return t.endObject();
  }
  static createLimitPlayerAction(t, i) {
    LimitPlayerAction.startLimitPlayerAction(t);
    LimitPlayerAction.addType(t, i);
    return LimitPlayerAction.endLimitPlayerAction(t);
  }
}
exports.LimitPlayerAction = LimitPlayerAction;
//# sourceMappingURL=limit-player-action.js.map