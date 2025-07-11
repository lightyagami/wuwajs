"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TeleControlConfig = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class TeleControlConfig {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsTeleControlConfig(t, e) {
    return (e || new TeleControlConfig()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsTeleControlConfig(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new TeleControlConfig()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  teleControlType() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startTeleControlConfig(t) {
    t.startObject(2);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addTeleControlType(t, e) {
    t.addFieldInt8(1, e, 0);
  }
  static endTeleControlConfig(t) {
    return t.endObject();
  }
  static createTeleControlConfig(t, e, o) {
    TeleControlConfig.startTeleControlConfig(t);
    TeleControlConfig.addType(t, e);
    TeleControlConfig.addTeleControlType(t, o);
    return TeleControlConfig.endTeleControlConfig(t);
  }
}
exports.TeleControlConfig = TeleControlConfig;
//# sourceMappingURL=tele-control-config.js.map