"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ClaimDungeonReward = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class ClaimDungeonReward {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, t) {
    this.bb_pos = e;
    this.bb = t;
    return this;
  }
  static getRootAsClaimDungeonReward(e, t) {
    return (t || new ClaimDungeonReward()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsClaimDungeonReward(e, t) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new ClaimDungeonReward()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static startClaimDungeonReward(e) {
    e.startObject(0);
  }
  static endClaimDungeonReward(e) {
    return e.endObject();
  }
  static createClaimDungeonReward(e) {
    ClaimDungeonReward.startClaimDungeonReward(e);
    return ClaimDungeonReward.endClaimDungeonReward(e);
  }
}
exports.ClaimDungeonReward = ClaimDungeonReward;
//# sourceMappingURL=claim-dungeon-reward.js.map