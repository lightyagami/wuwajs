"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ItemFoundation2 = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const union_item_foundation_js_1 = require("../fb-component/union-item-foundation.js");
class ItemFoundation2 {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsItemFoundation2(t, i) {
    return (i || new ItemFoundation2()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsItemFoundation2(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new ItemFoundation2()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  disabled() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  configType() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return union_item_foundation_js_1.UnionItemFoundation.NONE;
    }
  }
  config(t) {
    var i = this.bb.__offset(this.bb_pos, 8);
    if (i) {
      return this.bb.__union(t, this.bb_pos + i);
    } else {
      return undefined;
    }
  }
  static startItemFoundation2(t) {
    t.startObject(3);
  }
  static addDisabled(t, i) {
    t.addFieldInt8(0, +i, 0);
  }
  static addConfigType(t, i) {
    t.addFieldInt8(1, i, union_item_foundation_js_1.UnionItemFoundation.NONE);
  }
  static addConfig(t, i) {
    t.addFieldOffset(2, i, 0);
  }
  static endItemFoundation2(t) {
    return t.endObject();
  }
  static createItemFoundation2(t, i, n, o) {
    ItemFoundation2.startItemFoundation2(t);
    ItemFoundation2.addDisabled(t, i);
    ItemFoundation2.addConfigType(t, n);
    ItemFoundation2.addConfig(t, o);
    return ItemFoundation2.endItemFoundation2(t);
  }
}
exports.ItemFoundation2 = ItemFoundation2;
//# sourceMappingURL=item-foundation2.js.map