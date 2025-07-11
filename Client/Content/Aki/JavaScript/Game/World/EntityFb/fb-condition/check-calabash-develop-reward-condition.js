"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CheckCalabashDevelopRewardCondition = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class CheckCalabashDevelopRewardCondition {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, t) {
    this.bb_pos = e;
    this.bb = t;
    return this;
  }
  static getRootAsCheckCalabashDevelopRewardCondition(e, t) {
    return (t || new CheckCalabashDevelopRewardCondition()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsCheckCalabashDevelopRewardCondition(e, t) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new CheckCalabashDevelopRewardCondition()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  type(e) {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.__string(this.bb_pos + t, e);
    } else {
      return undefined;
    }
  }
  monsterId() {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return this.bb.readInt32(this.bb_pos + e);
    } else {
      return 0;
    }
  }
  develop() {
    var e = this.bb.__offset(this.bb_pos, 8);
    if (e) {
      return this.bb.readUint8(this.bb_pos + e);
    } else {
      return 0;
    }
  }
  static startCheckCalabashDevelopRewardCondition(e) {
    e.startObject(3);
  }
  static addType(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static addMonsterId(e, t) {
    e.addFieldInt32(1, t, 0);
  }
  static addDevelop(e, t) {
    e.addFieldInt8(2, t, 0);
  }
  static endCheckCalabashDevelopRewardCondition(e) {
    return e.endObject();
  }
  static createCheckCalabashDevelopRewardCondition(e, t, a, i) {
    CheckCalabashDevelopRewardCondition.startCheckCalabashDevelopRewardCondition(e);
    CheckCalabashDevelopRewardCondition.addType(e, t);
    CheckCalabashDevelopRewardCondition.addMonsterId(e, a);
    CheckCalabashDevelopRewardCondition.addDevelop(e, i);
    return CheckCalabashDevelopRewardCondition.endCheckCalabashDevelopRewardCondition(e);
  }
}
exports.CheckCalabashDevelopRewardCondition = CheckCalabashDevelopRewardCondition;
//# sourceMappingURL=check-calabash-develop-reward-condition.js.map