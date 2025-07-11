"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CheckTreasureBeenClaimedCondition = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class CheckTreasureBeenClaimedCondition {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, t) {
    this.bb_pos = e;
    this.bb = t;
    return this;
  }
  static getRootAsCheckTreasureBeenClaimedCondition(e, t) {
    return (t || new CheckTreasureBeenClaimedCondition()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsCheckTreasureBeenClaimedCondition(e, t) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new CheckTreasureBeenClaimedCondition()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  type(e) {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.__string(this.bb_pos + t, e);
    } else {
      return undefined;
    }
  }
  entityId() {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return this.bb.readInt32(this.bb_pos + e);
    } else {
      return 0;
    }
  }
  static startCheckTreasureBeenClaimedCondition(e) {
    e.startObject(2);
  }
  static addType(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static addEntityId(e, t) {
    e.addFieldInt32(1, t, 0);
  }
  static endCheckTreasureBeenClaimedCondition(e) {
    return e.endObject();
  }
  static createCheckTreasureBeenClaimedCondition(e, t, i) {
    CheckTreasureBeenClaimedCondition.startCheckTreasureBeenClaimedCondition(e);
    CheckTreasureBeenClaimedCondition.addType(e, t);
    CheckTreasureBeenClaimedCondition.addEntityId(e, i);
    return CheckTreasureBeenClaimedCondition.endCheckTreasureBeenClaimedCondition(e);
  }
}
exports.CheckTreasureBeenClaimedCondition = CheckTreasureBeenClaimedCondition;
//# sourceMappingURL=check-treasure-been-claimed-condition.js.map