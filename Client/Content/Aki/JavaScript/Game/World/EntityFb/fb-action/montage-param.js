"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MontageParam = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const montage_id_js_1 = require("../fb-action/montage-id.js");
class MontageParam {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, a) {
    this.bb_pos = t;
    this.bb = a;
    return this;
  }
  static getRootAsMontageParam(t, a) {
    return (a || new MontageParam()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsMontageParam(t, a) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (a || new MontageParam()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  montageId(t) {
    var a = this.bb.__offset(this.bb_pos, 4);
    if (a) {
      return (t || new montage_id_js_1.MontageId()).__init(this.bb.__indirect(this.bb_pos + a), this.bb);
    } else {
      return undefined;
    }
  }
  isLoop() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  keepPose() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  delayTime() {
    var t = this.bb.__offset(this.bb_pos, 10);
    if (t) {
      return this.bb.readFloat32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startMontageParam(t) {
    t.startObject(4);
  }
  static addMontageId(t, a) {
    t.addFieldOffset(0, a, 0);
  }
  static addIsLoop(t, a) {
    t.addFieldInt8(1, +a, 0);
  }
  static addKeepPose(t, a) {
    t.addFieldInt8(2, +a, 0);
  }
  static addDelayTime(t, a) {
    t.addFieldFloat32(3, a, 0);
  }
  static endMontageParam(t) {
    return t.endObject();
  }
  static createMontageParam(t, a, e, s, r) {
    MontageParam.startMontageParam(t);
    MontageParam.addMontageId(t, a);
    MontageParam.addIsLoop(t, e);
    MontageParam.addKeepPose(t, s);
    MontageParam.addDelayTime(t, r);
    return MontageParam.endMontageParam(t);
  }
}
exports.MontageParam = MontageParam;
//# sourceMappingURL=montage-param.js.map