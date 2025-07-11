"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CompleteCertainFishingEntrust = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class CompleteCertainFishingEntrust {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsCompleteCertainFishingEntrust(t, i) {
    return (i || new CompleteCertainFishingEntrust()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsCompleteCertainFishingEntrust(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new CompleteCertainFishingEntrust()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    if (i) {
      return this.bb.__string(this.bb_pos + i, t);
    } else {
      return undefined;
    }
  }
  id() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  count() {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startCompleteCertainFishingEntrust(t) {
    t.startObject(3);
  }
  static addType(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addId(t, i) {
    t.addFieldInt32(1, i, 0);
  }
  static addCount(t, i) {
    t.addFieldInt32(2, i, 0);
  }
  static endCompleteCertainFishingEntrust(t) {
    return t.endObject();
  }
  static createCompleteCertainFishingEntrust(t, i, e, s) {
    CompleteCertainFishingEntrust.startCompleteCertainFishingEntrust(t);
    CompleteCertainFishingEntrust.addType(t, i);
    CompleteCertainFishingEntrust.addId(t, e);
    CompleteCertainFishingEntrust.addCount(t, s);
    return CompleteCertainFishingEntrust.endCompleteCertainFishingEntrust(t);
  }
}
exports.CompleteCertainFishingEntrust = CompleteCertainFishingEntrust;
//# sourceMappingURL=complete-certain-fishing-entrust.js.map