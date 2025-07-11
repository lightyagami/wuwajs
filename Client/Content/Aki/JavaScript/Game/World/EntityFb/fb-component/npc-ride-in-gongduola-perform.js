"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NpcRideInGongduolaPerform = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class NpcRideInGongduolaPerform {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, t) {
    this.bb_pos = e;
    this.bb = t;
    return this;
  }
  static getRootAsNpcRideInGongduolaPerform(e, t) {
    return (t || new NpcRideInGongduolaPerform()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsNpcRideInGongduolaPerform(e, t) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new NpcRideInGongduolaPerform()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  type(e) {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.__string(this.bb_pos + t, e);
    } else {
      return undefined;
    }
  }
  montage(e) {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.__string(this.bb_pos + t, e);
    } else {
      return undefined;
    }
  }
  static startNpcRideInGongduolaPerform(e) {
    e.startObject(2);
  }
  static addType(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static addMontage(e, t) {
    e.addFieldOffset(1, t, 0);
  }
  static endNpcRideInGongduolaPerform(e) {
    return e.endObject();
  }
  static createNpcRideInGongduolaPerform(e, t, r) {
    NpcRideInGongduolaPerform.startNpcRideInGongduolaPerform(e);
    NpcRideInGongduolaPerform.addType(e, t);
    NpcRideInGongduolaPerform.addMontage(e, r);
    return NpcRideInGongduolaPerform.endNpcRideInGongduolaPerform(e);
  }
}
exports.NpcRideInGongduolaPerform = NpcRideInGongduolaPerform;
//# sourceMappingURL=npc-ride-in-gongduola-perform.js.map