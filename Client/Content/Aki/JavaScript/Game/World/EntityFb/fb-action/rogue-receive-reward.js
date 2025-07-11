"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RogueReceiveReward = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class RogueReceiveReward {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, t) {
    this.bb_pos = e;
    this.bb = t;
    return this;
  }
  static getRootAsRogueReceiveReward(e, t) {
    return (t || new RogueReceiveReward()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsRogueReceiveReward(e, t) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new RogueReceiveReward()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  rogueRewardReceiveType(e) {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.__string(this.bb_pos + t, e);
    } else {
      return undefined;
    }
  }
  static startRogueReceiveReward(e) {
    e.startObject(1);
  }
  static addRogueRewardReceiveType(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static endRogueReceiveReward(e) {
    return e.endObject();
  }
  static createRogueReceiveReward(e, t) {
    RogueReceiveReward.startRogueReceiveReward(e);
    RogueReceiveReward.addRogueRewardReceiveType(e, t);
    return RogueReceiveReward.endRogueReceiveReward(e);
  }
}
exports.RogueReceiveReward = RogueReceiveReward;
//# sourceMappingURL=rogue-receive-reward.js.map