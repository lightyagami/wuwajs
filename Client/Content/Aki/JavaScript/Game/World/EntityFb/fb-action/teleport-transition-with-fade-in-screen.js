"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TeleportTransitionWithFadeInScreen = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class TeleportTransitionWithFadeInScreen {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, t) {
    this.bb_pos = e;
    this.bb = t;
    return this;
  }
  static getRootAsTeleportTransitionWithFadeInScreen(e, t) {
    return (t || new TeleportTransitionWithFadeInScreen()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsTeleportTransitionWithFadeInScreen(e, t) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new TeleportTransitionWithFadeInScreen()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  type(e) {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.__string(this.bb_pos + t, e);
    } else {
      return undefined;
    }
  }
  screenType(e) {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.__string(this.bb_pos + t, e);
    } else {
      return undefined;
    }
  }
  static startTeleportTransitionWithFadeInScreen(e) {
    e.startObject(2);
  }
  static addType(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static addScreenType(e, t) {
    e.addFieldOffset(1, t, 0);
  }
  static endTeleportTransitionWithFadeInScreen(e) {
    return e.endObject();
  }
  static createTeleportTransitionWithFadeInScreen(e, t, r) {
    TeleportTransitionWithFadeInScreen.startTeleportTransitionWithFadeInScreen(e);
    TeleportTransitionWithFadeInScreen.addType(e, t);
    TeleportTransitionWithFadeInScreen.addScreenType(e, r);
    return TeleportTransitionWithFadeInScreen.endTeleportTransitionWithFadeInScreen(e);
  }
}
exports.TeleportTransitionWithFadeInScreen = TeleportTransitionWithFadeInScreen;
//# sourceMappingURL=teleport-transition-with-fade-in-screen.js.map