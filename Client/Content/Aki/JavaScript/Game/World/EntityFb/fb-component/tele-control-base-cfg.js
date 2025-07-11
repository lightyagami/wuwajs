"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TeleControlBaseCfg = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class TeleControlBaseCfg {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsTeleControlBaseCfg(t, e) {
    return (e || new TeleControlBaseCfg()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsTeleControlBaseCfg(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new TeleControlBaseCfg()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  commonConfig(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  canRotate() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  initialGravity() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  static startTeleControlBaseCfg(t) {
    t.startObject(3);
  }
  static addCommonConfig(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addCanRotate(t, e) {
    t.addFieldInt8(1, +e, 0);
  }
  static addInitialGravity(t, e) {
    t.addFieldInt8(2, +e, 0);
  }
  static endTeleControlBaseCfg(t) {
    return t.endObject();
  }
  static createTeleControlBaseCfg(t, e, s, o) {
    TeleControlBaseCfg.startTeleControlBaseCfg(t);
    TeleControlBaseCfg.addCommonConfig(t, e);
    TeleControlBaseCfg.addCanRotate(t, s);
    TeleControlBaseCfg.addInitialGravity(t, o);
    return TeleControlBaseCfg.endTeleControlBaseCfg(t);
  }
}
exports.TeleControlBaseCfg = TeleControlBaseCfg;
//# sourceMappingURL=tele-control-base-cfg.js.map