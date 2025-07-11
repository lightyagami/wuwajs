"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CommonTipFirstComplete = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class CommonTipFirstComplete {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsCommonTipFirstComplete(t, e) {
    return (e || new CommonTipFirstComplete()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsCommonTipFirstComplete(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new CommonTipFirstComplete()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  tidText(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  static startCommonTipFirstComplete(t) {
    t.startObject(2);
  }
  static addType(t, e) {
    t.addFieldInt8(0, e, 0);
  }
  static addTidText(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static endCommonTipFirstComplete(t) {
    return t.endObject();
  }
  static createCommonTipFirstComplete(t, e, i) {
    CommonTipFirstComplete.startCommonTipFirstComplete(t);
    CommonTipFirstComplete.addType(t, e);
    CommonTipFirstComplete.addTidText(t, i);
    return CommonTipFirstComplete.endCommonTipFirstComplete(t);
  }
}
exports.CommonTipFirstComplete = CommonTipFirstComplete;
//# sourceMappingURL=common-tip-first-complete.js.map