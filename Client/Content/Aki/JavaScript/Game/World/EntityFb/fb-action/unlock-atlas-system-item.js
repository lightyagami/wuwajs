"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnlockAtlasSystemItem = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const union_unlock_atlas_system_option_js_1 = require("../fb-action/union-unlock-atlas-system-option.js");
class UnlockAtlasSystemItem {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, s) {
    this.bb_pos = t;
    this.bb = s;
    return this;
  }
  static getRootAsUnlockAtlasSystemItem(t, s) {
    return (s || new UnlockAtlasSystemItem()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsUnlockAtlasSystemItem(t, s) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (s || new UnlockAtlasSystemItem()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var s = this.bb.__offset(this.bb_pos, 4);
    if (s) {
      return this.bb.__string(this.bb_pos + s, t);
    } else {
      return undefined;
    }
  }
  unlockOptionType() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return union_unlock_atlas_system_option_js_1.UnionUnlockAtlasSystemOption.NONE;
    }
  }
  unlockOption(t) {
    var s = this.bb.__offset(this.bb_pos, 8);
    if (s) {
      return this.bb.__union(t, this.bb_pos + s);
    } else {
      return undefined;
    }
  }
  static startUnlockAtlasSystemItem(t) {
    t.startObject(3);
  }
  static addType(t, s) {
    t.addFieldOffset(0, s, 0);
  }
  static addUnlockOptionType(t, s) {
    t.addFieldInt8(1, s, union_unlock_atlas_system_option_js_1.UnionUnlockAtlasSystemOption.NONE);
  }
  static addUnlockOption(t, s) {
    t.addFieldOffset(2, s, 0);
  }
  static endUnlockAtlasSystemItem(t) {
    return t.endObject();
  }
  static createUnlockAtlasSystemItem(t, s, e, n) {
    UnlockAtlasSystemItem.startUnlockAtlasSystemItem(t);
    UnlockAtlasSystemItem.addType(t, s);
    UnlockAtlasSystemItem.addUnlockOptionType(t, e);
    UnlockAtlasSystemItem.addUnlockOption(t, n);
    return UnlockAtlasSystemItem.endUnlockAtlasSystemItem(t);
  }
}
exports.UnlockAtlasSystemItem = UnlockAtlasSystemItem;
//# sourceMappingURL=unlock-atlas-system-item.js.map