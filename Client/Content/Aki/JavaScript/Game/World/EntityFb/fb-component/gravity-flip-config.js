"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GravityFlipConfig = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class GravityFlipConfig {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsGravityFlipConfig(t, i) {
    return (i || new GravityFlipConfig()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsGravityFlipConfig(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new GravityFlipConfig()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  locationEntityId() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startGravityFlipConfig(t) {
    t.startObject(2);
  }
  static addType(t, i) {
    t.addFieldInt8(0, i, 0);
  }
  static addLocationEntityId(t, i) {
    t.addFieldInt32(1, i, 0);
  }
  static endGravityFlipConfig(t) {
    return t.endObject();
  }
  static createGravityFlipConfig(t, i, r) {
    GravityFlipConfig.startGravityFlipConfig(t);
    GravityFlipConfig.addType(t, i);
    GravityFlipConfig.addLocationEntityId(t, r);
    return GravityFlipConfig.endGravityFlipConfig(t);
  }
}
exports.GravityFlipConfig = GravityFlipConfig;
//# sourceMappingURL=gravity-flip-config.js.map