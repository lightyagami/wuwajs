"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LimitPlayerUI = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class LimitPlayerUI {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsLimitPlayerUI(t, i) {
    return (i || new LimitPlayerUI()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsLimitPlayerUI(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new LimitPlayerUI()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    if (i) {
      return this.bb.__string(this.bb_pos + i, t);
    } else {
      return undefined;
    }
  }
  static startLimitPlayerUI(t) {
    t.startObject(1);
  }
  static addType(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static endLimitPlayerUI(t) {
    return t.endObject();
  }
  static createLimitPlayerUI(t, i) {
    LimitPlayerUI.startLimitPlayerUI(t);
    LimitPlayerUI.addType(t, i);
    return LimitPlayerUI.endLimitPlayerUI(t);
  }
}
exports.LimitPlayerUI = LimitPlayerUI;
//# sourceMappingURL=limit-player-ui.js.map