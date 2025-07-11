"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SetRegionMpc = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class SetRegionMpc {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsSetRegionMpc(t, e) {
    return (e || new SetRegionMpc()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsSetRegionMpc(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new SetRegionMpc()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  regionMpcId() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startSetRegionMpc(t) {
    t.startObject(2);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addRegionMpcId(t, e) {
    t.addFieldInt32(1, e, 0);
  }
  static endSetRegionMpc(t) {
    return t.endObject();
  }
  static createSetRegionMpc(t, e, i) {
    SetRegionMpc.startSetRegionMpc(t);
    SetRegionMpc.addType(t, e);
    SetRegionMpc.addRegionMpcId(t, i);
    return SetRegionMpc.endSetRegionMpc(t);
  }
}
exports.SetRegionMpc = SetRegionMpc;
//# sourceMappingURL=set-region-mpc.js.map