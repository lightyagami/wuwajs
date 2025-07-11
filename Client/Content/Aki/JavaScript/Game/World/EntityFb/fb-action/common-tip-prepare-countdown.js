"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CommonTipPrepareCountdown = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class CommonTipPrepareCountdown {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(o, t) {
    this.bb_pos = o;
    this.bb = t;
    return this;
  }
  static getRootAsCommonTipPrepareCountdown(o, t) {
    return (t || new CommonTipPrepareCountdown()).__init(o.readInt32(o.position()) + o.position(), o);
  }
  static getSizePrefixedRootAsCommonTipPrepareCountdown(o, t) {
    o.setPosition(o.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new CommonTipPrepareCountdown()).__init(o.readInt32(o.position()) + o.position(), o);
  }
  type() {
    var o = this.bb.__offset(this.bb_pos, 4);
    if (o) {
      return this.bb.readUint8(this.bb_pos + o);
    } else {
      return 0;
    }
  }
  static startCommonTipPrepareCountdown(o) {
    o.startObject(1);
  }
  static addType(o, t) {
    o.addFieldInt8(0, t, 0);
  }
  static endCommonTipPrepareCountdown(o) {
    return o.endObject();
  }
  static createCommonTipPrepareCountdown(o, t) {
    CommonTipPrepareCountdown.startCommonTipPrepareCountdown(o);
    CommonTipPrepareCountdown.addType(o, t);
    return CommonTipPrepareCountdown.endCommonTipPrepareCountdown(o);
  }
}
exports.CommonTipPrepareCountdown = CommonTipPrepareCountdown;
//# sourceMappingURL=common-tip-prepare-countdown.js.map