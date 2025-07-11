"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlaySequenceData = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const sequence_frame_event_js_1 = require("../fb-action/sequence-frame-event.js");
class PlaySequenceData {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, t) {
    this.bb_pos = e;
    this.bb = t;
    return this;
  }
  static getRootAsPlaySequenceData(e, t) {
    return (t || new PlaySequenceData()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsPlaySequenceData(e, t) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new PlaySequenceData()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  path(e) {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.__string(this.bb_pos + t, e);
    } else {
      return undefined;
    }
  }
  resetCamera() {
    var e = this.bb.__offset(this.bb_pos, 6);
    return !!e && !!this.bb.readInt8(this.bb_pos + e);
  }
  keepCamera() {
    var e = this.bb.__offset(this.bb_pos, 8);
    return !!e && !!this.bb.readInt8(this.bb_pos + e);
  }
  preLoadRenderAssets() {
    var e = this.bb.__offset(this.bb_pos, 10);
    return !!e && !!this.bb.readInt8(this.bb_pos + e);
  }
  frameEvents(e, t) {
    var a = this.bb.__offset(this.bb_pos, 12);
    if (a) {
      return (t || new sequence_frame_event_js_1.SequenceFrameEvent()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + a) + e * 4), this.bb);
    } else {
      return undefined;
    }
  }
  frameEventsLength() {
    var e = this.bb.__offset(this.bb_pos, 12);
    if (e) {
      return this.bb.__vector_len(this.bb_pos + e);
    } else {
      return 0;
    }
  }
  saveFinalPos() {
    var e = this.bb.__offset(this.bb_pos, 14);
    return !!e && !!this.bb.readInt8(this.bb_pos + e);
  }
  static startPlaySequenceData(e) {
    e.startObject(6);
  }
  static addPath(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static addResetCamera(e, t) {
    e.addFieldInt8(1, +t, 0);
  }
  static addKeepCamera(e, t) {
    e.addFieldInt8(2, +t, 0);
  }
  static addPreLoadRenderAssets(e, t) {
    e.addFieldInt8(3, +t, 0);
  }
  static addFrameEvents(e, t) {
    e.addFieldOffset(4, t, 0);
  }
  static createFrameEventsVector(t, a) {
    t.startVector(4, a.length, 4);
    for (let e = a.length - 1; e >= 0; e--) {
      t.addOffset(a[e]);
    }
    return t.endVector();
  }
  static startFrameEventsVector(e, t) {
    e.startVector(4, t, 4);
  }
  static addSaveFinalPos(e, t) {
    e.addFieldInt8(5, +t, 0);
  }
  static endPlaySequenceData(e) {
    return e.endObject();
  }
  static createPlaySequenceData(e, t, a, s, r, i, n) {
    PlaySequenceData.startPlaySequenceData(e);
    PlaySequenceData.addPath(e, t);
    PlaySequenceData.addResetCamera(e, a);
    PlaySequenceData.addKeepCamera(e, s);
    PlaySequenceData.addPreLoadRenderAssets(e, r);
    PlaySequenceData.addFrameEvents(e, i);
    PlaySequenceData.addSaveFinalPos(e, n);
    return PlaySequenceData.endPlaySequenceData(e);
  }
}
exports.PlaySequenceData = PlaySequenceData;
//# sourceMappingURL=play-sequence-data.js.map