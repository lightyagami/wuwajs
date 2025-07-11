"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RewardComponent = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const reward_refresh_config_js_1 = require("../fb-component/reward-refresh-config.js");
class RewardComponent {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsRewardComponent(t, e) {
    return (e || new RewardComponent()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsRewardComponent(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new RewardComponent()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  disabled() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  rewardId() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  rewardType() {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  dropOnEvent() {
    var t = this.bb.__offset(this.bb_pos, 10);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  refreshConfig(t) {
    var e = this.bb.__offset(this.bb_pos, 12);
    if (e) {
      return (t || new reward_refresh_config_js_1.RewardRefreshConfig()).__init(this.bb.__indirect(this.bb_pos + e), this.bb);
    } else {
      return undefined;
    }
  }
  static startRewardComponent(t) {
    t.startObject(5);
  }
  static addDisabled(t, e) {
    t.addFieldInt8(0, +e, 0);
  }
  static addRewardId(t, e) {
    t.addFieldInt32(1, e, 0);
  }
  static addRewardType(t, e) {
    t.addFieldInt8(2, e, 0);
  }
  static addDropOnEvent(t, e) {
    t.addFieldInt8(3, e, 0);
  }
  static addRefreshConfig(t, e) {
    t.addFieldOffset(4, e, 0);
  }
  static endRewardComponent(t) {
    return t.endObject();
  }
}
exports.RewardComponent = RewardComponent;
//# sourceMappingURL=reward-component.js.map