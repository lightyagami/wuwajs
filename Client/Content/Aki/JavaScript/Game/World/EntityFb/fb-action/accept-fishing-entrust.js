"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AcceptFishingEntrust = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class AcceptFishingEntrust {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, s) {
    this.bb_pos = t;
    this.bb = s;
    return this;
  }
  static getRootAsAcceptFishingEntrust(t, s) {
    return (s || new AcceptFishingEntrust()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsAcceptFishingEntrust(t, s) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (s || new AcceptFishingEntrust()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  entrustId() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  isAutoTracking() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  static startAcceptFishingEntrust(t) {
    t.startObject(2);
  }
  static addEntrustId(t, s) {
    t.addFieldInt32(0, s, 0);
  }
  static addIsAutoTracking(t, s) {
    t.addFieldInt8(1, +s, 0);
  }
  static endAcceptFishingEntrust(t) {
    return t.endObject();
  }
  static createAcceptFishingEntrust(t, s, i) {
    AcceptFishingEntrust.startAcceptFishingEntrust(t);
    AcceptFishingEntrust.addEntrustId(t, s);
    AcceptFishingEntrust.addIsAutoTracking(t, i);
    return AcceptFishingEntrust.endAcceptFishingEntrust(t);
  }
}
exports.AcceptFishingEntrust = AcceptFishingEntrust;
//# sourceMappingURL=accept-fishing-entrust.js.map