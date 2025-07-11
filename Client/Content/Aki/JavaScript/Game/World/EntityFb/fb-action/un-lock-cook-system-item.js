"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnLockCookSystemItem = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const union_unlock_cook_system_option_js_1 = require("../fb-action/union-unlock-cook-system-option.js");
class UnLockCookSystemItem {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, o) {
    this.bb_pos = t;
    this.bb = o;
    return this;
  }
  static getRootAsUnLockCookSystemItem(t, o) {
    return (o || new UnLockCookSystemItem()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsUnLockCookSystemItem(t, o) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (o || new UnLockCookSystemItem()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var o = this.bb.__offset(this.bb_pos, 4);
    if (o) {
      return this.bb.__string(this.bb_pos + o, t);
    } else {
      return undefined;
    }
  }
  unlockOptionType() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return union_unlock_cook_system_option_js_1.UnionUnlockCookSystemOption.NONE;
    }
  }
  unlockOption(t) {
    var o = this.bb.__offset(this.bb_pos, 8);
    if (o) {
      return this.bb.__union(t, this.bb_pos + o);
    } else {
      return undefined;
    }
  }
  static startUnLockCookSystemItem(t) {
    t.startObject(3);
  }
  static addType(t, o) {
    t.addFieldOffset(0, o, 0);
  }
  static addUnlockOptionType(t, o) {
    t.addFieldInt8(1, o, union_unlock_cook_system_option_js_1.UnionUnlockCookSystemOption.NONE);
  }
  static addUnlockOption(t, o) {
    t.addFieldOffset(2, o, 0);
  }
  static endUnLockCookSystemItem(t) {
    return t.endObject();
  }
  static createUnLockCookSystemItem(t, o, e, s) {
    UnLockCookSystemItem.startUnLockCookSystemItem(t);
    UnLockCookSystemItem.addType(t, o);
    UnLockCookSystemItem.addUnlockOptionType(t, e);
    UnLockCookSystemItem.addUnlockOption(t, s);
    return UnLockCookSystemItem.endUnLockCookSystemItem(t);
  }
}
exports.UnLockCookSystemItem = UnLockCookSystemItem;
//# sourceMappingURL=un-lock-cook-system-item.js.map