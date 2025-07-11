"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CompareLiftCondition = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class CompareLiftCondition {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsCompareLiftCondition(t, i) {
    return (i || new CompareLiftCondition()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsCompareLiftCondition(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new CompareLiftCondition()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    if (i) {
      return this.bb.__string(this.bb_pos + i, t);
    } else {
      return undefined;
    }
  }
  isSelf() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  entityId() {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  compare(t) {
    var i = this.bb.__offset(this.bb_pos, 10);
    if (i) {
      return this.bb.__string(this.bb_pos + i, t);
    } else {
      return undefined;
    }
  }
  location() {
    var t = this.bb.__offset(this.bb_pos, 12);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startCompareLiftCondition(t) {
    t.startObject(5);
  }
  static addType(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addIsSelf(t, i) {
    t.addFieldInt8(1, +i, 0);
  }
  static addEntityId(t, i) {
    t.addFieldInt32(2, i, 0);
  }
  static addCompare(t, i) {
    t.addFieldOffset(3, i, 0);
  }
  static addLocation(t, i) {
    t.addFieldInt32(4, i, 0);
  }
  static endCompareLiftCondition(t) {
    return t.endObject();
  }
  static createCompareLiftCondition(t, i, o, e, r, s) {
    CompareLiftCondition.startCompareLiftCondition(t);
    CompareLiftCondition.addType(t, i);
    CompareLiftCondition.addIsSelf(t, o);
    CompareLiftCondition.addEntityId(t, e);
    CompareLiftCondition.addCompare(t, r);
    CompareLiftCondition.addLocation(t, s);
    return CompareLiftCondition.endCompareLiftCondition(t);
  }
}
exports.CompareLiftCondition = CompareLiftCondition;
//# sourceMappingURL=compare-lift-condition.js.map