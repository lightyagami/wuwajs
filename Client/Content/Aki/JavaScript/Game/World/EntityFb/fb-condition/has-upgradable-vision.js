"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HasUpgradableVision = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class HasUpgradableVision {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(s, i) {
    this.bb_pos = s;
    this.bb = i;
    return this;
  }
  static getRootAsHasUpgradableVision(s, i) {
    return (i || new HasUpgradableVision()).__init(s.readInt32(s.position()) + s.position(), s);
  }
  static getSizePrefixedRootAsHasUpgradableVision(s, i) {
    s.setPosition(s.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new HasUpgradableVision()).__init(s.readInt32(s.position()) + s.position(), s);
  }
  type(s) {
    var i = this.bb.__offset(this.bb_pos, 4);
    if (i) {
      return this.bb.__string(this.bb_pos + i, s);
    } else {
      return undefined;
    }
  }
  option(s) {
    var i = this.bb.__offset(this.bb_pos, 6);
    if (i) {
      return this.bb.__string(this.bb_pos + i, s);
    } else {
      return undefined;
    }
  }
  static startHasUpgradableVision(s) {
    s.startObject(2);
  }
  static addType(s, i) {
    s.addFieldOffset(0, i, 0);
  }
  static addOption(s, i) {
    s.addFieldOffset(1, i, 0);
  }
  static endHasUpgradableVision(s) {
    return s.endObject();
  }
  static createHasUpgradableVision(s, i, a) {
    HasUpgradableVision.startHasUpgradableVision(s);
    HasUpgradableVision.addType(s, i);
    HasUpgradableVision.addOption(s, a);
    return HasUpgradableVision.endHasUpgradableVision(s);
  }
}
exports.HasUpgradableVision = HasUpgradableVision;
//# sourceMappingURL=has-upgradable-vision.js.map