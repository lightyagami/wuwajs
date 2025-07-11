"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnLockDangoCollectSystemItem = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class UnLockDangoCollectSystemItem {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsUnLockDangoCollectSystemItem(t, e) {
    return (e || new UnLockDangoCollectSystemItem()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsUnLockDangoCollectSystemItem(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new UnLockDangoCollectSystemItem()).__init(t.readInt32(t.position()) + t.position(), t);
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
  static startUnLockDangoCollectSystemItem(t) {
    t.startObject(2);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addId(t, e) {
    t.addFieldInt32(1, e, 0);
  }
  static endUnLockDangoCollectSystemItem(t) {
    return t.endObject();
  }
  static createUnLockDangoCollectSystemItem(t, e, o) {
    UnLockDangoCollectSystemItem.startUnLockDangoCollectSystemItem(t);
    UnLockDangoCollectSystemItem.addType(t, e);
    UnLockDangoCollectSystemItem.addId(t, o);
    return UnLockDangoCollectSystemItem.endUnLockDangoCollectSystemItem(t);
  }
}
exports.UnLockDangoCollectSystemItem = UnLockDangoCollectSystemItem;
//# sourceMappingURL=un-lock-dango-collect-system-item.js.map