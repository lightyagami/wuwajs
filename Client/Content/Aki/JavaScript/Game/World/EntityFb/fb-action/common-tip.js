"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CommonTip = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const union_common_tip_option_js_1 = require("../fb-action/union-common-tip-option.js");
class CommonTip {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsCommonTip(t, i) {
    return (i || new CommonTip()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsCommonTip(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new CommonTip()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  tipOptionType() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return union_common_tip_option_js_1.UnionCommonTipOption.NONE;
    }
  }
  tipOption(t) {
    var i = this.bb.__offset(this.bb_pos, 6);
    if (i) {
      return this.bb.__union(t, this.bb_pos + i);
    } else {
      return undefined;
    }
  }
  duration() {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startCommonTip(t) {
    t.startObject(3);
  }
  static addTipOptionType(t, i) {
    t.addFieldInt8(0, i, union_common_tip_option_js_1.UnionCommonTipOption.NONE);
  }
  static addTipOption(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static addDuration(t, i) {
    t.addFieldInt32(2, i, 0);
  }
  static endCommonTip(t) {
    return t.endObject();
  }
  static createCommonTip(t, i, o, n) {
    CommonTip.startCommonTip(t);
    CommonTip.addTipOptionType(t, i);
    CommonTip.addTipOption(t, o);
    CommonTip.addDuration(t, n);
    return CommonTip.endCommonTip(t);
  }
}
exports.CommonTip = CommonTip;
//# sourceMappingURL=common-tip.js.map