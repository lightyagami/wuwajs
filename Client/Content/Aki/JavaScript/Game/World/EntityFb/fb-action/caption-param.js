"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CaptionParam = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class CaptionParam {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, a) {
    this.bb_pos = t;
    this.bb = a;
    return this;
  }
  static getRootAsCaptionParam(t, a) {
    return (a || new CaptionParam()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsCaptionParam(t, a) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (a || new CaptionParam()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  startTime() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.readFloat32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  totalTime() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.readFloat32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  intervalTime() {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return this.bb.readFloat32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startCaptionParam(t) {
    t.startObject(3);
  }
  static addStartTime(t, a) {
    t.addFieldFloat32(0, a, 0);
  }
  static addTotalTime(t, a) {
    t.addFieldFloat32(1, a, 0);
  }
  static addIntervalTime(t, a) {
    t.addFieldFloat32(2, a, 0);
  }
  static endCaptionParam(t) {
    return t.endObject();
  }
  static createCaptionParam(t, a, i, r) {
    CaptionParam.startCaptionParam(t);
    CaptionParam.addStartTime(t, a);
    CaptionParam.addTotalTime(t, i);
    CaptionParam.addIntervalTime(t, r);
    return CaptionParam.endCaptionParam(t);
  }
}
exports.CaptionParam = CaptionParam;
//# sourceMappingURL=caption-param.js.map