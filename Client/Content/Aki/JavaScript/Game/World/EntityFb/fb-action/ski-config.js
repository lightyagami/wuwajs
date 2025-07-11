"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SkiConfig = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const union_ski_config_js_1 = require("../fb-action/union-ski-config.js");
class SkiConfig {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(i, t) {
    this.bb_pos = i;
    this.bb = t;
    return this;
  }
  static getRootAsSkiConfig(i, t) {
    return (t || new SkiConfig()).__init(i.readInt32(i.position()) + i.position(), i);
  }
  static getSizePrefixedRootAsSkiConfig(i, t) {
    i.setPosition(i.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new SkiConfig()).__init(i.readInt32(i.position()) + i.position(), i);
  }
  type(i) {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.__string(this.bb_pos + t, i);
    } else {
      return undefined;
    }
  }
  configType() {
    var i = this.bb.__offset(this.bb_pos, 6);
    if (i) {
      return this.bb.readUint8(this.bb_pos + i);
    } else {
      return union_ski_config_js_1.UnionSkiConfig.NONE;
    }
  }
  config(i) {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return this.bb.__union(i, this.bb_pos + t);
    } else {
      return undefined;
    }
  }
  static startSkiConfig(i) {
    i.startObject(3);
  }
  static addType(i, t) {
    i.addFieldOffset(0, t, 0);
  }
  static addConfigType(i, t) {
    i.addFieldInt8(1, t, union_ski_config_js_1.UnionSkiConfig.NONE);
  }
  static addConfig(i, t) {
    i.addFieldOffset(2, t, 0);
  }
  static endSkiConfig(i) {
    return i.endObject();
  }
  static createSkiConfig(i, t, s, n) {
    SkiConfig.startSkiConfig(i);
    SkiConfig.addType(i, t);
    SkiConfig.addConfigType(i, s);
    SkiConfig.addConfig(i, n);
    return SkiConfig.endSkiConfig(i);
  }
}
exports.SkiConfig = SkiConfig;
//# sourceMappingURL=ski-config.js.map