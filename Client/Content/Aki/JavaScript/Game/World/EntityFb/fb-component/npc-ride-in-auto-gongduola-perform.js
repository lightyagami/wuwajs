"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NpcRideInAutoGongduolaPerform = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class NpcRideInAutoGongduolaPerform {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, o) {
    this.bb_pos = t;
    this.bb = o;
    return this;
  }
  static getRootAsNpcRideInAutoGongduolaPerform(t, o) {
    return (o || new NpcRideInAutoGongduolaPerform()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsNpcRideInAutoGongduolaPerform(t, o) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (o || new NpcRideInAutoGongduolaPerform()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var o = this.bb.__offset(this.bb_pos, 4);
    if (o) {
      return this.bb.__string(this.bb_pos + o, t);
    } else {
      return undefined;
    }
  }
  montage(t) {
    var o = this.bb.__offset(this.bb_pos, 6);
    if (o) {
      return this.bb.__string(this.bb_pos + o, t);
    } else {
      return undefined;
    }
  }
  static startNpcRideInAutoGongduolaPerform(t) {
    t.startObject(2);
  }
  static addType(t, o) {
    t.addFieldOffset(0, o, 0);
  }
  static addMontage(t, o) {
    t.addFieldOffset(1, o, 0);
  }
  static endNpcRideInAutoGongduolaPerform(t) {
    return t.endObject();
  }
  static createNpcRideInAutoGongduolaPerform(t, o, e) {
    NpcRideInAutoGongduolaPerform.startNpcRideInAutoGongduolaPerform(t);
    NpcRideInAutoGongduolaPerform.addType(t, o);
    NpcRideInAutoGongduolaPerform.addMontage(t, e);
    return NpcRideInAutoGongduolaPerform.endNpcRideInAutoGongduolaPerform(t);
  }
}
exports.NpcRideInAutoGongduolaPerform = NpcRideInAutoGongduolaPerform;
//# sourceMappingURL=npc-ride-in-auto-gongduola-perform.js.map