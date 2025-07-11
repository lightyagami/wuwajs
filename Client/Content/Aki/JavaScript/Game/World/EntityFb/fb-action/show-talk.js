"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShowTalk = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const record_talk_sequence_transition_js_1 = require("../fb-action/record-talk-sequence-transition.js");
const show_talk_frame_event_js_1 = require("../fb-action/show-talk-frame-event.js");
const show_talk_outline_js_1 = require("../fb-action/show-talk-outline.js");
const talk_item_js_1 = require("../fb-action/talk-item.js");
const int_array_js_1 = require("../fb-var/int-array.js");
class ShowTalk {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsShowTalk(t, e) {
    return (e || new ShowTalk()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsShowTalk(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new ShowTalk()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  resetCamera() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  talkItems(t, e) {
    var s = this.bb.__offset(this.bb_pos, 6);
    if (s) {
      return (e || new talk_item_js_1.TalkItem()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + s) + t * 4), this.bb);
    } else {
      return undefined;
    }
  }
  talkItemsLength() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  talkOutline(t) {
    var e = this.bb.__offset(this.bb_pos, 8);
    if (e) {
      return (t || new show_talk_outline_js_1.ShowTalkOutline()).__init(this.bb.__indirect(this.bb_pos + e), this.bb);
    } else {
      return undefined;
    }
  }
  sequenceDataAsset(t) {
    var e = this.bb.__offset(this.bb_pos, 10);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  talkFrameEvents(t, e) {
    var s = this.bb.__offset(this.bb_pos, 12);
    if (s) {
      return (e || new show_talk_frame_event_js_1.ShowTalkFrameEvent()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + s) + t * 4), this.bb);
    } else {
      return undefined;
    }
  }
  talkFrameEventsLength() {
    var t = this.bb.__offset(this.bb_pos, 12);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  talkSequence(t, e) {
    var s = this.bb.__offset(this.bb_pos, 14);
    if (s) {
      return (e || new int_array_js_1.IntArray()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + s) + t * 4), this.bb);
    } else {
      return undefined;
    }
  }
  talkSequenceLength() {
    var t = this.bb.__offset(this.bb_pos, 14);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  sequenceNames(t, e) {
    var s = this.bb.__offset(this.bb_pos, 16);
    if (s) {
      return this.bb.__string(this.bb.__vector(this.bb_pos + s) + t * 4, e);
    } else {
      return undefined;
    }
  }
  sequenceNamesLength() {
    var t = this.bb.__offset(this.bb_pos, 16);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  sequenceTransitions(t, e) {
    var s = this.bb.__offset(this.bb_pos, 18);
    if (s) {
      return (e || new record_talk_sequence_transition_js_1.RecordTalkSequenceTransition()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + s) + t * 4), this.bb);
    } else {
      return undefined;
    }
  }
  sequenceTransitionsLength() {
    var t = this.bb.__offset(this.bb_pos, 18);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  saveFinalPos() {
    var t = this.bb.__offset(this.bb_pos, 20);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  static startShowTalk(t) {
    t.startObject(9);
  }
  static addResetCamera(t, e) {
    t.addFieldInt8(0, +e, 0);
  }
  static addTalkItems(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static createTalkItemsVector(e, s) {
    e.startVector(4, s.length, 4);
    for (let t = s.length - 1; t >= 0; t--) {
      e.addOffset(s[t]);
    }
    return e.endVector();
  }
  static startTalkItemsVector(t, e) {
    t.startVector(4, e, 4);
  }
  static addTalkOutline(t, e) {
    t.addFieldOffset(2, e, 0);
  }
  static addSequenceDataAsset(t, e) {
    t.addFieldOffset(3, e, 0);
  }
  static addTalkFrameEvents(t, e) {
    t.addFieldOffset(4, e, 0);
  }
  static createTalkFrameEventsVector(e, s) {
    e.startVector(4, s.length, 4);
    for (let t = s.length - 1; t >= 0; t--) {
      e.addOffset(s[t]);
    }
    return e.endVector();
  }
  static startTalkFrameEventsVector(t, e) {
    t.startVector(4, e, 4);
  }
  static addTalkSequence(t, e) {
    t.addFieldOffset(5, e, 0);
  }
  static createTalkSequenceVector(e, s) {
    e.startVector(4, s.length, 4);
    for (let t = s.length - 1; t >= 0; t--) {
      e.addOffset(s[t]);
    }
    return e.endVector();
  }
  static startTalkSequenceVector(t, e) {
    t.startVector(4, e, 4);
  }
  static addSequenceNames(t, e) {
    t.addFieldOffset(6, e, 0);
  }
  static createSequenceNamesVector(e, s) {
    e.startVector(4, s.length, 4);
    for (let t = s.length - 1; t >= 0; t--) {
      e.addOffset(s[t]);
    }
    return e.endVector();
  }
  static startSequenceNamesVector(t, e) {
    t.startVector(4, e, 4);
  }
  static addSequenceTransitions(t, e) {
    t.addFieldOffset(7, e, 0);
  }
  static createSequenceTransitionsVector(e, s) {
    e.startVector(4, s.length, 4);
    for (let t = s.length - 1; t >= 0; t--) {
      e.addOffset(s[t]);
    }
    return e.endVector();
  }
  static startSequenceTransitionsVector(t, e) {
    t.startVector(4, e, 4);
  }
  static addSaveFinalPos(t, e) {
    t.addFieldInt8(8, +e, 0);
  }
  static endShowTalk(t) {
    return t.endObject();
  }
}
exports.ShowTalk = ShowTalk;
//# sourceMappingURL=show-talk.js.map