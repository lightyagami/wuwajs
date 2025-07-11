"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InhaledPerformance = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class InhaledPerformance {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, r) {
    this.bb_pos = e;
    this.bb = r;
    return this;
  }
  static getRootAsInhaledPerformance(e, r) {
    return (r || new InhaledPerformance()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsInhaledPerformance(e, r) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (r || new InhaledPerformance()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  inhaledTime() {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.readFloat32(this.bb_pos + e);
    } else {
      return 0;
    }
  }
  static startInhaledPerformance(e) {
    e.startObject(1);
  }
  static addInhaledTime(e, r) {
    e.addFieldFloat32(0, r, 0);
  }
  static endInhaledPerformance(e) {
    return e.endObject();
  }
  static createInhaledPerformance(e, r) {
    InhaledPerformance.startInhaledPerformance(e);
    InhaledPerformance.addInhaledTime(e, r);
    return InhaledPerformance.endInhaledPerformance(e);
  }
}
exports.InhaledPerformance = InhaledPerformance;
//# sourceMappingURL=inhaled-performance.js.map