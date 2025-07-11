"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ICenterTextFadeOut = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class ICenterTextFadeOut {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsICenterTextFadeOut(t, e) {
    return (e || new ICenterTextFadeOut()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsICenterTextFadeOut(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new ICenterTextFadeOut()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  fadeInTime() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.readFloat32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  fadeOutTime() {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return this.bb.readFloat32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startICenterTextFadeOut(t) {
    t.startObject(3);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addFadeInTime(t, e) {
    t.addFieldFloat32(1, e, 0);
  }
  static addFadeOutTime(t, e) {
    t.addFieldFloat32(2, e, 0);
  }
  static endICenterTextFadeOut(t) {
    return t.endObject();
  }
  static createICenterTextFadeOut(t, e, r, s) {
    ICenterTextFadeOut.startICenterTextFadeOut(t);
    ICenterTextFadeOut.addType(t, e);
    ICenterTextFadeOut.addFadeInTime(t, r);
    ICenterTextFadeOut.addFadeOutTime(t, s);
    return ICenterTextFadeOut.endICenterTextFadeOut(t);
  }
}
exports.ICenterTextFadeOut = ICenterTextFadeOut;
//# sourceMappingURL=icenter-text-fade-out.js.map