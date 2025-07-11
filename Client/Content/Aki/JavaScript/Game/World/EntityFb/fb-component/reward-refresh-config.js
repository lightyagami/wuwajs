"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RewardRefreshConfig = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const union_refresh_rule_js_1 = require("../fb-component/union-refresh-rule.js");
class RewardRefreshConfig {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, r) {
    this.bb_pos = e;
    this.bb = r;
    return this;
  }
  static getRootAsRewardRefreshConfig(e, r) {
    return (r || new RewardRefreshConfig()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsRewardRefreshConfig(e, r) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (r || new RewardRefreshConfig()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  refreshTypeType() {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.readUint8(this.bb_pos + e);
    } else {
      return union_refresh_rule_js_1.UnionRefreshRule.NONE;
    }
  }
  refreshType(e) {
    var r = this.bb.__offset(this.bb_pos, 6);
    if (r) {
      return this.bb.__union(e, this.bb_pos + r);
    } else {
      return undefined;
    }
  }
  maxCount() {
    var e = this.bb.__offset(this.bb_pos, 8);
    if (e) {
      return this.bb.readInt32(this.bb_pos + e);
    } else {
      return 0;
    }
  }
  static startRewardRefreshConfig(e) {
    e.startObject(3);
  }
  static addRefreshTypeType(e, r) {
    e.addFieldInt8(0, r, union_refresh_rule_js_1.UnionRefreshRule.NONE);
  }
  static addRefreshType(e, r) {
    e.addFieldOffset(1, r, 0);
  }
  static addMaxCount(e, r) {
    e.addFieldInt32(2, r, 0);
  }
  static endRewardRefreshConfig(e) {
    return e.endObject();
  }
  static createRewardRefreshConfig(e, r, s, t) {
    RewardRefreshConfig.startRewardRefreshConfig(e);
    RewardRefreshConfig.addRefreshTypeType(e, r);
    RewardRefreshConfig.addRefreshType(e, s);
    RewardRefreshConfig.addMaxCount(e, t);
    return RewardRefreshConfig.endRewardRefreshConfig(e);
  }
}
exports.RewardRefreshConfig = RewardRefreshConfig;
//# sourceMappingURL=reward-refresh-config.js.map