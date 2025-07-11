"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExtraAiAlert = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class ExtraAiAlert {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, r) {
    this.bb_pos = t;
    this.bb = r;
    return this;
  }
  static getRootAsExtraAiAlert(t, r) {
    return (r || new ExtraAiAlert()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsExtraAiAlert(t, r) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (r || new ExtraAiAlert()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  moveAlert() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  stopAlert() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startExtraAiAlert(t) {
    t.startObject(2);
  }
  static addMoveAlert(t, r) {
    t.addFieldInt32(0, r, 0);
  }
  static addStopAlert(t, r) {
    t.addFieldInt32(1, r, 0);
  }
  static endExtraAiAlert(t) {
    return t.endObject();
  }
  static createExtraAiAlert(t, r, e) {
    ExtraAiAlert.startExtraAiAlert(t);
    ExtraAiAlert.addMoveAlert(t, r);
    ExtraAiAlert.addStopAlert(t, e);
    return ExtraAiAlert.endExtraAiAlert(t);
  }
}
exports.ExtraAiAlert = ExtraAiAlert;
//# sourceMappingURL=extra-ai-alert.js.map