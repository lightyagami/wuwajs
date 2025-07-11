"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NpcDeathInteract = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const montage_id_js_1 = require("../fb-action/montage-id.js");
class NpcDeathInteract {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsNpcDeathInteract(t, e) {
    return (e || new NpcDeathInteract()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsNpcDeathInteract(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new NpcDeathInteract()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  montage(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return (t || new montage_id_js_1.MontageId()).__init(this.bb.__indirect(this.bb_pos + e), this.bb);
    } else {
      return undefined;
    }
  }
  materialDa(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  static startNpcDeathInteract(t) {
    t.startObject(2);
  }
  static addMontage(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addMaterialDa(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static endNpcDeathInteract(t) {
    return t.endObject();
  }
  static createNpcDeathInteract(t, e, a) {
    NpcDeathInteract.startNpcDeathInteract(t);
    NpcDeathInteract.addMontage(t, e);
    NpcDeathInteract.addMaterialDa(t, a);
    return NpcDeathInteract.endNpcDeathInteract(t);
  }
}
exports.NpcDeathInteract = NpcDeathInteract;
//# sourceMappingURL=npc-death-interact.js.map