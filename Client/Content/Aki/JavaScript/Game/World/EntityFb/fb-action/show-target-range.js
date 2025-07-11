"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShowTargetRange = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class ShowTargetRange {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsShowTargetRange(t, e) {
    return (e || new ShowTargetRange()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsShowTargetRange(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new ShowTargetRange()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  rangeEntities(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.readInt32(this.bb.__vector(this.bb_pos + e) + t * 4);
    } else {
      return 0;
    }
  }
  rangeEntitiesLength() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  rangeEntitiesArray() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return new Int32Array(this.bb.bytes().buffer, this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + t), this.bb.__vector_len(this.bb_pos + t));
    } else {
      return undefined;
    }
  }
  delayShow() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  static startShowTargetRange(t) {
    t.startObject(2);
  }
  static addRangeEntities(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static createRangeEntitiesVector(e, r) {
    e.startVector(4, r.length, 4);
    for (let t = r.length - 1; t >= 0; t--) {
      e.addInt32(r[t]);
    }
    return e.endVector();
  }
  static startRangeEntitiesVector(t, e) {
    t.startVector(4, e, 4);
  }
  static addDelayShow(t, e) {
    t.addFieldInt8(1, +e, 0);
  }
  static endShowTargetRange(t) {
    return t.endObject();
  }
  static createShowTargetRange(t, e, r) {
    ShowTargetRange.startShowTargetRange(t);
    ShowTargetRange.addRangeEntities(t, e);
    ShowTargetRange.addDelayShow(t, r);
    return ShowTargetRange.endShowTargetRange(t);
  }
}
exports.ShowTargetRange = ShowTargetRange;
//# sourceMappingURL=show-target-range.js.map