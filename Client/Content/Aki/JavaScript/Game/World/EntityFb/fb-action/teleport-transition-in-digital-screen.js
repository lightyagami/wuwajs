"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TeleportTransitionInDigitalScreen = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class TeleportTransitionInDigitalScreen {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsTeleportTransitionInDigitalScreen(t, e) {
    return (e || new TeleportTransitionInDigitalScreen()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsTeleportTransitionInDigitalScreen(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new TeleportTransitionInDigitalScreen()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  configId() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startTeleportTransitionInDigitalScreen(t) {
    t.startObject(2);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addConfigId(t, e) {
    t.addFieldInt32(1, e, 0);
  }
  static endTeleportTransitionInDigitalScreen(t) {
    return t.endObject();
  }
  static createTeleportTransitionInDigitalScreen(t, e, i) {
    TeleportTransitionInDigitalScreen.startTeleportTransitionInDigitalScreen(t);
    TeleportTransitionInDigitalScreen.addType(t, e);
    TeleportTransitionInDigitalScreen.addConfigId(t, i);
    return TeleportTransitionInDigitalScreen.endTeleportTransitionInDigitalScreen(t);
  }
}
exports.TeleportTransitionInDigitalScreen = TeleportTransitionInDigitalScreen;
//# sourceMappingURL=teleport-transition-in-digital-screen.js.map