"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NpcHitShow = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const bubble_index_js_1 = require("../fb-action/bubble-index.js");
class NpcHitShow {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsNpcHitShow(t, i) {
    return (i || new NpcHitShow()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsNpcHitShow(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new NpcHitShow()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  hitMontage(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    if (i) {
      return this.bb.__string(this.bb_pos + i, t);
    } else {
      return undefined;
    }
  }
  hitBubble(t) {
    var i = this.bb.__offset(this.bb_pos, 6);
    if (i) {
      return (t || new bubble_index_js_1.BubbleIndex()).__init(this.bb.__indirect(this.bb_pos + i), this.bb);
    } else {
      return undefined;
    }
  }
  bubbleRate() {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startNpcHitShow(t) {
    t.startObject(3);
  }
  static addHitMontage(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addHitBubble(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static addBubbleRate(t, i) {
    t.addFieldInt32(2, i, 0);
  }
  static endNpcHitShow(t) {
    return t.endObject();
  }
}
exports.NpcHitShow = NpcHitShow;
//# sourceMappingURL=npc-hit-show.js.map