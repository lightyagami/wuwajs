"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NpcLeisureInteract = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const union_npc_leisure_interact_op_js_1 = require("../fb-action/union-npc-leisure-interact-op.js");
class NpcLeisureInteract {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsNpcLeisureInteract(t, e) {
    return (e || new NpcLeisureInteract()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsNpcLeisureInteract(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new NpcLeisureInteract()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  optionType() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return union_npc_leisure_interact_op_js_1.UnionNpcLeisureInteractOp.NONE;
    }
  }
  option(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return this.bb.__union(t, this.bb_pos + e);
    } else {
      return undefined;
    }
  }
  static startNpcLeisureInteract(t) {
    t.startObject(2);
  }
  static addOptionType(t, e) {
    t.addFieldInt8(0, e, union_npc_leisure_interact_op_js_1.UnionNpcLeisureInteractOp.NONE);
  }
  static addOption(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static endNpcLeisureInteract(t) {
    return t.endObject();
  }
  static createNpcLeisureInteract(t, e, r) {
    NpcLeisureInteract.startNpcLeisureInteract(t);
    NpcLeisureInteract.addOptionType(t, e);
    NpcLeisureInteract.addOption(t, r);
    return NpcLeisureInteract.endNpcLeisureInteract(t);
  }
}
exports.NpcLeisureInteract = NpcLeisureInteract;
//# sourceMappingURL=npc-leisure-interact.js.map