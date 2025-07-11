"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DefaultAkEvent = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class DefaultAkEvent {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsDefaultAkEvent(t, e) {
    return (e || new DefaultAkEvent()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsDefaultAkEvent(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new DefaultAkEvent()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  static startDefaultAkEvent(t) {
    t.startObject(1);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static endDefaultAkEvent(t) {
    return t.endObject();
  }
  static createDefaultAkEvent(t, e) {
    DefaultAkEvent.startDefaultAkEvent(t);
    DefaultAkEvent.addType(t, e);
    return DefaultAkEvent.endDefaultAkEvent(t);
  }
}
exports.DefaultAkEvent = DefaultAkEvent;
//# sourceMappingURL=default-ak-event.js.map