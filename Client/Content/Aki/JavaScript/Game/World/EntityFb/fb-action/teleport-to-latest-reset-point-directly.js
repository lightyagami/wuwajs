"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TeleportToLatestResetPointDirectly = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class TeleportToLatestResetPointDirectly {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsTeleportToLatestResetPointDirectly(t, e) {
    return (e || new TeleportToLatestResetPointDirectly()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsTeleportToLatestResetPointDirectly(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new TeleportToLatestResetPointDirectly()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  static startTeleportToLatestResetPointDirectly(t) {
    t.startObject(1);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static endTeleportToLatestResetPointDirectly(t) {
    return t.endObject();
  }
  static createTeleportToLatestResetPointDirectly(t, e) {
    TeleportToLatestResetPointDirectly.startTeleportToLatestResetPointDirectly(t);
    TeleportToLatestResetPointDirectly.addType(t, e);
    return TeleportToLatestResetPointDirectly.endTeleportToLatestResetPointDirectly(t);
  }
}
exports.TeleportToLatestResetPointDirectly = TeleportToLatestResetPointDirectly;
//# sourceMappingURL=teleport-to-latest-reset-point-directly.js.map