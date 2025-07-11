"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BoxAkEvent = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class BoxAkEvent {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsBoxAkEvent(t, e) {
    return (e || new BoxAkEvent()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsBoxAkEvent(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new BoxAkEvent()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  audioType(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  priority() {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startBoxAkEvent(t) {
    t.startObject(3);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addAudioType(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static addPriority(t, e) {
    t.addFieldInt32(2, e, 0);
  }
  static endBoxAkEvent(t) {
    return t.endObject();
  }
  static createBoxAkEvent(t, e, i, s) {
    BoxAkEvent.startBoxAkEvent(t);
    BoxAkEvent.addType(t, e);
    BoxAkEvent.addAudioType(t, i);
    BoxAkEvent.addPriority(t, s);
    return BoxAkEvent.endBoxAkEvent(t);
  }
}
exports.BoxAkEvent = BoxAkEvent;
//# sourceMappingURL=box-ak-event.js.map