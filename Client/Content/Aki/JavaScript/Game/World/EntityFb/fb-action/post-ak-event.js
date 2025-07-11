"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PostAkEvent = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const union_post_ak_event_js_1 = require("../fb-action/union-post-ak-event.js");
class PostAkEvent {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsPostAkEvent(t, e) {
    return (e || new PostAkEvent()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsPostAkEvent(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new PostAkEvent()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  eventConfigType() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return union_post_ak_event_js_1.UnionPostAkEvent.NONE;
    }
  }
  eventConfig(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return this.bb.__union(t, this.bb_pos + e);
    } else {
      return undefined;
    }
  }
  persistWhenExitDungeon() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  static startPostAkEvent(t) {
    t.startObject(3);
  }
  static addEventConfigType(t, e) {
    t.addFieldInt8(0, e, union_post_ak_event_js_1.UnionPostAkEvent.NONE);
  }
  static addEventConfig(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static addPersistWhenExitDungeon(t, e) {
    t.addFieldInt8(2, +e, 0);
  }
  static endPostAkEvent(t) {
    return t.endObject();
  }
  static createPostAkEvent(t, e, s, n) {
    PostAkEvent.startPostAkEvent(t);
    PostAkEvent.addEventConfigType(t, e);
    PostAkEvent.addEventConfig(t, s);
    PostAkEvent.addPersistWhenExitDungeon(t, n);
    return PostAkEvent.endPostAkEvent(t);
  }
}
exports.PostAkEvent = PostAkEvent;
//# sourceMappingURL=post-ak-event.js.map