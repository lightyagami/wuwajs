"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnlockPhotoMemoryCollectSystemItem = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class UnlockPhotoMemoryCollectSystemItem {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsUnlockPhotoMemoryCollectSystemItem(t, e) {
    return (e || new UnlockPhotoMemoryCollectSystemItem()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsUnlockPhotoMemoryCollectSystemItem(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new UnlockPhotoMemoryCollectSystemItem()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  id() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startUnlockPhotoMemoryCollectSystemItem(t) {
    t.startObject(2);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addId(t, e) {
    t.addFieldInt32(1, e, 0);
  }
  static endUnlockPhotoMemoryCollectSystemItem(t) {
    return t.endObject();
  }
  static createUnlockPhotoMemoryCollectSystemItem(t, e, o) {
    UnlockPhotoMemoryCollectSystemItem.startUnlockPhotoMemoryCollectSystemItem(t);
    UnlockPhotoMemoryCollectSystemItem.addType(t, e);
    UnlockPhotoMemoryCollectSystemItem.addId(t, o);
    return UnlockPhotoMemoryCollectSystemItem.endUnlockPhotoMemoryCollectSystemItem(t);
  }
}
exports.UnlockPhotoMemoryCollectSystemItem = UnlockPhotoMemoryCollectSystemItem;
//# sourceMappingURL=unlock-photo-memory-collect-system-item.js.map