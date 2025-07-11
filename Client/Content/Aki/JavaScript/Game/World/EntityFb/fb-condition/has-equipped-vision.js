"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HasEquippedVision = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class HasEquippedVision {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(i, s) {
    this.bb_pos = i;
    this.bb = s;
    return this;
  }
  static getRootAsHasEquippedVision(i, s) {
    return (s || new HasEquippedVision()).__init(i.readInt32(i.position()) + i.position(), i);
  }
  static getSizePrefixedRootAsHasEquippedVision(i, s) {
    i.setPosition(i.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (s || new HasEquippedVision()).__init(i.readInt32(i.position()) + i.position(), i);
  }
  type(i) {
    var s = this.bb.__offset(this.bb_pos, 4);
    if (s) {
      return this.bb.__string(this.bb_pos + s, i);
    } else {
      return undefined;
    }
  }
  option(i) {
    var s = this.bb.__offset(this.bb_pos, 6);
    if (s) {
      return this.bb.__string(this.bb_pos + s, i);
    } else {
      return undefined;
    }
  }
  static startHasEquippedVision(i) {
    i.startObject(2);
  }
  static addType(i, s) {
    i.addFieldOffset(0, s, 0);
  }
  static addOption(i, s) {
    i.addFieldOffset(1, s, 0);
  }
  static endHasEquippedVision(i) {
    return i.endObject();
  }
  static createHasEquippedVision(i, s, t) {
    HasEquippedVision.startHasEquippedVision(i);
    HasEquippedVision.addType(i, s);
    HasEquippedVision.addOption(i, t);
    return HasEquippedVision.endHasEquippedVision(i);
  }
}
exports.HasEquippedVision = HasEquippedVision;
//# sourceMappingURL=has-equipped-vision.js.map