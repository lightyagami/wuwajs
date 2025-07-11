"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShowTalkFrameEvent = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const sequence_frame_event_js_1 = require("../fb-action/sequence-frame-event.js");
const show_talk_frame_event_position_js_1 = require("../fb-action/show-talk-frame-event-position.js");
class ShowTalkFrameEvent {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, t) {
    this.bb_pos = e;
    this.bb = t;
    return this;
  }
  static getRootAsShowTalkFrameEvent(e, t) {
    return (t || new ShowTalkFrameEvent()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsShowTalkFrameEvent(e, t) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new ShowTalkFrameEvent()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  frameEvent(e) {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return (e || new sequence_frame_event_js_1.SequenceFrameEvent()).__init(this.bb.__indirect(this.bb_pos + t), this.bb);
    } else {
      return undefined;
    }
  }
  position(e) {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return (e || new show_talk_frame_event_position_js_1.ShowTalkFrameEventPosition()).__init(this.bb.__indirect(this.bb_pos + t), this.bb);
    } else {
      return undefined;
    }
  }
  static startShowTalkFrameEvent(e) {
    e.startObject(2);
  }
  static addFrameEvent(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static addPosition(e, t) {
    e.addFieldOffset(1, t, 0);
  }
  static endShowTalkFrameEvent(e) {
    return e.endObject();
  }
}
exports.ShowTalkFrameEvent = ShowTalkFrameEvent;
//# sourceMappingURL=show-talk-frame-event.js.map