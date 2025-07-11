"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NpcPerformOnInteract = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class NpcPerformOnInteract {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, r) {
    this.bb_pos = t;
    this.bb = r;
    return this;
  }
  static getRootAsNpcPerformOnInteract(t, r) {
    return (r || new NpcPerformOnInteract()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsNpcPerformOnInteract(t, r) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (r || new NpcPerformOnInteract()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  montage(t) {
    var r = this.bb.__offset(this.bb_pos, 4);
    if (r) {
      return this.bb.__string(this.bb_pos + r, t);
    } else {
      return undefined;
    }
  }
  static startNpcPerformOnInteract(t) {
    t.startObject(1);
  }
  static addMontage(t, r) {
    t.addFieldOffset(0, r, 0);
  }
  static endNpcPerformOnInteract(t) {
    return t.endObject();
  }
  static createNpcPerformOnInteract(t, r) {
    NpcPerformOnInteract.startNpcPerformOnInteract(t);
    NpcPerformOnInteract.addMontage(t, r);
    return NpcPerformOnInteract.endNpcPerformOnInteract(t);
  }
}
exports.NpcPerformOnInteract = NpcPerformOnInteract;
//# sourceMappingURL=npc-perform-on-interact.js.map