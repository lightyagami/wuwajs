"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SetAreaState = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class SetAreaState {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsSetAreaState(t, e) {
    return (e || new SetAreaState()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsSetAreaState(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new SetAreaState()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  areaId() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  state() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startSetAreaState(t) {
    t.startObject(2);
  }
  static addAreaId(t, e) {
    t.addFieldInt32(0, e, 0);
  }
  static addState(t, e) {
    t.addFieldInt32(1, e, 0);
  }
  static endSetAreaState(t) {
    return t.endObject();
  }
  static createSetAreaState(t, e, a) {
    SetAreaState.startSetAreaState(t);
    SetAreaState.addAreaId(t, e);
    SetAreaState.addState(t, a);
    return SetAreaState.endSetAreaState(t);
  }
}
exports.SetAreaState = SetAreaState;
//# sourceMappingURL=set-area-state.js.map