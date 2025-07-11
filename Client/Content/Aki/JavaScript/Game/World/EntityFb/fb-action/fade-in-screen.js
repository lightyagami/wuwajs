"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FadeInScreen = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const ease_data_js_1 = require("../fb-action/ease-data.js");
class FadeInScreen {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, t) {
    this.bb_pos = e;
    this.bb = t;
    return this;
  }
  static getRootAsFadeInScreen(e, t) {
    return (t || new FadeInScreen()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsFadeInScreen(e, t) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new FadeInScreen()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  typeOverride() {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.readUint8(this.bb_pos + e);
    } else {
      return 0;
    }
  }
  ease(e) {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return (e || new ease_data_js_1.EaseData()).__init(this.bb.__indirect(this.bb_pos + t), this.bb);
    } else {
      return undefined;
    }
  }
  screenType(e) {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return this.bb.__string(this.bb_pos + t, e);
    } else {
      return undefined;
    }
  }
  keepFadeAfterTreeEnd() {
    var e = this.bb.__offset(this.bb_pos, 10);
    return !!e && !!this.bb.readInt8(this.bb_pos + e);
  }
  static startFadeInScreen(e) {
    e.startObject(4);
  }
  static addTypeOverride(e, t) {
    e.addFieldInt8(0, t, 0);
  }
  static addEase(e, t) {
    e.addFieldOffset(1, t, 0);
  }
  static addScreenType(e, t) {
    e.addFieldOffset(2, t, 0);
  }
  static addKeepFadeAfterTreeEnd(e, t) {
    e.addFieldInt8(3, +t, 0);
  }
  static endFadeInScreen(e) {
    return e.endObject();
  }
}
exports.FadeInScreen = FadeInScreen;
//# sourceMappingURL=fade-in-screen.js.map