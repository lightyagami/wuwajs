"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.JigsawItem = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const union_fill_config_js_1 = require("../fb-component/union-fill-config.js");
class JigsawItem {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsJigsawItem(t, i) {
    return (i || new JigsawItem()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsJigsawItem(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new JigsawItem()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  disabled() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  fillCfgType() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return union_fill_config_js_1.UnionFillConfig.NONE;
    }
  }
  fillCfg(t) {
    var i = this.bb.__offset(this.bb_pos, 8);
    if (i) {
      return this.bb.__union(t, this.bb_pos + i);
    } else {
      return undefined;
    }
  }
  static startJigsawItem(t) {
    t.startObject(3);
  }
  static addDisabled(t, i) {
    t.addFieldInt8(0, +i, 0);
  }
  static addFillCfgType(t, i) {
    t.addFieldInt8(1, i, union_fill_config_js_1.UnionFillConfig.NONE);
  }
  static addFillCfg(t, i) {
    t.addFieldOffset(2, i, 0);
  }
  static endJigsawItem(t) {
    return t.endObject();
  }
  static createJigsawItem(t, i, s, e) {
    JigsawItem.startJigsawItem(t);
    JigsawItem.addDisabled(t, i);
    JigsawItem.addFillCfgType(t, s);
    JigsawItem.addFillCfg(t, e);
    return JigsawItem.endJigsawItem(t);
  }
}
exports.JigsawItem = JigsawItem;
//# sourceMappingURL=jigsaw-item.js.map