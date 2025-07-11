"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SwitchSubLevels = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class SwitchSubLevels {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsSwitchSubLevels(t, e) {
    return (e || new SwitchSubLevels()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsSwitchSubLevels(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new SwitchSubLevels()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  static startSwitchSubLevels(t) {
    t.startObject(1);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static endSwitchSubLevels(t) {
    return t.endObject();
  }
  static createSwitchSubLevels(t, e) {
    SwitchSubLevels.startSwitchSubLevels(t);
    SwitchSubLevels.addType(t, e);
    return SwitchSubLevels.endSwitchSubLevels(t);
  }
}
exports.SwitchSubLevels = SwitchSubLevels;
//# sourceMappingURL=switch-sub-levels.js.map