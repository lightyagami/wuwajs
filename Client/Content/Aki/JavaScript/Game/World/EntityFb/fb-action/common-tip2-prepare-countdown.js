"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CommonTip2PrepareCountdown = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class CommonTip2PrepareCountdown {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, o) {
    this.bb_pos = t;
    this.bb = o;
    return this;
  }
  static getRootAsCommonTip2PrepareCountdown(t, o) {
    return (o || new CommonTip2PrepareCountdown()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsCommonTip2PrepareCountdown(t, o) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (o || new CommonTip2PrepareCountdown()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  countDownNum() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  tidCountDownTxt(t) {
    var o = this.bb.__offset(this.bb_pos, 8);
    if (o) {
      return this.bb.__string(this.bb_pos + o, t);
    } else {
      return undefined;
    }
  }
  isBlockPlayer() {
    var t = this.bb.__offset(this.bb_pos, 10);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  static startCommonTip2PrepareCountdown(t) {
    t.startObject(4);
  }
  static addType(t, o) {
    t.addFieldInt8(0, o, 0);
  }
  static addCountDownNum(t, o) {
    t.addFieldInt32(1, o, 0);
  }
  static addTidCountDownTxt(t, o) {
    t.addFieldOffset(2, o, 0);
  }
  static addIsBlockPlayer(t, o) {
    t.addFieldInt8(3, +o, 0);
  }
  static endCommonTip2PrepareCountdown(t) {
    return t.endObject();
  }
  static createCommonTip2PrepareCountdown(t, o, n, r, e) {
    CommonTip2PrepareCountdown.startCommonTip2PrepareCountdown(t);
    CommonTip2PrepareCountdown.addType(t, o);
    CommonTip2PrepareCountdown.addCountDownNum(t, n);
    CommonTip2PrepareCountdown.addTidCountDownTxt(t, r);
    CommonTip2PrepareCountdown.addIsBlockPlayer(t, e);
    return CommonTip2PrepareCountdown.endCommonTip2PrepareCountdown(t);
  }
}
exports.CommonTip2PrepareCountdown = CommonTip2PrepareCountdown;
//# sourceMappingURL=common-tip2-prepare-countdown.js.map