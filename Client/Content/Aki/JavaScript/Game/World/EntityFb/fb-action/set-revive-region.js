"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SetReviveRegion = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class SetReviveRegion {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, t) {
    this.bb_pos = e;
    this.bb = t;
    return this;
  }
  static getRootAsSetReviveRegion(e, t) {
    return (t || new SetReviveRegion()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsSetReviveRegion(e, t) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new SetReviveRegion()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  setReviveType(e) {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.__string(this.bb_pos + t, e);
    } else {
      return undefined;
    }
  }
  reviveId() {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return this.bb.readInt32(this.bb_pos + e);
    } else {
      return 0;
    }
  }
  static startSetReviveRegion(e) {
    e.startObject(2);
  }
  static addSetReviveType(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static addReviveId(e, t) {
    e.addFieldInt32(1, t, 0);
  }
  static endSetReviveRegion(e) {
    return e.endObject();
  }
  static createSetReviveRegion(e, t, i) {
    SetReviveRegion.startSetReviveRegion(e);
    SetReviveRegion.addSetReviveType(e, t);
    SetReviveRegion.addReviveId(e, i);
    return SetReviveRegion.endSetReviveRegion(e);
  }
}
exports.SetReviveRegion = SetReviveRegion;
//# sourceMappingURL=set-revive-region.js.map