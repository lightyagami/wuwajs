"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CdRefreshRule = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class CdRefreshRule {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, t) {
    this.bb_pos = e;
    this.bb = t;
    return this;
  }
  static getRootAsCdRefreshRule(e, t) {
    return (t || new CdRefreshRule()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsCdRefreshRule(e, t) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new CdRefreshRule()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  type(e) {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.__string(this.bb_pos + t, e);
    } else {
      return undefined;
    }
  }
  cd() {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return this.bb.readInt32(this.bb_pos + e);
    } else {
      return 0;
    }
  }
  static startCdRefreshRule(e) {
    e.startObject(2);
  }
  static addType(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static addCd(e, t) {
    e.addFieldInt32(1, t, 0);
  }
  static endCdRefreshRule(e) {
    return e.endObject();
  }
  static createCdRefreshRule(e, t, s) {
    CdRefreshRule.startCdRefreshRule(e);
    CdRefreshRule.addType(e, t);
    CdRefreshRule.addCd(e, s);
    return CdRefreshRule.endCdRefreshRule(e);
  }
}
exports.CdRefreshRule = CdRefreshRule;
//# sourceMappingURL=cd-refresh-rule.js.map