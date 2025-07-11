"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TeleportToLatestResetPoint = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const union_teleport_to_latest_reset_point_option_js_1 = require("../fb-action/union-teleport-to-latest-reset-point-option.js");
class TeleportToLatestResetPoint {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsTeleportToLatestResetPoint(t, e) {
    return (e || new TeleportToLatestResetPoint()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsTeleportToLatestResetPoint(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new TeleportToLatestResetPoint()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  optionType() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return union_teleport_to_latest_reset_point_option_js_1.UnionTeleportToLatestResetPointOption.NONE;
    }
  }
  option(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return this.bb.__union(t, this.bb_pos + e);
    } else {
      return undefined;
    }
  }
  static startTeleportToLatestResetPoint(t) {
    t.startObject(2);
  }
  static addOptionType(t, e) {
    t.addFieldInt8(0, e, union_teleport_to_latest_reset_point_option_js_1.UnionTeleportToLatestResetPointOption.NONE);
  }
  static addOption(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static endTeleportToLatestResetPoint(t) {
    return t.endObject();
  }
  static createTeleportToLatestResetPoint(t, e, o) {
    TeleportToLatestResetPoint.startTeleportToLatestResetPoint(t);
    TeleportToLatestResetPoint.addOptionType(t, e);
    TeleportToLatestResetPoint.addOption(t, o);
    return TeleportToLatestResetPoint.endTeleportToLatestResetPoint(t);
  }
}
exports.TeleportToLatestResetPoint = TeleportToLatestResetPoint;
//# sourceMappingURL=teleport-to-latest-reset-point.js.map