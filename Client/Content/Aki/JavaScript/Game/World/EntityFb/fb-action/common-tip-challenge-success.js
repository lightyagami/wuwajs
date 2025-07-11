"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CommonTipChallengeSuccess = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class CommonTipChallengeSuccess {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, s) {
    this.bb_pos = e;
    this.bb = s;
    return this;
  }
  static getRootAsCommonTipChallengeSuccess(e, s) {
    return (s || new CommonTipChallengeSuccess()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsCommonTipChallengeSuccess(e, s) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (s || new CommonTipChallengeSuccess()).__init(e.readInt32(e.position()) + e.position(), e);
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
    var s = this.bb.__offset(this.bb_pos, 6);
    if (s) {
      return this.bb.__string(this.bb_pos + s, e);
    } else {
      return undefined;
    }
  }
  static startCommonTipChallengeSuccess(e) {
    e.startObject(2);
  }
  static addType(e, s) {
    e.addFieldInt8(0, s, 0);
  }
  static addTidMainText(e, s) {
    e.addFieldOffset(1, s, 0);
  }
  static endCommonTipChallengeSuccess(e) {
    return e.endObject();
  }
  static createCommonTipChallengeSuccess(e, s, t) {
    CommonTipChallengeSuccess.startCommonTipChallengeSuccess(e);
    CommonTipChallengeSuccess.addType(e, s);
    CommonTipChallengeSuccess.addTidMainText(e, t);
    return CommonTipChallengeSuccess.endCommonTipChallengeSuccess(e);
  }
}
exports.CommonTipChallengeSuccess = CommonTipChallengeSuccess;
//# sourceMappingURL=common-tip-challenge-success.js.map