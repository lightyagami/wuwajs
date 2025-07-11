"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnlockAchievementSystemItem = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class UnlockAchievementSystemItem {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, t) {
    this.bb_pos = e;
    this.bb = t;
    return this;
  }
  static getRootAsUnlockAchievementSystemItem(e, t) {
    return (t || new UnlockAchievementSystemItem()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsUnlockAchievementSystemItem(e, t) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new UnlockAchievementSystemItem()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  type(e) {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.__string(this.bb_pos + t, e);
    } else {
      return undefined;
    }
  }
  id() {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return this.bb.readInt32(this.bb_pos + e);
    } else {
      return 0;
    }
  }
  static startUnlockAchievementSystemItem(e) {
    e.startObject(2);
  }
  static addType(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static addId(e, t) {
    e.addFieldInt32(1, t, 0);
  }
  static endUnlockAchievementSystemItem(e) {
    return e.endObject();
  }
  static createUnlockAchievementSystemItem(e, t, s) {
    UnlockAchievementSystemItem.startUnlockAchievementSystemItem(e);
    UnlockAchievementSystemItem.addType(e, t);
    UnlockAchievementSystemItem.addId(e, s);
    return UnlockAchievementSystemItem.endUnlockAchievementSystemItem(e);
  }
}
exports.UnlockAchievementSystemItem = UnlockAchievementSystemItem;
//# sourceMappingURL=unlock-achievement-system-item.js.map