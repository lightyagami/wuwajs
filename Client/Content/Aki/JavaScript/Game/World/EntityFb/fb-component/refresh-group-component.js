"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RefreshGroupComponent = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const state_change_config_js_1 = require("../fb-component/state-change-config.js");
const union_refresh_content_js_1 = require("../fb-component/union-refresh-content.js");
const union_refresh_rule_js_1 = require("../fb-component/union-refresh-rule.js");
class RefreshGroupComponent {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsRefreshGroupComponent(t, e) {
    return (e || new RefreshGroupComponent()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsRefreshGroupComponent(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new RefreshGroupComponent()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  disabled() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  entityIds(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return this.bb.readInt32(this.bb.__vector(this.bb_pos + e) + t * 4);
    } else {
      return 0;
    }
  }
  entityIdsLength() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  entityIdsArray() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return new Int32Array(this.bb.bytes().buffer, this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + t), this.bb.__vector_len(this.bb_pos + t));
    } else {
      return undefined;
    }
  }
  refreshContentType() {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return union_refresh_content_js_1.UnionRefreshContent.NONE;
    }
  }
  refreshContent(t) {
    var e = this.bb.__offset(this.bb_pos, 10);
    if (e) {
      return this.bb.__union(t, this.bb_pos + e);
    } else {
      return undefined;
    }
  }
  refreshRuleType() {
    var t = this.bb.__offset(this.bb_pos, 12);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return union_refresh_rule_js_1.UnionRefreshRule.NONE;
    }
  }
  refreshRule(t) {
    var e = this.bb.__offset(this.bb_pos, 14);
    if (e) {
      return this.bb.__union(t, this.bb_pos + e);
    } else {
      return undefined;
    }
  }
  stateChangeConfig(t) {
    var e = this.bb.__offset(this.bb_pos, 16);
    if (e) {
      return (t || new state_change_config_js_1.StateChangeConfig()).__init(this.bb.__indirect(this.bb_pos + e), this.bb);
    } else {
      return undefined;
    }
  }
  static startRefreshGroupComponent(t) {
    t.startObject(7);
  }
  static addDisabled(t, e) {
    t.addFieldInt8(0, +e, 0);
  }
  static addEntityIds(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static createEntityIdsVector(e, s) {
    e.startVector(4, s.length, 4);
    for (let t = s.length - 1; t >= 0; t--) {
      e.addInt32(s[t]);
    }
    return e.endVector();
  }
  static startEntityIdsVector(t, e) {
    t.startVector(4, e, 4);
  }
  static addRefreshContentType(t, e) {
    t.addFieldInt8(2, e, union_refresh_content_js_1.UnionRefreshContent.NONE);
  }
  static addRefreshContent(t, e) {
    t.addFieldOffset(3, e, 0);
  }
  static addRefreshRuleType(t, e) {
    t.addFieldInt8(4, e, union_refresh_rule_js_1.UnionRefreshRule.NONE);
  }
  static addRefreshRule(t, e) {
    t.addFieldOffset(5, e, 0);
  }
  static addStateChangeConfig(t, e) {
    t.addFieldOffset(6, e, 0);
  }
  static endRefreshGroupComponent(t) {
    return t.endObject();
  }
}
exports.RefreshGroupComponent = RefreshGroupComponent;
//# sourceMappingURL=refresh-group-component.js.map