"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PostAkEventGlobal = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class PostAkEventGlobal {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, s) {
    this.bb_pos = t;
    this.bb = s;
    return this;
  }
  static getRootAsPostAkEventGlobal(t, s) {
    return (s || new PostAkEventGlobal()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsPostAkEventGlobal(t, s) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (s || new PostAkEventGlobal()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var s = this.bb.__offset(this.bb_pos, 4);
    if (s) {
      return this.bb.__string(this.bb_pos + s, t);
    } else {
      return undefined;
    }
  }
  akEvent(t) {
    var s = this.bb.__offset(this.bb_pos, 6);
    if (s) {
      return this.bb.__string(this.bb_pos + s, t);
    } else {
      return undefined;
    }
  }
  static startPostAkEventGlobal(t) {
    t.startObject(2);
  }
  static addType(t, s) {
    t.addFieldOffset(0, s, 0);
  }
  static addAkEvent(t, s) {
    t.addFieldOffset(1, s, 0);
  }
  static endPostAkEventGlobal(t) {
    return t.endObject();
  }
  static createPostAkEventGlobal(t, s, e) {
    PostAkEventGlobal.startPostAkEventGlobal(t);
    PostAkEventGlobal.addType(t, s);
    PostAkEventGlobal.addAkEvent(t, e);
    return PostAkEventGlobal.endPostAkEventGlobal(t);
  }
}
exports.PostAkEventGlobal = PostAkEventGlobal;
//# sourceMappingURL=post-ak-event-global.js.map