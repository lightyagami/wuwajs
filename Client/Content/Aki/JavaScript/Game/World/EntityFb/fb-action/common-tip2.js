"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CommonTip2 = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const union_common_tip2_option_js_1 = require("../fb-action/union-common-tip2-option.js");
class CommonTip2 {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsCommonTip2(t, i) {
    return (i || new CommonTip2()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsCommonTip2(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new CommonTip2()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  tipOptionType() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return union_common_tip2_option_js_1.UnionCommonTip2Option.NONE;
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
  static startCommonTip2(t) {
    t.startObject(2);
  }
  static addTipOptionType(t, i) {
    t.addFieldInt8(0, i, union_common_tip2_option_js_1.UnionCommonTip2Option.NONE);
  }
  static addTipOption(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static endCommonTip2(t) {
    return t.endObject();
  }
  static createCommonTip2(t, i, o) {
    CommonTip2.startCommonTip2(t);
    CommonTip2.addTipOptionType(t, i);
    CommonTip2.addTipOption(t, o);
    return CommonTip2.endCommonTip2(t);
  }
}
exports.CommonTip2 = CommonTip2;
//# sourceMappingURL=common-tip2.js.map