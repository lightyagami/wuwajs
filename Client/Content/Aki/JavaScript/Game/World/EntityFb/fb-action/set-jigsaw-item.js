"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SetJigsawItem = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const union_set_jigsaw_item_js_1 = require("../fb-action/union-set-jigsaw-item.js");
class SetJigsawItem {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsSetJigsawItem(t, e) {
    return (e || new SetJigsawItem()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsSetJigsawItem(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new SetJigsawItem()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  configType() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return union_set_jigsaw_item_js_1.UnionSetJigsawItem.NONE;
    }
  }
  config(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return this.bb.__union(t, this.bb_pos + e);
    } else {
      return undefined;
    }
  }
  static startSetJigsawItem(t) {
    t.startObject(2);
  }
  static addConfigType(t, e) {
    t.addFieldInt8(0, e, union_set_jigsaw_item_js_1.UnionSetJigsawItem.NONE);
  }
  static addConfig(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static endSetJigsawItem(t) {
    return t.endObject();
  }
  static createSetJigsawItem(t, e, s) {
    SetJigsawItem.startSetJigsawItem(t);
    SetJigsawItem.addConfigType(t, e);
    SetJigsawItem.addConfig(t, s);
    return SetJigsawItem.endSetJigsawItem(t);
  }
}
exports.SetJigsawItem = SetJigsawItem;
//# sourceMappingURL=set-jigsaw-item.js.map