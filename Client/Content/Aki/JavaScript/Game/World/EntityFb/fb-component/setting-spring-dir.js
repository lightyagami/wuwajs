"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SettingSpringDir = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const vector_info_js_1 = require("../fb-var/vector-info.js");
class SettingSpringDir {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsSettingSpringDir(t, i) {
    return (i || new SettingSpringDir()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsSettingSpringDir(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new SettingSpringDir()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  isSettingDir() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  isRotator() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  springDir(t) {
    var i = this.bb.__offset(this.bb_pos, 8);
    if (i) {
      return (t || new vector_info_js_1.VectorInfo()).__init(this.bb.__indirect(this.bb_pos + i), this.bb);
    } else {
      return undefined;
    }
  }
  static startSettingSpringDir(t) {
    t.startObject(3);
  }
  static addIsSettingDir(t, i) {
    t.addFieldInt8(0, +i, 0);
  }
  static addIsRotator(t, i) {
    t.addFieldInt8(1, +i, 0);
  }
  static addSpringDir(t, i) {
    t.addFieldOffset(2, i, 0);
  }
  static endSettingSpringDir(t) {
    return t.endObject();
  }
}
exports.SettingSpringDir = SettingSpringDir;
//# sourceMappingURL=setting-spring-dir.js.map