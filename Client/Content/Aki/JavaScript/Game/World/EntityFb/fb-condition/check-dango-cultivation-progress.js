"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CheckDangoCultivationProgress = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const union_check_dango_cultivation_progress_config_js_1 = require("../fb-condition/union-check-dango-cultivation-progress-config.js");
class CheckDangoCultivationProgress {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsCheckDangoCultivationProgress(t, i) {
    return (i || new CheckDangoCultivationProgress()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsCheckDangoCultivationProgress(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new CheckDangoCultivationProgress()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    if (i) {
      return this.bb.__string(this.bb_pos + i, t);
    } else {
      return undefined;
    }
  }
  checkTypeType() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return union_check_dango_cultivation_progress_config_js_1.UnionCheckDangoCultivationProgressConfig.NONE;
    }
  }
  checkType(t) {
    var i = this.bb.__offset(this.bb_pos, 8);
    if (i) {
      return this.bb.__union(t, this.bb_pos + i);
    } else {
      return undefined;
    }
  }
  static startCheckDangoCultivationProgress(t) {
    t.startObject(3);
  }
  static addType(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addCheckTypeType(t, i) {
    t.addFieldInt8(1, i, union_check_dango_cultivation_progress_config_js_1.UnionCheckDangoCultivationProgressConfig.NONE);
  }
  static addCheckType(t, i) {
    t.addFieldOffset(2, i, 0);
  }
  static endCheckDangoCultivationProgress(t) {
    return t.endObject();
  }
  static createCheckDangoCultivationProgress(t, i, e, s) {
    CheckDangoCultivationProgress.startCheckDangoCultivationProgress(t);
    CheckDangoCultivationProgress.addType(t, i);
    CheckDangoCultivationProgress.addCheckTypeType(t, e);
    CheckDangoCultivationProgress.addCheckType(t, s);
    return CheckDangoCultivationProgress.endCheckDangoCultivationProgress(t);
  }
}
exports.CheckDangoCultivationProgress = CheckDangoCultivationProgress;
//# sourceMappingURL=check-dango-cultivation-progress.js.map