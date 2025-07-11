"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EventRotator = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const action_info_js_1 = require("../fb-action/action-info.js");
class EventRotator {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, s) {
    this.bb_pos = t;
    this.bb = s;
    return this;
  }
  static getRootAsEventRotator(t, s) {
    return (s || new EventRotator()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsEventRotator(t, s) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (s || new EventRotator()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  startActions(t, s) {
    var r = this.bb.__offset(this.bb_pos, 4);
    if (r) {
      return (s || new action_info_js_1.ActionInfo()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + r) + t * 4), this.bb);
    } else {
      return undefined;
    }
  }
  startActionsLength() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  endActions(t, s) {
    var r = this.bb.__offset(this.bb_pos, 6);
    if (r) {
      return (s || new action_info_js_1.ActionInfo()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + r) + t * 4), this.bb);
    } else {
      return undefined;
    }
  }
  endActionsLength() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startEventRotator(t) {
    t.startObject(2);
  }
  static addStartActions(t, s) {
    t.addFieldOffset(0, s, 0);
  }
  static createStartActionsVector(s, r) {
    s.startVector(4, r.length, 4);
    for (let t = r.length - 1; t >= 0; t--) {
      s.addOffset(r[t]);
    }
    return s.endVector();
  }
  static startStartActionsVector(t, s) {
    t.startVector(4, s, 4);
  }
  static addEndActions(t, s) {
    t.addFieldOffset(1, s, 0);
  }
  static createEndActionsVector(s, r) {
    s.startVector(4, r.length, 4);
    for (let t = r.length - 1; t >= 0; t--) {
      s.addOffset(r[t]);
    }
    return s.endVector();
  }
  static startEndActionsVector(t, s) {
    t.startVector(4, s, 4);
  }
  static endEventRotator(t) {
    return t.endObject();
  }
  static createEventRotator(t, s, r) {
    EventRotator.startEventRotator(t);
    EventRotator.addStartActions(t, s);
    EventRotator.addEndActions(t, r);
    return EventRotator.endEventRotator(t);
  }
}
exports.EventRotator = EventRotator;
//# sourceMappingURL=event-rotator.js.map