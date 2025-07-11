"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BadBuKingChallengeTip = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class BadBuKingChallengeTip {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, i) {
    this.bb_pos = e;
    this.bb = i;
    return this;
  }
  static getRootAsBadBuKingChallengeTip(e, i) {
    return (i || new BadBuKingChallengeTip()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsBadBuKingChallengeTip(e, i) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new BadBuKingChallengeTip()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  type() {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.readUint8(this.bb_pos + e);
    } else {
      return 0;
    }
  }
  warningText(e) {
    var i = this.bb.__offset(this.bb_pos, 6);
    if (i) {
      return this.bb.__string(this.bb_pos + i, e);
    } else {
      return undefined;
    }
  }
  static startBadBuKingChallengeTip(e) {
    e.startObject(2);
  }
  static addType(e, i) {
    e.addFieldInt8(0, i, 0);
  }
  static addWarningText(e, i) {
    e.addFieldOffset(1, i, 0);
  }
  static endBadBuKingChallengeTip(e) {
    return e.endObject();
  }
  static createBadBuKingChallengeTip(e, i, t) {
    BadBuKingChallengeTip.startBadBuKingChallengeTip(e);
    BadBuKingChallengeTip.addType(e, i);
    BadBuKingChallengeTip.addWarningText(e, t);
    return BadBuKingChallengeTip.endBadBuKingChallengeTip(e);
  }
}
exports.BadBuKingChallengeTip = BadBuKingChallengeTip;
//# sourceMappingURL=bad-bu-king-challenge-tip.js.map