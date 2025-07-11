"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FixShowTargetRange = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class FixShowTargetRange {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsFixShowTargetRange(t, e) {
    return (e || new FixShowTargetRange()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsFixShowTargetRange(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new FixShowTargetRange()).__init(t.readInt32(t.position()) + t.position(), t);
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
  static startFixShowTargetRange(t) {
    t.startObject(2);
  }
  static addRangeEntities(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static createRangeEntitiesVector(e, i) {
    e.startVector(4, i.length, 4);
    for (let t = i.length - 1; t >= 0; t--) {
      e.addInt32(i[t]);
    }
    return e.endVector();
  }
  static startRangeEntitiesVector(t, e) {
    t.startVector(4, e, 4);
  }
  static addDelayShow(t, e) {
    t.addFieldInt8(1, +e, 0);
  }
  static endFixShowTargetRange(t) {
    return t.endObject();
  }
  static createFixShowTargetRange(t, e, i) {
    FixShowTargetRange.startFixShowTargetRange(t);
    FixShowTargetRange.addRangeEntities(t, e);
    FixShowTargetRange.addDelayShow(t, i);
    return FixShowTargetRange.endFixShowTargetRange(t);
  }
}
exports.FixShowTargetRange = FixShowTargetRange;
//# sourceMappingURL=fix-show-target-range.js.map