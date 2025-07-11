"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NpcPerformBubble = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const bubble_index_js_1 = require("../fb-action/bubble-index.js");
class NpcPerformBubble {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, r) {
    this.bb_pos = e;
    this.bb = r;
    return this;
  }
  static getRootAsNpcPerformBubble(e, r) {
    return (r || new NpcPerformBubble()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsNpcPerformBubble(e, r) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (r || new NpcPerformBubble()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  bubble(e) {
    var r = this.bb.__offset(this.bb_pos, 4);
    if (r) {
      return (e || new bubble_index_js_1.BubbleIndex()).__init(this.bb.__indirect(this.bb_pos + r), this.bb);
    } else {
      return undefined;
    }
  }
  rate() {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return this.bb.readInt32(this.bb_pos + e);
    } else {
      return 0;
    }
  }
  static startNpcPerformBubble(e) {
    e.startObject(2);
  }
  static addBubble(e, r) {
    e.addFieldOffset(0, r, 0);
  }
  static addRate(e, r) {
    e.addFieldInt32(1, r, 0);
  }
  static endNpcPerformBubble(e) {
    return e.endObject();
  }
  static createNpcPerformBubble(e, r, t) {
    NpcPerformBubble.startNpcPerformBubble(e);
    NpcPerformBubble.addBubble(e, r);
    NpcPerformBubble.addRate(e, t);
    return NpcPerformBubble.endNpcPerformBubble(e);
  }
}
exports.NpcPerformBubble = NpcPerformBubble;
//# sourceMappingURL=npc-perform-bubble.js.map