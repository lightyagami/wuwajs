"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NpcPerformOnMonsterCloseby = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const bubble_index_js_1 = require("../fb-action/bubble-index.js");
const montage_id_js_1 = require("../fb-action/montage-id.js");
class NpcPerformOnMonsterCloseby {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsNpcPerformOnMonsterCloseby(t, e) {
    return (e || new NpcPerformOnMonsterCloseby()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsNpcPerformOnMonsterCloseby(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new NpcPerformOnMonsterCloseby()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  range() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.readFloat32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  montage(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return (t || new montage_id_js_1.MontageId()).__init(this.bb.__indirect(this.bb_pos + e), this.bb);
    } else {
      return undefined;
    }
  }
  bubble(t) {
    var e = this.bb.__offset(this.bb_pos, 8);
    if (e) {
      return (t || new bubble_index_js_1.BubbleIndex()).__init(this.bb.__indirect(this.bb_pos + e), this.bb);
    } else {
      return undefined;
    }
  }
  bubbleRate() {
    var t = this.bb.__offset(this.bb_pos, 10);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startNpcPerformOnMonsterCloseby(t) {
    t.startObject(4);
  }
  static addRange(t, e) {
    t.addFieldFloat32(0, e, 0);
  }
  static addMontage(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static addBubble(t, e) {
    t.addFieldOffset(2, e, 0);
  }
  static addBubbleRate(t, e) {
    t.addFieldInt32(3, e, 0);
  }
  static endNpcPerformOnMonsterCloseby(t) {
    return t.endObject();
  }
}
exports.NpcPerformOnMonsterCloseby = NpcPerformOnMonsterCloseby;
//# sourceMappingURL=npc-perform-on-monster-closeby.js.map