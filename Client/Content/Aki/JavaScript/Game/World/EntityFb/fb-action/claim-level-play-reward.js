"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ClaimLevelPlayReward = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class ClaimLevelPlayReward {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, a) {
    this.bb_pos = e;
    this.bb = a;
    return this;
  }
  static getRootAsClaimLevelPlayReward(e, a) {
    return (a || new ClaimLevelPlayReward()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsClaimLevelPlayReward(e, a) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (a || new ClaimLevelPlayReward()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static startClaimLevelPlayReward(e) {
    e.startObject(0);
  }
  static endClaimLevelPlayReward(e) {
    return e.endObject();
  }
  static createClaimLevelPlayReward(e) {
    ClaimLevelPlayReward.startClaimLevelPlayReward(e);
    return ClaimLevelPlayReward.endClaimLevelPlayReward(e);
  }
}
exports.ClaimLevelPlayReward = ClaimLevelPlayReward;
//# sourceMappingURL=claim-level-play-reward.js.map