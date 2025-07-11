"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CompareFishingBoatState = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class CompareFishingBoatState {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsCompareFishingBoatState(t, i) {
    return (i || new CompareFishingBoatState()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsCompareFishingBoatState(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new CompareFishingBoatState()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    if (i) {
      return this.bb.__string(this.bb_pos + i, t);
    } else {
      return undefined;
    }
  }
  isStop() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  fishingPort() {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startCompareFishingBoatState(t) {
    t.startObject(3);
  }
  static addType(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addIsStop(t, i) {
    t.addFieldInt8(1, +i, 0);
  }
  static addFishingPort(t, i) {
    t.addFieldInt32(2, i, 0);
  }
  static endCompareFishingBoatState(t) {
    return t.endObject();
  }
  static createCompareFishingBoatState(t, i, a, e) {
    CompareFishingBoatState.startCompareFishingBoatState(t);
    CompareFishingBoatState.addType(t, i);
    CompareFishingBoatState.addIsStop(t, a);
    CompareFishingBoatState.addFishingPort(t, e);
    return CompareFishingBoatState.endCompareFishingBoatState(t);
  }
}
exports.CompareFishingBoatState = CompareFishingBoatState;
//# sourceMappingURL=compare-fishing-boat-state.js.map