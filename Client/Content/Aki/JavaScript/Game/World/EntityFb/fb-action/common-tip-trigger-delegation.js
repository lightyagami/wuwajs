"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CommonTipTriggerDelegation = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class CommonTipTriggerDelegation {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(i, t) {
    this.bb_pos = i;
    this.bb = t;
    return this;
  }
  static getRootAsCommonTipTriggerDelegation(i, t) {
    return (t || new CommonTipTriggerDelegation()).__init(i.readInt32(i.position()) + i.position(), i);
  }
  static getSizePrefixedRootAsCommonTipTriggerDelegation(i, t) {
    i.setPosition(i.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new CommonTipTriggerDelegation()).__init(i.readInt32(i.position()) + i.position(), i);
  }
  type() {
    var i = this.bb.__offset(this.bb_pos, 4);
    if (i) {
      return this.bb.readUint8(this.bb_pos + i);
    } else {
      return 0;
    }
  }
  tidMainText(i) {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.__string(this.bb_pos + t, i);
    } else {
      return undefined;
    }
  }
  tidSubText(i) {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return this.bb.__string(this.bb_pos + t, i);
    } else {
      return undefined;
    }
  }
  static startCommonTipTriggerDelegation(i) {
    i.startObject(3);
  }
  static addType(i, t) {
    i.addFieldInt8(0, t, 0);
  }
  static addTidMainText(i, t) {
    i.addFieldOffset(1, t, 0);
  }
  static addTidSubText(i, t) {
    i.addFieldOffset(2, t, 0);
  }
  static endCommonTipTriggerDelegation(i) {
    return i.endObject();
  }
  static createCommonTipTriggerDelegation(i, t, e, r) {
    CommonTipTriggerDelegation.startCommonTipTriggerDelegation(i);
    CommonTipTriggerDelegation.addType(i, t);
    CommonTipTriggerDelegation.addTidMainText(i, e);
    CommonTipTriggerDelegation.addTidSubText(i, r);
    return CommonTipTriggerDelegation.endCommonTipTriggerDelegation(i);
  }
}
exports.CommonTipTriggerDelegation = CommonTipTriggerDelegation;
//# sourceMappingURL=common-tip-trigger-delegation.js.map