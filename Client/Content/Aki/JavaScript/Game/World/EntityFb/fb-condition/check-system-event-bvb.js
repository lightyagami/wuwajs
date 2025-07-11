"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CheckSystemEventBvb = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class CheckSystemEventBvb {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsCheckSystemEventBvb(t, e) {
    return (e || new CheckSystemEventBvb()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsCheckSystemEventBvb(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new CheckSystemEventBvb()).__init(t.readInt32(t.position()) + t.position(), t);
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
  static startCheckSystemEventBvb(t) {
    t.startObject(2);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addEventName(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static endCheckSystemEventBvb(t) {
    return t.endObject();
  }
  static createCheckSystemEventBvb(t, e, s) {
    CheckSystemEventBvb.startCheckSystemEventBvb(t);
    CheckSystemEventBvb.addType(t, e);
    CheckSystemEventBvb.addEventName(t, s);
    return CheckSystemEventBvb.endCheckSystemEventBvb(t);
  }
}
exports.CheckSystemEventBvb = CheckSystemEventBvb;
//# sourceMappingURL=check-system-event-bvb.js.map