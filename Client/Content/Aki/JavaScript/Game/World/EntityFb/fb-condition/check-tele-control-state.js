"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CheckTeleControlState = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class CheckTeleControlState {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsCheckTeleControlState(t, e) {
    return (e || new CheckTeleControlState()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsCheckTeleControlState(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new CheckTeleControlState()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  entityId() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  compareType(t) {
    var e = this.bb.__offset(this.bb_pos, 8);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  state(t) {
    var e = this.bb.__offset(this.bb_pos, 10);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  static startCheckTeleControlState(t) {
    t.startObject(4);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addEntityId(t, e) {
    t.addFieldInt32(1, e, 0);
  }
  static addCompareType(t, e) {
    t.addFieldOffset(2, e, 0);
  }
  static addState(t, e) {
    t.addFieldOffset(3, e, 0);
  }
  static endCheckTeleControlState(t) {
    return t.endObject();
  }
  static createCheckTeleControlState(t, e, r, s, o) {
    CheckTeleControlState.startCheckTeleControlState(t);
    CheckTeleControlState.addType(t, e);
    CheckTeleControlState.addEntityId(t, r);
    CheckTeleControlState.addCompareType(t, s);
    CheckTeleControlState.addState(t, o);
    return CheckTeleControlState.endCheckTeleControlState(t);
  }
}
exports.CheckTeleControlState = CheckTeleControlState;
//# sourceMappingURL=check-tele-control-state.js.map