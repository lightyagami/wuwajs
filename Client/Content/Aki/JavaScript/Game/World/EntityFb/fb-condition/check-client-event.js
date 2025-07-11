"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CheckClientEvent = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class CheckClientEvent {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsCheckClientEvent(t, e) {
    return (e || new CheckClientEvent()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsCheckClientEvent(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new CheckClientEvent()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  eventName(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  static startCheckClientEvent(t) {
    t.startObject(2);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addEventName(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static endCheckClientEvent(t) {
    return t.endObject();
  }
  static createCheckClientEvent(t, e, i) {
    CheckClientEvent.startCheckClientEvent(t);
    CheckClientEvent.addType(t, e);
    CheckClientEvent.addEventName(t, i);
    return CheckClientEvent.endCheckClientEvent(t);
  }
}
exports.CheckClientEvent = CheckClientEvent;
//# sourceMappingURL=check-client-event.js.map