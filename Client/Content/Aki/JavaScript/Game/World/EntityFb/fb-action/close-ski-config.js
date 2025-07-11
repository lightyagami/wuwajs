"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CloseSkiConfig = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const union_target_entity_js_1 = require("../fb-action/union-target-entity.js");
class CloseSkiConfig {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsCloseSkiConfig(t, i) {
    return (i || new CloseSkiConfig()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsCloseSkiConfig(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new CloseSkiConfig()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    if (i) {
      return this.bb.__string(this.bb_pos + i, t);
    } else {
      return undefined;
    }
  }
  targetType() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return union_target_entity_js_1.UnionTargetEntity.NONE;
    }
  }
  target(t) {
    var i = this.bb.__offset(this.bb_pos, 8);
    if (i) {
      return this.bb.__union(t, this.bb_pos + i);
    } else {
      return undefined;
    }
  }
  static startCloseSkiConfig(t) {
    t.startObject(3);
  }
  static addType(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addTargetType(t, i) {
    t.addFieldInt8(1, i, union_target_entity_js_1.UnionTargetEntity.NONE);
  }
  static addTarget(t, i) {
    t.addFieldOffset(2, i, 0);
  }
  static endCloseSkiConfig(t) {
    return t.endObject();
  }
  static createCloseSkiConfig(t, i, e, s) {
    CloseSkiConfig.startCloseSkiConfig(t);
    CloseSkiConfig.addType(t, i);
    CloseSkiConfig.addTargetType(t, e);
    CloseSkiConfig.addTarget(t, s);
    return CloseSkiConfig.endCloseSkiConfig(t);
  }
}
exports.CloseSkiConfig = CloseSkiConfig;
//# sourceMappingURL=close-ski-config.js.map