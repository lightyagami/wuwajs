"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DurabilityWorn = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class DurabilityWorn {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, r) {
    this.bb_pos = t;
    this.bb = r;
    return this;
  }
  static getRootAsDurabilityWorn(t, r) {
    return (r || new DurabilityWorn()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsDurabilityWorn(t, r) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (r || new DurabilityWorn()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  slightWear() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  severeWear() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startDurabilityWorn(t) {
    t.startObject(2);
  }
  static addSlightWear(t, r) {
    t.addFieldInt32(0, r, 0);
  }
  static addSevereWear(t, r) {
    t.addFieldInt32(1, r, 0);
  }
  static endDurabilityWorn(t) {
    return t.endObject();
  }
  static createDurabilityWorn(t, r, i) {
    DurabilityWorn.startDurabilityWorn(t);
    DurabilityWorn.addSlightWear(t, r);
    DurabilityWorn.addSevereWear(t, i);
    return DurabilityWorn.endDurabilityWorn(t);
  }
}
exports.DurabilityWorn = DurabilityWorn;
//# sourceMappingURL=durability-worn.js.map