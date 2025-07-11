"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FadeOutScreen = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const ease_data_js_1 = require("../fb-action/ease-data.js");
class FadeOutScreen {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, t) {
    this.bb_pos = e;
    this.bb = t;
    return this;
  }
  static getRootAsFadeOutScreen(e, t) {
    return (t || new FadeOutScreen()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsFadeOutScreen(e, t) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new FadeOutScreen()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  ease(e) {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return (e || new ease_data_js_1.EaseData()).__init(this.bb.__indirect(this.bb_pos + t), this.bb);
    } else {
      return undefined;
    }
  }
  static startFadeOutScreen(e) {
    e.startObject(1);
  }
  static addEase(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static endFadeOutScreen(e) {
    return e.endObject();
  }
  static createFadeOutScreen(e, t) {
    FadeOutScreen.startFadeOutScreen(e);
    FadeOutScreen.addEase(e, t);
    return FadeOutScreen.endFadeOutScreen(e);
  }
}
exports.FadeOutScreen = FadeOutScreen;
//# sourceMappingURL=fade-out-screen.js.map