"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SequenceFrameEvent = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const action_info_js_1 = require("../fb-action/action-info.js");
class SequenceFrameEvent {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, t) {
    this.bb_pos = e;
    this.bb = t;
    return this;
  }
  static getRootAsSequenceFrameEvent(e, t) {
    return (t || new SequenceFrameEvent()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsSequenceFrameEvent(e, t) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new SequenceFrameEvent()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  eventKey(e) {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.__string(this.bb_pos + t, e);
    } else {
      return undefined;
    }
  }
  eventActions(e, t) {
    var n = this.bb.__offset(this.bb_pos, 6);
    if (n) {
      return (t || new action_info_js_1.ActionInfo()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + n) + e * 4), this.bb);
    } else {
      return undefined;
    }
  }
  eventActionsLength() {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return this.bb.__vector_len(this.bb_pos + e);
    } else {
      return 0;
    }
  }
  static startSequenceFrameEvent(e) {
    e.startObject(2);
  }
  static addEventKey(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static addEventActions(e, t) {
    e.addFieldOffset(1, t, 0);
  }
  static createEventActionsVector(t, n) {
    t.startVector(4, n.length, 4);
    for (let e = n.length - 1; e >= 0; e--) {
      t.addOffset(n[e]);
    }
    return t.endVector();
  }
  static startEventActionsVector(e, t) {
    e.startVector(4, t, 4);
  }
  static endSequenceFrameEvent(e) {
    return e.endObject();
  }
  static createSequenceFrameEvent(e, t, n) {
    SequenceFrameEvent.startSequenceFrameEvent(e);
    SequenceFrameEvent.addEventKey(e, t);
    SequenceFrameEvent.addEventActions(e, n);
    return SequenceFrameEvent.endSequenceFrameEvent(e);
  }
}
exports.SequenceFrameEvent = SequenceFrameEvent;
//# sourceMappingURL=sequence-frame-event.js.map