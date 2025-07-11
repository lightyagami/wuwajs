"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GameplayPose2Interact = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class GameplayPose2Interact {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsGameplayPose2Interact(t, e) {
    return (e || new GameplayPose2Interact()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsGameplayPose2Interact(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new GameplayPose2Interact()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  static startGameplayPose2Interact(t) {
    t.startObject(1);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static endGameplayPose2Interact(t) {
    return t.endObject();
  }
  static createGameplayPose2Interact(t, e) {
    GameplayPose2Interact.startGameplayPose2Interact(t);
    GameplayPose2Interact.addType(t, e);
    return GameplayPose2Interact.endGameplayPose2Interact(t);
  }
}
exports.GameplayPose2Interact = GameplayPose2Interact;
//# sourceMappingURL=gameplay-pose2-interact.js.map