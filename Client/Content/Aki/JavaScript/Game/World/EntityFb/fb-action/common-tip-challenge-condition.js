"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CommonTipChallengeCondition = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class CommonTipChallengeCondition {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(i, t) {
    this.bb_pos = i;
    this.bb = t;
    return this;
  }
  static getRootAsCommonTipChallengeCondition(i, t) {
    return (t || new CommonTipChallengeCondition()).__init(i.readInt32(i.position()) + i.position(), i);
  }
  static getSizePrefixedRootAsCommonTipChallengeCondition(i, t) {
    i.setPosition(i.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new CommonTipChallengeCondition()).__init(i.readInt32(i.position()) + i.position(), i);
  }
  type() {
    var i = this.bb.__offset(this.bb_pos, 4);
    if (i) {
      return this.bb.readUint8(this.bb_pos + i);
    } else {
      return 0;
    }
  }
  tidMainText(i) {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.__string(this.bb_pos + t, i);
    } else {
      return undefined;
    }
  }
  tidSubText(i) {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return this.bb.__string(this.bb_pos + t, i);
    } else {
      return undefined;
    }
  }
  static startCommonTipChallengeCondition(i) {
    i.startObject(3);
  }
  static addType(i, t) {
    i.addFieldInt8(0, t, 0);
  }
  static addTidMainText(i, t) {
    i.addFieldOffset(1, t, 0);
  }
  static addTidSubText(i, t) {
    i.addFieldOffset(2, t, 0);
  }
  static endCommonTipChallengeCondition(i) {
    return i.endObject();
  }
  static createCommonTipChallengeCondition(i, t, n, o) {
    CommonTipChallengeCondition.startCommonTipChallengeCondition(i);
    CommonTipChallengeCondition.addType(i, t);
    CommonTipChallengeCondition.addTidMainText(i, n);
    CommonTipChallengeCondition.addTidSubText(i, o);
    return CommonTipChallengeCondition.endCommonTipChallengeCondition(i);
  }
}
exports.CommonTipChallengeCondition = CommonTipChallengeCondition;
//# sourceMappingURL=common-tip-challenge-condition.js.map