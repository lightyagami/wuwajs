"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RefreshComponent = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const union_refresh_rule_js_1 = require("../fb-component/union-refresh-rule.js");
class RefreshComponent {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, t) {
    this.bb_pos = e;
    this.bb = t;
    return this;
  }
  static getRootAsRefreshComponent(e, t) {
    return (t || new RefreshComponent()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsRefreshComponent(e, t) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new RefreshComponent()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  disabled() {
    var e = this.bb.__offset(this.bb_pos, 4);
    return !!e && !!this.bb.readInt8(this.bb_pos + e);
  }
  refreshRuleType() {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return this.bb.readUint8(this.bb_pos + e);
    } else {
      return union_refresh_rule_js_1.UnionRefreshRule.NONE;
    }
  }
  refreshRule(e) {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return this.bb.__union(e, this.bb_pos + t);
    } else {
      return undefined;
    }
  }
  isDisableRefreshAfterDroppingReward() {
    var e = this.bb.__offset(this.bb_pos, 10);
    return !!e && !!this.bb.readInt8(this.bb_pos + e);
  }
  static startRefreshComponent(e) {
    e.startObject(4);
  }
  static addDisabled(e, t) {
    e.addFieldInt8(0, +t, 0);
  }
  static addRefreshRuleType(e, t) {
    e.addFieldInt8(1, t, union_refresh_rule_js_1.UnionRefreshRule.NONE);
  }
  static addRefreshRule(e, t) {
    e.addFieldOffset(2, t, 0);
  }
  static addIsDisableRefreshAfterDroppingReward(e, t) {
    e.addFieldInt8(3, +t, 0);
  }
  static endRefreshComponent(e) {
    return e.endObject();
  }
  static createRefreshComponent(e, t, s, r, n) {
    RefreshComponent.startRefreshComponent(e);
    RefreshComponent.addDisabled(e, t);
    RefreshComponent.addRefreshRuleType(e, s);
    RefreshComponent.addRefreshRule(e, r);
    RefreshComponent.addIsDisableRefreshAfterDroppingReward(e, n);
    return RefreshComponent.endRefreshComponent(e);
  }
}
exports.RefreshComponent = RefreshComponent;
//# sourceMappingURL=refresh-component.js.map