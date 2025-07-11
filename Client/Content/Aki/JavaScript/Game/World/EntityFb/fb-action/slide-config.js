"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SlideConfig = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class SlideConfig {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(i, t) {
    this.bb_pos = i;
    this.bb = t;
    return this;
  }
  static getRootAsSlideConfig(i, t) {
    return (t || new SlideConfig()).__init(i.readInt32(i.position()) + i.position(), i);
  }
  static getSizePrefixedRootAsSlideConfig(i, t) {
    i.setPosition(i.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new SlideConfig()).__init(i.readInt32(i.position()) + i.position(), i);
  }
  type(i) {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.__string(this.bb_pos + t, i);
    } else {
      return undefined;
    }
  }
  slideId() {
    var i = this.bb.__offset(this.bb_pos, 6);
    if (i) {
      return this.bb.readInt32(this.bb_pos + i);
    } else {
      return 0;
    }
  }
  static startSlideConfig(i) {
    i.startObject(2);
  }
  static addType(i, t) {
    i.addFieldOffset(0, t, 0);
  }
  static addSlideId(i, t) {
    i.addFieldInt32(1, t, 0);
  }
  static endSlideConfig(i) {
    return i.endObject();
  }
  static createSlideConfig(i, t, e) {
    SlideConfig.startSlideConfig(i);
    SlideConfig.addType(i, t);
    SlideConfig.addSlideId(i, e);
    return SlideConfig.endSlideConfig(i);
  }
}
exports.SlideConfig = SlideConfig;
//# sourceMappingURL=slide-config.js.map