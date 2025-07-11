"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShowTalkOutline = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class ShowTalkOutline {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsShowTalkOutline(t, i) {
    return (i || new ShowTalkOutline()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsShowTalkOutline(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new ShowTalkOutline()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  textId() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  tidOutline(t) {
    var i = this.bb.__offset(this.bb_pos, 6);
    if (i) {
      return this.bb.__string(this.bb_pos + i, t);
    } else {
      return undefined;
    }
  }
  plotLineKey(t) {
    var i = this.bb.__offset(this.bb_pos, 8);
    if (i) {
      return this.bb.__string(this.bb_pos + i, t);
    } else {
      return undefined;
    }
  }
  static startShowTalkOutline(t) {
    t.startObject(3);
  }
  static addTextId(t, i) {
    t.addFieldInt32(0, i, 0);
  }
  static addTidOutline(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static addPlotLineKey(t, i) {
    t.addFieldOffset(2, i, 0);
  }
  static endShowTalkOutline(t) {
    return t.endObject();
  }
  static createShowTalkOutline(t, i, e, s) {
    ShowTalkOutline.startShowTalkOutline(t);
    ShowTalkOutline.addTextId(t, i);
    ShowTalkOutline.addTidOutline(t, e);
    ShowTalkOutline.addPlotLineKey(t, s);
    return ShowTalkOutline.endShowTalkOutline(t);
  }
}
exports.ShowTalkOutline = ShowTalkOutline;
//# sourceMappingURL=show-talk-outline.js.map