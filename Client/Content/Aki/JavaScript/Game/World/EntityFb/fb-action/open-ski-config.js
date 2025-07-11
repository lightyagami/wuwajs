"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OpenSkiConfig = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const union_target_entity_js_1 = require("../fb-action/union-target-entity.js");
class OpenSkiConfig {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsOpenSkiConfig(t, i) {
    return (i || new OpenSkiConfig()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsOpenSkiConfig(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new OpenSkiConfig()).__init(t.readInt32(t.position()) + t.position(), t);
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
  skiConfig(t) {
    var i = this.bb.__offset(this.bb_pos, 10);
    if (i) {
      return this.bb.__string(this.bb_pos + i, t);
    } else {
      return undefined;
    }
  }
  static startOpenSkiConfig(t) {
    t.startObject(4);
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
  static addSkiConfig(t, i) {
    t.addFieldOffset(3, i, 0);
  }
  static endOpenSkiConfig(t) {
    return t.endObject();
  }
  static createOpenSkiConfig(t, i, e, n, s) {
    OpenSkiConfig.startOpenSkiConfig(t);
    OpenSkiConfig.addType(t, i);
    OpenSkiConfig.addTargetType(t, e);
    OpenSkiConfig.addTarget(t, n);
    OpenSkiConfig.addSkiConfig(t, s);
    return OpenSkiConfig.endOpenSkiConfig(t);
  }
}
exports.OpenSkiConfig = OpenSkiConfig;
//# sourceMappingURL=open-ski-config.js.map