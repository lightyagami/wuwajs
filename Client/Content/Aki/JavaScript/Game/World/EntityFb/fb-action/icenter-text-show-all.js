"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ICenterTextShowAll = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class ICenterTextShowAll {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsICenterTextShowAll(t, e) {
    return (e || new ICenterTextShowAll()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsICenterTextShowAll(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new ICenterTextShowAll()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  static startICenterTextShowAll(t) {
    t.startObject(1);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static endICenterTextShowAll(t) {
    return t.endObject();
  }
  static createICenterTextShowAll(t, e) {
    ICenterTextShowAll.startICenterTextShowAll(t);
    ICenterTextShowAll.addType(t, e);
    return ICenterTextShowAll.endICenterTextShowAll(t);
  }
}
exports.ICenterTextShowAll = ICenterTextShowAll;
//# sourceMappingURL=icenter-text-show-all.js.map