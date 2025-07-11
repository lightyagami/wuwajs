"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CheckCertainFishingItemCount = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class CheckCertainFishingItemCount {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsCheckCertainFishingItemCount(t, i) {
    return (i || new CheckCertainFishingItemCount()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsCheckCertainFishingItemCount(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new CheckCertainFishingItemCount()).__init(t.readInt32(t.position()) + t.position(), t);
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
  compare(t) {
    var i = this.bb.__offset(this.bb_pos, 8);
    if (i) {
      return this.bb.__string(this.bb_pos + i, t);
    } else {
      return undefined;
    }
  }
  count() {
    var t = this.bb.__offset(this.bb_pos, 10);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startCheckCertainFishingItemCount(t) {
    t.startObject(4);
  }
  static addType(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addId(t, i) {
    t.addFieldInt32(1, i, 0);
  }
  static addCompare(t, i) {
    t.addFieldOffset(2, i, 0);
  }
  static addCount(t, i) {
    t.addFieldInt32(3, i, 0);
  }
  static endCheckCertainFishingItemCount(t) {
    return t.endObject();
  }
  static createCheckCertainFishingItemCount(t, i, e, n, s) {
    CheckCertainFishingItemCount.startCheckCertainFishingItemCount(t);
    CheckCertainFishingItemCount.addType(t, i);
    CheckCertainFishingItemCount.addId(t, e);
    CheckCertainFishingItemCount.addCompare(t, n);
    CheckCertainFishingItemCount.addCount(t, s);
    return CheckCertainFishingItemCount.endCheckCertainFishingItemCount(t);
  }
}
exports.CheckCertainFishingItemCount = CheckCertainFishingItemCount;
//# sourceMappingURL=check-certain-fishing-item-count.js.map