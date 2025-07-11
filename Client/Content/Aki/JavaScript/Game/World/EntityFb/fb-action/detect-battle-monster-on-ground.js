"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DetectBattleMonsterOnGround = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class DetectBattleMonsterOnGround {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsDetectBattleMonsterOnGround(t, e) {
    return (e || new DetectBattleMonsterOnGround()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsDetectBattleMonsterOnGround(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new DetectBattleMonsterOnGround()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  static startDetectBattleMonsterOnGround(t) {
    t.startObject(1);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static endDetectBattleMonsterOnGround(t) {
    return t.endObject();
  }
  static createDetectBattleMonsterOnGround(t, e) {
    DetectBattleMonsterOnGround.startDetectBattleMonsterOnGround(t);
    DetectBattleMonsterOnGround.addType(t, e);
    return DetectBattleMonsterOnGround.endDetectBattleMonsterOnGround(t);
  }
}
exports.DetectBattleMonsterOnGround = DetectBattleMonsterOnGround;
//# sourceMappingURL=detect-battle-monster-on-ground.js.map