"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SoaringChallengeSettlement = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class SoaringChallengeSettlement {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, t) {
    this.bb_pos = e;
    this.bb = t;
    return this;
  }
  static getRootAsSoaringChallengeSettlement(e, t) {
    return (t || new SoaringChallengeSettlement()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsSoaringChallengeSettlement(e, t) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new SoaringChallengeSettlement()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  type(e) {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.__string(this.bb_pos + t, e);
    } else {
      return undefined;
    }
  }
  static startSoaringChallengeSettlement(e) {
    e.startObject(1);
  }
  static addType(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static endSoaringChallengeSettlement(e) {
    return e.endObject();
  }
  static createSoaringChallengeSettlement(e, t) {
    SoaringChallengeSettlement.startSoaringChallengeSettlement(e);
    SoaringChallengeSettlement.addType(e, t);
    return SoaringChallengeSettlement.endSoaringChallengeSettlement(e);
  }
}
exports.SoaringChallengeSettlement = SoaringChallengeSettlement;
//# sourceMappingURL=soaring-challenge-settlement.js.map