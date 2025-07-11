"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CheckFinishLoading = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const union_check_target_type_config_js_1 = require("../fb-condition/union-check-target-type-config.js");
class CheckFinishLoading {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(i, t) {
    this.bb_pos = i;
    this.bb = t;
    return this;
  }
  static getRootAsCheckFinishLoading(i, t) {
    return (t || new CheckFinishLoading()).__init(i.readInt32(i.position()) + i.position(), i);
  }
  static getSizePrefixedRootAsCheckFinishLoading(i, t) {
    i.setPosition(i.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new CheckFinishLoading()).__init(i.readInt32(i.position()) + i.position(), i);
  }
  type(i) {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.__string(this.bb_pos + t, i);
    } else {
      return undefined;
    }
  }
  checkTargetType() {
    var i = this.bb.__offset(this.bb_pos, 6);
    if (i) {
      return this.bb.readUint8(this.bb_pos + i);
    } else {
      return union_check_target_type_config_js_1.UnionCheckTargetTypeConfig.NONE;
    }
  }
  checkTarget(i) {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return this.bb.__union(i, this.bb_pos + t);
    } else {
      return undefined;
    }
  }
  static startCheckFinishLoading(i) {
    i.startObject(3);
  }
  static addType(i, t) {
    i.addFieldOffset(0, t, 0);
  }
  static addCheckTargetType(i, t) {
    i.addFieldInt8(1, t, union_check_target_type_config_js_1.UnionCheckTargetTypeConfig.NONE);
  }
  static addCheckTarget(i, t) {
    i.addFieldOffset(2, t, 0);
  }
  static endCheckFinishLoading(i) {
    return i.endObject();
  }
  static createCheckFinishLoading(i, t, e, s) {
    CheckFinishLoading.startCheckFinishLoading(i);
    CheckFinishLoading.addType(i, t);
    CheckFinishLoading.addCheckTargetType(i, e);
    CheckFinishLoading.addCheckTarget(i, s);
    return CheckFinishLoading.endCheckFinishLoading(i);
  }
}
exports.CheckFinishLoading = CheckFinishLoading;
//# sourceMappingURL=check-finish-loading.js.map