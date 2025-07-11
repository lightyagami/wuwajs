"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CompareFishingTechLevel = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class CompareFishingTechLevel {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, i) {
    this.bb_pos = e;
    this.bb = i;
    return this;
  }
  static getRootAsCompareFishingTechLevel(e, i) {
    return (i || new CompareFishingTechLevel()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsCompareFishingTechLevel(e, i) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new CompareFishingTechLevel()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  type(e) {
    var i = this.bb.__offset(this.bb_pos, 4);
    if (i) {
      return this.bb.__string(this.bb_pos + i, e);
    } else {
      return undefined;
    }
  }
  techId() {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return this.bb.readInt32(this.bb_pos + e);
    } else {
      return 0;
    }
  }
  compare(e) {
    var i = this.bb.__offset(this.bb_pos, 8);
    if (i) {
      return this.bb.__string(this.bb_pos + i, e);
    } else {
      return undefined;
    }
  }
  techLevel() {
    var e = this.bb.__offset(this.bb_pos, 10);
    if (e) {
      return this.bb.readInt32(this.bb_pos + e);
    } else {
      return 0;
    }
  }
  static startCompareFishingTechLevel(e) {
    e.startObject(4);
  }
  static addType(e, i) {
    e.addFieldOffset(0, i, 0);
  }
  static addTechId(e, i) {
    e.addFieldInt32(1, i, 0);
  }
  static addCompare(e, i) {
    e.addFieldOffset(2, i, 0);
  }
  static addTechLevel(e, i) {
    e.addFieldInt32(3, i, 0);
  }
  static endCompareFishingTechLevel(e) {
    return e.endObject();
  }
  static createCompareFishingTechLevel(e, i, t, s, h) {
    CompareFishingTechLevel.startCompareFishingTechLevel(e);
    CompareFishingTechLevel.addType(e, i);
    CompareFishingTechLevel.addTechId(e, t);
    CompareFishingTechLevel.addCompare(e, s);
    CompareFishingTechLevel.addTechLevel(e, h);
    return CompareFishingTechLevel.endCompareFishingTechLevel(e);
  }
}
exports.CompareFishingTechLevel = CompareFishingTechLevel;
//# sourceMappingURL=compare-fishing-tech-level.js.map