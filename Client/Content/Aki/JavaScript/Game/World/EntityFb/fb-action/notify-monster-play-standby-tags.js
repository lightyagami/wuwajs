"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NotifyMonsterPlayStandbyTags = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class NotifyMonsterPlayStandbyTags {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, s) {
    this.bb_pos = t;
    this.bb = s;
    return this;
  }
  static getRootAsNotifyMonsterPlayStandbyTags(t, s) {
    return (s || new NotifyMonsterPlayStandbyTags()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsNotifyMonsterPlayStandbyTags(t, s) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (s || new NotifyMonsterPlayStandbyTags()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var s = this.bb.__offset(this.bb_pos, 4);
    if (s) {
      return this.bb.__string(this.bb_pos + s, t);
    } else {
      return undefined;
    }
  }
  standbyTags(t, s) {
    var a = this.bb.__offset(this.bb_pos, 6);
    if (a) {
      return this.bb.__string(this.bb.__vector(this.bb_pos + a) + t * 4, s);
    } else {
      return undefined;
    }
  }
  standbyTagsLength() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startNotifyMonsterPlayStandbyTags(t) {
    t.startObject(2);
  }
  static addType(t, s) {
    t.addFieldOffset(0, s, 0);
  }
  static addStandbyTags(t, s) {
    t.addFieldOffset(1, s, 0);
  }
  static createStandbyTagsVector(s, a) {
    s.startVector(4, a.length, 4);
    for (let t = a.length - 1; t >= 0; t--) {
      s.addOffset(a[t]);
    }
    return s.endVector();
  }
  static startStandbyTagsVector(t, s) {
    t.startVector(4, s, 4);
  }
  static endNotifyMonsterPlayStandbyTags(t) {
    return t.endObject();
  }
  static createNotifyMonsterPlayStandbyTags(t, s, a) {
    NotifyMonsterPlayStandbyTags.startNotifyMonsterPlayStandbyTags(t);
    NotifyMonsterPlayStandbyTags.addType(t, s);
    NotifyMonsterPlayStandbyTags.addStandbyTags(t, a);
    return NotifyMonsterPlayStandbyTags.endNotifyMonsterPlayStandbyTags(t);
  }
}
exports.NotifyMonsterPlayStandbyTags = NotifyMonsterPlayStandbyTags;
//# sourceMappingURL=notify-monster-play-standby-tags.js.map