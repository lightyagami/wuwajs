"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CommonTipReachChallenge = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class CommonTipReachChallenge {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, t) {
    this.bb_pos = e;
    this.bb = t;
    return this;
  }
  static getRootAsCommonTipReachChallenge(e, t) {
    return (t || new CommonTipReachChallenge()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsCommonTipReachChallenge(e, t) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new CommonTipReachChallenge()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  type() {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.readUint8(this.bb_pos + e);
    } else {
      return 0;
    }
  }
  tidMainText(e) {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.__string(this.bb_pos + t, e);
    } else {
      return undefined;
    }
  }
  static startCommonTipReachChallenge(e) {
    e.startObject(2);
  }
  static addType(e, t) {
    e.addFieldInt8(0, t, 0);
  }
  static addTidMainText(e, t) {
    e.addFieldOffset(1, t, 0);
  }
  static endCommonTipReachChallenge(e) {
    return e.endObject();
  }
  static createCommonTipReachChallenge(e, t, i) {
    CommonTipReachChallenge.startCommonTipReachChallenge(e);
    CommonTipReachChallenge.addType(e, t);
    CommonTipReachChallenge.addTidMainText(e, i);
    return CommonTipReachChallenge.endCommonTipReachChallenge(e);
  }
}
exports.CommonTipReachChallenge = CommonTipReachChallenge;
//# sourceMappingURL=common-tip-reach-challenge.js.map