"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TelePortAfterTimeOut = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class TelePortAfterTimeOut {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsTelePortAfterTimeOut(t, e) {
    return (e || new TelePortAfterTimeOut()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsTelePortAfterTimeOut(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new TelePortAfterTimeOut()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  timeOut() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startTelePortAfterTimeOut(t) {
    t.startObject(2);
  }
  static addType(t, e) {
    t.addFieldInt8(0, e, 0);
  }
  static addTimeOut(t, e) {
    t.addFieldInt32(1, e, 0);
  }
  static endTelePortAfterTimeOut(t) {
    return t.endObject();
  }
  static createTelePortAfterTimeOut(t, e, r) {
    TelePortAfterTimeOut.startTelePortAfterTimeOut(t);
    TelePortAfterTimeOut.addType(t, e);
    TelePortAfterTimeOut.addTimeOut(t, r);
    return TelePortAfterTimeOut.endTelePortAfterTimeOut(t);
  }
}
exports.TelePortAfterTimeOut = TelePortAfterTimeOut;
//# sourceMappingURL=tele-port-after-time-out.js.map