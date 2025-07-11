"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnlockSystemItem = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const union_unlock_system_option_js_1 = require("../fb-action/union-unlock-system-option.js");
class UnlockSystemItem {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsUnlockSystemItem(t, e) {
    return (e || new UnlockSystemItem()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsUnlockSystemItem(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new UnlockSystemItem()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  systemOptionType() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return union_unlock_system_option_js_1.UnionUnlockSystemOption.NONE;
    }
  }
  systemOption(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return this.bb.__union(t, this.bb_pos + e);
    } else {
      return undefined;
    }
  }
  static startUnlockSystemItem(t) {
    t.startObject(2);
  }
  static addSystemOptionType(t, e) {
    t.addFieldInt8(0, e, union_unlock_system_option_js_1.UnionUnlockSystemOption.NONE);
  }
  static addSystemOption(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static endUnlockSystemItem(t) {
    return t.endObject();
  }
  static createUnlockSystemItem(t, e, s) {
    UnlockSystemItem.startUnlockSystemItem(t);
    UnlockSystemItem.addSystemOptionType(t, e);
    UnlockSystemItem.addSystemOption(t, s);
    return UnlockSystemItem.endUnlockSystemItem(t);
  }
}
exports.UnlockSystemItem = UnlockSystemItem;
//# sourceMappingURL=unlock-system-item.js.map