"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SignalBreakGameplay = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class SignalBreakGameplay {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(a, e) {
    this.bb_pos = a;
    this.bb = e;
    return this;
  }
  static getRootAsSignalBreakGameplay(a, e) {
    return (e || new SignalBreakGameplay()).__init(a.readInt32(a.position()) + a.position(), a);
  }
  static getSizePrefixedRootAsSignalBreakGameplay(a, e) {
    a.setPosition(a.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new SignalBreakGameplay()).__init(a.readInt32(a.position()) + a.position(), a);
  }
  type(a) {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.__string(this.bb_pos + e, a);
    } else {
      return undefined;
    }
  }
  signalBreakId(a) {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return this.bb.__string(this.bb_pos + e, a);
    } else {
      return undefined;
    }
  }
  static startSignalBreakGameplay(a) {
    a.startObject(2);
  }
  static addType(a, e) {
    a.addFieldOffset(0, e, 0);
  }
  static addSignalBreakId(a, e) {
    a.addFieldOffset(1, e, 0);
  }
  static endSignalBreakGameplay(a) {
    return a.endObject();
  }
  static createSignalBreakGameplay(a, e, t) {
    SignalBreakGameplay.startSignalBreakGameplay(a);
    SignalBreakGameplay.addType(a, e);
    SignalBreakGameplay.addSignalBreakId(a, t);
    return SignalBreakGameplay.endSignalBreakGameplay(a);
  }
}
exports.SignalBreakGameplay = SignalBreakGameplay;
//# sourceMappingURL=signal-break-gameplay.js.map