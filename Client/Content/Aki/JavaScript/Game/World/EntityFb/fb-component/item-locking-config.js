"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ItemLockingConfig = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class ItemLockingConfig {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsItemLockingConfig(t, i) {
    return (i || new ItemLockingConfig()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsItemLockingConfig(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new ItemLockingConfig()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  effectPath(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    if (i) {
      return this.bb.__string(this.bb_pos + i, t);
    } else {
      return undefined;
    }
  }
  teleControlPerform(t) {
    var i = this.bb.__offset(this.bb_pos, 6);
    if (i) {
      return this.bb.__string(this.bb_pos + i, t);
    } else {
      return undefined;
    }
  }
  static startItemLockingConfig(t) {
    t.startObject(2);
  }
  static addEffectPath(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addTeleControlPerform(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static endItemLockingConfig(t) {
    return t.endObject();
  }
  static createItemLockingConfig(t, i, e) {
    ItemLockingConfig.startItemLockingConfig(t);
    ItemLockingConfig.addEffectPath(t, i);
    ItemLockingConfig.addTeleControlPerform(t, e);
    return ItemLockingConfig.endItemLockingConfig(t);
  }
}
exports.ItemLockingConfig = ItemLockingConfig;
//# sourceMappingURL=item-locking-config.js.map