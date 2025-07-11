"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GravityFlipTeleportConfig = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const union_gravity_direction_js_1 = require("../fb-common/union-gravity-direction.js");
const vector_info_js_1 = require("../fb-var/vector-info.js");
class GravityFlipTeleportConfig {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(i, t) {
    this.bb_pos = i;
    this.bb = t;
    return this;
  }
  static getRootAsGravityFlipTeleportConfig(i, t) {
    return (t || new GravityFlipTeleportConfig()).__init(i.readInt32(i.position()) + i.position(), i);
  }
  static getSizePrefixedRootAsGravityFlipTeleportConfig(i, t) {
    i.setPosition(i.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new GravityFlipTeleportConfig()).__init(i.readInt32(i.position()) + i.position(), i);
  }
  gravityDirectionType() {
    var i = this.bb.__offset(this.bb_pos, 4);
    if (i) {
      return this.bb.readUint8(this.bb_pos + i);
    } else {
      return union_gravity_direction_js_1.UnionGravityDirection.NONE;
    }
  }
  gravityDirection(i) {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.__union(i, this.bb_pos + t);
    } else {
      return undefined;
    }
  }
  safeLocation(i) {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return (i || new vector_info_js_1.VectorInfo()).__init(this.bb.__indirect(this.bb_pos + t), this.bb);
    } else {
      return undefined;
    }
  }
  static startGravityFlipTeleportConfig(i) {
    i.startObject(3);
  }
  static addGravityDirectionType(i, t) {
    i.addFieldInt8(0, t, union_gravity_direction_js_1.UnionGravityDirection.NONE);
  }
  static addGravityDirection(i, t) {
    i.addFieldOffset(1, t, 0);
  }
  static addSafeLocation(i, t) {
    i.addFieldOffset(2, t, 0);
  }
  static endGravityFlipTeleportConfig(i) {
    return i.endObject();
  }
}
exports.GravityFlipTeleportConfig = GravityFlipTeleportConfig;
//# sourceMappingURL=gravity-flip-teleport-config.js.map