"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CommonTipChallengeFail = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class CommonTipChallengeFail {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, i) {
    this.bb_pos = e;
    this.bb = i;
    return this;
  }
  static getRootAsCommonTipChallengeFail(e, i) {
    return (i || new CommonTipChallengeFail()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsCommonTipChallengeFail(e, i) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new CommonTipChallengeFail()).__init(e.readInt32(e.position()) + e.position(), e);
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
    var i = this.bb.__offset(this.bb_pos, 6);
    if (i) {
      return this.bb.__string(this.bb_pos + i, e);
    } else {
      return undefined;
    }
  }
  static startCommonTipChallengeFail(e) {
    e.startObject(2);
  }
  static addType(e, i) {
    e.addFieldInt8(0, i, 0);
  }
  static addTidMainText(e, i) {
    e.addFieldOffset(1, i, 0);
  }
  static endCommonTipChallengeFail(e) {
    return e.endObject();
  }
  static createCommonTipChallengeFail(e, i, t) {
    CommonTipChallengeFail.startCommonTipChallengeFail(e);
    CommonTipChallengeFail.addType(e, i);
    CommonTipChallengeFail.addTidMainText(e, t);
    return CommonTipChallengeFail.endCommonTipChallengeFail(e);
  }
}
exports.CommonTipChallengeFail = CommonTipChallengeFail;
//# sourceMappingURL=common-tip-challenge-fail.js.map