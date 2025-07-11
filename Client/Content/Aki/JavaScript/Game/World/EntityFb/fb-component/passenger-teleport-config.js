"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PassengerTeleportConfig = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const pos_a_js_1 = require("../fb-action/pos-a.js");
class PassengerTeleportConfig {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, s) {
    this.bb_pos = e;
    this.bb = s;
    return this;
  }
  static getRootAsPassengerTeleportConfig(e, s) {
    return (s || new PassengerTeleportConfig()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsPassengerTeleportConfig(e, s) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (s || new PassengerTeleportConfig()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  posA(e) {
    var s = this.bb.__offset(this.bb_pos, 4);
    if (s) {
      return (e || new pos_a_js_1.PosA()).__init(this.bb.__indirect(this.bb_pos + s), this.bb);
    } else {
      return undefined;
    }
  }
  static startPassengerTeleportConfig(e) {
    e.startObject(1);
  }
  static addPosA(e, s) {
    e.addFieldOffset(0, s, 0);
  }
  static endPassengerTeleportConfig(e) {
    return e.endObject();
  }
  static createPassengerTeleportConfig(e, s) {
    PassengerTeleportConfig.startPassengerTeleportConfig(e);
    PassengerTeleportConfig.addPosA(e, s);
    return PassengerTeleportConfig.endPassengerTeleportConfig(e);
  }
}
exports.PassengerTeleportConfig = PassengerTeleportConfig;
//# sourceMappingURL=passenger-teleport-config.js.map